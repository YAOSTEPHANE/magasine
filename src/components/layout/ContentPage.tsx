import Link from "next/link";
import { SocialLinks } from "@/components/ui/SocialIcons";

interface ContentPageProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ContentPage({ eyebrow, title, description, children }: ContentPageProps) {
  return (
    <div className="utility-page">
      <header className="utility-hero">
        <div className="utility-hero-ornament" aria-hidden />
        <div className="container utility-hero-inner">
          {eyebrow && <span className="utility-eyebrow">{eyebrow}</span>}
          <h1 className="utility-title">{title}</h1>
          {description && <p className="utility-lead">{description}</p>}
        </div>
      </header>
      <div className="container utility-body">
        <div className="utility-card utility-prose prose-content space-y-6 text-charcoal/80 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ContentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="utility-content-section">
      <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">{title}</h2>
      {children}
    </section>
  );
}

export function ContentCta({
  text,
  href,
  label,
}: {
  text: string;
  href: string;
  label: string;
}) {
  return (
    <div className="utility-cta-band">
      <p>{text}</p>
      <Link href={href}>{label}</Link>
    </div>
  );
}

export function ContentSocialBlock() {
  return (
    <div className="utility-social-block">
      <p>Follow Global South Watch</p>
      <SocialLinks variant="inline" iconClassName="w-5 h-5" />
    </div>
  );
}
