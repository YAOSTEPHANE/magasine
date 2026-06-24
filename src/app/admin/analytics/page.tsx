import { getCmsAnalyticsOverview } from "@/lib/cms-analytics";
import { CmsAnalyticsView } from "@/components/admin/cms/CmsAnalyticsView";

export default async function AdminAnalyticsPage() {
  const data = await getCmsAnalyticsOverview();
  return <CmsAnalyticsView data={data} />;
}
