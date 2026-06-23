"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Crown, Bookmark, Clock, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ArticleItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  publishedAt?: string;
  readingTime: number;
}

interface ProfileData {
  user: { name: string; email: string; isPremium: boolean; role: string };
  savedArticles: ArticleItem[];
  readingHistory: ArticleItem[];
}

export default function ProfilPage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/user/profile")
        .then((r) => r.json())
        .then(setProfile)
        .catch(() => undefined);
    }
  }, [session]);

  if (status === "loading") {
    return <div className="max-w-4xl mx-auto px-6 py-16 text-center text-muted">Loading...</div>;
  }

  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <User className="w-12 h-12 text-muted mx-auto mb-4" />
        <h1 className="font-serif text-2xl font-bold text-charcoal mb-4">My reader space</h1>
        <p className="text-muted mb-6">Sign in to access your saved articles and reading history.</p>
        <Link href="/connexion" className="inline-block px-6 py-3 bg-charcoal text-white text-sm rounded-sm hover:bg-charcoal/90">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-16">
      <div className="flex items-start gap-6 mb-12 pb-8 border-b border-border">
        <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center text-2xl font-bold text-gold-dark">
          {session.user.name?.charAt(0) ?? "?"}
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">{session.user.name}</h1>
          <p className="text-muted text-sm mt-1">{session.user.email}</p>
          {session.user.isPremium ? (
            <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-gold-light text-gold-dark text-xs font-bold tracking-wider uppercase rounded-sm">
              <Crown className="w-3.5 h-3.5" /> Premium active
            </span>
          ) : (
            <Link href="/abonnement" className="inline-block mt-3 text-sm text-accent hover:underline">
              Upgrade to Premium →
            </Link>
          )}
        </div>
      </div>

      <section className="mb-12">
        <h2 className="font-serif text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-gold" />
          Saved articles
        </h2>
        {profile?.savedArticles.length ? (
          <div className="space-y-4">
            {profile.savedArticles.map((article) => (
              <ArticleRow key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted py-8 text-center bg-muted-bg rounded-sm">
            No saved articles. Click &ldquo;Save&rdquo; from an article.
          </p>
        )}
      </section>

      <section>
        <h2 className="font-serif text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gold" />
          Reading history
        </h2>
        {profile?.readingHistory.length ? (
          <div className="space-y-4">
            {profile.readingHistory.map((article) => (
              <ArticleRow key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted py-8 text-center bg-muted-bg rounded-sm">
            Your reading history will appear here as you read.
          </p>
        )}
      </section>
    </div>
  );
}

function ArticleRow({ article }: { article: ArticleItem }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="flex gap-4 p-4 bg-surface border border-border rounded-sm hover:shadow-card transition-all group"
    >
      <div className="relative w-20 h-14 shrink-0 rounded-sm overflow-hidden bg-muted-bg">
        <Image src={article.featuredImage} alt="" fill className="object-cover" sizes="80px" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-charcoal group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </p>
        <p className="text-xs text-muted mt-1">
          {article.publishedAt ? formatDate(article.publishedAt) : ""} · {article.readingTime} min
        </p>
      </div>
    </Link>
  );
}
