"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface AlertRow {
  _id: string;
  text: string;
  link: string;
  isActive: boolean;
  order: number;
}

const emptyForm = { text: "", link: "", isActive: true, order: 0 };

export function AlertsManager({ initial }: { initial: AlertRow[] }) {
  const [alerts, setAlerts] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(() => {
    fetch("/api/admin/alerts")
      .then((r) => r.json())
      .then((data) => setAlerts(data.alerts ?? []));
  }, []);

  useEffect(() => {
    if (initial.length === 0) reload();
  }, [initial.length, reload]);

  const save = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setModalOpen(false);
        setForm(emptyForm);
        reload();
      }
    } finally {
      setLoading(false);
    }
  };

  const toggle = async (alert: AlertRow) => {
    await fetch(`/api/admin/alerts/${alert._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !alert.isActive }),
    });
    reload();
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this alert?")) return;
    await fetch(`/api/admin/alerts/${id}`, { method: "DELETE" });
    reload();
  };

  return (
    <>
      <div className="admin-toolbar">
        <button type="button" className="admin-btn admin-btn--primary" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add alert
        </button>
      </div>

      <div className="admin-alert-list">
        {alerts.map((alert) => (
          <div
            key={alert._id}
            className={`admin-alert-item${alert.isActive ? " admin-alert-item--active" : ""}`}
          >
            <div>
              <p className="admin-alert-text">{alert.text}</p>
              {alert.link && <p className="admin-alert-meta">{alert.link}</p>}
              <p className="admin-alert-meta">Order: {alert.order}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={`admin-btn admin-btn--sm ${alert.isActive ? "admin-btn--primary" : "admin-btn--secondary"}`}
                onClick={() => toggle(alert)}
              >
                {alert.isActive ? "Active" : "Inactive"}
              </button>
              <button type="button" className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => remove(alert._id)}>
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <p className="admin-empty">No breaking alerts configured.</p>
        )}
      </div>

      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)} role="presentation">
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} role="dialog">
            <div className="admin-modal-header">
              <h2>New breaking alert</h2>
            </div>
            <div className="admin-modal-body admin-form-grid">
              <div className="admin-field">
                <label>Alert text</label>
                <input value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
              </div>
              <div className="admin-field">
                <label>Link (optional)</label>
                <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="/urgent" />
              </div>
              <div className="admin-field">
                <label>Order</label>
                <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="button" className="admin-btn admin-btn--primary" disabled={loading || !form.text} onClick={save}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
