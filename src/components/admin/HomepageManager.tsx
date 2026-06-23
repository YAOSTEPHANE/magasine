"use client";

import { useState } from "react";
import Link from "next/link";
import type { HomepageSectionStatus } from "@/lib/homepage-admin";
import type { PublicSiteSettings, TrustPartner } from "@/lib/site-settings";
import type { HomeSectionId } from "@/lib/homepage-sections";

interface HomepageManagerProps {
  initialSettings: PublicSiteSettings;
  initialSections: HomepageSectionStatus[];
  alertCount: number;
}

const emptyPartner = (): TrustPartner => ({
  name: "",
  logo: "/images/partners/",
  width: 120,
  height: 28,
  url: "",
  isActive: true,
});

export function HomepageManager({
  initialSettings,
  initialSections,
  alertCount,
}: HomepageManagerProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [sections, setSections] = useState(initialSections);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const save = async (patch: Partial<PublicSiteSettings>) => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error ?? "Save failed");
        return;
      }
      setSettings(data);
      if (patch.homeSections) {
        setSections((prev) =>
          prev.map((s) => ({
            ...s,
            enabled: data.homeSections[s.id as HomeSectionId],
          }))
        );
      }
      setMessage("Homepage updated.");
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (id: HomeSectionId, enabled: boolean) => {
    const homeSections = { ...settings.homeSections, [id]: enabled };
    void save({ homeSections });
  };

  const updatePulse = (index: number, field: "value" | "label", value: string) => {
    const pulseStats = settings.pulseStats.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    );
    setSettings({ ...settings, pulseStats });
  };

  const updateClosing = (
    index: number,
    field: "num" | "suffix" | "label",
    value: string
  ) => {
    const closingStats = settings.closingStats.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    );
    setSettings({ ...settings, closingStats });
  };

  const updatePartner = (
    index: number,
    field: keyof TrustPartner,
    value: string | number | boolean
  ) => {
    const trustPartners = settings.trustPartners.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setSettings({ ...settings, trustPartners });
  };

  const addPartner = () => {
    setSettings({ ...settings, trustPartners: [...settings.trustPartners, emptyPartner()] });
  };

  const removePartner = (index: number) => {
    setSettings({
      ...settings,
      trustPartners: settings.trustPartners.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {message && <p className="admin-message admin-message--success">{message}</p>}

      <div className="admin-card admin-card-padded">
        <div className="admin-panel-head">
          <h2 className="admin-panel-title">Homepage sections</h2>
          <p className="admin-panel-desc">
            Toggle each block on the public homepage. Article slots are filled automatically from editorial flags and categories.
          </p>
        </div>
        <div className="space-y-3">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`admin-section-tile${settings.homeSections[section.id] ? " admin-section-tile--enabled" : ""}`}
            >
              <div className="admin-section-tile-head">
                <div>
                  <div className="admin-section-tile-title">
                    <h3>{section.label}</h3>
                    <label className="admin-toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.homeSections[section.id]}
                        onChange={(e) => toggleSection(section.id, e.target.checked)}
                        disabled={saving}
                      />
                      Visible on site
                    </label>
                  </div>
                  <p className="admin-section-tile-desc">{section.description}</p>
                  {section.articleFlag && (
                    <p className="admin-section-tile-meta">
                      Flag: <code>{section.articleFlag}</code>
                    </p>
                  )}
                  {section.id === "intro" && (
                    <p className="admin-section-tile-meta">
                      {settings.trustPartners.filter((p) => p.isActive).length} trust partner
                      {settings.trustPartners.filter((p) => p.isActive).length !== 1 ? "s" : ""} ·{" "}
                      {settings.pulseStats.length} pulse stats
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {section.articlesHref && (
                    <Link href={section.articlesHref} className="admin-btn admin-btn--sm admin-btn--secondary">
                      Manage content
                    </Link>
                  )}
                  {section.id === "urgent" && (
                    <Link href="/admin/alerts" className="admin-btn admin-btn--sm admin-btn--secondary">
                      Alerts ({alertCount})
                    </Link>
                  )}
                </div>
              </div>
              {section.articles.length > 0 ? (
                <ul className="admin-section-articles">
                  {section.articles.map((a) => (
                    <li key={a._id}>
                      <span className="line-clamp-1">{a.title}</span>
                      <Link href={`/admin/articles/${a._id}`} className="admin-action-link">
                        Edit
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : section.id !== "intro" && section.id !== "megaAd" && section.id !== "closing" ? (
                <p className="admin-section-tile-meta" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                  No articles in this slot yet.
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card admin-card-padded admin-form-grid">
        <h2 className="admin-panel-title">Intro — masthead & pulse</h2>
        <p className="admin-panel-desc">
          Edition header, live pulse stats, and the &quot;As seen in&quot; trust strip.
        </p>
        <div className="admin-field">
          <label>Edition badge</label>
          <input
            value={settings.mastheadBadge}
            onChange={(e) => setSettings({ ...settings, mastheadBadge: e.target.value })}
            placeholder="Today's Edition"
          />
        </div>
        <div className="admin-field">
          <label>Tagline</label>
          <textarea
            rows={2}
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Edition volume</label>
          <input
            value={settings.mastheadVolume}
            onChange={(e) => setSettings({ ...settings, mastheadVolume: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Bureau cities</label>
          <input
            value={settings.mastheadCities}
            onChange={(e) => setSettings({ ...settings, mastheadCities: e.target.value })}
          />
        </div>
        {settings.pulseStats.map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <div className="admin-field">
              <label>Pulse value {i + 1}</label>
              <input value={stat.value} onChange={(e) => updatePulse(i, "value", e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Pulse label {i + 1}</label>
              <input value={stat.label} onChange={(e) => updatePulse(i, "label", e.target.value)} />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          disabled={saving}
          onClick={() =>
            save({
              mastheadBadge: settings.mastheadBadge,
              tagline: settings.tagline,
              mastheadVolume: settings.mastheadVolume,
              mastheadCities: settings.mastheadCities,
              pulseStats: settings.pulseStats,
            })
          }
        >
          Save masthead & pulse
        </button>
      </div>

      <div className="admin-card admin-card-padded">
        <div className="admin-panel-head" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h2 className="admin-panel-title">Trust strip — As seen in</h2>
            <p className="admin-panel-desc">
              Partner logos shown in the scrolling strip below the masthead.
            </p>
          </div>
          <label className="admin-toggle-label">
            <input
              type="checkbox"
              checked={settings.trustStripEnabled}
              onChange={(e) => setSettings({ ...settings, trustStripEnabled: e.target.checked })}
            />
            Show trust strip
          </label>
        </div>

        <div className="admin-field mb-6">
          <label>Strip label</label>
          <input
            value={settings.trustStripLabel}
            onChange={(e) => setSettings({ ...settings, trustStripLabel: e.target.value })}
            placeholder="As seen in"
          />
        </div>

        <div className="space-y-4 mb-6">
          {settings.trustPartners.map((partner, i) => (
            <div key={i} className="admin-nested-card">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <label className="admin-toggle-label">
                  <input
                    type="checkbox"
                    checked={partner.isActive}
                    onChange={(e) => updatePartner(i, "isActive", e.target.checked)}
                  />
                  Active
                </label>
                <button
                  type="button"
                  className="admin-btn admin-btn--sm admin-btn--danger"
                  onClick={() => removePartner(i)}
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="admin-field">
                  <label>Name</label>
                  <input
                    value={partner.name}
                    onChange={(e) => updatePartner(i, "name", e.target.value)}
                    placeholder="RFI"
                  />
                </div>
                <div className="admin-field">
                  <label>Logo URL</label>
                  <input
                    value={partner.logo}
                    onChange={(e) => updatePartner(i, "logo", e.target.value)}
                    placeholder="/images/partners/rfi.svg"
                  />
                </div>
                <div className="admin-field">
                  <label>Width (px)</label>
                  <input
                    type="number"
                    min={1}
                    value={partner.width}
                    onChange={(e) => updatePartner(i, "width", Number(e.target.value))}
                  />
                </div>
                <div className="admin-field">
                  <label>Height (px)</label>
                  <input
                    type="number"
                    min={1}
                    value={partner.height}
                    onChange={(e) => updatePartner(i, "height", Number(e.target.value))}
                  />
                </div>
                <div className="admin-field sm:col-span-2">
                  <label>Link URL (optional)</label>
                  <input
                    value={partner.url ?? ""}
                    onChange={(e) => updatePartner(i, "url", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
              {partner.logo && (
                <div className="mt-3 pt-3 border-t border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logo}
                    alt={partner.name || "Preview"}
                    width={partner.width}
                    height={partner.height}
                    className="h-7 w-auto object-contain opacity-80"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" className="admin-btn admin-btn--secondary" onClick={addPartner}>
            Add partner
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--primary"
            disabled={saving}
            onClick={() =>
              save({
                trustStripLabel: settings.trustStripLabel,
                trustStripEnabled: settings.trustStripEnabled,
                trustPartners: settings.trustPartners.map((p) => ({
                  ...p,
                  url: p.url?.trim() || undefined,
                })),
              })
            }
          >
            Save trust strip
          </button>
        </div>
      </div>

      <div className="admin-card admin-card-padded admin-form-grid">
        <h2 className="admin-panel-title">Closing band</h2>
        {settings.closingStats.map((stat, i) => (
          <div key={i} className="grid grid-cols-3 gap-2">
            <div className="admin-field">
              <label>Num</label>
              <input value={stat.num} onChange={(e) => updateClosing(i, "num", e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Suffix</label>
              <input value={stat.suffix} onChange={(e) => updateClosing(i, "suffix", e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Label</label>
              <input value={stat.label} onChange={(e) => updateClosing(i, "label", e.target.value)} />
            </div>
          </div>
        ))}
        <div className="admin-field">
          <label>Newsletter title</label>
          <input
            value={settings.newsletterTitle}
            onChange={(e) => setSettings({ ...settings, newsletterTitle: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Newsletter emphasis line</label>
          <input
            value={settings.newsletterTitleEm}
            onChange={(e) => setSettings({ ...settings, newsletterTitleEm: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Newsletter description</label>
          <textarea
            rows={2}
            value={settings.newsletterDescription}
            onChange={(e) => setSettings({ ...settings, newsletterDescription: e.target.value })}
          />
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          disabled={saving}
          onClick={() =>
            save({
              closingStats: settings.closingStats,
              newsletterTitle: settings.newsletterTitle,
              newsletterTitleEm: settings.newsletterTitleEm,
              newsletterDescription: settings.newsletterDescription,
            })
          }
        >
          Save closing band
        </button>
      </div>
    </div>
  );
}
