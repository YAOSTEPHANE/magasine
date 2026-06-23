import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection, ContentSocialBlock } from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales et éditoriales — Global South Watch.",
};

export default function MentionsLegalesPage() {
  return (
    <ContentPage
      eyebrow="Légal"
      title="Mentions légales"
      description="Informations relatives à l'éditeur, à l'hébergement et aux responsabilités éditoriales de Global South Watch."
    >
      <ContentSection title="Éditeur du site">
        <ul className="space-y-2 not-prose text-sm">
          <li><strong>Raison sociale :</strong> Digitalpro Solutions</li>
          <li><strong>Marque éditoriale :</strong> Global South Watch</li>
          <li><strong>Siège :</strong> Abidjan, Côte d&apos;Ivoire</li>
          <li><strong>Email :</strong>{" "}
            <a href="mailto:contact@globalsouthwatch.com" className="text-accent hover:underline">
              contact@globalsouthwatch.com
            </a>
          </li>
          <li><strong>Directeur de la publication :</strong> Direction éditoriale Global South Watch</li>
        </ul>
      </ContentSection>

      <ContentSection title="Hébergement">
        <p>
          Le site est hébergé selon l&apos;infrastructure de production configurée par l&apos;éditeur.
          Les données utilisateurs sont stockées de manière sécurisée conformément à notre{" "}
          <Link href="/confidentialite" className="text-accent hover:underline">
            politique de confidentialité
          </Link>.
        </p>
      </ContentSection>

      <ContentSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus publiés sur Global South Watch (textes, images, vidéos, logos)
          est protégé par le droit d&apos;auteur. Toute reproduction sans autorisation écrite préalable
          de l&apos;éditeur est interdite.
        </p>
      </ContentSection>

      <ContentSection title="Responsabilité">
        <p>
          Global South Watch s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées.
          Toutefois, l&apos;éditeur ne saurait être tenu responsable des omissions ou inexactitudes.
          Les commentaires publiés par les lecteurs engagent leur auteur.
        </p>
      </ContentSection>

      <ContentSection title="Liens utiles">
        <ul className="space-y-2">
          <li><Link href="/charte-editoriale" className="text-accent hover:underline">Charte éditoriale</Link></li>
          <li><Link href="/cgu" className="text-accent hover:underline">Conditions générales d&apos;utilisation</Link></li>
          <li><Link href="/confidentialite" className="text-accent hover:underline">Politique de confidentialité</Link></li>
          <li><Link href="/accessibilite" className="text-accent hover:underline">Accessibilité</Link></li>
        </ul>
      </ContentSection>

      <ContentSocialBlock />
    </ContentPage>
  );
}
