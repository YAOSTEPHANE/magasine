import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Comment } from "@/models/Comment";
import { Article } from "@/models/Article";
import { auth } from "@/lib/auth";
import { z } from "zod";

const createSchema = z.object({
  articleId: z.string(),
  content: z.string().min(1).max(2000),
  parentId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const articleId = request.nextUrl.searchParams.get("articleId");
  if (!articleId) {
    return NextResponse.json({ error: "articleId required" }, { status: 400 });
  }

  try {
    await connectDB();
    const comments = await Comment.find({ article: articleId, isApproved: true, parent: null })
      .populate("user", "name image")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      comments: comments.map((c) => {
        const user = c.user as unknown as { name: string; image?: string };
        return {
          _id: String(c._id),
          content: c.content,
          user: { name: user.name, image: user.image },
          createdAt: c.createdAt.toISOString(),
        };
      }),
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    await connectDB();
    const article = await Article.findById(parsed.data.articleId);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const comment = await Comment.create({
      article: parsed.data.articleId,
      user: session.user.id,
      content: parsed.data.content,
      parent: parsed.data.parentId,
    });

    return NextResponse.json({ _id: String(comment._id) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
