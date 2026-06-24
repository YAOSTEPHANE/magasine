import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-api";
import { getCmsAnalyticsOverview } from "@/lib/cms-analytics";

export async function GET() {
  const guard = await requireAdminApi("editorial");
  if (guard.error) return guard.error;

  const data = await getCmsAnalyticsOverview();
  return NextResponse.json(data);
}
