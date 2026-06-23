import { auth } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/admin-dashboard";
import { getHomepageAdminOverview } from "@/lib/homepage-admin";
import { isAdminRole } from "@/lib/permissions";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { AdminDashboardView } from "@/components/admin/dashboard/AdminDashboardView";
import type { AdminDashboardData } from "@/lib/admin-dashboard";
import type { HomepageSectionStatus } from "@/lib/homepage-admin";

const EMPTY_DASHBOARD: AdminDashboardData = {
  kpis: [],
  timeline: [],
  categories: [],
  pipeline: [],
  topArticles: [],
  recentArticles: [],
  totalViews: 0,
  pendingReview: 0,
  pendingComments: 0,
  avgReadingTime: 0,
};

function toDashboardHomepageSections(
  sections: HomepageSectionStatus[]
): Pick<HomepageSectionStatus, "id" | "label" | "enabled" | "count">[] {
  return sections.map(({ id, label, enabled, count }) => ({
    id,
    label,
    enabled,
    count,
  }));
}

export default async function AdminDashboard() {
  const session = await auth();
  const canEditHome = session?.user && isAdminRole(session.user.role);
  const userName = session?.user?.name ?? "Editor";

  let data = EMPTY_DASHBOARD;
  let homepageSections: Pick<HomepageSectionStatus, "id" | "label" | "enabled" | "count">[] | undefined;

  try {
    data = await getAdminDashboardData();
  } catch (error) {
    console.error("[admin/dashboard] Failed to load metrics:", error);
    data = EMPTY_DASHBOARD;
  }

  if (canEditHome) {
    try {
      const homepage = await getHomepageAdminOverview();
      homepageSections = toDashboardHomepageSections(homepage.sections);
    } catch (error) {
      console.error("[admin/dashboard] Failed to load homepage overview:", error);
    }
  }

  return (
    <>
      <AdminPageTitle
        title="Dashboard"
        description="Real-time editorial intelligence — publishing, audience, and newsroom performance."
      />
      <div className="admin-content admin-content--dashboard">
        <AdminDashboardView
          data={data}
          userName={userName}
          homepageSections={homepageSections}
          canEditHome={!!canEditHome}
        />
      </div>
    </>
  );
}
