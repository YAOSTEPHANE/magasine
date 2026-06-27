"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PRIMARY_NAV,
  REGION_NAV,
  SECONDARY_NAV,
} from "@/data/presse-ivoire-home";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  const base = href.split("#")[0] ?? href;
  return pathname === base || pathname.startsWith(`${base}/`);
}

function NavLink({
  href,
  label,
  variant = "section",
}: {
  href: string;
  label: string;
  variant?: "section" | "region";
}) {
  const pathname = usePathname();
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      className={`gsw-nav-link gsw-nav-link--${variant}${active ? " is-active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function HomeQuickNav() {
  return (
    <div className="gsw-site-nav" translate="no">
      <nav className="gsw-nav" aria-label="Main navigation">
        <div className="container gsw-nav-inner gsw-nav-inner--single">
          <div className="gsw-nav-track">
            {PRIMARY_NAV.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
            {SECONDARY_NAV.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
            <span className="gsw-nav-divider" aria-hidden />
            {REGION_NAV.map((region) => (
              <NavLink
                key={region.href}
                href={region.href}
                label={region.label}
                variant="region"
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
