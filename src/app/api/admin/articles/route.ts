import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { estimateReadingTime } from "@/lib/utils";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  featuredImage: z.string().url(),
  categoryId: z.string(),
  authorId: z.string(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "review", "scheduled", "published", "archived"]),
  isFeatured: z.boolean().optional(),
  isTopStory: z.boolean().optional(),
  isUrgent: z.boolean().optional(),
  isEditorsChoice: z.boolean().optional(),
  isPremium: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !["super_admin", "admin", "editor", "author"].includes(session.user.role)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    await connectDB();
    const slug = slugify(parsed.data.title, { lower: true, strict: true });

    const existing = await Article.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: "Un article avec ce titre existe déjà" }, { status: 409 });
    }

    const article = await Article.create({
      title: parsed.data.title,
      subtitle: parsed.data.subtitle,
      slug,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      featuredImage: parsed.data.featuredImage,
      category: parsed.data.categoryId,
      authors: [parsed.data.authorId],
      tags: parsed.data.tags ?? [],
      status: parsed.data.status,
      publishedAt: parsed.data.status === "published" ? new Date() : undefined,
      readingTime: estimateReadingTime(parsed.data.content),
      isFeatured: parsed.data.isFeatured ?? false,
      isTopStory: parsed.data.isTopStory ?? false,
      isUrgent: parsed.data.isUrgent ?? false,
      isEditorsChoice: parsed.data.isEditorsChoice ?? false,
      isPremium: parsed.data.isPremium ?? false,
    });

    return NextResponse.json({ _id: String(article._id) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
