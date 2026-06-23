"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_RUBRIQUES } from "@/data/presse-ivoire-home";

const URGENT_LINK = { label: "Urgent", href: "/#urgent", featured: true, icon: "🔥" };

interface HomeQuickNavProps {
  categories?: { name: string; slug: string }[];
}

type NavItem = { label: string; href: string; featured: boolean; icon?: string };

function isActive(pathname: string, href: string) {
  if (href === "/#urgent") return pathname === "/" || pathname === "/urgent";
  if (href.startsWith("/category/")) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return pathname === href;
}

function NavPill({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={[
        "home-quick-pill",
        item.featured ? "home-quick-pill--featured" : "",
        active ? "home-quick-pill--active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {item.icon && (
        <span className="home-quick-pill-icon" aria-hidden>
          {item.icon}
        </span>
      )}
      {item.label}
    </Link>
  );
}

export function HomeQuickNav({ categories }: HomeQuickNavProps) {
  const pathname = usePathname();

  const rubriques: NavItem[] = categories?.length
    ? categories.map((c) => ({ label: c.name, href: `/category/${c.slug}`, featured: false }))
    : NAV_RUBRIQUES.filter((r) => !r.featured).map((r) => ({
        label: r.label,
        href: r.href,
        featured: false,
      }));

  const items: NavItem[] = [URGENT_LINK, ...rubriques];

  return (
    <nav className="home-quick-nav home-quick-nav--revolution" aria-label="Quick sections">
      <div className="container home-quick-nav-wrap">
        <div className="home-quick-nav-head">
          <span className="home-quick-nav-label">Sections</span>
          <span className="home-quick-nav-brand">
            <span className="home-quick-nav-brand-dot" aria-hidden />
            Global South Watch
          </span>
        </div>

        <div className="home-quick-nav-track">
          {items.map((item) => (
            <NavPill key={item.href + item.label} item={item} active={isActive(pathname, item.href)} />
          ))}
        </div>
      </div>
    </nav>
  );
}
