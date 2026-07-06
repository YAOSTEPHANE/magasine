/** Format a relative time label (client-only accuracy — use RelativeTime in React). */
export function formatRelativeEn(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

const SCHEDULE_OPTS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
};

/** Stable scheduled label for SSR (fixed UTC). */
export function formatScheduledLabel(iso: string): string {
  const date = new Date(iso);
  const day = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "UTC",
  });
  const time = date.toLocaleTimeString("en-US", SCHEDULE_OPTS);
  return `Scheduled — ${day} ${time}`;
}
