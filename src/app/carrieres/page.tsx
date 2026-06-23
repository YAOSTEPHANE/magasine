import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection, ContentCta } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Carrières",
  description: "Rejoignez Global South Watch — offres d'emploi et stages en journalisme.",
};

const OFFERS = [
  {
    title: "Journaliste reporter d'actualités",
    location: "Abidjan, Côte d'Ivoire",
    type: "CDI",
    description: "Couverture de l'actualité politique et institutionnelle en Afrique de l'Ouest.",
  },
  {
    title: "Rédacteur web / SEO",
    location: "Télétravail — fuseau GMT",
    type: "CDD 12 mois",
    description: "Optimisation éditoriale, titraille et animation des réseaux sociaux.",
  },
  {
    title: "Stagiaire enquête & investigation",
    location: "Abidjan",
    type: "Stage 6 mois",
    description: "Appui aux grands reportages et enquêtes de la cellule investigation.",
  },
];

export default function CarrieresPage() {
  return (
    <ContentPage
      eyebrow="Recrutement"
      title="Carrières"
      description="Global South Watch recrute des talents passionnés par le journalisme d'impact. Rejoignez une rédaction en pleine croissance."
    >
      <ContentSection title="Pourquoi nous rejoindre ?">
        <ul className="list-disc pl-6 space-y-2">
          <li>Environnement éditorial exigeant et bienveillant</li>
          <li>Liberté créative sur les sujets du Sud global</li>
          <li>Formation continue et mentorat senior</li>
          <li>Couverture mutuelle et télétravail partiel possible</li>
        </ul>
      </ContentSection>

      <ContentSection title="Offres ouvertes">
        <div className="space-y-4 not-prose">
          {OFFERS.map((offer) => (
            <article
              key={offer.title}
              className="p-6 bg-surface border border-border rounded-sm hover:border-gold/40 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <h3 className="font-serif text-lg font-bold text-charcoal">{offer.title}</h3>
                <span className="text-xs font-bold tracking-wider uppercase text-gold px-2 py-1 bg-gold-light rounded-sm">
                  {offer.type}
                </span>
              </div>
              <p className="text-xs text-muted mb-3">{offer.location}</p>
              <p className="text-sm text-charcoal/80">{offer.description}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Candidature spontanée">
        <p>
          Aucune offre ne correspond à votre profil ? Envoyez votre CV et quelques lignes sur vos
          motivations à{" "}
          <a href="mailto:carrieres@globalsouthwatch.com" className="text-accent hover:underline">
            carrieres@globalsouthwatch.com
          </a>
          .
        </p>
      </ContentSection>

      <ContentCta text="Découvrez qui compose notre rédaction." href="/equipe" label="Notre équipe" />
    </ContentPage>
  );
}
