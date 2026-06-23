import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { User } from "@/models/User";
import { Comment } from "@/models/Comment";
import { Newsletter } from "@/models/Newsletter";
import { FileText, Users, MessageSquare, Mail, Plus, Settings } from "lucide-react";
import { SITE_LOGO } from "@/lib/images";

async function getAdminStats() {
  await connectDB();
  const [articles, users, comments, subscribers, pendingReview] = await Promise.all([
    Article.countDocuments({ status: "published" }),
    User.countDocuments(),
    Comment.countDocuments(),
    Newsletter.countDocuments({ isActive: true }),
    Article.countDocuments({ status: "review" }),
  ]);

  const recentArticles = await Article.find()
    .populate("category", "name")
    .sort({ updatedAt: -1 })
    .limit(5)
    .lean();

  return { articles, users, comments, subscribers, pendingReview, recentArticles };
}

export default async function AdminDashboard() {
  const session = await auth();
  const allowedRoles = ["super_admin", "admin", "editor"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    redirect("/connexion");
  }

  let stats;
  try {
    stats = await getAdminStats();
  } catch {
    stats = { articles: 0, users: 0, comments: 0, subscribers: 0, pendingReview: 0, recentArticles: [] };
  }

  const cards = [
    { label: "Published articles", value: stats.articles, icon: FileText, color: "text-accent" },
    { label: "Users", value: stats.users, icon: Users, color: "text-gold" },
    { label: "Comments", value: stats.comments, icon: MessageSquare, color: "text-charcoal" },
    { label: "Newsletter subscribers", value: stats.subscribers, icon: Mail, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-muted-bg">
      <div className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={SITE_LOGO}
                alt="Global South Watch"
                width={160}
                height={38}
                style={{ height: 38, width: "auto" }}
              />
              <span className="text-sm font-semibold tracking-widest uppercase text-white/70">
                Admin
              </span>
            </Link>
            <p className="text-white/50 text-sm mt-2">Editorial dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/articles/nouveau"
              className="flex items-center gap-2 px-4 py-2 bg-gold text-white text-sm rounded-sm hover:bg-gold-dark transition-colors"
            >
              <Plus className="w-4 h-4" />
              New article
            </Link>
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
              View site →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-surface border border-border rounded-sm p-6 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-3xl font-bold text-charcoal">{value}</span>
              </div>
              <p className="text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>

        {stats.pendingReview > 0 && (
          <div className="bg-gold-light border border-gold/30 rounded-sm p-4 mb-8 flex items-center justify-between">
            <p className="text-sm text-gold-dark">
              <strong>{stats.pendingReview}</strong> article(s) awaiting review
            </p>
            <Link href="/admin/articles?status=review" className="text-sm text-accent font-medium">
              View →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-surface border border-border rounded-sm">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-charcoal">Recent activity</h2>
              <Link href="/admin/articles" className="text-sm text-accent">All articles</Link>
            </div>
            <div className="divide-y divide-border">
              {stats.recentArticles.map((article) => (
                <div key={String(article._id)} className="p-4 flex items-center justify-between hover:bg-muted-bg transition-colors">
                  <div>
                    <p className="text-sm font-medium text-charcoal">{article.title}</p>
                    <p className="text-xs text-muted mt-1">
                      {(article.category as { name?: string })?.name} — {article.status}
                    </p>
                  </div>
                  <Link
                    href={`/admin/articles/${article._id}`}
                    className="text-xs text-accent hover:text-accent-hover"
                  >
                    Edit
                  </Link>
                </div>
              ))}
              {stats.recentArticles.length === 0 && (
                <p className="p-8 text-center text-muted text-sm">No articles yet.</p>
              )}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-sm p-6">
            <h2 className="font-serif text-lg font-bold text-charcoal mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Management
            </h2>
            <nav className="space-y-2">
              {[
                { label: "Articles", href: "/admin/articles" },
                { label: "Categories", href: "/admin/categories" },
                { label: "Authors", href: "/admin/auteurs" },
                { label: "Newsletter", href: "/admin/newsletter" },
                { label: "Comments", href: "/admin/commentaires" },
                { label: "Settings", href: "/admin/parametres" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-sm text-charcoal hover:bg-muted-bg rounded-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
