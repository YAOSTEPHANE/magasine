"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HEADER_TOP_ACTIONS, SITE_TAGLINE } from "@/data/presse-ivoire-home";
import { BrandLogo } from "@/components/presse-ivoire/BrandLogo";
import { HeaderAuth } from "@/components/presse-ivoire/HeaderAuth";
import { MobileMenuButton, MobileNavDrawer } from "@/components/presse-ivoire/MobileNavDrawer";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    closeMobileMenu();
    setSearchOpen(false);
    setQuery("");
  }, [pathname, closeMobileMenu]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header className="header header--gsw" translate="no">
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
          <div className="header-top-links">
            {HEADER_TOP_ACTIONS.map((item) => (
              <Link key={item.href} href={item.href} className="header-top-link">
                {item.label}
              </Link>
            ))}
          </div>
          <button
            type="button"
            className="btn-search btn-search--header"
            title="Search"
            onClick={() => setSearchOpen((open) => !open)}
            aria-label="Search"
            aria-expanded={searchOpen}
            aria-controls="header-search-panel"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M10.5 10.5L13.5 13.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <HeaderAuth />
        </div>
      </div>

      {searchOpen && (
        <form
          id="header-search-panel"
          onSubmit={handleSearch}
          className="header-search header-search--gsw"
          role="search"
        >
          <div className="container header-search-inner">
            <label htmlFor="header-search-input" className="sr-only">
              Search articles
            </label>
            <input
              id="header-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by topic, author, or keyword…"
              className="header-search-input"
              autoFocus
              enterKeyHint="search"
            />
            <button type="submit" className="header-search-submit">
              Search
            </button>
          </div>
        </form>
      )}

      <MobileNavDrawer open={mobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
}
