import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { canManageArticles } from "@/lib/permissions";

export async function GET() {
  const session = await auth();
  if (!session?.user || !canManageArticles(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await connectDB();
  const articles = await Article.find({ featuredImage: { $exists: true, $ne: "" } })
    .sort({ updatedAt: -1 })
    .limit(16)
    .select("title featuredImage")
    .lean();

  return NextResponse.json({
    items: articles.map((a) => ({
      url: a.featuredImage,
      title: a.title,
    })),
  });
}
