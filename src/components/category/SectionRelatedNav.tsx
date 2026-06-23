import Link from "next/link";
import { getSectionLabel, REGION_SLUGS } from "@/lib/sections";

interface SectionRelatedNavProps {
  currentSlug: string;
  relatedSlugs: string[];
  showRegions?: boolean;
}

export function SectionRelatedNav({
  currentSlug,
  relatedSlugs,
  showRegions = false,
}: SectionRelatedNavProps) {
  const slugs = [
    ...relatedSlugs.filter((s) => s !== currentSlug),
    ...(showRegions ? REGION_SLUGS.filter((s) => s !== currentSlug && !relatedSlugs.includes(s)) : []),
  ].slice(0, 8);

  if (slugs.length === 0) return null;

  return (
    <section className="section-related-nav" aria-label="Related sections">
      <div className="container">
        <p className="section-related-nav-label">Explore more</p>
        <ul className="section-related-nav-list">
          {slugs.map((slug) => (
            <li key={slug}>
              <Link href={`/category/${slug}`} className="section-related-nav-chip">
                {getSectionLabel(slug)}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/urgent" className="section-related-nav-chip section-related-nav-chip--urgent">
              Urgent
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
