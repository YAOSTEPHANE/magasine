import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  href?: string;
  id?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, href, id, className }: SectionTitleProps) {
  return (
    <div id={id} className={cn("mb-8", className)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold">
              {subtitle ?? "À la une"}
            </span>
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-charcoal">
            {title}
          </h2>
        </div>
        {href && (
          <a
            href={href}
            className="text-sm text-accent hover:text-accent-hover font-medium whitespace-nowrap transition-colors"
          >
            Voir tout →
          </a>
        )}
      </div>
      <div className="gold-line mt-4 opacity-50" />
    </div>
  );
}
