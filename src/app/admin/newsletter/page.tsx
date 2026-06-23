import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Newsletter } from "@/models/Newsletter";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { canManageArticles } from "@/lib/permissions";
import { formatDate } from "@/lib/utils";

export default async function AdminNewsletterPage() {
  const session = await auth();
  if (!session?.user || !canManageArticles(session.user.role)) {
    redirect("/login");
  }

  let subscribers: { email: string; preferences: string[]; isActive: boolean; subscribedAt: Date }[] = [];
  let total = 0;

  try {
    await connectDB();
    const [docs, count] = await Promise.all([
      Newsletter.find().sort({ subscribedAt: -1 }).limit(50).lean(),
      Newsletter.countDocuments({ isActive: true }),
    ]);
    subscribers = docs;
    total = count;
  } catch {
    subscribers = [];
  }

  return (
    <div className="min-h-screen bg-muted-bg">
      <AdminPageHeader title="Newsletter" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface border border-border rounded-sm p-6">
            <p className="text-3xl font-bold text-charcoal">{total}</p>
            <p className="text-sm text-muted mt-1">Active subscribers</p>
          </div>
          <div className="bg-surface border border-border rounded-sm p-6">
            <p className="text-3xl font-bold text-charcoal">{subscribers.length}</p>
            <p className="text-sm text-muted mt-1">Recent sign-ups</p>
          </div>
          <div className="bg-surface border border-border rounded-sm p-6">
            <p className="text-sm text-muted">Email delivery</p>
            <p className="text-sm text-charcoal mt-2">Connect SendGrid or Resend in production.</p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted-bg border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-muted">Email</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-muted hidden md:table-cell">Preferences</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-muted">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-muted hidden lg:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((sub) => (
                <tr key={sub.email}>
                  <td className="px-6 py-4 text-sm text-charcoal">{sub.email}</td>
                  <td className="px-6 py-4 text-sm text-muted hidden md:table-cell">
                    {(sub.preferences ?? []).join(", ") || "general"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {sub.isActive ? (
                      <span className="text-green-700">Active</span>
                    ) : (
                      <span className="text-muted">Unsubscribed</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted hidden lg:table-cell">
                    {formatDate(sub.subscribedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {subscribers.length === 0 && (
            <p className="p-12 text-center text-muted text-sm">No newsletter subscribers yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
