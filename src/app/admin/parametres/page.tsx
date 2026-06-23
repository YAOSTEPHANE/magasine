import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { isAdminRole } from "@/lib/permissions";

export default async function AdminParametresPage() {
  const session = await auth();
  if (!session?.user || !isAdminRole(session.user.role)) {
    redirect("/connexion");
  }

  const settings = [
    { label: "Site name", value: "Global South Watch" },
    { label: "URL", value: process.env.NEXTAUTH_URL ?? "http://localhost:3000" },
    { label: "Contact email", value: "contact@globalsouthwatch.com" },
    { label: "Seed mode", value: "GET /api/seed?force=true" },
    { label: "RSS feed", value: "/api/feed" },
  ];

  return (
    <div className="min-h-screen bg-muted-bg">
      <AdminPageHeader title="Settings" />
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-surface border border-border rounded-sm divide-y divide-border">
          {settings.map((s) => (
            <div key={s.label} className="px-6 py-4 flex justify-between gap-4">
              <span className="text-sm text-muted">{s.label}</span>
              <span className="text-sm text-charcoal font-medium text-right">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-sm p-6">
          <h2 className="font-serif text-lg font-bold text-charcoal mb-4">Quick actions</h2>
          <div className="space-y-3">
            <Link href="/api/seed?force=true" className="block text-sm text-accent hover:underline">
              Re-run data seed →
            </Link>
            <Link href="/api/feed" className="block text-sm text-accent hover:underline">
              Check RSS feed →
            </Link>
            <Link href="/sitemap.xml" className="block text-sm text-accent hover:underline">
              View sitemap →
            </Link>
          </div>
        </div>

        <p className="text-xs text-muted">
          Advanced settings (Stripe, SendGrid, Google OAuth) are configured via environment
          variables in <code>.env.local</code>.
        </p>
      </div>
    </div>
  );
}
