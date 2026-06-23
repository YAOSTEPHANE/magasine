import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    await connectDB();
    const existing = await User.findOne({ email: parsed.data.email });
    if (existing) {
      return NextResponse.json({ error: "Email déjà utilisé" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(parsed.data.password, 12);
    await User.create({
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashed,
      role: "reader",
    });

    return NextResponse.json({ message: "Compte créé" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
