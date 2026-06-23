import type { Metadata } from "next";
import { ContentPage, ContentSection, ContentCta, ContentSocialBlock } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "À propos",
  description: "Global South Watch — notre mission, nos valeurs et notre engagement pour le journalisme du Sud global.",
};

export default function AProposPage() {
  return (
    <ContentPage
      eyebrow="Global South Watch"
      title="À propos de nous"
      description="Global South Watch est le portail d'information de référence pour l'Afrique et le Sud global. Nous racontons le continent avec rigueur, indépendance et proximité."
    >
      <p>
        Fondé par Digitalpro Solutions et édité depuis Abidjan, Global South Watch couvre l&apos;actualité
        politique, économique, sociale et culturelle de l&apos;Afrique et des pays du Sud. Notre rédaction
        réunit journalistes, correspondants et experts basés sur le continent et dans la diaspora.
      </p>

      <ContentSection title="Notre mission">
        <p>
          Informer, analyser et donner la parole aux acteurs du changement. Nous croyons qu&apos;un journalisme
          de qualité, ancré dans les réalités locales, est essentiel pour comprendre les transformations
          du Sud global et construire des débats publics éclairés.
        </p>
      </ContentSection>

      <ContentSection title="Nos valeurs">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Indépendance éditoriale</strong> — aucune ingérence politique ou commerciale dans nos enquêtes</li>
          <li><strong>Rigueur factuelle</strong> — vérification systématique des sources et transparence sur nos méthodes</li>
          <li><strong>Pluralité</strong> — diversité des voix, des regards et des territoires couverts</li>
          <li><strong>Accessibilité</strong> — contenus gratuits, formats variés et couverture en continu</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chiffres clés">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
          {[
            ["2M+", "Lecteurs mensuels"],
            ["145k", "Abonnés newsletter"],
            ["12+", "Rubriques éditoriales"],
            ["48h", "Couverture continue"],
          ].map(([num, label]) => (
            <li key={label} className="p-4 bg-muted-bg border border-border rounded-sm text-center">
              <span className="block font-serif text-3xl font-bold text-charcoal">{num}</span>
              <span className="text-sm text-muted">{label}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentCta
        text="Découvrez les journalistes qui composent notre rédaction."
        href="/equipe"
        label="Notre équipe"
      />
      <ContentSocialBlock />
    </ContentPage>
  );
}
