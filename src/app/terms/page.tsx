import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms of use — Global South Watch",
};

export default function CguPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-charcoal mb-8">Terms of use</h1>
      <div className="prose prose-charcoal space-y-6 text-charcoal/80 leading-relaxed">
        <p>
          Access to and use of the Global South Watch website implies full acceptance
          of these terms of use.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Purpose of the service</h2>
        <p>
          Global South Watch is an online news portal offering articles, analysis, videos,
          and newsletters on African and Global South news. Some content is reserved for Premium subscribers.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">User account</h2>
        <p>
          Creating an account is free. You are responsible for keeping your credentials confidential.
          Any activity carried out from your account is attributable to you.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Premium subscription</h2>
        <p>
          The Premium subscription provides access to exclusive content. Current rates are displayed on the{" "}
          <Link href="/subscription" className="text-accent hover:underline">Subscription</Link> page.
          In demo mode, Premium activation does not trigger a real payment.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Intellectual property</h2>
        <p>
          All content (text, images, videos, logos) is protected by copyright.
          Any reproduction without written authorization from the publisher is prohibited.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Comments</h2>
        <p>
          Published comments must comply with the editorial charter. Global South Watch reserves the right
          to moderate or remove any inappropriate, defamatory, or off-topic content.
        </p>
        <p className="text-sm text-muted pt-8 border-t border-border">
          Last updated: June 2026 —{" "}
          <Link href="/privacy" className="text-accent hover:underline">Privacy policy</Link>
        </p>
      </div>
    </div>
  );
}
