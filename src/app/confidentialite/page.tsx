import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Privacy policy and data protection — Global South Watch",
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-charcoal mb-8">Privacy policy</h1>
      <div className="prose prose-charcoal space-y-6 text-charcoal/80 leading-relaxed">
        <p>
          Global South Watch, published by Digitalpro Solutions, is committed to protecting the privacy of its readers
          in accordance with the General Data Protection Regulation (GDPR) and applicable laws in Côte d&apos;Ivoire.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Data collected</h2>
        <p>
          We collect data you provide when registering (name, email), subscribing to the newsletter,
          posting comments, and using the contact form. Anonymized browsing data may be
          collected via technical and analytics cookies.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Use of data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Managing your reader account and Premium subscription</li>
          <li>Sending newsletters according to your preferences</li>
          <li>Improving our content and user experience</li>
          <li>Responding to your requests via the contact form</li>
        </ul>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Cookies</h2>
        <p>
          Our site uses cookies essential to operation (session, authentication) and analytics cookies
          to measure audience. You can configure your browser to refuse non-essential cookies.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Your rights</h2>
        <p>
          You have the right to access, rectify, delete, and port your data.
          To exercise these rights, contact us at{" "}
          <a href="mailto:privacy@globalsouthwatch.com" className="text-accent hover:underline">
            privacy@globalsouthwatch.com
          </a>
          .
        </p>
        <p className="text-sm text-muted pt-8 border-t border-border">
          Last updated: June 2026 —{" "}
          <Link href="/mentions-legales" className="text-accent hover:underline">Legal notice</Link>
        </p>
      </div>
    </div>
  );
}
