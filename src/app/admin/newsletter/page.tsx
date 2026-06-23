import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Newsletter } from "@/models/Newsletter";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { formatDate } from "@/lib/utils";
import { isAdminRole } from "@/lib/permissions";
import { Download } from "lucide-react";

export default async function AdminNewsletterPage() {
  const session = await auth();
  if (!session?.user || !isAdminRole(session.user.role)) {
    redirect("/admin");
  }

  await connectDB();
  const [subscribers, total] = await Promise.all([
    Newsletter.find().sort({ subscribedAt: -1 }).limit(50).lean(),
    Newsletter.countDocuments({ isActive: true }),
  ]);

  return (
    <>
      <AdminPageTitle
        title="Newsletter"
        description="Subscriber list and export for email campaigns."
        actions={
          <a href="/api/admin/newsletter/export" className="admin-btn admin-btn--secondary">
            <Download className="w-4 h-4" />
            Export CSV
          </a>
        }
      />
      <div className="admin-content">
        <div className="admin-stats-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <div className="admin-stat-card">
            <p className="admin-stat-card-value">{total}</p>
            <p className="admin-stat-card-label">Active subscribers</p>
          </div>
          <div className="admin-stat-card">
            <p className="admin-stat-card-value">{subscribers.length}</p>
            <p className="admin-stat-card-label">Recent sign-ups shown</p>
          </div>
        </div>

        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th className="hidden md:table-cell">Preferences</th>
                <th>Status</th>
                <th className="hidden lg:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.email}>
                  <td>{sub.email}</td>
                  <td className="text-muted hidden md:table-cell">
                    {(sub.preferences ?? []).join(", ") || "general"}
                  </td>
                  <td>{sub.isActive ? (
                    <span className="admin-status-pill admin-status-pill--active">Active</span>
                  ) : (
                    <span className="admin-status-pill admin-status-pill--inactive">Unsubscribed</span>
                  )}</td>
                  <td className="text-muted hidden lg:table-cell">{formatDate(sub.subscribedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {subscribers.length === 0 && (
            <p className="admin-empty">No newsletter subscribers yet.</p>
          )}
        </div>

        <p className="admin-footnote">
          Connect SendGrid or Resend via environment variables for production email delivery.
        </p>
      </div>
    </>
  );
}
