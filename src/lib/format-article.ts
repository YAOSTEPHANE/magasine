import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import type { ArticleListItem } from "@/types";

export function authorInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

export function formatTimeAgo(iso?: string): string {
  if (!iso) return "Recently";
  return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: enUS });
}

export function formatPublishedDate(iso?: string): string {
  if (!iso) return "";
  return format(new Date(iso), "MMMM d, yyyy, h:mm a", { locale: enUS });
}

export function formatViews(views?: number): string {
  if (!views) return "New";
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k views`;
  return `${views} views`;
}

export function splitHeroTitle(title: string, subtitle?: string): { main: string; em: string } {
  if (subtitle?.trim()) {
    return { main: title, em: subtitle };
  }
  const idx = title.indexOf(":");
  if (idx > 0 && idx < title.length - 2) {
    return {
      main: title.slice(0, idx + 1),
      em: title.slice(idx + 1).trim(),
    };
  }
  return { main: title, em: "" };
}

export function articleBadge(article: ArticleListItem): string {
  if (article.isUrgent) return "🔥 Breaking";
  if (article.contentType === "video") return "Video Report";
  if (article.isPremium) return "Exclusive Investigation";
  if (article.isEditorsChoice) return "Editor's Pick";
  if (article.isTopStory) return "Top Story";
  return "News";
}

export function toVideoEmbedUrl(url: string): string | null {
  if (!url) return null;
  if (url.includes("/embed/")) return url;
  const ytWatch = url.match(/[?&]v=([^&]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}?autoplay=0&rel=0`;
  const ytShort = url.match(/youtu\.be\/([^?]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}?autoplay=0&rel=0`;
  if (url.endsWith(".mp4") || url.endsWith(".webm")) return url;
  return url;
}

export function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}
