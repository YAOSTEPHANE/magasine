import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Mail, FileText, Trash2 } from "lucide-react";
import { UtilityPageLayout } from "@/components/layout/UtilityPageLayout";
import { PRIVACY_EMAIL, PUBLISHER_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Right to erasure",
  description: `Exercise your right to erasure (GDPR) with ${SITE_NAME} — published by ${PUBLISHER_NAME}.`,
};

const STEPS = [
  {
    icon: Mail,
    title: "Send your request",
    text: `Email ${PRIVACY_EMAIL} from the address linked to your account, or use the contact form with subject “Right to erasure”.`,
  },
  {
    icon: FileText,
    title: "We verify identity",
    text: "To protect your data, we may ask for proof that you own the account before processing deletion.",
  },
  {
    icon: Trash2,
    title: "Deletion within 30 days",
    text: "We erase personal data from active systems and instruct processors to do the same, except where law requires retention.",
  },
];

const KEPT = [
  "Anonymized analytics aggregates with no personal identifiers",
  "Records we must retain for legal, tax, or fraud-prevention obligations",
  "Archived backups purged on their normal rotation cycle (up to 90 days)",
];

export default function RightToErasurePage() {
  return (
    <UtilityPageLayout
      eyebrow="Privacy"
      eyebrowIcon={Shield}
      title={
        <>
          Right to
          <span> erasure</span>
        </>
      }
      lead={`Under the GDPR and applicable Ivorian law, you can ask ${SITE_NAME} to delete personal data we hold about you.`}
      actions={[
        { label: "Email privacy team", href: `mailto:${PRIVACY_EMAIL}` },
        { label: "Privacy policy", href: "/privacy" },
        { label: "Contact form", href: "/contact" },
      ]}
    >
      <div className="utility-body--split utility-body--split-tight">
        <div className="utility-card">
          <h2>How to request deletion</h2>
          <ol className="utility-steps-list">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title}>
                  <span className="utility-step-num">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>
                      <Icon className="utility-step-icon" aria-hidden />
                      {step.title}
                    </h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="utility-card-note">
            Include your full name and the email used on your reader account. We respond within one month,
            extendable by two months for complex requests as permitted by law.
          </p>
        </div>

        <aside className="utility-aside">
          <h2>What we delete</h2>
          <ul className="utility-check-list">
            <li>Reader account profile and credentials</li>
            <li>Saved articles and reading history</li>
            <li>Newsletter subscription and preferences</li>
            <li>Comments attributed to your account</li>
          </ul>

          <h2 className="utility-aside-subtitle">What may be kept</h2>
          <ul className="utility-bullet-list">
            {KEPT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="utility-aside-box">
            <p>
              For access, rectification, or portability, see our{" "}
              <Link href="/privacy">privacy policy</Link>.
            </p>
          </div>
        </aside>
      </div>
    </UtilityPageLayout>
  );
}
