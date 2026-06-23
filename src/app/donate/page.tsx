import type { Metadata } from "next";
import Link from "next/link";
import { DonateForm } from "@/components/donation/DonateForm";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support independent journalism from Africa and the Global South. Your donation funds investigations, correspondents, and public-interest reporting.",
};

const STATS = [
  { value: "42", label: "Countries covered" },
  { value: "120+", label: "Regional correspondents" },
  { value: "0", label: "Paywalls on breaking news" },
];

const USES = [
  {
    title: "Field reporting",
    text: "Send journalists to conflict zones, elections, and climate frontlines across the Global South.",
  },
  {
    title: "Investigations",
    text: "Fund months-long probes into corruption, resource extraction, and public accountability.",
  },
  {
    title: "Local languages",
    text: "Translate and distribute stories in French, Arabic, Portuguese, and indigenous languages.",
  },
  {
    title: "Early-career talent",
    text: "Train the next generation of reporters through fellowships and newsroom mentorship.",
  },
];

export default function DonatePage() {
  return (
    <div className="donate-page">
      <div className="container donate-hero">
        <span className="donate-eyebrow">Support us</span>
        <h1 className="donate-title">
          Fuel independent journalism
          <span> from the Global South</span>
        </h1>
        <p className="donate-lead">
          Global South Watch is reader-supported. Your donation keeps our coverage free to access,
          editorially independent, and rooted in the communities we report on.
        </p>
        <div className="donate-stats">
          {STATS.map((s) => (
            <div key={s.label} className="donate-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container donate-layout">
        <aside className="donate-aside">
          <h2>Where your gift goes</h2>
          <ul className="donate-uses">
            {USES.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <div className="donate-aside-cta">
            <p>Prefer a recurring membership?</p>
            <Link href="/newsletter">Explore newsletter editions →</Link>
          </div>
        </aside>

        <section className="donate-card" aria-labelledby="donate-form-heading">
          <h2 id="donate-form-heading">Make a donation</h2>
          <p className="donate-card-sub">Secure pledge · tax receipt available in production</p>
          <DonateForm />
        </section>
      </div>
    </div>
  );
}
