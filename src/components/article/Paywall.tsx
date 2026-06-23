import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Paywall() {
  return (
    <div className="relative mt-8">
      <div
        className="absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-surface pointer-events-none"
        aria-hidden
      />
      <div className="bg-charcoal text-white rounded-sm p-8 lg:p-12 text-center border border-gold/30 shadow-luxury">
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
          <Lock className="w-7 h-7 text-gold" />
        </div>
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold">
          Contenu Premium
        </span>
        <h3 className="font-serif text-2xl lg:text-3xl font-bold mt-3 mb-4">
          Continuez votre lecture avec Premium
        </h3>
        <p className="text-white/70 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
          Accédez à l&apos;intégralité de nos enquêtes, analyses et reportages exclusifs.
          Sans publicité, avec des newsletters dédiées et un accès anticipé aux grands dossiers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/abonnement" variant="gold">
            S&apos;abonner — 9,99€/mois
          </Button>
          <Button href="/connexion" variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Se connecter
          </Button>
        </div>
        <p className="text-xs text-white/50 mt-6">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="text-gold hover:underline">
            Créer un compte gratuit
          </Link>
        </p>
      </div>
    </div>
  );
}
