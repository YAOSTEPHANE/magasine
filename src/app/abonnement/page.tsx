import { AbonnementPlans } from "@/components/subscription/AbonnementPlans";

export default function AbonnementPage() {
  return (
    <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-16">
      <div className="text-center mb-16">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold">
          Abonnement
        </span>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-charcoal mt-2 mb-4">
          L&apos;excellence éditoriale,{" "}
          <span className="text-gradient-gold">à portée de main</span>
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          Rejoignez notre communauté de lecteurs exigeants et accédez à
          l&apos;intégralité de nos contenus premium.
        </p>
        <div className="gold-line max-w-xs mx-auto mt-8" />
      </div>

      <AbonnementPlans />

      <p className="text-center text-xs text-muted mt-12 max-w-lg mx-auto">
        Mode démo : l&apos;abonnement Premium s&apos;active sans paiement réel.
        En production, l&apos;intégration Stripe sera connectée ici.
      </p>
    </div>
  );
}
