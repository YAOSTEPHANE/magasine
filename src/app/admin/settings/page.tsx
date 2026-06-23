import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { canManageUsers } from "@/lib/permissions";
import { getFeedUrl, getSiteUrl } from "@/lib/site";

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session?.user || !canManageUsers(session.user.role)) {
    redirect("/admin");
  }

  return (
    <>
      <AdminPageTitle
        title="Settings"
        description="Site configuration, feature flags, and operational shortcuts."
      />
      <div className="admin-content space-y-8">
        <SettingsForm />

        <div className="admin-card admin-card-padded max-w-2xl">
          <h2 className="font-serif text-lg font-bold text-charcoal mb-4">Environment</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Public URL</dt>
              <dd className="font-medium">{getSiteUrl()}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">RSS feed</dt>
              <dd>
                <Link href={getFeedUrl()} className="text-accent hover:underline">
                  {getFeedUrl()}
                </Link>
              </dd>
            </div>
          </dl>
          <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
            <Link href="/admin/homepage" className="block text-accent hover:underline">
              Homepage editor →
            </Link>
            <Link href="/feed.xml" className="block text-accent hover:underline">
              Check RSS feed →
            </Link>
            <Link href="/sitemap.xml" className="block text-accent hover:underline">
              XML sitemap →
            </Link>
            {session.user.role === "super_admin" && (
              <Link href="/api/seed?force=true" className="block text-accent hover:underline">
                Re-run data seed (super admin) →
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
