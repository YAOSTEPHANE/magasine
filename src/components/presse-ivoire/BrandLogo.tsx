import Image from "next/image";
import Link from "next/link";
import { SITE_LOGO } from "@/lib/images";

interface BrandLogoProps {
  variant?: "header" | "footer" | "auth";
  className?: string;
  showTagline?: boolean;
}

export function BrandLogo({ variant = "header", className, showTagline }: BrandLogoProps) {
  const height = variant === "header" ? 52 : 44;
  const width = variant === "header" ? 220 : 190;
  const displayTagline = showTagline ?? variant === "header";

  return (
    <Link
      href="/"
      className={className ?? (variant === "auth" ? "logo logo-auth" : "logo")}
      aria-label="Global South Watch — Home"
    >
      <Image
        src={SITE_LOGO}
        alt="Global South Watch"
        width={width}
        height={height}
        priority={variant === "header"}
        style={{ height, width: "auto", maxWidth: width }}
      />
      {displayTagline && (
        <div className="logo-tagline">News at the heart of the Global South</div>
      )}
    </Link>
  );
}
