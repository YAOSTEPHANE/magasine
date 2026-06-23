import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return format(new Date(date), "d MMMM yyyy", { locale: fr });
}

export function formatRelativeDate(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
}

export function estimateReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}…`;
}
