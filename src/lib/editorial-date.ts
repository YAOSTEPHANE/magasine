const EDITORIAL_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/** Stable editorial date string (UTC) for SSR — avoids timezone hydration drift. */
export function getEditorialDateString(now = new Date()): string {
  const formatted = EDITORIAL_DATE_FORMAT.format(now);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function getEditorialDateParts(now = new Date()) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "UTC",
  }).format(now);
  const dayMonth = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(now);

  return {
    weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
    dayMonth,
  };
}
