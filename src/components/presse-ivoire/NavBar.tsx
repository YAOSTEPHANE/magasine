import Link from "next/link";
import { NAV_SECTIONS } from "@/data/presse-ivoire-home";

interface NavBarProps {
  categories?: { name: string; slug: string }[];
}

export function NavBar({ categories }: NavBarProps) {
  const items = categories?.length
    ? categories.map((c) => ({ label: c.name, href: `/category/${c.slug}` }))
    : NAV_SECTIONS;

  return (
    <nav className="nav-bar">
      <div className="nav-bar-inner">
        {items.map((item) => (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ))}
        <div className="nav-bar-filler" />
        <div className="nav-edition">Global South Watch</div>
      </div>
    </nav>
  );
}
