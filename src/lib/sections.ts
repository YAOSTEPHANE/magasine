export type SectionKind = "region" | "topic" | "format" | "investigation";

export interface SectionMeta {
  slug: string;
  label: string;
  kind: SectionKind;
  number: string;
  eyebrow: string;
  lead: string;
  relatedSlugs: string[];
  linkHref?: string;
  linkLabel?: string;
  formatLinks?: { label: string; href: string }[];
}

export const URGENT_SECTION = {
  number: "00",
  eyebrow: "Alert feed",
  title: "Breaking — Live",
  lead: "Alerts, breaking news, and priority updates on Global South affairs — updated as stories develop.",
  relatedSlugs: ["news", "world", "investigations", "africa", "west-asia"],
} as const;

export const SECTION_META: Record<string, SectionMeta> = {
  africa: {
    slug: "africa",
    label: "Africa",
    kind: "region",
    number: "01",
    eyebrow: "Region",
    lead: "News, analysis, and investigations across the African continent — from the Sahel to the Cape.",
    relatedSlugs: ["west-asia", "world", "politics", "investigations", "local"],
    linkHref: "/rss?category=africa",
    linkLabel: "Africa RSS feed",
  },
  "latin-america": {
    slug: "latin-america",
    label: "Latin America",
    kind: "region",
    number: "02",
    eyebrow: "Region",
    lead: "Coverage from Mexico to Patagonia — politics, economy, environment, and society.",
    relatedSlugs: ["world", "politics", "news", "investigations", "multimedia"],
    linkHref: "/rss?category=latin-america",
    linkLabel: "Latin America RSS",
  },
  "south-asia": {
    slug: "south-asia",
    label: "South Asia",
    kind: "region",
    number: "03",
    eyebrow: "Region",
    lead: "India, Pakistan, Bangladesh, Sri Lanka, and the wider subcontinent — trade, tech, and public policy.",
    relatedSlugs: ["world", "technology", "politics", "health", "opinion"],
    linkHref: "/rss?category=south-asia",
    linkLabel: "South Asia RSS",
  },
  "west-asia": {
    slug: "west-asia",
    label: "West Asia",
    kind: "region",
    number: "04",
    eyebrow: "Region",
    lead: "Gulf states, Levant, Turkey, and Iran — energy, diplomacy, and regional security.",
    relatedSlugs: ["africa", "world", "politics", "investigations", "news"],
    linkHref: "/rss?category=west-asia",
    linkLabel: "West Asia RSS",
  },
  news: {
    slug: "news",
    label: "News",
    kind: "topic",
    number: "05",
    eyebrow: "News desk",
    lead: "National and local news from the Global South — institutions, society, and daily affairs.",
    relatedSlugs: ["politics", "world", "local", "opinion", "investigations"],
    linkHref: "/rss?category=news",
    linkLabel: "News RSS",
  },
  politics: {
    slug: "politics",
    label: "Politics",
    kind: "topic",
    number: "05b",
    eyebrow: "Politics",
    lead: "Elections, parliaments, parties, and governance — political news from the Global South.",
    relatedSlugs: ["news", "world", "opinion", "investigations", "africa"],
    linkHref: "/rss?category=politics",
    linkLabel: "Politics RSS",
  },
  technology: {
    slug: "technology",
    label: "Technology",
    kind: "topic",
    number: "08",
    eyebrow: "Technology",
    lead: "Innovation, digital infrastructure, AI, and startups reshaping the Global South.",
    relatedSlugs: ["politics", "news", "multimedia", "south-asia", "africa"],
    linkHref: "/rss?category=technology",
    linkLabel: "Tech RSS",
  },
  health: {
    slug: "health",
    label: "Health",
    kind: "topic",
    number: "09",
    eyebrow: "Health",
    lead: "Public health, epidemics, vaccines, and health systems from community clinics to continental policy.",
    relatedSlugs: ["news", "world", "investigations", "local", "africa"],
    linkHref: "/rss?category=health",
    linkLabel: "Health RSS",
  },
  opinion: {
    slug: "opinion",
    label: "Opinion",
    kind: "format",
    number: "11",
    eyebrow: "Opinion",
    lead: "Analysis, columns, and debate from economists, activists, and public intellectuals.",
    relatedSlugs: ["news", "politics", "world", "investigations", "special-reports"],
    linkHref: "/rss?category=opinion",
    linkLabel: "Opinion RSS",
  },
  multimedia: {
    slug: "multimedia",
    label: "Multimedia",
    kind: "format",
    number: "12",
    eyebrow: "Multimedia",
    lead: "Video reports, podcasts, and visual storytelling from our newsroom and correspondents.",
    relatedSlugs: ["investigations", "special-reports", "news", "culture"],
    linkHref: "/rss?category=multimedia",
    linkLabel: "Multimedia RSS",
    formatLinks: [
      { label: "All videos", href: "/videos" },
      { label: "Podcasts", href: "/podcasts" },
    ],
  },
  investigations: {
    slug: "investigations",
    label: "Investigations",
    kind: "investigation",
    number: "13",
    eyebrow: "Investigations",
    lead: "Long-form probes, accountability journalism, and exclusive documents from our investigations desk.",
    relatedSlugs: ["special-reports", "politics", "news", "world", "multimedia"],
    linkHref: "/rss?category=investigations",
    linkLabel: "Investigations RSS",
  },
  local: {
    slug: "local",
    label: "Local",
    kind: "topic",
    number: "14",
    eyebrow: "Local",
    lead: "City and regional stories — heritage, communities, and life beyond the capital.",
    relatedSlugs: ["news", "culture", "multimedia", "africa"],
    linkHref: "/rss?category=local",
    linkLabel: "Local RSS",
  },
  world: {
    slug: "world",
    label: "World",
    kind: "topic",
    number: "15",
    eyebrow: "World",
    lead: "International affairs, diplomacy, and global institutions seen from the Global South.",
    relatedSlugs: ["africa", "west-asia", "south-asia", "latin-america", "politics"],
    linkHref: "/rss?category=world",
    linkLabel: "World RSS",
  },
  "special-reports": {
    slug: "special-reports",
    label: "Special Reports",
    kind: "format",
    number: "16",
    eyebrow: "Special reports",
    lead: "In-depth features, cross-border series, and narrative journalism on defining issues.",
    relatedSlugs: ["investigations", "multimedia", "opinion", "world", "africa"],
    linkHref: "/rss?category=special-reports",
    linkLabel: "Special reports RSS",
  },
};

export const ALL_SECTION_SLUGS = Object.keys(SECTION_META);

export const REGION_SLUGS = ["africa", "latin-america", "south-asia", "west-asia"] as const;

export function getSectionMeta(slug: string): SectionMeta | null {
  const resolved = LEGACY_SECTION_SLUG_MAP[slug] ?? slug;
  return SECTION_META[resolved] ?? null;
}

/** @deprecated Legacy French slugs — resolved for old bookmarks and RSS links. */
const LEGACY_SECTION_SLUG_MAP: Record<string, string> = {
  actualites: "news",
  politique: "politics",
  technologie: "technology",
  sante: "health",
  monde: "world",
  "reportages-speciaux": "special-reports",
};

export function getSectionLabel(slug: string): string {
  return getSectionMeta(slug)?.label ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
