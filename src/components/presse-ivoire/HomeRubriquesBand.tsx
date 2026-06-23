import type { HomeRubriqueBlock } from "@/types/home";
import { SectionHeader } from "@/components/presse-ivoire/SectionHeader";
import { RubriqueSectionHome } from "@/components/presse-ivoire/RubriqueSectionHome";

interface HomeRubriquesBandProps {
  rubriques: HomeRubriqueBlock[];
}

export function HomeRubriquesBand({ rubriques }: HomeRubriquesBandProps) {
  if (rubriques.length === 0) return null;

  return (
    <section className="home-band home-band--rubriques" aria-label="Editorial sections">
      <div className="container">
        <SectionHeader
          number="06"
          eyebrow="By section"
          title="All Sections"
          linkHref="/search"
          linkLabel="Explore"
        />
        <p className="home-rubriques-intro">
          Browse our editorial desks — from breaking news and finance to culture, sports, and regional bureaus across the Global South.
        </p>
        <div className="rubriques-stack">
          {rubriques.map((block, index) => (
            <RubriqueSectionHome key={block.slug} block={block} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
