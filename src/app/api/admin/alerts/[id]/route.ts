import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin-api";
import { connectDB } from "@/lib/mongodb";
import { Alert } from "@/models/Alert";

const updateSchema = z.object({
  text: z.string().min(1).optional(),
  link: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const guard = await requireAdminApi("editorial");
  if (guard.error) return guard.error;

  const { id } = await context.params;
  const body = await request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  await connectDB();
  const alert = await Alert.findById(id);
  if (!alert) {
    return NextResponse.json({ error: "Alert not found" }, { status: 404 });
  }

  const data = parsed.data;
  if (data.text) alert.text = data.text;
  if (data.link !== undefined) alert.link = data.link || undefined;
  if (data.isActive !== undefined) alert.isActive = data.isActive;
  if (data.order !== undefined) alert.order = data.order;

  await alert.save();
  return NextResponse.json({ _id: String(alert._id) });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const guard = await requireAdminApi("editorial");
  if (guard.error) return guard.error;

  const { id } = await context.params;
  await connectDB();
  const result = await Alert.findByIdAndDelete(id);
  if (!result) {
    return NextResponse.json({ error: "Alert not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
