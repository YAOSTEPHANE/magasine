export interface SeoCheck {
  id: string;
  text: string;
  level: "ok" | "warn" | "error";
}

export function computeSeoScore(input: {
  title: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
  featuredImage: string;
  featuredImageAlt?: string;
}) {
  const checks: SeoCheck[] = [];
  let score = 0;

  const seoTitle = input.seoTitle.trim() || input.title.trim();
  const hasH2 = /<h2[\s>]/i.test(input.content);

  if (input.title.trim().length >= 12) {
    score += 18;
    checks.push({ id: "keyword", text: "Mot-clé dans le titre", level: "ok" });
  } else {
    checks.push({ id: "keyword", text: "Titre trop court", level: "warn" });
  }

  if (input.featuredImage.trim()) {
    score += 15;
    checks.push({
      id: "image",
      text: input.featuredImageAlt?.trim() ? "Images avec alt" : "Image de couverture",
      level: input.featuredImageAlt?.trim() ? "ok" : "warn",
    });
  } else {
    checks.push({ id: "image", text: "Image de couverture manquante", level: "error" });
  }

  const internalLinks = (input.content.match(/href="\/article\//g) ?? []).length;
  if (internalLinks >= 1) {
    score += 12;
    checks.push({ id: "links", text: `Liens internes (${internalLinks})`, level: "ok" });
  } else {
    checks.push({ id: "links", text: "Aucun lien interne", level: "warn" });
  }

  if (seoTitle.length >= 50 && seoTitle.length <= 60) {
    score += 20;
    checks.push({ id: "seo-title", text: "Titre SEO optimal", level: "ok" });
  } else if (seoTitle.length > 60) {
    score += 8;
    checks.push({ id: "seo-title", text: "Titre SEO trop long", level: "warn" });
  } else {
    score += 10;
    checks.push({ id: "seo-title", text: "Titre SEO court", level: "warn" });
  }

  const descLen = input.seoDescription.trim().length;
  if (descLen >= 120 && descLen <= 155) {
    score += 20;
    checks.push({ id: "meta", text: "Méta-description OK", level: "ok" });
  } else if (descLen > 0) {
    score += 10;
    checks.push({ id: "meta", text: "Méta-description à ajuster", level: "warn" });
  } else {
    checks.push({ id: "meta", text: "Méta-description manquante", level: "error" });
  }

  if (hasH2) {
    score += 15;
    checks.push({ id: "h2", text: "Sous-titres H2 présents", level: "ok" });
  } else {
    checks.push({ id: "h2", text: "Aucun sous-titre H2", level: "error" });
  }

  return { score: Math.min(100, score), checks };
}
