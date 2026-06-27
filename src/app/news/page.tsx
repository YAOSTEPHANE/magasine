import type { Metadata } from "next";
import { AllNewsPageView } from "@/components/news/AllNewsPageView";
import { getNewsHubPageData } from "@/lib/data";
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
  const hub = await getNewsHubPageData({ categorySlug: category, limit: 48 });

  return (
    <AllNewsPageView
      articles={hub.articles}
      activeCategory={category}
      sectionCounts={hub.sectionCounts}
      urgentArticles={hub.urgentArticles}
      alerts={hub.alerts}
    />
  );
}
