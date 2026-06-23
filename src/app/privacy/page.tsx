import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection } from "@/components/layout/ContentPage";
import { PRIVACY_EMAIL, PUBLISHER_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Privacy policy and data protection — Global South Watch",
};

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy policy"
      description={`${PUBLISHER_NAME} is committed to protecting reader privacy in line with the GDPR and applicable law in Côte d'Ivoire.`}
    >
      <ContentSection title="Data collected">
        <p>
          We collect data you provide when registering (name, email), subscribing to newsletters,
          posting comments, donating, and using the contact form. Anonymized browsing data may be
          collected via technical and analytics cookies.
        </p>
      </ContentSection>

      <ContentSection title="Use of data">
        <ul className="list-disc pl-6 space-y-2">
          <li>Managing your reader account and newsletter preferences</li>
          <li>Sending newsletters according to your selected editions</li>
          <li>Improving our content and user experience</li>
          <li>Responding to requests via the contact form</li>
        </ul>
      </ContentSection>

      <ContentSection title="Cookies">
        <p>
          Our site uses cookies essential to operation (session, authentication) and analytics cookies
          to measure audience. See our{" "}
          <Link href="/cookies" className="text-accent hover:underline">cookie policy</Link> for details.
        </p>
      </ContentSection>

      <ContentSection title="Your rights">
        <p>
          You have the right to access, rectify, delete, and port your data, and to object to certain processing.
          To exercise these rights, contact{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`} className="text-accent hover:underline">
            {PRIVACY_EMAIL}
          </a>
          {" "}or use our dedicated{" "}
          <Link href="/right-to-erasure" className="text-accent hover:underline">
            right to erasure
          </Link>{" "}
          page.
        </p>
      </ContentSection>

      <p className="text-sm text-muted pt-4 border-t border-border">
        Last updated: June 2026 —{" "}
        <Link href="/legal" className="text-accent hover:underline">Legal notice</Link>
        {" · "}
        <Link href="/terms" className="text-accent hover:underline">Terms of use</Link>
      </p>
    </ContentPage>
  );
}
