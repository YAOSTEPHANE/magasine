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
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-16">
      {eyebrow && (
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold">
          {eyebrow}
        </span>
      )}
      <h1 className="font-serif text-4xl font-bold text-charcoal mt-2 mb-4">{title}</h1>
      {description && (
        <p className="text-muted text-lg leading-relaxed mb-8 border-b border-border pb-8">
          {description}
        </p>
      )}
      <div className="prose-content space-y-6 text-charcoal/80 leading-relaxed">
        {children}
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
    <section className="mt-10">
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
    <div className="mt-12 p-6 bg-muted-bg border border-border rounded-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <p className="text-sm text-charcoal">{text}</p>
      <Link
        href={href}
        className="inline-flex items-center justify-center px-6 py-2.5 bg-charcoal text-white text-sm rounded-sm hover:bg-charcoal/90 transition-colors shrink-0"
      >
        {label}
      </Link>
    </div>
  );
}

export function ContentSocialBlock() {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <p className="text-sm text-muted mb-4">Suivez Global South Watch</p>
      <SocialLinks variant="inline" iconClassName="w-5 h-5" />
    </div>
  );
}
