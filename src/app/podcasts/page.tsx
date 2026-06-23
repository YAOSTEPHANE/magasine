import type { Metadata } from "next";
import { getArticlesByContentType } from "@/lib/data";
import { FormatPageView } from "@/components/format/FormatPageView";
import { FORMAT_PAGES } from "@/lib/formats";

export const metadata: Metadata = {
  title: "Podcasts",
  description: "Audio shows and podcasts — Global South Watch.",
};

export const revalidate = 60;

export default async function PodcastsPage() {
  const articles = await getArticlesByContentType("podcast", 36);
  return <FormatPageView config={FORMAT_PAGES.podcasts} articles={articles} />;
}
