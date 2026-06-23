import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection, ContentCta } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Press room",
  description: "Press releases, media contacts, and resources — Global South Watch.",
};

export default function EspacePressePage() {
  return (
    <ContentPage
      eyebrow="Media"
      title="Press room"
      description="Journalists and partner media: find our press releases, contacts, and institutional resources."
    >
      <ContentSection title="Press contact">
        <ul className="space-y-3 not-prose">
          <li className="p-4 bg-muted-bg border border-border rounded-sm">
            <p className="text-xs font-bold tracking-wider uppercase text-muted">Press relations</p>
            <a href="mailto:presse@globalsouthwatch.com" className="text-charcoal font-medium hover:text-accent">
              presse@globalsouthwatch.com
            </a>
          </li>
          <li className="p-4 bg-muted-bg border border-border rounded-sm">
            <p className="text-xs font-bold tracking-wider uppercase text-muted">Phone</p>
            <p className="text-charcoal font-medium">+225 27 00 00 00 01</p>
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="Resources">
        <ul className="list-disc pl-6 space-y-2">
          <li>Logo and brand guidelines on request</li>
          <li>Interviews and speaking opportunities with editorial leadership</li>
          <li>Early access to major investigations (upon accreditation)</li>
          <li>RSS feed: <a href="/feed.xml" className="text-accent hover:underline">/feed.xml</a> · <Link href="/rss" className="text-accent hover:underline">RSS hub</Link></li>
          <li>Sitemap: <Link href="/sitemap" className="text-accent hover:underline">/sitemap</Link></li>
        </ul>
      </ContentSection>

      <ContentSection title="Latest press releases">
        <div className="space-y-3 not-prose text-sm">
          <p className="p-4 border-l-4 border-gold bg-muted-bg pl-5">
            <strong>June 2026</strong> — Global South Watch surpasses 2 million monthly readers.
          </p>
          <p className="p-4 border-l-4 border-gold bg-muted-bg pl-5">
            <strong>May 2026</strong> — Launch of the Investigations section with a dedicated team in Abidjan.
          </p>
        </div>
      </ContentSection>

      <ContentCta text="Have a question? Our team replies within 24 hours." href="/contact" label="Contact us" />
    </ContentPage>
  );
}
