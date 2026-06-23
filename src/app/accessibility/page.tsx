import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  Keyboard,
  Eye,
  Volume2,
  MousePointer2,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  ACCESSIBILITY_EMAIL,
  PUBLISHER_NAME,
  SITE_EMAIL,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `Accessibility statement and commitments for ${SITE_NAME} — published by ${PUBLISHER_NAME}. WCAG-oriented, keyboard-friendly, screen-reader aware.`,
};

const COMMITMENTS = [
  {
    icon: Eye,
    title: "Perceivable",
    text: "Semantic HTML, alt text on editorial images, sufficient colour contrast, and readable typography across breakpoints.",
  },
  {
    icon: Keyboard,
    title: "Operable",
    text: "Keyboard navigation on main flows, visible focus states, skip-friendly structure, and touch targets sized for mobile.",
  },
  {
    icon: Volume2,
    title: "Understandable",
    text: "Clear headings, descriptive links, consistent navigation, and plain-language error messages on forms.",
  },
  {
    icon: MousePointer2,
    title: "Robust",
    text: "Standards-based markup, ARIA only where needed, and compatibility testing with common assistive technologies.",
  },
];

const FEATURES = [
  "Landmarks and heading hierarchy on article and section pages",
  "Alternative text on hero and card images where editorially relevant",
  "Form labels associated with inputs (login, newsletter, contact, donate)",
  "Reduced-motion respect via prefers-reduced-motion in animations",
  "Responsive layout without horizontal scrolling on standard viewports",
  "High-contrast brand palette aligned with WCAG 2.1 AA targets",
];

const KNOWN_LIMITS = [
  "Some third-party embeds (social widgets, external video players) may not meet the same standards as our core pages.",
  "Older PDF documents linked from archives may not be fully tagged for screen readers.",
  "Live ticker and auto-rotating hero elements are paused when reduced motion is requested, but manual control is still being expanded.",
];

const ASSISTIVE = [
  "NVDA and JAWS on Windows",
  "VoiceOver on macOS and iOS",
  "TalkBack on Android",
  "Keyboard-only navigation (Tab, Shift+Tab, Enter, Escape)",
];

export default function AccessibilityPage() {
  return (
    <div className="utility-page">
      <header className="utility-hero">
        <div className="utility-hero-ornament" aria-hidden />
        <div className="container utility-hero-inner">
          <span className="utility-eyebrow">
            <Accessibility className="utility-eyebrow-icon" aria-hidden />
            Inclusion
          </span>
          <h1 className="utility-title">
            Accessibility
            <span> for every reader</span>
          </h1>
          <p className="utility-lead">
            {SITE_NAME}, published by {PUBLISHER_NAME}, is committed to making independent
            journalism from the Global South available to as many people as possible —
            including readers who use assistive technologies.
          </p>
          <div className="utility-conformance-badge" role="status">
            <CheckCircle2 className="w-4 h-4" aria-hidden />
            Target: WCAG 2.1 Level AA (ongoing conformance work)
          </div>
        </div>
      </header>

      <div className="container utility-body">
        <section className="utility-wide-panel" aria-labelledby="a11y-policy">
          <h2 id="a11y-policy">Our approach</h2>
          <p>
            Accessibility is part of editorial inclusion: if our reporting is meant to reach
            communities across the Global South, our website must be usable by people with
            disabilities, slow connections, and diverse devices. We follow the Web Content
            Accessibility Guidelines (WCAG) 2.1 as our reference standard and review critical
            user journeys after each major redesign.
          </p>
        </section>

        <div className="utility-principles-grid">
          {COMMITMENTS.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="utility-principle-card">
                <span className="utility-principle-icon" aria-hidden>
                  <Icon className="w-5 h-5" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="utility-body--split utility-body--split-tight">
          <section className="utility-card" aria-labelledby="a11y-features">
            <h2 id="a11y-features">What we implement</h2>
            <ul className="utility-check-list">
              {FEATURES.map((feature) => (
                <li key={feature}>
                  <CheckCircle2 className="w-4 h-4" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="utility-card" aria-labelledby="a11y-limits">
            <h2 id="a11y-limits">Known limitations</h2>
            <ul className="utility-warn-list">
              {KNOWN_LIMITS.map((item) => (
                <li key={item}>
                  <AlertCircle className="w-4 h-4" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="utility-card-note">
              We publish an internal accessibility review at least once per year and
              prioritise fixes that block access to news content.
            </p>
          </section>
        </div>

        <section className="utility-wide-panel" aria-labelledby="a11y-assistive">
          <h2 id="a11y-assistive">Tested with</h2>
          <ul className="utility-chip-list">
            {ASSISTIVE.map((item) => (
              <li key={item}>
                <span className="utility-chip utility-chip--static">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="utility-contact-panel" aria-labelledby="a11y-report">
          <h2 id="a11y-report">Report a barrier</h2>
          <p>
            If you cannot access content or a feature on {SITE_NAME}, please tell us so we
            can fix it. Include the page URL, what you were trying to do, and the
            technology you use (screen reader, browser, device).
          </p>
          <div className="utility-contact-actions">
            <a href={`mailto:${ACCESSIBILITY_EMAIL}`} className="utility-hero-btn utility-hero-btn--primary">
              <Mail className="w-4 h-4" aria-hidden />
              {ACCESSIBILITY_EMAIL}
            </a>
            <Link href="/contact" className="utility-hero-btn">
              Contact form
            </Link>
          </div>
          <p className="utility-footer-note">
            General enquiries: <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            {" · "}
            <Link href="/legal">Legal notice</Link>
            {" · "}
            <Link href="/privacy">Privacy</Link>
            {" · "}
            <Link href="/sitemap">Sitemap</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
