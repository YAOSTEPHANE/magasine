import type { Metadata } from "next";
import { ContentPage, ContentSection, ContentCta } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Publicité",
  description: "Solutions publicitaires et partenariats médias — Global South Watch.",
};

const FORMATS = [
  { name: "Bannière Mega", desc: "Emplacement premium en tête d'accueil — forte visibilité" },
  { name: "Article sponsorisé", desc: "Contenu éditorialisé, clairement identifié comme partenaire" },
  { name: "Newsletter dédiée", desc: "Message ciblé auprès de nos 145 000 abonnés" },
  { name: "Partenariat rubrique", desc: "Visibilité sur une thématique (finance, tech, sport…)" },
];

export default function PublicitePage() {
  return (
    <ContentPage
      eyebrow="Annonceurs"
      title="Publicité & partenariats"
      description="Touchez une audience qualifiée, engagée et en pleine croissance sur l'actualité africaine et du Sud global."
    >
      <ContentSection title="Notre audience">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
          {[
            ["2M+", "Lecteurs mensuels"],
            ["65%", "Lecteurs 25-45 ans"],
            ["78%", "Lecture mobile"],
            ["12", "Pays couverts"],
          ].map(([v, l]) => (
            <li key={l} className="p-4 bg-muted-bg rounded-sm text-center border border-border">
              <span className="block font-serif text-2xl font-bold text-charcoal">{v}</span>
              <span className="text-xs text-muted">{l}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="Formats disponibles">
        <div className="space-y-3 not-prose">
          {FORMATS.map((f) => (
            <div key={f.name} className="p-4 border border-border rounded-sm">
              <h3 className="font-medium text-charcoal">{f.name}</h3>
              <p className="text-sm text-muted mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Charte publicitaire">
        <p>
          Tous les contenus sponsorisés sont clairement identifiés. Global South Watch se réserve le droit
          de refuser toute campagne incompatible avec ses valeurs éditoriales. Consultez notre{" "}
          <a href="/charte-editoriale" className="text-accent hover:underline">charte éditoriale</a>.
        </p>
      </ContentSection>

      <ContentCta
        text="Demandez notre media kit et un devis personnalisé."
        href="/contact"
        label="Contacter la régie"
      />
    </ContentPage>
  );
}
