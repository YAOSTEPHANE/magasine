import Link from "next/link";
import type { ArticleListItem } from "@/types";
import { formatArticleCardMeta } from "@/lib/format-article";

interface NewsBreakingStripProps {
  alerts: { text: string; link?: string }[];
  urgentArticles: ArticleListItem[];
}

export function NewsBreakingStrip({ alerts, urgentArticles }: NewsBreakingStripProps) {
  if (alerts.length === 0 && urgentArticles.length === 0) {
    return null;
  }

  const topStory = urgentArticles[0];

  return (
    <section className="news-breaking-strip" aria-labelledby="news-breaking-title">
      <div className="news-breaking-strip-head">
        <h2 id="news-breaking-title">
          <span className="breaking-dot" aria-hidden />
          Breaking &amp; live
        </h2>
        <Link href="/urgent" className="news-breaking-strip-all">
          Open breaking feed →
        </Link>
      </div>

      {alerts.length > 0 && (
        <div className="news-breaking-alerts" role="list" aria-label="Live alerts">
          {alerts.slice(0, 4).map((alert) =>
            alert.link ? (
              <Link key={alert.text} href={alert.link} className="news-breaking-alert" role="listitem">
                {alert.text}
              </Link>
            ) : (
              <span key={alert.text} className="news-breaking-alert" role="listitem">
                {alert.text}
              </span>
            )
          )}
        </div>
      )}

      {topStory && (
        <Link href={`/article/${topStory.slug}`} className="news-breaking-lead">
          <span className="news-breaking-lead-badge">Top alert</span>
          <span className="news-breaking-lead-title">{topStory.title}</span>
          <span className="news-breaking-lead-meta">{formatArticleCardMeta(topStory)}</span>
        </Link>
      )}
    </section>
  );
}
