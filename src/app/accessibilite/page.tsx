import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Accessibilité",
  description: "Engagements et ressources d'accessibilité numérique — Global South Watch.",
};

export default function AccessibilitePage() {
  return (
    <ContentPage
      eyebrow="Inclusion"
      title="Accessibilité"
      description="Global South Watch s'engage à rendre ses contenus accessibles au plus grand nombre, conformément aux bonnes pratiques du web accessible."
    >
      <ContentSection title="Nos engagements">
        <ul className="list-disc pl-6 space-y-2">
          <li>Structure sémantique HTML pour les lecteurs d&apos;écran</li>
          <li>Textes alternatifs sur les images éditoriales</li>
          <li>Contrastes de couleurs conformes aux recommandations WCAG 2.1 niveau AA</li>
          <li>Navigation au clavier sur les pages principales</li>
          <li>Titres hiérarchisés et liens explicites</li>
        </ul>
      </ContentSection>

      <ContentSection title="Amélioration continue">
        <p>
          Nous travaillons activement à l&apos;amélioration de l&apos;accessibilité de notre site.
          Un audit complet est prévu chaque année. Vos retours nous aident à progresser.
        </p>
      </ContentSection>

      <ContentSection title="Signaler un problème">
        <p>
          Si vous rencontrez une difficulté d&apos;accès à nos contenus, écrivez-nous à{" "}
          <a href="mailto:accessibilite@globalsouthwatch.com" className="text-accent hover:underline">
            accessibilite@globalsouthwatch.com
          </a>
          {" "}en précisant la page concernée et le type de difficulté rencontrée.
        </p>
      </ContentSection>

      <p className="text-sm text-muted pt-8 border-t border-border">
        Voir aussi :{" "}
        <Link href="/mentions-legales" className="text-accent hover:underline">Mentions légales</Link>
        {" · "}
        <Link href="/confidentialite" className="text-accent hover:underline">Confidentialité</Link>
      </p>
    </ContentPage>
  );
}
