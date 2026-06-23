import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "CGU — Global South Watch",
};

export default function CguPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-charcoal mb-8">Conditions générales d&apos;utilisation</h1>
      <div className="prose prose-charcoal space-y-6 text-charcoal/80 leading-relaxed">
        <p>
          L&apos;accès et l&apos;utilisation du site Global South Watch impliquent l&apos;acceptation pleine et entière
          des présentes conditions générales d&apos;utilisation.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Objet du service</h2>
        <p>
          Global South Watch est un portail d&apos;information en ligne proposant des articles, analyses, vidéos
          et newsletters sur l&apos;actualité africaine et du Sud global. Certains contenus sont réservés aux abonnés Premium.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Compte utilisateur</h2>
        <p>
          La création d&apos;un compte est gratuite. Vous êtes responsable de la confidentialité de vos identifiants.
          Toute activité réalisée depuis votre compte vous est imputable.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Abonnement Premium</h2>
        <p>
          L&apos;abonnement Premium donne accès à des contenus exclusifs. Les tarifs en vigueur sont affichés sur la page{" "}
          <Link href="/abonnement" className="text-accent hover:underline">Abonnement</Link>.
          En mode démo, l&apos;activation Premium ne déclenche pas de paiement réel.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus (textes, images, vidéos, logos) est protégé par le droit d&apos;auteur.
          Toute reproduction sans autorisation écrite de l&apos;éditeur est interdite.
        </p>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-8">Commentaires</h2>
        <p>
          Les commentaires publiés doivent respecter la charte éditoriale. Global South Watch se réserve le droit
          de modérer ou supprimer tout contenu inapproprié, diffamatoire ou hors sujet.
        </p>
        <p className="text-sm text-muted pt-8 border-t border-border">
          Dernière mise à jour : juin 2026 —{" "}
          <Link href="/confidentialite" className="text-accent hover:underline">Politique de confidentialité</Link>
        </p>
      </div>
    </div>
  );
}
