import type { Metadata } from "next";
import { AllNewsPageView } from "@/components/news/AllNewsPageView";
import { getAllNewsArticles } from "@/lib/data";
import { ALL_NEWS_SECTION } from "@/lib/sections";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `${ALL_NEWS_SECTION.title} — ${SITE_NAME}`,
  description: ALL_NEWS_SECTION.lead,
};

export const revalidate = 60;

interface AllNewsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function AllNewsPage({ searchParams }: AllNewsPageProps) {
  const { category } = await searchParams;
  const articles = await getAllNewsArticles({
    categorySlug: category,
    limit: 48,
  });

  return <AllNewsPageView articles={articles} activeCategory={category} />;
}
