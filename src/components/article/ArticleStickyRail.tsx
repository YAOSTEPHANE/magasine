"use client";

import { ShareButtons } from "@/components/article/ShareButtons";
import { SaveArticleButton } from "@/components/article/SaveArticleButton";

interface ArticleStickyRailProps {
  url: string;
  title: string;
  articleId: string;
}

export function ArticleStickyRail({ url, title, articleId }: ArticleStickyRailProps) {
  return (
    <aside className="art-rail" aria-label="Article tools">
      <div className="art-rail-card">
        <ShareButtons url={url} title={title} variant="premium" />
        <SaveArticleButton articleId={articleId} variant="premium" />
      </div>
    </aside>
  );
}

interface ArticleMobileToolbarProps {
  url: string;
  title: string;
  articleId: string;
}

export function ArticleMobileToolbar({ url, title, articleId }: ArticleMobileToolbarProps) {
  return (
    <div className="art-mobile-toolbar">
      <ShareButtons url={url} title={title} variant="premium" layout="row" />
      <SaveArticleButton articleId={articleId} variant="premium" />
    </div>
  );
}
