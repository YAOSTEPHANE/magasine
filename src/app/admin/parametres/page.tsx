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
    { label: "Nom du site", value: "Global South Watch" },
    { label: "URL", value: process.env.NEXTAUTH_URL ?? "http://localhost:3000" },
    { label: "Email contact", value: "contact@globalsouthwatch.com" },
    { label: "Mode seed", value: "GET /api/seed?force=true" },
    { label: "Flux RSS", value: "/api/feed" },
  ];

  return (
    <div className="min-h-screen bg-muted-bg">
      <AdminPageHeader title="Paramètres" />
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
          <h2 className="font-serif text-lg font-bold text-charcoal mb-4">Actions rapides</h2>
          <div className="space-y-3">
            <Link href="/api/seed?force=true" className="block text-sm text-accent hover:underline">
              Relancer le seed des données →
            </Link>
            <Link href="/api/feed" className="block text-sm text-accent hover:underline">
              Vérifier le flux RSS →
            </Link>
            <Link href="/sitemap.xml" className="block text-sm text-accent hover:underline">
              Voir le sitemap →
            </Link>
          </div>
        </div>

        <p className="text-xs text-muted">
          Les paramètres avancés (Stripe, SendGrid, Google OAuth) se configurent via les variables
          d&apos;environnement dans <code>.env.local</code>.
        </p>
      </div>
    </div>
  );
}
