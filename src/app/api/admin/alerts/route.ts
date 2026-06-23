import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin-api";
import { connectDB } from "@/lib/mongodb";
import { Alert } from "@/models/Alert";

const createSchema = z.object({
  text: z.string().min(1),
  link: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export async function GET() {
  const guard = await requireAdminApi("editorial");
  if (guard.error) return guard.error;

  await connectDB();
  const alerts = await Alert.find().sort({ order: 1 }).lean();
  return NextResponse.json({
    alerts: alerts.map((a) => ({
      _id: String(a._id),
      text: a.text,
      link: a.link ?? "",
      isActive: a.isActive,
      order: a.order,
    })),
  });
}

export async function POST(request: NextRequest) {
  const guard = await requireAdminApi("editorial");
  if (guard.error) return guard.error;

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  await connectDB();
  const alert = await Alert.create({
    text: parsed.data.text,
    link: parsed.data.link,
    isActive: parsed.data.isActive ?? true,
    order: parsed.data.order ?? 0,
  });

  return NextResponse.json({ _id: String(alert._id) }, { status: 201 });
}
