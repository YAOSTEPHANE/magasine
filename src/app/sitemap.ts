import { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { Category } from "@/models/Category";
import { Author } from "@/models/Author";
import { SEED_AUTHORS } from "@/lib/seed-data";
import { mockCategories } from "@/lib/mock-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${baseUrl}/abonnement`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/recherche`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/a-propos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/equipe`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/charte-editoriale`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/carrieres`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${baseUrl}/espace-presse`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/publicite`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/accessibilite`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookies`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/videos`, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/podcasts`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/profil`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/connexion`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/inscription`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/mentions-legales`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cgu`, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    await connectDB();
    const [articles, categories, authors] = await Promise.all([
      Article.find({ status: "published" }).select("slug updatedAt").lean(),
      Category.find({ isActive: true }).select("slug").lean(),
      Author.find().select("slug").lean(),
    ]);

    const articlePages = articles.map((a) => ({
      url: `${baseUrl}/article/${a.slug}`,
      lastModified: a.updatedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

    const categoryPages = (categories.length > 0 ? categories : mockCategories).map((c) => ({
      url: `${baseUrl}/categorie/${c.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    const authorSlugs = authors.length > 0 ? authors : SEED_AUTHORS;
    const authorPages = authorSlugs.map((a) => ({
      url: `${baseUrl}/auteur/${a.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticPages, ...articlePages, ...categoryPages, ...authorPages];
  } catch {
    return staticPages;
  }
}
