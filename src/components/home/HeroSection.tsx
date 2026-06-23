import { ArticleCard } from "@/components/article/ArticleCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { ArticleListItem } from "@/types";

export function HeroSection({ articles }: { articles: ArticleListItem[] }) {
  if (!articles.length) return null;

  const [hero, ...rest] = articles;

  return (
    <section className="mb-16">
      <SectionTitle title="National News" subtitle="Front page" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ArticleCard article={hero} variant="hero" priority />
        </div>
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {rest.slice(0, 5).map((article) => (
            <ArticleCard key={article._id} article={article} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}
