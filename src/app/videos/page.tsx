import type { Metadata } from "next";
import { getArticlesByContentType } from "@/lib/data";
import { ArticleCard } from "@/components/article/ArticleCard";

export const metadata: Metadata = {
  title: "Vidéos",
  description: "Reportages vidéo, interviews et documentaires — Global South Watch.",
};

export default async function VideosPage() {
  const articles = await getArticlesByContentType("video");

  return (
    <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-16">
      <div className="text-center mb-14">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold">Multimédia</span>
        <h1 className="font-serif text-4xl font-bold text-charcoal mt-2 mb-4">Vidéos</h1>
        <p className="text-muted max-w-2xl mx-auto">
          Reportages, interviews et documentaires sur l&apos;actualité du Sud global.
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted py-16">Aucune vidéo publiée pour le moment.</p>
      )}
    </div>
  );
}
