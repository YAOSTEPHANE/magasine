import Image from "next/image";
import Link from "next/link";
import { SITE_LOGO } from "@/lib/images";

interface BrandLogoProps {
  variant?: "header" | "footer" | "auth";
  className?: string;
  showTagline?: boolean;
  /** When false, renders markup only (use inside an existing link). */
  linked?: boolean;
}

export function BrandLogo({
  variant = "header",
  className,
  showTagline,
  linked = true,
}: BrandLogoProps) {
  const height = variant === "header" ? 52 : 44;
  const width = variant === "header" ? 220 : 190;
  const displayTagline = showTagline ?? variant === "header";
  const logoClassName = className ?? (variant === "auth" ? "logo logo-auth" : "logo");

  const content = (
    <>
      <Image
        src={SITE_LOGO}
        alt="Global South Watch"
        width={width}
        height={height}
        priority={variant === "header"}
        style={{ height, width: "auto", maxWidth: width }}
      />
      {displayTagline && (
        <div className="logo-tagline">Décolonisation des médias</div>
      )}
    </>
  );

  if (!linked) {
    return <span className={logoClassName}>{content}</span>;
  }

  return (
    <Link
      href="/"
      className={logoClassName}
      aria-label="Global South Watch — Home"
    >
      {content}
    </Link>
  );
}
