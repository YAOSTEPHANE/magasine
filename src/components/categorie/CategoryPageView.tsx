import Link from "next/link";
import type { ArticleListItem } from "@/types";
import { PageBackdrop } from "@/components/presse-ivoire/PageBackdrop";
import { SectionHeader } from "@/components/presse-ivoire/SectionHeader";
import { SectionImage } from "@/components/presse-ivoire/SectionImage";
import { formatRelativeDate } from "@/lib/utils";

interface CategoryPageViewProps {
  category: {
    name: string;
    slug: string;
    description?: string;
  };
  articles: ArticleListItem[];
}

function formatMeta(article: ArticleListItem) {
  const author = article.authors[0]?.name ?? "Rédaction";
  const date = article.publishedAt ? formatRelativeDate(article.publishedAt) : "";
  return `${author} · ${date} · ${article.readingTime} min`;
}

export function CategoryPageView({ category, articles }: CategoryPageViewProps) {
  const [featured, ...rest] = articles;

  return (
    <div className="category-page category-page--revolution">
      <PageBackdrop />

      <div className="container category-page-inner">
        <nav className="category-breadcrumb" aria-label="Fil d'Ariane">
          <Link href="/">Accueil</Link>
          <span aria-hidden>/</span>
          <span>{category.name}</span>
        </nav>

        <SectionHeader
          number={category.slug.slice(0, 2).toUpperCase()}
          eyebrow="Rubrique"
          title={category.name}
          linkHref="/recherche"
          linkLabel="Toutes les rubriques"
        />

        {category.description && (
          <p className="category-description">{category.description}</p>
        )}

        {articles.length === 0 ? (
          <p className="category-empty">
            Aucun article publié dans cette rubrique pour le moment.{" "}
            <Link href="/">Retour à l&apos;accueil</Link>
          </p>
        ) : (
          <>
            {featured && (
              <Link
                href={`/article/${featured.slug}`}
                className="ec-card-h ec-card-h--featured category-featured article-reveal"
              >
                <div className="ec-card-h-media">
                  <SectionImage
                    src={featured.featuredImage}
                    alt={featured.title}
                    sizes="(max-width: 768px) 100vw, 560px"
                    priority
                  />
                  {featured.isPremium && <span className="premium-badge">Premium</span>}
                  {featured.isUrgent && (
                    <span className="breaking-badge">
                      <span className="breaking-dot" />
                      Urgent
                    </span>
                  )}
                </div>
                <div className="ec-card-h-content">
                  <span className="tag">{featured.category.name}</span>
                  <h2 className="ec-card-title large">{featured.title}</h2>
                  <p className="ec-card-excerpt">{featured.excerpt}</p>
                  <p className="ec-card-meta">
                    <span>{formatMeta(featured)}</span>
                  </p>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <>
                <div className="category-section-label article-reveal article-reveal--delay-1">
                  <span>Tous les articles</span>
                  <span className="category-count">{rest.length} article{rest.length > 1 ? "s" : ""}</span>
                </div>

                <div className="category-grid">
                  {rest.map((article, index) => (
                    <Link
                      key={article._id}
                      href={`/article/${article.slug}`}
                      className={`ec-card-h ec-card-h--compact category-card article-reveal article-reveal--delay-${(index % 3) + 1}`}
                    >
                      <div className="ec-card-h-media">
                        <SectionImage
                          src={article.featuredImage}
                          alt={article.title}
                          sizes="(max-width: 768px) 100vw, 320px"
                        />
                      </div>
                      <div className="ec-card-h-content">
                        <div className="ec-card-cat">{article.category.name}</div>
                        <div className="ec-card-title ec-card-title-sm">{article.title}</div>
                        <p className="ec-card-excerpt ec-card-excerpt-sm">{article.excerpt}</p>
                        <div className="ec-card-meta">
                          <span>{formatMeta(article)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
