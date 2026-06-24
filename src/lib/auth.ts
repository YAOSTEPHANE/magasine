import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import type { UserRole } from "@/types";
import {
  DEFAULT_ADMIN_EMAIL,
  ensureDefaultAdmin,
} from "@/lib/ensure-admin";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function findUserByEmail(email: string) {
  const normalized = normalizeEmail(email);
  let user = await User.findOne({ email: normalized });
  if (user) return user;

  user = await User.findOne({
    email: { $regex: new RegExp(`^${normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
  });

  if (user && user.email !== normalized) {
    user.email = normalized;
    await user.save();
  }

  return user;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      role: UserRole;
      isPremium: boolean;
    };
  }

  interface User {
    role: UserRole;
    isPremium: boolean;
  }

  interface JWT {
    id: string;
    role: UserRole;
    isPremium: boolean;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = normalizeEmail(credentials.email as string);
        const password = (credentials.password as string).trim();

        await connectDB();

        let user = await findUserByEmail(email);
        let isValid =
          !!user?.password && (await bcrypt.compare(password, user.password));

        if (
          !isValid &&
          process.env.NODE_ENV === "development" &&
          email === DEFAULT_ADMIN_EMAIL.toLowerCase()
        ) {
          await ensureDefaultAdmin({ resetPassword: true });
          user = await findUserByEmail(email);
          isValid =
            !!user?.password && (await bcrypt.compare(password, user.password));
        }

        if (!user?.password || !isValid) return null;
        if (user.isBanned) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          isPremium: user.isPremium,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        await connectDB();
        const email = normalizeEmail(user.email);
        const existing = await User.findOne({ email });
        if (!existing) {
          await User.create({
            name: user.name ?? "Lecteur",
            email,
            image: user.image ?? undefined,
            role: "reader",
          });
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        await connectDB();
        const dbUser = await findUserByEmail(user.email ?? "");
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.isPremium = dbUser.isPremium;
        }
      }

      if (trigger === "update" && session) {
        token.isPremium = session.user?.isPremium ?? token.isPremium;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.isPremium = token.isPremium as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
