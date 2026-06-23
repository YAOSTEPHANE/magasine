import type { Metadata } from "next";
import { ContentPage, ContentSection, ContentCta } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Charte éditoriale",
  description: "Les principes éditoriaux et déontologiques de Global South Watch.",
};

export default function CharteEditorialePage() {
  return (
    <ContentPage
      eyebrow="Éthique"
      title="Charte éditoriale"
      description="Global South Watch s'engage à respecter les plus hauts standards déontologiques du journalisme. Cette charte guide chaque publication de notre rédaction."
    >
      <ContentSection title="Indépendance">
        <p>
          Nos contenus sont produits en toute indépendance. Les annonceurs, partenaires institutionnels
          et actionnaires n&apos;interviennent jamais dans le choix des sujets, l&apos;angle éditorial
          ou la ligne d&apos;un article.
        </p>
      </ContentSection>

      <ContentSection title="Exactitude et vérification">
        <p>
          Chaque information publiée fait l&apos;objet d&apos;une vérification rigoureuse. Les sources
          sont croisées, les données chiffrées contrôlées. En cas d&apos;erreur avérée, une correction
          visible est publiée dans les meilleurs délais.
        </p>
      </ContentSection>

      <ContentSection title="Pluralité et équité">
        <p>
          Nous donnons la parole à toutes les parties prenantes d&apos;un sujet et veillons à représenter
          la diversité des opinions légitimes. Nos enquêtes respectent le droit de réponse et la présomption
          d&apos;innocence.
        </p>
      </ContentSection>

      <ContentSection title="Protection des sources">
        <p>
          La confidentialité des sources est un principe intangible. Nous ne divulguons jamais l&apos;identité
          d&apos;une source protégée sans son accord explicite.
        </p>
      </ContentSection>

      <ContentSection title="Signalement">
        <p>
          Pour signaler une erreur, un contenu inapproprié ou une violation de cette charte, contactez
          notre déontologue à{" "}
          <a href="mailto:deontologie@globalsouthwatch.com" className="text-accent hover:underline">
            deontologie@globalsouthwatch.com
          </a>
          .
        </p>
      </ContentSection>

      <ContentCta
        text="Vous souhaitez rejoindre notre rédaction ?"
        href="/carrieres"
        label="Voir les offres"
      />
    </ContentPage>
  );
}
