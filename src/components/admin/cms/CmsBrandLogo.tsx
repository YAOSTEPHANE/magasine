"use client";

import { BrandLogo } from "@/components/presse-ivoire/BrandLogo";

interface CmsBrandLogoProps {
  onNavigate?: () => void;
}

export function CmsBrandLogo({ onNavigate }: CmsBrandLogoProps) {
  return (
    <BrandLogo
      variant="header"
      className="sb-logo"
      href="/admin"
      onNavigate={onNavigate}
    />
  );
}
