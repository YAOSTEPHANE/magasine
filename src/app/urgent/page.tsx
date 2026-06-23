import type { Metadata } from "next";
import { getUrgentPageData } from "@/lib/data";
import { UrgentPageView } from "@/components/urgent/UrgentPageView";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Urgent — Live news",
  description: `The latest alerts and urgent updates from the Global South — ${SITE_NAME}.`,
};

export const revalidate = 60;

export default async function UrgentPage() {
  const { articles, alerts } = await getUrgentPageData(36);

  return <UrgentPageView articles={articles} alerts={alerts} />;
}
