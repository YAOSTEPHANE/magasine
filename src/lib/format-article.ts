import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
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
  return `${minutes} min de lecture`;
}

export function formatTimeAgo(iso?: string): string {
  if (!iso) return "Récemment";
  return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: fr });
}

export function formatPublishedDate(iso?: string): string {
  if (!iso) return "";
  const d = format(new Date(iso), "d MMMM yyyy, HH'h'mm", { locale: fr });
  return d.charAt(0).toUpperCase() + d.slice(1);
}

export function formatViews(views?: number): string {
  if (!views) return "Nouveau";
  if (views >= 1000) return `${(views / 1000).toFixed(1).replace(".", ",")}k vues`;
  return `${views} vues`;
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
  if (article.isUrgent) return "🔥 Urgent";
  if (article.contentType === "video") return "Reportage Vidéo";
  if (article.isPremium) return "Enquête Exclusive";
  if (article.isEditorsChoice) return "Choix Rédaction";
  if (article.isTopStory) return "À la Une";
  return "Actualité";
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
