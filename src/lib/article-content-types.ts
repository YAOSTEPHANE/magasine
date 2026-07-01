export const ARTICLE_CONTENT_TYPES = [
  { id: "article", label: "Article" },
  { id: "video", label: "Video" },
  { id: "podcast", label: "Podcast" },
  { id: "gallery", label: "Photo gallery" },
] as const;

export type ArticleContentType = (typeof ARTICLE_CONTENT_TYPES)[number]["id"];

export function isArticleContentType(value: string): value is ArticleContentType {
  return ARTICLE_CONTENT_TYPES.some((item) => item.id === value);
}

export function isValidVideoSourceUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  return trimmed.startsWith("/") || /^https?:\/\//i.test(trimmed);
}
