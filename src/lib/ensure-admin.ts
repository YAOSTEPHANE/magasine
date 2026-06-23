import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const DEFAULT_ADMIN_EMAIL = "admin@globalsouthwatch.com";
export const DEFAULT_ADMIN_PASSWORD = "Admin123!";

interface EnsureAdminOptions {
  /** Réinitialise le mot de passe seed (dev / récupération uniquement). */
  resetPassword?: boolean;
}

/** Garantit un compte super_admin (création si absent, réparation optionnelle du mot de passe). */
export async function ensureDefaultAdmin(options: EnsureAdminOptions = {}) {
  await connectDB();

  const email = DEFAULT_ADMIN_EMAIL.toLowerCase();
  const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 12);

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.findOne({
      email: { $regex: /^admin@globalsouthwatch\.com$/i },
    });
  }

  if (!user) {
    await User.create({
      name: "Administrator",
      email,
      password: passwordHash,
      role: "super_admin",
    });
    return { created: true, email, repaired: true };
  }

  let repaired = false;

  if (user.email !== email) {
    user.email = email;
    repaired = true;
  }

  if (user.role !== "super_admin" && user.role !== "admin") {
    user.role = "super_admin";
    repaired = true;
  }

  if (!user.password || options.resetPassword) {
    user.password = passwordHash;
    repaired = true;
  }

  if (repaired) {
    await user.save();
  }

  return { created: false, email, repaired };
}
