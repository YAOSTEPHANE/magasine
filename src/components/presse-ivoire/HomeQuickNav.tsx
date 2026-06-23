"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_RUBRIQUES } from "@/data/presse-ivoire-home";

const URGENT_LINK = { label: "Urgent", href: "/urgent", featured: true, icon: "🔥" };

interface HomeQuickNavProps {
  categories?: { name: string; slug: string }[];
}

type NavItem = { label: string; href: string; featured: boolean; icon?: string };

function isActive(pathname: string, href: string) {
  if (href === "/urgent" || href === "/#urgent") {
    return pathname === "/urgent" || pathname === "/";
  }
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

  const rubriqueItems: NavItem[] = NAV_RUBRIQUES.filter((r) => !r.featured).map((r) => ({
    label: r.label,
    href: r.href === "/#urgent" ? "/urgent" : r.href,
    featured: false,
  }));

  if (categories?.length) {
    for (const category of categories) {
      const href = `/category/${category.slug}`;
      if (!rubriqueItems.some((item) => item.href === href)) {
        rubriqueItems.push({ label: category.name, href, featured: false });
      }
    }
  }

  const items: NavItem[] = [URGENT_LINK, ...rubriqueItems];

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
            <NavPill
              key={item.href + item.label}
              item={item}
              active={isActive(pathname, item.href)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
