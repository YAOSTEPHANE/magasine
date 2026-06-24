import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Newsletter } from "@/models/Newsletter";
import { CmsNewsletterView } from "@/components/admin/cms/CmsNewsletterView";
import { isAdminRole } from "@/lib/permissions";

export default async function AdminNewsletterPage() {
  const session = await auth();
  if (!session?.user || !isAdminRole(session.user.role)) {
    redirect("/admin");
  }

  await connectDB();
  const totalActive = await Newsletter.countDocuments({ isActive: true });

  return <CmsNewsletterView initialTotalActive={totalActive} />;
}
