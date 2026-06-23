import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Politique cookies",
  description: "Utilisation des cookies sur Global South Watch.",
};

export default function CookiesPage() {
  return (
    <ContentPage
      eyebrow="Cookies"
      title="Politique de cookies"
      description="Cette page explique comment Global South Watch utilise les cookies et technologies similaires."
    >
      <ContentSection title="Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d&apos;un site.
          Il permet de mémoriser vos préférences et d&apos;améliorer votre expérience de navigation.
        </p>
      </ContentSection>

      <ContentSection title="Cookies utilisés">
        <ul className="space-y-4 not-prose">
          <li className="p-4 border border-border rounded-sm">
            <strong className="text-charcoal">Cookies essentiels</strong>
            <p className="text-sm text-muted mt-1">
              Session utilisateur, authentification, sécurité. Indispensables au fonctionnement du site.
            </p>
          </li>
          <li className="p-4 border border-border rounded-sm">
            <strong className="text-charcoal">Cookies analytiques</strong>
            <p className="text-sm text-muted mt-1">
              Mesure d&apos;audience anonymisée pour comprendre comment nos lecteurs utilisent le site.
            </p>
          </li>
          <li className="p-4 border border-border rounded-sm">
            <strong className="text-charcoal">Cookies de préférences</strong>
            <p className="text-sm text-muted mt-1">
              Mémorisation de vos choix (langue, newsletter, articles sauvegardés).
            </p>
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="Gérer vos cookies">
        <p>
          Vous pouvez configurer votre navigateur pour refuser les cookies non essentiels.
          La désactivation des cookies essentiels peut limiter certaines fonctionnalités (connexion, abonnement).
        </p>
      </ContentSection>

      <p className="text-sm text-muted pt-8 border-t border-border">
        <Link href="/confidentialite" className="text-accent hover:underline">
          Politique de confidentialité complète →
        </Link>
      </p>
    </ContentPage>
  );
}
