import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection, ContentCta } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Global South Watch — journalism jobs and internships.",
};

const OFFERS = [
  {
    title: "News reporter",
    location: "Abidjan, Côte d'Ivoire",
    type: "Permanent",
    description: "Coverage of political and institutional news in West Africa.",
  },
  {
    title: "Web editor / SEO",
    location: "Remote — GMT timezone",
    type: "12-month contract",
    description: "Editorial optimization, headlines, and social media management.",
  },
  {
    title: "Investigation intern",
    location: "Abidjan",
    type: "6-month internship",
    description: "Support for major reports and investigations by the investigation desk.",
  },
];

export default function CarrieresPage() {
  return (
    <ContentPage
      eyebrow="Recruitment"
      title="Careers"
      description="Global South Watch hires talent passionate about impact journalism. Join a fast-growing newsroom."
    >
      <ContentSection title="Why join us?">
        <ul className="list-disc pl-6 space-y-2">
          <li>Demanding and supportive editorial environment</li>
          <li>Creative freedom on Global South topics</li>
          <li>Ongoing training and senior mentorship</li>
          <li>Health coverage and partial remote work possible</li>
        </ul>
      </ContentSection>

      <ContentSection title="Open positions">
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

      <ContentSection title="Unsolicited applications">
        <p>
          No open role fits your profile? Send your CV and a few lines about your
          motivation to{" "}
          <a href="mailto:carrieres@globalsouthwatch.com" className="text-accent hover:underline">
            carrieres@globalsouthwatch.com
          </a>
          .
        </p>
      </ContentSection>

      <ContentCta text="Meet the people behind our newsroom." href="/team" label="Our team" />
    </ContentPage>
  );
}
