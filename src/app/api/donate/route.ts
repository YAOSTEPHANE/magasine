import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { Donation } from "@/models/Donation";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  amount: z.number().min(1, "Minimum donation is €1").max(100_000),
  frequency: z.enum(["one-time", "monthly"]),
  message: z.string().trim().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? "Invalid data";
      return NextResponse.json({ error: first }, { status: 400 });
    }

    await connectDB();
    await Donation.create({
      ...parsed.data,
      currency: "EUR",
      status: "pledged",
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your support. In production, you would be redirected to a secure payment page.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
