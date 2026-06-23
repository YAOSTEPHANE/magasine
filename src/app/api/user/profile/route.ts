import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { resolveFeaturedImage } from "@/lib/images";

const articleSelect = "title slug excerpt featuredImage publishedAt readingTime";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findById(session.user.id)
      .populate({ path: "savedArticles", select: articleSelect, match: { status: "published" } })
      .populate({ path: "readingHistory", select: articleSelect, match: { status: "published" } })
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const mapArticle = (a: Record<string, unknown>) => ({
      _id: String(a._id),
      title: a.title as string,
      slug: a.slug as string,
      excerpt: a.excerpt as string,
      featuredImage: resolveFeaturedImage(a.featuredImage as string),
      publishedAt: a.publishedAt
        ? new Date(a.publishedAt as string).toISOString()
        : undefined,
      readingTime: a.readingTime as number,
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        isPremium: user.isPremium,
        role: user.role,
      },
      savedArticles: ((user.savedArticles as unknown as Record<string, unknown>[]) ?? [])
        .filter(Boolean)
        .map(mapArticle),
      readingHistory: ((user.readingHistory as unknown as Record<string, unknown>[]) ?? [])
        .filter(Boolean)
        .map(mapArticle),
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
