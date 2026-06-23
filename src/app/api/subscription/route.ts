import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { z } from "zod";

const schema = z.object({
  plan: z.enum(["monthly", "yearly"]),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Connexion requise" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    await connectDB();
    await User.findByIdAndUpdate(session.user.id, { isPremium: true });

    return NextResponse.json({
      success: true,
      plan: parsed.data.plan,
      message: "Abonnement Premium activé (mode démo — sans paiement réel)",
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
