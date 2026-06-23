"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HEADER_NAV } from "@/data/presse-ivoire-home";
import { BrandLogo } from "@/components/presse-ivoire/BrandLogo";
import { HeaderAuth } from "@/components/presse-ivoire/HeaderAuth";

function HeaderNavLinks({ className }: { className: string }) {
  return (
    <nav className={className} aria-label="Navigation principale">
      {HEADER_NAV.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={item.active ? "active" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <BrandLogo variant="header" />

        <HeaderNavLinks className="header-nav-left header-nav-left--desktop" />

        <div className="header-actions">
          <button
            type="button"
            className="btn-search"
            title="Rechercher"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Rechercher"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <Link href="/abonnement" className="btn-subscribe" aria-label="S'abonner">
            <span className="btn-subscribe-full">S&apos;abonner</span>
            <span className="btn-subscribe-short">Pro</span>
          </Link>
          <HeaderAuth />
        </div>
      </div>

      <HeaderNavLinks className="header-nav-mobile" />

      {searchOpen && (
        <form onSubmit={handleSearch} className="container header-search" style={{ paddingBottom: 16 }}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un article, une rubrique, un auteur..."
            className="nl-input"
            style={{ width: "100%", background: "var(--cream)", color: "var(--ink)", borderColor: "var(--rule)" }}
            autoFocus
          />
        </form>
      )}
    </header>
  );
}
