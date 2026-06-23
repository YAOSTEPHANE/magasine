"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export function Header({ categories }: { categories: Category[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/recherche?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/" className="flex flex-col items-center lg:items-start group">
            <span className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-charcoal group-hover:text-accent transition-colors">
              Depth<span className="text-gold">Mag</span>
            </span>
            <span className="hidden lg:block text-[9px] tracking-[0.35em] uppercase text-muted mt-0.5">
              Magazine & Presse en Ligne
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-charcoal hover:text-accent transition-colors">
                Rubriques
                <ChevronDown className={cn("w-4 h-4 transition-transform", megaOpen && "rotate-180")} />
              </button>

              {megaOpen && (
                <div className="absolute top-full left-0 w-[640px] bg-surface border border-border shadow-luxury rounded-sm p-6 grid grid-cols-3 gap-4 animate-fade-up">
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/categorie/${cat.slug}`}
                      className="group p-3 rounded-sm hover:bg-muted-bg transition-colors"
                    >
                      <span className="text-sm font-medium text-charcoal group-hover:text-accent transition-colors">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat._id}
                href={`/categorie/${cat.slug}`}
                className="px-3 py-2 text-sm text-muted hover:text-charcoal transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 hover:bg-muted-bg rounded-sm transition-colors"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/connexion"
              className="hidden sm:flex p-2.5 hover:bg-muted-bg rounded-sm transition-colors"
              aria-label="Mon compte"
            >
              <User className="w-5 h-5" />
            </Link>
            <Button href="/abonnement" variant="gold" size="sm" className="hidden sm:inline-flex">
              S&apos;abonner
            </Button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={handleSearch} className="pb-4 animate-fade-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un article, une rubrique, un auteur..."
                className="w-full pl-12 pr-4 py-3.5 bg-muted-bg border border-border rounded-sm text-charcoal placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                autoFocus
              />
            </div>
          </form>
        )}
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-surface animate-fade-up">
          <nav className="max-w-[1320px] mx-auto px-4 py-4 space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/categorie/${cat.slug}`}
                className="block px-4 py-3 text-charcoal hover:bg-muted-bg rounded-sm transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex gap-2">
              <Button href="/connexion" variant="outline" size="sm" className="flex-1">
                Connexion
              </Button>
              <Button href="/abonnement" variant="gold" size="sm" className="flex-1">
                Abonnement
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
