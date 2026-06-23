import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Plus, ArrowLeft } from "lucide-react";

const statusLabels: Record<string, string> = {
  draft: "Draft",
  review: "In review",
  scheduled: "Scheduled",
  published: "Published",
  archived: "Archived",
};

export default async function AdminArticlesPage() {
  const session = await auth();
  if (!session?.user || !["super_admin", "admin", "editor"].includes(session.user.role)) {
    redirect("/connexion");
  }

  await connectDB();
  const articles = await Article.find()
    .populate("category", "name")
    .populate("authors", "name")
    .sort({ updatedAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-muted-bg">
      <div className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-serif text-xl font-bold">Article management</h1>
          </div>
          <Link
            href="/admin/articles/nouveau"
            className="flex items-center gap-2 px-4 py-2 bg-gold text-white text-sm rounded-sm hover:bg-gold-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            New article
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-surface border border-border rounded-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted-bg border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold tracking-wider uppercase text-muted">Title</th>
                <th className="text-left px-6 py-4 text-xs font-bold tracking-wider uppercase text-muted hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-4 text-xs font-bold tracking-wider uppercase text-muted hidden lg:table-cell">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold tracking-wider uppercase text-muted hidden lg:table-cell">Date</th>
                <th className="text-right px-6 py-4 text-xs font-bold tracking-wider uppercase text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((article) => (
                <tr key={String(article._id)} className="hover:bg-muted-bg/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-charcoal line-clamp-1">{article.title}</p>
                    <p className="text-xs text-muted mt-1">
                      {(article.authors as unknown as { name: string }[])?.[0]?.name}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted hidden md:table-cell">
                    {(article.category as unknown as { name: string })?.name}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <Badge variant={article.status === "published" ? "gold" : "default"}>
                      {statusLabels[article.status] ?? article.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted hidden lg:table-cell">
                    {article.publishedAt ? formatDate(article.publishedAt) : "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/articles/${article._id}`}
                      className="text-sm text-accent hover:text-accent-hover"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {articles.length === 0 && (
            <p className="p-12 text-center text-muted">No articles. Create your first article.</p>
          )}
        </div>
      </div>
    </div>
  );
}
