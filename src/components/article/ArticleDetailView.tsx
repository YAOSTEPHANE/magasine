import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import type { ArticleDetail, ArticleListItem } from "@/types";
import type { Session } from "next-auth";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import { articleBadge } from "@/lib/format-article";
import { canAccessPremium } from "@/lib/permissions";
import { ShareButtons } from "@/components/article/ShareButtons";
import { SaveArticleButton } from "@/components/article/SaveArticleButton";
import { CommentsSection } from "@/components/article/CommentsSection";
import { Paywall } from "@/components/article/Paywall";
import { ArticleBody } from "@/components/article/ArticleBody";
import { PageBackdrop } from "@/components/presse-ivoire/PageBackdrop";
import { ArticleCard } from "@/components/article/ArticleCard";

interface ArticleDetailViewProps {
  article: ArticleDetail;
  related: ArticleListItem[];
  navigation: {
    prev: { title: string; slug: string } | null;
    next: { title: string; slug: string } | null;
  };
  session: Session | null;
  siteUrl: string;
}

export function ArticleDetailView({
  article,
  related,
  navigation,
  session,
  siteUrl,
}: ArticleDetailViewProps) {
  const author = article.authors[0];
  const hasAccess = canAccessPremium(!!article.isPremium, session?.user ?? null);
  const badge = articleBadge(article);

  return (
    <article className="article-page article-page--revolution">
      <PageBackdrop />
      <div className="container article-page-inner">
        <nav className="article-breadcrumb article-reveal" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <Link href={`/categorie/${article.category.slug}`}>{article.category.name}</Link>
          <span aria-hidden>/</span>
          <span className="article-breadcrumb-current">{article.title}</span>
        </nav>

        <header className="article-header article-reveal article-reveal--delay-1">
          <div className="article-badges">
            <span className="tag">{article.category.name}</span>
            {article.isUrgent && <span className="tag article-tag-urgent">🔥 Urgent</span>}
            {article.isPremium && <span className="premium-badge">Premium</span>}
            {article.contentType === "video" && <span className="tag gold">Video</span>}
            {article.contentType === "podcast" && <span className="tag gold">Podcast</span>}
            {badge !== "News" && badge !== article.category.name && !article.isUrgent && (
              <span className="tag outline">{badge}</span>
            )}
          </div>

          <h1 className="article-title">{article.title}</h1>

          {article.subtitle && <p className="article-subtitle">{article.subtitle}</p>}

          <div className="article-meta">
            {author && (
              <Link href={`/auteur/${author.slug}`} className="article-author">
                {author.avatar && (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={40}
                    height={40}
                    className="article-author-avatar"
                  />
                )}
                <span>
                  <strong>{author.name}</strong>
                  {author.bio && <small>{author.bio.split("—")[0]?.trim()}</small>}
                </span>
              </Link>
            )}
            <div className="article-meta-stats">
              {article.publishedAt && (
                <time dateTime={article.publishedAt} title={formatDate(article.publishedAt)}>
                  {formatRelativeDate(article.publishedAt)}
                </time>
              )}
              <span className="article-meta-dot" aria-hidden>·</span>
              <span className="article-meta-reading">
                <Clock className="w-3.5 h-3.5" aria-hidden />
                {article.readingTime} min
              </span>
              {typeof article.views === "number" && article.views > 0 && (
                <>
                  <span className="article-meta-dot" aria-hidden>·</span>
                  <span className="article-meta-views">
                    <Eye className="w-3.5 h-3.5" aria-hidden />
                    {article.views.toLocaleString("en-US")} views
                  </span>
                </>
              )}
            </div>
          </div>
        </header>

        <figure className="article-hero article-reveal article-reveal--delay-2">
          <div className="article-hero-img">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt ?? article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          </div>
          {article.featuredImageCaption && (
            <figcaption className="article-hero-caption">{article.featuredImageCaption}</figcaption>
          )}
        </figure>

        <div className="article-layout article-reveal article-reveal--delay-3">
          <div className="article-main">
            <div className="article-toolbar">
              <ShareButtons url={`${siteUrl}/article/${article.slug}`} title={article.title} />
              <SaveArticleButton articleId={article._id} />
            </div>

            <p className="article-chapo">{article.excerpt}</p>

            {hasAccess ? (
              <ArticleBody article={article} />
            ) : (
              <>
                <ArticleBody article={article} truncated />
                <Paywall />
              </>
            )}

            {author?.bio && (
              <aside className="article-author-box">
                <h3>About the author</h3>
                <p>{author.bio}</p>
                <Link href={`/auteur/${author.slug}`} className="read-more">
                  View all their articles
                </Link>
              </aside>
            )}

            {article.tags && article.tags.length > 0 && (
              <div className="article-tags">
                {article.tags.map((tag) => (
                  <Link key={tag} href={`/recherche?q=${encodeURIComponent(tag)}`} className="article-tag">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            <CommentsSection articleId={article._id} />
          </div>
        </div>

        {(navigation.prev || navigation.next) && (
          <nav className="article-nav article-reveal article-reveal--delay-4" aria-label="Article navigation">
            {navigation.prev ? (
              <Link href={`/article/${navigation.prev.slug}`} className="article-nav-link article-nav-link--prev">
                <span className="article-nav-label">
                  <ChevronLeft className="w-4 h-4" aria-hidden />
                  Previous
                </span>
                <span className="article-nav-title">{navigation.prev.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {navigation.next ? (
              <Link href={`/article/${navigation.next.slug}`} className="article-nav-link article-nav-link--next">
                <span className="article-nav-label">
                  Next
                  <ChevronRight className="w-4 h-4" aria-hidden />
                </span>
                <span className="article-nav-title">{navigation.next.title}</span>
              </Link>
            ) : null}
          </nav>
        )}

        {related.length > 0 && (
          <section className="article-related article-reveal article-reveal--delay-5" aria-labelledby="related-heading">
            <h2 id="related-heading" className="article-related-title">
              Related articles
            </h2>
            <div className="article-related-grid">
              {related.map((a) => (
                <ArticleCard key={a._id} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
