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
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    await connectDB();
    await User.findByIdAndUpdate(session.user.id, { isPremium: true });

    return NextResponse.json({
      success: true,
      plan: parsed.data.plan,
      message: "Premium subscription activated (demo mode — no real payment)",
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
