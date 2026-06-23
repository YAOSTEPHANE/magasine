import type { Metadata } from "next";
import { getArticlesByContentType } from "@/lib/data";
import { ArticleCard } from "@/components/article/ArticleCard";

export const metadata: Metadata = {
  title: "Podcasts",
  description: "Audio shows and podcasts — Global South Watch.",
};

export default async function PodcastsPage() {
  const articles = await getArticlesByContentType("podcast");

  return (
    <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-16">
      <div className="text-center mb-14">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold">Audio</span>
        <h1 className="font-serif text-4xl font-bold text-charcoal mt-2 mb-4">Podcasts</h1>
        <p className="text-muted max-w-2xl mx-auto">
          Analysis, debates and audio stories to understand the continent&apos;s key issues.
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 max-w-lg mx-auto">
          <p className="text-muted mb-4">Our podcasts are coming soon.</p>
          <p className="text-sm text-muted">
            In the meantime, explore our{" "}
            <a href="/videos" className="text-accent hover:underline">video reports</a>
            {" "}and opinion pieces.
          </p>
        </div>
      )}
    </div>
  );
}
