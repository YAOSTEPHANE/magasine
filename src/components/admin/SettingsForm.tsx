"use client";

import { useEffect, useState } from "react";
import { toast } from "@/lib/toast";

interface SettingsData {
  siteName: string;
  tagline: string;
  contactEmail: string;
  breakingAlertEnabled: boolean;
  commentsEnabled: boolean;
  newsletterEnabled: boolean;
  maintenanceMode: boolean;
  updatedAt?: string;
}

export function SettingsForm() {
  const [form, setForm] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => setForm(data))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    if (!form) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        setForm(data);
        toast.success("Paramètres enregistrés");
      } else {
        toast.error("Échec de l'enregistrement");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return <p className="admin-loading">Loading settings…</p>;
  }

  return (
    <div className="admin-card admin-card-padded admin-form-grid max-w-2xl">
      <div className="admin-field">
        <label>Site name</label>
        <input value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} />
      </div>
      <div className="admin-field">
        <label>Tagline</label>
        <textarea rows={2} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
      </div>
      <div className="admin-field">
        <label>Contact email</label>
        <input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
      </div>
      <div className="admin-checkbox-grid">
        {(
          [
            ["breakingAlertEnabled", "Breaking news ticker"],
            ["commentsEnabled", "Reader comments"],
            ["newsletterEnabled", "Newsletter sign-ups"],
            ["maintenanceMode", "Maintenance mode"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="admin-checkbox-label">
            <input
              type="checkbox"
              checked={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
            />
            {label}
          </label>
        ))}
      </div>
      <div>
        <button type="button" className="admin-btn admin-btn--primary" disabled={saving} onClick={save}>
          {saving ? "Saving…" : "Save settings"}
        </button>
      </div>
    </div>
  );
}
