import type { HomeRubriqueBlock } from "@/types/home";
import { SectionHeader } from "@/components/presse-ivoire/SectionHeader";
import { RubriqueSectionHome } from "@/components/presse-ivoire/RubriqueSectionHome";

interface HomeRubriquesBandProps {
  rubriques: HomeRubriqueBlock[];
}

export function HomeRubriquesBand({ rubriques }: HomeRubriquesBandProps) {
  if (rubriques.length === 0) return null;

  return (
    <section className="home-band home-band--rubriques" aria-label="Rubriques éditoriales">
      <div className="container">
        <SectionHeader
          number="06"
          eyebrow="Par rubrique"
          title="Toutes les Rubriques"
          linkHref="/recherche"
          linkLabel="Explorer"
        />
        <div className="rubriques-stack">
          {rubriques.map((block, index) => (
            <RubriqueSectionHome key={block.slug} block={block} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
