import type { Metadata } from "next";
import { getArticlesByTag } from "@/lib/data";
import { FormatPageView } from "@/components/format/FormatPageView";
import { FORMAT_PAGES } from "@/lib/formats";

export const metadata: Metadata = {
  title: "Infographics",
  description: "Charts, maps, and visual explainers — Global South Watch.",
};

export const revalidate = 60;

export default async function InfographicsPage() {
  const articles = await getArticlesByTag("infographic", 36);
  return <FormatPageView config={FORMAT_PAGES.infographics} articles={articles} />;
}
