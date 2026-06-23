import type { Metadata } from "next";
import { getArticlesByContentType } from "@/lib/data";
import { FormatPageView } from "@/components/format/FormatPageView";
import { FORMAT_PAGES } from "@/lib/formats";

export const metadata: Metadata = {
  title: "Videos",
  description: "Video reports, interviews and documentaries — Global South Watch.",
};

export const revalidate = 60;

export default async function VideosPage() {
  const articles = await getArticlesByContentType("video", 36);
  return <FormatPageView config={FORMAT_PAGES.videos} articles={articles} />;
}
