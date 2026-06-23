import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données — Global South Watch",
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-charcoal mb-8">Politique de confidentialité</h1>
      <div className="prose prose-charcoal space-y-6 text-charcoal/80 leading-relaxed">
        <p>
          Global South Watch, édité par Digitalpro Solutions, s&apos;engage à protéger la vie privée de ses lecteurs
          conformément au Règlement Général sur la Protection des Données (RGPD) et aux lois applicables en Côte d&apos;Ivoire.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Données collectées</h2>
        <p>
          Nous collectons les données que vous nous fournissez lors de l&apos;inscription (nom, email), de l&apos;abonnement
          newsletter, des commentaires et du formulaire de contact. Des données de navigation anonymisées peuvent être
          collectées via des cookies techniques et analytiques.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Utilisation des données</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Gestion de votre compte lecteur et abonnement Premium</li>
          <li>Envoi de newsletters selon vos préférences</li>
          <li>Amélioration de nos contenus et de l&apos;expérience utilisateur</li>
          <li>Réponse à vos demandes via le formulaire de contact</li>
        </ul>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Cookies</h2>
        <p>
          Notre site utilise des cookies essentiels au fonctionnement (session, authentification) et des cookies
          analytiques pour mesurer l&apos;audience. Vous pouvez configurer votre navigateur pour refuser les cookies non essentiels.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Vos droits</h2>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données.
          Pour exercer ces droits, contactez-nous à{" "}
          <a href="mailto:privacy@globalsouthwatch.com" className="text-accent hover:underline">
            privacy@globalsouthwatch.com
          </a>
          .
        </p>
        <p className="text-sm text-muted pt-8 border-t border-border">
          Dernière mise à jour : juin 2026 —{" "}
          <Link href="/mentions-legales" className="text-accent hover:underline">Mentions légales</Link>
        </p>
      </div>
    </div>
  );
}
