import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md",
  secondary:
    "bg-charcoal text-white hover:bg-charcoal/90",
  outline:
    "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white",
  ghost: "text-charcoal hover:bg-muted-bg",
  gold: "bg-gold text-white hover:bg-gold-dark shadow-sm",
};

const sizes = {
  sm: "px-4 py-2 text-xs tracking-wider uppercase",
  md: "px-6 py-2.5 text-sm tracking-wide",
  lg: "px-8 py-3.5 text-sm tracking-widest uppercase font-medium",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-sm",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
