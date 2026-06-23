"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialIcons";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data.error ?? "Erreur lors de l'envoi");
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-muted-bg border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30 text-charcoal";

  return (
    <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-16">
      <div className="text-center mb-12">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold">Contact</span>
        <h1 className="font-serif text-4xl font-bold text-charcoal mt-2 mb-4">Nous contacter</h1>
        <p className="text-muted max-w-xl mx-auto">
          Rédaction, partenariats, publicité ou signalement — notre équipe vous répond sous 48h ouvrées.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          {[
            { icon: Mail, label: "Email", value: "contact@globalsouthwatch.com" },
            { icon: Phone, label: "Téléphone", value: "+225 27 00 00 00 00" },
            { icon: MapPin, label: "Siège", value: "Abidjan, Côte d'Ivoire" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 p-4 bg-surface border border-border rounded-sm">
              <Icon className="w-5 h-5 text-gold mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-muted">{label}</p>
                <p className="text-sm text-charcoal mt-1">{value}</p>
              </div>
            </div>
          ))}
          <div className="p-4 bg-surface border border-border rounded-sm">
            <p className="text-xs font-bold tracking-wider uppercase text-muted mb-3">Réseaux sociaux</p>
            <SocialLinks variant="inline" iconClassName="w-5 h-5" />
          </div>
        </div>

        <div className="lg:col-span-2">
          {success ? (
            <div className="bg-gold-light border border-gold/30 rounded-sm p-8 text-center">
              <p className="font-serif text-xl font-bold text-gold-dark mb-2">Message envoyé</p>
              <p className="text-sm text-muted">Merci ! Nous reviendrons vers vous très prochainement.</p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-4 text-sm text-accent hover:underline"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-sm p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium tracking-wider uppercase text-muted mb-2">Nom</label>
                  <input
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-wider uppercase text-muted mb-2">Email</label>
                  <input
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium tracking-wider uppercase text-muted mb-2">Sujet</label>
                <input
                  className={inputClass}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium tracking-wider uppercase text-muted mb-2">Message</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" variant="gold" disabled={loading}>
                {loading ? "Envoi..." : "Envoyer le message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
