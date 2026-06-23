import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Article } from "@/models/Article";
import { z } from "zod";

const schema = z.object({
  articleId: z.string(),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    await connectDB();
    const article = await Article.findById(parsed.data.articleId);
    if (!article) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const articleId = article._id;
    user.readingHistory = user.readingHistory.filter((id) => !id.equals(articleId));
    user.readingHistory.unshift(articleId);
    if (user.readingHistory.length > 30) {
      user.readingHistory = user.readingHistory.slice(0, 30);
    }

    await user.save();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
