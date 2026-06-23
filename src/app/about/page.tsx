import type { Metadata } from "next";
import { ContentPage, ContentSection, ContentCta, ContentSocialBlock } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "About",
  description: "Global South Watch — our mission, values and commitment to journalism from the Global South.",
};

export default function AProposPage() {
  return (
    <ContentPage
      eyebrow="Global South Watch"
      title="About us"
      description="Global South Watch is the leading news portal for Africa and the Global South. We cover the continent with rigor, independence and proximity."
    >
      <p>
        Founded by Noya Industries and published from Abidjan, Global South Watch covers political,
        economic, social and cultural news from Africa and the Global South. Our editorial team
        brings together journalists, correspondents and experts based across the continent and in the diaspora.
      </p>

      <ContentSection title="Our mission">
        <p>
          To inform, analyze and give voice to agents of change. We believe quality journalism,
          rooted in local realities, is essential to understanding transformations
          in the Global South and building informed public debate.
        </p>
      </ContentSection>

      <ContentSection title="Our values">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Editorial independence</strong> — no political or commercial interference in our investigations</li>
          <li><strong>Factual rigor</strong> — systematic source verification and transparency about our methods</li>
          <li><strong>Pluralism</strong> — diversity of voices, perspectives and territories covered</li>
          <li><strong>Accessibility</strong> — free content, varied formats and continuous coverage</li>
        </ul>
      </ContentSection>

      <ContentSection title="Key figures">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
          {[
            ["2M+", "Monthly readers"],
            ["145k", "Newsletter subscribers"],
            ["12+", "Editorial sections"],
            ["48h", "Continuous coverage"],
          ].map(([num, label]) => (
            <li key={label} className="p-4 bg-muted-bg border border-border rounded-sm text-center">
              <span className="block font-serif text-3xl font-bold text-charcoal">{num}</span>
              <span className="text-sm text-muted">{label}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentCta
        text="Meet the journalists who make up our editorial team."
        href="/team"
        label="Our team"
      />
      <ContentSocialBlock />
    </ContentPage>
  );
}
