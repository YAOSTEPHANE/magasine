import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { estimateReadingTime } from "@/lib/utils";
import { canManageArticles } from "@/lib/permissions";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().optional(),
  excerpt: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  featuredImage: z.string().url().optional(),
  categoryId: z.string().optional(),
  authorId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "review", "scheduled", "published", "archived"]).optional(),
  isFeatured: z.boolean().optional(),
  isTopStory: z.boolean().optional(),
  isUrgent: z.boolean().optional(),
  isEditorsChoice: z.boolean().optional(),
  isPremium: z.boolean().optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const session = await auth();
  if (!session?.user || !canManageArticles(session.user.role)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const { id } = await context.params;
  await connectDB();
  const article = await Article.findById(id).lean();
  if (!article) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
  }

  return NextResponse.json({
    _id: String(article._id),
    title: article.title,
    subtitle: article.subtitle ?? "",
    excerpt: article.excerpt,
    content: article.content,
    featuredImage: article.featuredImage,
    categoryId: String(article.category),
    authorId: String(article.authors[0]),
    tags: article.tags,
    status: article.status,
    isFeatured: article.isFeatured,
    isTopStory: article.isTopStory,
    isUrgent: article.isUrgent,
    isEditorsChoice: article.isEditorsChoice,
    isPremium: article.isPremium,
    slug: article.slug,
  });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const session = await auth();
  if (!session?.user || !canManageArticles(session.user.role)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  await connectDB();
  const article = await Article.findById(id);
  if (!article) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
  }

  const data = parsed.data;
  if (data.title) {
    article.title = data.title;
    article.slug = slugify(data.title, { lower: true, strict: true });
  }
  if (data.subtitle !== undefined) article.subtitle = data.subtitle;
  if (data.excerpt) article.excerpt = data.excerpt;
  if (data.content) {
    article.content = data.content;
    article.readingTime = estimateReadingTime(data.content);
  }
  if (data.featuredImage) article.featuredImage = data.featuredImage;
  if (data.categoryId) article.category = data.categoryId as never;
  if (data.authorId) article.authors = [data.authorId as never];
  if (data.tags) article.tags = data.tags;
  if (data.status) {
    article.status = data.status;
    if (data.status === "published" && !article.publishedAt) {
      article.publishedAt = new Date();
    }
  }
  if (data.isFeatured !== undefined) article.isFeatured = data.isFeatured;
  if (data.isTopStory !== undefined) article.isTopStory = data.isTopStory;
  if (data.isUrgent !== undefined) article.isUrgent = data.isUrgent;
  if (data.isEditorsChoice !== undefined) article.isEditorsChoice = data.isEditorsChoice;
  if (data.isPremium !== undefined) article.isPremium = data.isPremium;

  await article.save();
  return NextResponse.json({ _id: String(article._id), slug: article.slug });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const session = await auth();
  if (!session?.user || !canManageArticles(session.user.role)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const { id } = await context.params;
  await connectDB();
  const result = await Article.findByIdAndDelete(id);
  if (!result) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
