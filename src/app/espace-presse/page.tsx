import type { Metadata } from "next";
import { ContentPage, ContentSection, ContentCta } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Espace presse",
  description: "Communiqués, contacts presse et ressources médias — Global South Watch.",
};

export default function EspacePressePage() {
  return (
    <ContentPage
      eyebrow="Médias"
      title="Espace presse"
      description="Journalistes et médias partenaires : retrouvez nos communiqués, contacts et ressources institutionnelles."
    >
      <ContentSection title="Contact presse">
        <ul className="space-y-3 not-prose">
          <li className="p-4 bg-muted-bg border border-border rounded-sm">
            <p className="text-xs font-bold tracking-wider uppercase text-muted">Relations presse</p>
            <a href="mailto:presse@globalsouthwatch.com" className="text-charcoal font-medium hover:text-accent">
              presse@globalsouthwatch.com
            </a>
          </li>
          <li className="p-4 bg-muted-bg border border-border rounded-sm">
            <p className="text-xs font-bold tracking-wider uppercase text-muted">Téléphone</p>
            <p className="text-charcoal font-medium">+225 27 00 00 00 01</p>
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="Ressources">
        <ul className="list-disc pl-6 space-y-2">
          <li>Logo et charte graphique sur demande</li>
          <li>Interviews et prises de parole de la direction éditoriale</li>
          <li>Accès anticipé aux enquêtes majeures (sur accreditation)</li>
          <li>Flux RSS : <a href="/api/feed" className="text-accent hover:underline">/api/feed</a></li>
        </ul>
      </ContentSection>

      <ContentSection title="Derniers communiqués">
        <div className="space-y-3 not-prose text-sm">
          <p className="p-4 border-l-4 border-gold bg-muted-bg pl-5">
            <strong>Juin 2026</strong> — Global South Watch franchit le cap des 2 millions de lecteurs mensuels.
          </p>
          <p className="p-4 border-l-4 border-gold bg-muted-bg pl-5">
            <strong>Mai 2026</strong> — Lancement de la rubrique Investigations avec une cellule dédiée à Abidjan.
          </p>
        </div>
      </ContentSection>

      <ContentCta text="Une question ? Notre équipe vous répond sous 24h." href="/contact" label="Nous contacter" />
    </ContentPage>
  );
}
