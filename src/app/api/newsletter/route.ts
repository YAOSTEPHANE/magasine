import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Newsletter } from "@/models/Newsletter";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  preferences: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await connectDB();
    const existing = await Newsletter.findOne({ email: parsed.data.email });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
      }
      return NextResponse.json({ message: "Already subscribed" });
    }

    await Newsletter.create({
      email: parsed.data.email,
      preferences: parsed.data.preferences ?? ["general"],
    });

    return NextResponse.json({ message: "Subscription successful" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
