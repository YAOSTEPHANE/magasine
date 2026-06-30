import { IMG, resolveFeaturedImage } from "@/lib/images";

const CATEGORY_HERO_FALLBACKS: Record<string, string> = {
  news: IMG.politics,
  politics: IMG.politics,
  culture: IMG.heritage,
  commentary: IMG.portrait1,
  explainer: IMG.un,
  health: IMG.health,
  feature: IMG.un,
  investigations: IMG.investigation,
  "special-reports": IMG.cacao,
  multimedia: IMG.port,
  local: IMG.africa,
  africa: IMG.africa,
  "latin-america": IMG.latinAmerica,
  "south-asia": IMG.southAsia,
  "west-asia": IMG.westAsia,
  opinion: IMG.portrait2,
};

export function resolveCategoryHeroImage(
  slug: string,
  featuredArticleImage?: string | null
): string {
  if (featuredArticleImage?.trim()) {
    return resolveFeaturedImage(featuredArticleImage);
  }
  return CATEGORY_HERO_FALLBACKS[slug] ?? IMG.africa;
}
