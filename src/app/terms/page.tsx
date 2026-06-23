import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms of use — Global South Watch",
};

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Terms of use"
      description="Access to Global South Watch implies acceptance of these terms. Please read them carefully."
    >
      <ContentSection title="Purpose of the service">
        <p>
          Global South Watch is an online news portal offering articles, analysis, videos,
          and newsletters on African and Global South news. Articles are free to read; newsletters
          let you follow the editions you choose.
        </p>
      </ContentSection>

      <ContentSection title="Newsletter">
        <p>
          Newsletter subscriptions are free. Select regional and thematic editions on the{" "}
          <Link href="/newsletter" className="text-accent hover:underline">Newsletter</Link> page
          and unsubscribe at any time.
        </p>
      </ContentSection>

      <ContentSection title="User account">
        <p>
          Creating an account is free. You are responsible for keeping your credentials confidential.
          Any activity carried out from your account is attributable to you.
        </p>
      </ContentSection>

      <ContentSection title="Intellectual property">
        <p>
          All content (text, images, videos, logos) is protected by copyright.
          Any reproduction without written authorization from the publisher is prohibited.
        </p>
      </ContentSection>

      <ContentSection title="Comments">
        <p>
          Published comments must comply with the{" "}
          <Link href="/editorial-charter" className="text-accent hover:underline">editorial charter</Link>.
          Global South Watch reserves the right to moderate or remove inappropriate, defamatory, or off-topic content.
        </p>
      </ContentSection>

      <p className="text-sm text-muted pt-4 border-t border-border">
        Last updated: June 2026 —{" "}
        <Link href="/privacy" className="text-accent hover:underline">Privacy policy</Link>
      </p>
    </ContentPage>
  );
}
