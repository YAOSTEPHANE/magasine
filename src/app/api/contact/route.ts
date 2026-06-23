import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Formulaire invalide" }, { status: 400 });
    }

    await connectDB();
    // En production : envoi email via SendGrid/Resend
    console.info("[contact]", parsed.data);

    return NextResponse.json({
      success: true,
      message: "Votre message a bien été envoyé. Nous vous répondrons sous 48h.",
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
