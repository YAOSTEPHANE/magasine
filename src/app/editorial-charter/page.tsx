import type { Metadata } from "next";
import { ContentPage, ContentSection, ContentCta } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Editorial charter",
  description: "The editorial and ethical principles of Global South Watch.",
};

export default function CharteEditorialePage() {
  return (
    <ContentPage
      eyebrow="Ethics"
      title="Editorial charter"
      description="Global South Watch is committed to the highest ethical standards in journalism. This charter guides every publication from our newsroom."
    >
      <ContentSection title="Independence">
        <p>
          Our content is produced with full independence. Advertisers, institutional partners,
          and shareholders never influence topic selection, editorial angle,
          or the line of an article.
        </p>
      </ContentSection>

      <ContentSection title="Accuracy and verification">
        <p>
          Every published fact is rigorously verified. Sources are cross-checked and
          figures are validated. When a proven error occurs, a visible correction
          is published as soon as possible.
        </p>
      </ContentSection>

      <ContentSection title="Pluralism and fairness">
        <p>
          We give voice to all stakeholders on a subject and strive to represent
          the diversity of legitimate opinions. Our investigations respect the right of reply
          and the presumption of innocence.
        </p>
      </ContentSection>

      <ContentSection title="Source protection">
        <p>
          Source confidentiality is a non-negotiable principle. We never disclose the identity
          of a protected source without their explicit consent.
        </p>
      </ContentSection>

      <ContentSection title="Reporting">
        <p>
          To report an error, inappropriate content, or a violation of this charter, contact
          our ombudsman at{" "}
          <a href="mailto:deontologie@globalsouthwatch.com" className="text-accent hover:underline">
            deontologie@globalsouthwatch.com
          </a>
          .
        </p>
      </ContentSection>

      <ContentCta
        text="Want to join our newsroom?"
        href="/careers"
        label="View openings"
      />
    </ContentPage>
  );
}
