import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Digital accessibility commitments and resources — Global South Watch.",
};

export default function AccessibilitePage() {
  return (
    <ContentPage
      eyebrow="Inclusion"
      title="Accessibility"
      description="Global South Watch is committed to making its content accessible to as many people as possible, in line with web accessibility best practices."
    >
      <ContentSection title="Our commitments">
        <ul className="list-disc pl-6 space-y-2">
          <li>Semantic HTML structure for screen readers</li>
          <li>Alternative text on editorial images</li>
          <li>Color contrasts meeting WCAG 2.1 Level AA recommendations</li>
          <li>Keyboard navigation on main pages</li>
          <li>Hierarchical headings and descriptive links</li>
        </ul>
      </ContentSection>

      <ContentSection title="Continuous improvement">
        <p>
          We are actively working to improve the accessibility of our site.
          A full audit is planned each year. Your feedback helps us progress.
        </p>
      </ContentSection>

      <ContentSection title="Report an issue">
        <p>
          If you encounter difficulty accessing our content, write to us at{" "}
          <a href="mailto:accessibilite@globalsouthwatch.com" className="text-accent hover:underline">
            accessibilite@globalsouthwatch.com
          </a>
          {" "}specifying the page concerned and the type of difficulty encountered.
        </p>
      </ContentSection>

      <p className="text-sm text-muted pt-8 border-t border-border">
        See also:{" "}
        <Link href="/mentions-legales" className="text-accent hover:underline">Legal notice</Link>
        {" · "}
        <Link href="/confidentialite" className="text-accent hover:underline">Privacy</Link>
      </p>
    </ContentPage>
  );
}
