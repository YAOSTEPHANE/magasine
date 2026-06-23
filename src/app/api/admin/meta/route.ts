import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Author } from "@/models/Author";

export async function GET() {
  const session = await auth();
  if (!session?.user || !["super_admin", "admin", "editor"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await connectDB();
  const [categories, authors] = await Promise.all([
    Category.find({ isActive: true }).sort({ order: 1 }).lean(),
    Author.find().lean(),
  ]);

  return NextResponse.json({
    categories: categories.map((c) => ({ _id: String(c._id), name: c.name })),
    authors: authors.map((a) => ({ _id: String(a._id), name: a.name })),
  });
}
