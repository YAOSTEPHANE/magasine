import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin-api";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Article } from "@/models/Article";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
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
  const category = await Category.findById(id);
  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const data = parsed.data;
  if (data.name) {
    category.name = data.name;
    category.slug = slugify(data.name, { lower: true, strict: true });
  }
  if (data.description !== undefined) category.description = data.description;
  if (data.color) category.color = data.color;
  if (data.order !== undefined) category.order = data.order;
  if (data.isActive !== undefined) category.isActive = data.isActive;

  await category.save();
  return NextResponse.json({ _id: String(category._id), slug: category.slug });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const guard = await requireAdminApi("editorial");
  if (guard.error) return guard.error;

  const { id } = await context.params;
  await connectDB();

  const inUse = await Article.countDocuments({ category: id });
  if (inUse > 0) {
    return NextResponse.json(
      { error: `Category is used by ${inUse} article(s)` },
      { status: 409 }
    );
  }

  const result = await Category.findByIdAndDelete(id);
  if (!result) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
