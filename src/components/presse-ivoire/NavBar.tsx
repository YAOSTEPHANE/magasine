import Link from "next/link";
import { NAV_RUBRIQUES } from "@/data/presse-ivoire-home";

interface NavBarProps {
  categories?: { name: string; slug: string }[];
}

export function NavBar({ categories }: NavBarProps) {
  const items = categories?.length
    ? [
        { label: "🔥 Urgent", href: "/#urgent", featured: true },
        ...categories.map((c) => ({ label: c.name, href: `/categorie/${c.slug}`, featured: false })),
      ]
    : NAV_RUBRIQUES;

  return (
    <nav className="nav-bar">
      <div className="nav-bar-inner">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={item.featured ? "featured" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <div className="nav-bar-filler" />
        <div className="nav-edition">Global South Watch</div>
      </div>
    </nav>
  );
}
