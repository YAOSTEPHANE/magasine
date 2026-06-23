import type { Metadata } from "next";
import { ContentPage, ContentSection, ContentCta } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Advertising",
  description: "Advertising solutions and media partnerships — Global South Watch.",
};

const FORMATS = [
  { name: "Mega banner", desc: "Premium homepage placement — high visibility" },
  { name: "Sponsored article", desc: "Editorial-style content, clearly labeled as partner content" },
  { name: "Dedicated newsletter", desc: "Targeted message to our 145,000 subscribers" },
  { name: "Section partnership", desc: "Visibility on a topic (finance, tech, sports…)" },
];

export default function PublicitePage() {
  return (
    <ContentPage
      eyebrow="Advertisers"
      title="Advertising & partnerships"
      description="Reach a qualified, engaged, and fast-growing audience following African and Global South news."
    >
      <ContentSection title="Our audience">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
          {[
            ["2M+", "Monthly readers"],
            ["65%", "Readers aged 25–45"],
            ["78%", "Mobile reading"],
            ["12", "Countries covered"],
          ].map(([v, l]) => (
            <li key={l} className="p-4 bg-muted-bg rounded-sm text-center border border-border">
              <span className="block font-serif text-2xl font-bold text-charcoal">{v}</span>
              <span className="text-xs text-muted">{l}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="Available formats">
        <div className="space-y-3 not-prose">
          {FORMATS.map((f) => (
            <div key={f.name} className="p-4 border border-border rounded-sm">
              <h3 className="font-medium text-charcoal">{f.name}</h3>
              <p className="text-sm text-muted mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Advertising charter">
        <p>
          All sponsored content is clearly identified. Global South Watch reserves the right
          to refuse any campaign incompatible with its editorial values. See our{" "}
          <a href="/charte-editoriale" className="text-accent hover:underline">editorial charter</a>.
        </p>
      </ContentSection>

      <ContentCta
        text="Request our media kit and a personalized quote."
        href="/contact"
        label="Contact sales"
      />
    </ContentPage>
  );
}
