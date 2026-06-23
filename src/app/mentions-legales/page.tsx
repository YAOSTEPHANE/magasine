import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection, ContentSocialBlock } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Legal notice",
  description: "Legal and editorial information — Global South Watch.",
};

export default function MentionsLegalesPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Legal notice"
      description="Information about the publisher, hosting, and editorial responsibilities of Global South Watch."
    >
      <ContentSection title="Site publisher">
        <ul className="space-y-2 not-prose text-sm">
          <li><strong>Company name:</strong> Digitalpro Solutions</li>
          <li><strong>Editorial brand:</strong> Global South Watch</li>
          <li><strong>Headquarters:</strong> Abidjan, Côte d&apos;Ivoire</li>
          <li><strong>Email:</strong>{" "}
            <a href="mailto:contact@globalsouthwatch.com" className="text-accent hover:underline">
              contact@globalsouthwatch.com
            </a>
          </li>
          <li><strong>Publication director:</strong> Global South Watch Editorial Board</li>
        </ul>
      </ContentSection>

      <ContentSection title="Hosting">
        <p>
          The site is hosted according to the production infrastructure configured by the publisher.
          User data is stored securely in accordance with our{" "}
          <Link href="/confidentialite" className="text-accent hover:underline">
            privacy policy
          </Link>.
        </p>
      </ContentSection>

      <ContentSection title="Intellectual property">
        <p>
          All content published on Global South Watch (text, images, videos, logos)
          is protected by copyright. Any reproduction without prior written authorization
          from the publisher is prohibited.
        </p>
      </ContentSection>

      <ContentSection title="Liability">
        <p>
          Global South Watch strives to ensure the accuracy of published information.
          However, the publisher cannot be held responsible for omissions or inaccuracies.
          Comments posted by readers are the responsibility of their authors.
        </p>
      </ContentSection>

      <ContentSection title="Useful links">
        <ul className="space-y-2">
          <li><Link href="/charte-editoriale" className="text-accent hover:underline">Editorial charter</Link></li>
          <li><Link href="/cgu" className="text-accent hover:underline">Terms of use</Link></li>
          <li><Link href="/confidentialite" className="text-accent hover:underline">Privacy policy</Link></li>
          <li><Link href="/accessibilite" className="text-accent hover:underline">Accessibility</Link></li>
        </ul>
      </ContentSection>

      <ContentSocialBlock />
    </ContentPage>
  );
}
