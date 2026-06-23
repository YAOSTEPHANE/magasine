import Link from "next/link";
import { BrandLogo } from "@/components/presse-ivoire/BrandLogo";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <BrandLogo variant="auth" />
      <h1 className="font-serif text-6xl font-bold text-charcoal mt-10 mb-4">404</h1>
      <p className="text-xl text-muted mb-2">Page introuvable</p>
      <p className="text-sm text-muted max-w-md mb-8">
        L&apos;article ou la page que vous recherchez n&apos;existe pas ou a été déplacé.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-charcoal text-white text-sm rounded-sm hover:bg-charcoal/90 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/recherche"
          className="px-6 py-3 border border-border text-charcoal text-sm rounded-sm hover:bg-muted-bg transition-colors"
        >
          Rechercher un article
        </Link>
      </div>
    </div>
  );
}
