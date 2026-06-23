"use client";

import { NewsletterSignupForm } from "@/components/newsletter/NewsletterSignupForm";

const BENEFITS = [
  "Daily briefing every morning",
  "Regional editions you choose",
  "Investigation alerts — always free",
];

export function NewsletterBanner() {
  return (
    <section className="newsletter-banner newsletter-premium">
      <div className="newsletter-pattern" aria-hidden />
      <div className="newsletter-inner">
        <div className="newsletter-copy">
          <div className="nl-emblem" aria-hidden>GSW</div>
          <div className="nl-label">Newsletter</div>
          <h2 className="nl-title">
            The essentials every morning,
            <br />
            <em>delivered straight to your inbox.</em>
          </h2>
          <p className="nl-desc">
            An editorial selection of the most important news from Africa
            and the Global South, curated by our newsroom.
          </p>
          <ul className="nl-benefits">
            {BENEFITS.map((b) => (
              <li key={b}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <circle cx="8" cy="8" r="8" fill="rgba(26,56,150,0.1)" />
                  <path d="M5 8l2 2 4-4" stroke="#1a3896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="newsletter-form-wrap">
          <div className="newsletter-form-card">
            <NewsletterSignupForm variant="banner" showTopics={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
