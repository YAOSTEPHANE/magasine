import type { Metadata } from "next";
import Link from "next/link";
import { getUrgentArticles } from "@/lib/data";
import { ArticleCard } from "@/components/article/ArticleCard";
import { formatTimeAgo } from "@/lib/format-article";

export const metadata: Metadata = {
  title: "Urgent — Actualités en direct",
  description:
    "Les dernières alertes et informations urgentes du Sud global — Global South Watch.",
};

export const revalidate = 60;

export default async function UrgentPage() {
  const articles = await getUrgentArticles(24);
  const [featured, ...rest] = articles;

  return (
    <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-8 lg:py-12">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-red-600">
          <span className="breaking-dot" />
          En direct
        </span>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-charcoal mt-3 mb-4">
          🔥 Urgent
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          Alertes, breaking news et informations prioritaires sur l&apos;actualité du Sud global.
        </p>
        <div className="gold-line max-w-xs mx-auto mt-6" />
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-muted py-20">
          Aucune alerte urgente pour le moment.{" "}
          <Link href="/" className="text-gold underline">
            Retour à l&apos;accueil
          </Link>
        </p>
      ) : (
        <>
          {featured && (
            <div className="mb-12">
              <ArticleCard article={featured} variant="hero" priority />
              <p className="text-sm text-muted mt-3 text-center">
                Publié {formatTimeAgo(featured.publishedAt)}
              </p>
            </div>
          )}

          {rest.length > 0 && (
            <>
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-8 pb-3 border-b border-border">
                Autres alertes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            </>
          )}

          <p className="text-center mt-12">
            <Link href="/#urgent" className="text-sm font-semibold text-gold hover:underline">
              ← Retour au fil urgent sur l&apos;accueil
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
