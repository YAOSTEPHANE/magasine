/** Canonical English category URL slugs. */
export const CATEGORY_SLUG = {
  news: "news",
  politics: "politics",
  culture: "culture",
  commentary: "commentary",
  explainer: "explainer",
  health: "health",
  world: "world",
  investigations: "investigations",
  opinion: "commentary",
  multimedia: "multimedia",
  local: "local",
  specialReports: "special-reports",
  africa: "africa",
  latinAmerica: "latin-america",
  southAsia: "south-asia",
  westAsia: "west-asia",
} as const;

/** Legacy French slugs → English (for redirects and DB migration). */
export const LEGACY_CATEGORY_SLUG_MAP: Record<string, string> = {
  actualites: CATEGORY_SLUG.news,
  politique: CATEGORY_SLUG.politics,
  technologie: CATEGORY_SLUG.news,
  technology: CATEGORY_SLUG.news,
  sante: CATEGORY_SLUG.health,
  monde: CATEGORY_SLUG.world,
  "reportages-speciaux": CATEGORY_SLUG.specialReports,
  opinion: CATEGORY_SLUG.commentary,
};

export function resolveCategorySlug(slug: string): string {
  return LEGACY_CATEGORY_SLUG_MAP[slug] ?? slug;
}
