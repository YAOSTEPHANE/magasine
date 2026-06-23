import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { searchMockArticles } from "@/lib/mock-data";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  let items: { title: string; slug: string; excerpt: string; publishedAt?: string }[] = [];

  try {
    await connectDB();
    const articles = await Article.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .limit(30)
      .select("title slug excerpt publishedAt")
      .lean();

    items = articles.map((a) => ({
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      publishedAt: a.publishedAt?.toISOString(),
    }));
  } catch {
  }

  if (items.length === 0) {
    items = searchMockArticles("").slice(0, 20).map((a) => ({
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      publishedAt: a.publishedAt,
    }));
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Global South Watch</title>
    <link>${baseUrl}</link>
    <description>Independent journalism for Africa and the Global South</description>
    <language>en</language>
    <atom:link href="${baseUrl}/api/feed" rel="self" type="application/rss+xml"/>
    ${items
      .map(
        (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${baseUrl}/article/${item.slug}</link>
      <guid isPermaLink="true">${baseUrl}/article/${item.slug}</guid>
      <description>${escapeXml(item.excerpt)}</description>
      ${item.publishedAt ? `<pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>` : ""}
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
