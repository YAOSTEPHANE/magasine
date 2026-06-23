import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "gold" | "premium";
  className?: string;
}

const variants = {
  default: "bg-muted-bg text-muted",
  accent: "bg-accent/10 text-accent",
  gold: "bg-gold-light text-gold-dark",
  premium: "bg-charcoal text-gold",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase rounded-sm",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
