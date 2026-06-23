import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Author } from "@/models/Author";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SEED_AUTHORS } from "@/lib/seed-data";
import { canManageArticles } from "@/lib/permissions";

export default async function AdminAuteursPage() {
  const session = await auth();
  if (!session?.user || !canManageArticles(session.user.role)) {
    redirect("/login");
  }

  let authors: { _id: string; name: string; slug: string; bio?: string }[] = [];

  try {
    await connectDB();
    const docs = await Author.find().sort({ name: 1 }).lean();
    authors = docs.map((a) => ({
      _id: String(a._id),
      name: a.name,
      slug: a.slug,
      bio: a.bio,
    }));
  } catch {
    authors = [];
  }

  if (authors.length === 0) {
    authors = SEED_AUTHORS.map((a) => ({
      _id: `mock-${a.slug}`,
      name: a.name,
      slug: a.slug,
      bio: a.bio,
    }));
  }

  return (
    <div className="min-h-screen bg-muted-bg">
      <AdminPageHeader title="Authors" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div key={author._id} className="bg-surface border border-border rounded-sm p-6">
              <h3 className="font-serif text-lg font-bold text-charcoal">{author.name}</h3>
              <p className="text-xs text-muted mt-1">{author.slug}</p>
              {author.bio && (
                <p className="text-sm text-muted mt-3 line-clamp-3">{author.bio}</p>
              )}
              <Link
                href={`/author/${author.slug}`}
                className="inline-block mt-4 text-sm text-accent hover:underline"
              >
                View author page →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
