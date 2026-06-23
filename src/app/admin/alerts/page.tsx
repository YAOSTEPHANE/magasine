import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Alert } from "@/models/Alert";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { AlertsManager } from "@/components/admin/AlertsManager";
import { isAdminRole } from "@/lib/permissions";

export default async function AdminAlertsPage() {
  const session = await auth();
  if (!session?.user || !isAdminRole(session.user.role)) {
    redirect("/admin");
  }

  await connectDB();
  const docs = await Alert.find().sort({ order: 1 }).lean();
  const alerts = docs.map((a) => ({
    _id: String(a._id),
    text: a.text,
    link: a.link ?? "",
    isActive: a.isActive,
    order: a.order,
  }));

  return (
    <>
      <AdminPageTitle
        title="Breaking alerts"
        description="Manage the ticker messages shown on the public site."
      />
      <div className="admin-content">
        <AlertsManager initial={alerts} />
      </div>
    </>
  );
}
