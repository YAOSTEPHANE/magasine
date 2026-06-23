import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { UsersManager } from "@/components/admin/UsersManager";
import { canManageUsers } from "@/lib/permissions";

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user || !canManageUsers(session.user.role)) {
    redirect("/admin");
  }

  return (
    <>
      <AdminPageTitle
        title="Users"
        description="Manage roles and premium access for registered accounts."
      />
      <div className="admin-content">
        <UsersManager />
      </div>
    </>
  );
}
