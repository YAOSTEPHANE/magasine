import slugify from "slugify";

/** Normalise un libellé ou slug saisi en slug URL (a-z, 0-9, tirets). */
export function normalizeCategorySlug(value: string): string {
  return slugify(value.trim(), { lower: true, strict: true });
}

export function categorySlugFromName(name: string, explicitSlug?: string): string {
  const fromExplicit = explicitSlug?.trim() ? normalizeCategorySlug(explicitSlug) : "";
  if (fromExplicit) return fromExplicit;
  return normalizeCategorySlug(name);
}
