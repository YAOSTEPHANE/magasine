"use client";

import { useEffect, useRef, useState } from "react";
import { CmsPage } from "@/components/admin/cms/CmsPage";
import { computeSeoScore } from "@/lib/cms-seo-score";

interface SeoSettingsForm {
  siteName: string;
  tagline: string;
  contactEmail: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  canonicalUrl: string;
  newsletterTitle: string;
  newsletterDescription: string;
  mailchimpConnected: boolean;
  brevoConnected: boolean;
}

export function CmsSeoSettingsView() {
  const [form, setForm] = useState<SeoSettingsForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) =>
        setForm({
          siteName: data.siteName ?? "PressIvoire",
          tagline: data.tagline ?? "",
          contactEmail: data.contactEmail ?? "",
          seoTitle: data.seoTitle ?? data.siteName ?? "",
          seoDescription: data.seoDescription ?? data.tagline ?? "",
          ogImage: data.ogImage ?? "",
          canonicalUrl: data.canonicalUrl ?? "https://pressivoire.ci",
          newsletterTitle: data.newsletterTitle ?? "",
          newsletterDescription: data.newsletterDescription ?? "",
          mailchimpConnected: data.mailchimpConnected ?? false,
          brevoConnected: data.brevoConnected ?? false,
        })
      );
  }, []);

  const seo = form
    ? computeSeoScore({
        title: form.siteName,
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        content: form.tagline,
        featuredImage: form.ogImage || "/logo.png",
      })
    : { score: 0, checks: [] };

  const save = async () => {
    if (!form) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setMessage(res.ok ? "Paramètres SEO enregistrés." : "Échec de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  const uploadOg = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", "Image Open Graph");
    const res = await fetch("/api/admin/medias", { method: "POST", body: fd });
    if (!res.ok) return;
    const data = await res.json();
    setForm((prev) => (prev ? { ...prev, ogImage: data.url } : prev));
  };

  if (!form) {
    return (
      <CmsPage>
        <p className="cms-empty">Chargement des paramètres SEO…</p>
      </CmsPage>
    );
  }

  return (
    <CmsPage>
      <div className="vhead">
        <div>
          <div className="vh1">Paramètres SEO</div>
          <div className="vh2">Référencement global, métadonnées du site et balises sociales</div>
        </div>
        <div className="vacts">
          <button type="button" className="btn btn-red" disabled={saving} onClick={() => void save()}>
            {saving ? "Enregistrement…" : "Enregistrer →"}
          </button>
        </div>
      </div>

      {message && <p className="cms-toast">{message}</p>}

      <div className="g21 ga">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Identité &amp; référencement</span>
            <div className={`seo-orb ${seo.score >= 70 ? "orb-ok" : "orb-warn"}`}>{seo.score}</div>
          </div>
          <div className="card-body cms-seo-body">
            <div className="field">
              <label className="lbl" htmlFor="seo-site-name">
                Nom du site
              </label>
              <input
                id="seo-site-name"
                className="input lg"
                value={form.siteName}
                onChange={(e) => setForm({ ...form, siteName: e.target.value })}
              />
            </div>
            <div className="field">
              <label className="lbl" htmlFor="seo-title">
                Titre SEO global
              </label>
              <input
                id="seo-title"
                className="input"
                value={form.seoTitle}
                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              />
            </div>
            <div className="field">
              <label className="lbl" htmlFor="seo-desc">
                Méta-description
              </label>
              <textarea
                id="seo-desc"
                className="input"
                rows={3}
                value={form.seoDescription}
                onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              />
            </div>
            <div className="field">
              <label className="lbl" htmlFor="seo-tagline">
                Slogan / chapô institutionnel
              </label>
              <textarea
                id="seo-tagline"
                className="input"
                rows={2}
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              />
            </div>
            <div className="seochips">
              {seo.checks.map((check) => (
                <span
                  key={check.id}
                  className={`seoc seo-${check.level === "ok" ? "ok" : check.level === "warn" ? "w" : "e"}`}
                >
                  {check.level === "ok" ? "✓" : check.level === "warn" ? "⚠" : "✗"} {check.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="cms-editor-side">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Newsletter &amp; contact</span>
            </div>
            <div className="card-body cms-stack">
              <div className="field">
                <label className="lbl" htmlFor="seo-email">
                  E-mail de contact
                </label>
                <input
                  id="seo-email"
                  className="input"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                />
              </div>
              <div className="field">
                <label className="lbl" htmlFor="seo-nl-title">
                  Titre bloc newsletter
                </label>
                <input
                  id="seo-nl-title"
                  className="input"
                  value={form.newsletterTitle}
                  onChange={(e) => setForm({ ...form, newsletterTitle: e.target.value })}
                />
              </div>
              <div className="field">
                <label className="lbl" htmlFor="seo-nl-desc">
                  Description newsletter
                </label>
                <textarea
                  id="seo-nl-desc"
                  className="input"
                  rows={3}
                  value={form.newsletterDescription}
                  onChange={(e) => setForm({ ...form, newsletterDescription: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">Open Graph &amp; Twitter</span>
            </div>
            <div className="card-body cms-stack">
              <div className="field">
                <label className="lbl">Image sociale par défaut</label>
                <button
                  type="button"
                  className="cms-cover-drop cms-cover-drop--sm"
                  onClick={() => fileRef.current?.click()}
                >
                  {form.ogImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.ogImage} alt="" className="cms-cover-preview" />
                  ) : (
                    <>
                      <div className="cms-cover-icon">🖼</div>
                      <div>1200 × 630 px recommandé — cliquer pour téléverser</div>
                    </>
                  )}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="cms-hidden-input"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadOg(file);
                  }}
                />
              </div>
              <div className="field">
                <label className="lbl" htmlFor="seo-canonical">
                  URL canonique
                </label>
                <input
                  id="seo-canonical"
                  className="input"
                  value={form.canonicalUrl}
                  onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CmsPage>
  );
}
