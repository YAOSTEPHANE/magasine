import Image from "next/image";
import Link from "next/link";
import type { HomeOpinion } from "@/types/home";
import { SectionHeader } from "@/components/presse-ivoire/SectionHeader";

interface OpinionSectionHomeProps {
  data: HomeOpinion[];
  embedded?: boolean;
}

export function OpinionSectionHome({ data, embedded = false }: OpinionSectionHomeProps) {
  if (data.length === 0) return null;

  return (
    <div className={`opinion-section opinion-section-premium${embedded ? " opinion-section--embedded" : ""}`}>
      <div className={embedded ? undefined : "container"}>
        <SectionHeader
          number="04"
          eyebrow="Tribunes"
          title="Opinions & Analyses"
          linkHref="/categorie/opinion"
          linkLabel="Toutes les tribunes"
          italic
        />
        <div className="opinion-row">
          {data.map((op, i) => (
            <article
              key={op.slug ?? `opinion-${i}`}
              className={`opinion-card reveal${op.accent ? " accent" : ""}`}
              data-reveal-delay={i * 90}
            >
              <div className="opinion-card-accent" aria-hidden />
              <div className="opinion-quote">&ldquo;</div>
              <p className="opinion-text">{op.text}</p>
              <div className="opinion-author">
                <div className="opinion-avatar opinion-avatar-photo">
                  <Image
                    src={op.avatar}
                    alt={op.name}
                    width={48}
                    height={48}
                    className="opinion-avatar-img"
                  />
                </div>
                <div>
                  <div className="opinion-author-name">{op.name}</div>
                  <div className="opinion-author-role">{op.role}</div>
                </div>
              </div>
              <Link href={op.slug ?? "/categorie/opinion"} className="opinion-read-link">
                Lire la tribune →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
