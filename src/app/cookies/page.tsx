import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "How Global South Watch uses cookies.",
};

export default function CookiesPage() {
  return (
    <ContentPage
      eyebrow="Cookies"
      title="Cookie policy"
      description="This page explains how Global South Watch uses cookies and similar technologies."
    >
      <ContentSection title="What is a cookie?">
        <p>
          A cookie is a small text file placed on your device when you visit a website.
          It helps remember your preferences and improve your browsing experience.
        </p>
      </ContentSection>

      <ContentSection title="Cookies we use">
        <ul className="space-y-4 not-prose">
          <li className="p-4 border border-border rounded-sm">
            <strong className="text-charcoal">Essential cookies</strong>
            <p className="text-sm text-muted mt-1">
              User session, authentication, security. Required for the site to function.
            </p>
          </li>
          <li className="p-4 border border-border rounded-sm">
            <strong className="text-charcoal">Analytics cookies</strong>
            <p className="text-sm text-muted mt-1">
              Anonymized audience measurement to understand how readers use the site.
            </p>
          </li>
          <li className="p-4 border border-border rounded-sm">
            <strong className="text-charcoal">Preference cookies</strong>
            <p className="text-sm text-muted mt-1">
              Remembering your choices (language, newsletter, saved articles).
            </p>
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="Managing your cookies">
        <p>
          You can configure your browser to refuse non-essential cookies.
          Disabling essential cookies may limit certain features (sign-in, newsletter preferences).
        </p>
      </ContentSection>

      <p className="text-sm text-muted pt-8 border-t border-border">
        <Link href="/privacy" className="text-accent hover:underline">
          Full privacy policy →
        </Link>
      </p>
    </ContentPage>
  );
}
