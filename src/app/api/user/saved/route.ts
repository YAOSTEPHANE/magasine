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
    return NextResponse.json({ error: "Connexion requise" }, { status: 401 });
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
    const index = user.savedArticles.findIndex((id) => id.equals(articleId));
    let saved: boolean;

    if (index >= 0) {
      user.savedArticles.splice(index, 1);
      saved = false;
    } else {
      user.savedArticles.unshift(articleId);
      if (user.savedArticles.length > 50) {
        user.savedArticles = user.savedArticles.slice(0, 50);
      }
      saved = true;
    }

    await user.save();
    return NextResponse.json({ saved });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
