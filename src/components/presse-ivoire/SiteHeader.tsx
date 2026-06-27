"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SITE_TAGLINE } from "@/data/presse-ivoire-home";
import { BrandLogo } from "@/components/presse-ivoire/BrandLogo";
import { HeaderAuth } from "@/components/presse-ivoire/HeaderAuth";
import { HeaderDonateLink } from "@/components/presse-ivoire/HeaderDonateLink";
import { HeaderUtilityBar } from "@/components/presse-ivoire/HeaderUtilityBar";
import { GswNavSearchLink } from "@/components/presse-ivoire/GswNavSearchLink";
import { MobileMenuButton, MobileNavDrawer } from "@/components/presse-ivoire/MobileNavDrawer";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  return (
    <header className="header header--gsw" translate="no">
      <HeaderUtilityBar />
      <div className="header-inner header-inner--gsw">
        <div className="header-brand-row">
          <MobileMenuButton
            open={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
          />
          <BrandLogo variant="header" showTagline={false} />
          <p className="header-logo-tagline">{SITE_TAGLINE}</p>
        </div>

        <div className="header-actions header-actions--gsw">
          <HeaderDonateLink />
          <GswNavSearchLink className="gsw-nav-search-icon--header" />
          <HeaderAuth />
        </div>
      </div>

      <MobileNavDrawer open={mobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
}
