import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { mockCategories } from "@/lib/mock-data";
import { canManageArticles } from "@/lib/permissions";

export default async function AdminCategoriesPage() {
  const session = await auth();
  if (!session?.user || !canManageArticles(session.user.role)) {
    redirect("/login");
  }

  let categories: { _id: string; name: string; slug: string; order?: number; isActive?: boolean }[] = [];

  try {
    await connectDB();
    const docs = await Category.find().sort({ order: 1 }).lean();
    categories = docs.map((c) => ({
      _id: String(c._id),
      name: c.name,
      slug: c.slug,
      order: c.order,
      isActive: c.isActive,
    }));
  } catch {
    categories = mockCategories.map((c, i) => ({
      _id: `mock-${c.slug}`,
      name: c.name,
      slug: c.slug,
      order: i + 1,
      isActive: true,
    }));
  }

  if (categories.length === 0) {
    categories = mockCategories.map((c, i) => ({
      _id: `mock-${c.slug}`,
      name: c.name,
      slug: c.slug,
      order: i + 1,
      isActive: true,
    }));
  }

  return (
    <div className="min-h-screen bg-muted-bg">
      <AdminPageHeader title="Categories" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-surface border border-border rounded-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted-bg border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-muted">Name</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-muted">Slug</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-muted">Order</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-muted">Status</th>
                <th className="text-right px-6 py-4 text-xs font-bold uppercase text-muted">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-muted-bg/50">
                  <td className="px-6 py-4 text-sm font-medium text-charcoal">{cat.name}</td>
                  <td className="px-6 py-4 text-sm text-muted">{cat.slug}</td>
                  <td className="px-6 py-4 text-sm text-muted">{cat.order ?? "—"}</td>
                  <td className="px-6 py-4 text-sm">
                    {cat.isActive !== false ? (
                      <span className="text-green-700">Active</span>
                    ) : (
                      <span className="text-muted">Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/category/${cat.slug}`} className="text-sm text-accent hover:underline">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-6">
          Categories are defined via the seed (<code>/api/seed</code>) or directly in the MongoDB database.
        </p>
      </div>
    </div>
  );
}
