import { AbonnementPlans } from "@/components/subscription/AbonnementPlans";

export default function AbonnementPage() {
  return (
    <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-16">
      <div className="text-center mb-16">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold">
          Subscription
        </span>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-charcoal mt-2 mb-4">
          Editorial excellence,{" "}
          <span className="text-gradient-gold">within reach</span>
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          Join our community of discerning readers and access
          all our premium content.
        </p>
        <div className="gold-line max-w-xs mx-auto mt-8" />
      </div>

      <AbonnementPlans />

      <p className="text-center text-xs text-muted mt-12 max-w-lg mx-auto">
        Demo mode: Premium subscription activates without real payment.
        In production, Stripe integration will be connected here.
      </p>
    </div>
  );
}
