import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Comment } from "@/models/Comment";
import { canManageArticles } from "@/lib/permissions";

export async function GET() {
  const session = await auth();
  if (!session?.user || !canManageArticles(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await connectDB();
    const comments = await Comment.find()
      .populate("user", "name email")
      .populate("article", "title slug")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return NextResponse.json({
      comments: comments.map((c) => {
        const user = c.user as unknown as { name: string; email: string };
        const article = c.article as unknown as { title: string; slug: string };
        return {
          _id: String(c._id),
          content: c.content,
          isApproved: c.isApproved,
          isReported: c.isReported,
          createdAt: c.createdAt.toISOString(),
          user: { name: user?.name, email: user?.email },
          article: { title: article?.title, slug: article?.slug },
        };
      }),
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !canManageArticles(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { commentId, action } = await request.json();
    if (!commentId || !["approve", "reject", "delete"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await connectDB();

    if (action === "delete") {
      await Comment.findByIdAndDelete(commentId);
      return NextResponse.json({ success: true });
    }

    await Comment.findByIdAndUpdate(commentId, {
      isApproved: action === "approve",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
