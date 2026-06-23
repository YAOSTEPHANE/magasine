import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Newsletter } from "@/models/Newsletter";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Email invalide"),
  preferences: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    await connectDB();
    const existing = await Newsletter.findOne({ email: parsed.data.email });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
      }
      return NextResponse.json({ message: "Déjà inscrit" });
    }

    await Newsletter.create({
      email: parsed.data.email,
      preferences: parsed.data.preferences ?? ["general"],
    });

    return NextResponse.json({ message: "Inscription réussie" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
