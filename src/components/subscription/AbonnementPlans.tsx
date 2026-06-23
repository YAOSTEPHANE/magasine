"use client";

import { Check } from "lucide-react";
import { SubscribeButton } from "@/components/subscription/SubscribeButton";
import { Button } from "@/components/ui/Button";

const features = [
  "Unlimited access to premium articles",
  "Ad-free reading",
  "Exclusive newsletters by section",
  "Saved articles and reading history",
  "Early access to investigations and reports",
  "Priority support",
];

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    features: ["Public articles", "Weekly newsletter", "Comments"],
    cta: "Get started for free",
    href: "/register",
    highlighted: false,
    subscribe: false as const,
  },
  {
    name: "Premium",
    price: "9.99",
    period: "/ month",
    features,
    cta: "Subscribe now",
    plan: "monthly" as const,
    highlighted: true,
    subscribe: true as const,
  },
  {
    name: "Premium Annual",
    price: "89.99",
    period: "/ year",
    features: [...features, "2 months free"],
    cta: "Save 30%",
    plan: "yearly" as const,
    highlighted: false,
    subscribe: true as const,
  },
];

export function AbonnementPlans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-sm p-8 ${
            plan.highlighted
              ? "bg-charcoal text-white border-2 border-gold shadow-luxury scale-105"
              : "bg-surface border border-border shadow-card"
          }`}
        >
          {plan.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-white text-[10px] font-bold tracking-widest uppercase rounded-sm">
              Popular
            </span>
          )}
          <h3 className={`font-serif text-xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-charcoal"}`}>
            {plan.name}
          </h3>
          <div className="mb-6">
            <span className={`text-4xl font-bold ${plan.highlighted ? "text-gold" : "text-charcoal"}`}>
              €{plan.price}
            </span>
            <span className={`text-sm ${plan.highlighted ? "text-white/60" : "text-muted"}`}>
              {plan.period}
            </span>
          </div>
          <ul className="space-y-3 mb-8">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-gold" : "text-accent"}`} />
                <span className={plan.highlighted ? "text-white/80" : "text-muted"}>{f}</span>
              </li>
            ))}
          </ul>
          {plan.subscribe ? (
            <SubscribeButton
              plan={plan.plan}
              label={plan.cta}
              variant={plan.highlighted ? "gold" : "outline"}
              className="w-full"
            />
          ) : (
            <Button href={plan.href} variant="outline" className="w-full">
              {plan.cta}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
