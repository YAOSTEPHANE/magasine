import type { Metadata } from "next";
import Link from "next/link";
import { PenLine } from "lucide-react";
import { UtilityPageLayout } from "@/components/layout/UtilityPageLayout";

export const metadata: Metadata = {
  title: "Write for Us",
  description:
    "Pitch Global South Watch — commentary, explainers, and reporting from the Global South.",
};

export default function WriteForUsPage() {
  return (
    <UtilityPageLayout
      eyebrow="Contribute"
      eyebrowIcon={PenLine}
      title="Write for Us"
      lead="Global South Watch welcomes pitches from journalists, researchers, and writers who know the regions they cover."
      actions={[
        { label: "Contact us", href: "/contact" },
        { label: "Editorial charter", href: "/editorial-charter" },
      ]}
    >
      <div className="utility-prose">
        <p>
          We publish news, commentary, explainers, and culture stories rooted in Africa, Latin America,
          South Asia, and West Asia. If you have a story idea, send us a short pitch with your angle,
          why it matters now, and any relevant reporting experience.
        </p>
        <h2>What we are looking for</h2>
        <ul>
          <li>Original reporting or analysis grounded in local context</li>
          <li>Clear, accessible writing for an international audience</li>
          <li>Stories that center Global South voices and perspectives</li>
        </ul>
        <h2>How to pitch</h2>
        <p>
          Email{" "}
          <a href="mailto:editors@globalsouthwatch.com">editors@globalsouthwatch.com</a> with the subject
          line <strong>Write for Us</strong>, or use our{" "}
          <Link href="/contact">contact form</Link>.
        </p>
      </div>
    </UtilityPageLayout>
  );
}
