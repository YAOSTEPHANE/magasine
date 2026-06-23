import type { Metadata } from "next";
import { getArticlesByContentType } from "@/lib/data";
import { FormatPageView } from "@/components/format/FormatPageView";
import { FORMAT_PAGES } from "@/lib/formats";

export const metadata: Metadata = {
  title: "Photo galleries",
  description: "Photo essays and visual reports from across the Global South — Global South Watch.",
};

export const revalidate = 60;

export default async function PhotoGalleriesPage() {
  const articles = await getArticlesByContentType("gallery", 36);
  return <FormatPageView config={FORMAT_PAGES["photo-galleries"]} articles={articles} />;
}
