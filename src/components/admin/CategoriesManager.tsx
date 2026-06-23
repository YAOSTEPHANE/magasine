"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

interface CategoryRow {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  order: number;
  isActive: boolean;
}

const emptyForm = {
  name: "",
  description: "",
  color: "#1A3896",
  order: 0,
  isActive: true,
};

export function CategoriesManager({ initial }: { initial: CategoryRow[] }) {
  const [categories, setCategories] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reload = useCallback(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data.categories ?? []));
  }, []);

  useEffect(() => {
    if (initial.length === 0) reload();
  }, [initial.length, reload]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (cat: CategoryRow) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      description: cat.description,
      color: cat.color,
      order: cat.order,
      isActive: cat.isActive,
    });
    setError("");
    setModalOpen(true);
  };

  const save = async () => {
    setLoading(true);
    setError("");
    try {
      const url = editing ? `/api/admin/categories/${editing._id}` : "/api/admin/categories";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      setModalOpen(false);
      reload();
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this category?")) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error ?? "Delete failed");
      return;
    }
    reload();
  };

  return (
    <>
      <div className="admin-toolbar">
        <button type="button" className="admin-btn admin-btn--primary" onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Add category
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Order</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>
                  <span className="admin-color-dot" style={{ background: cat.color }} />
                  <strong>{cat.name}</strong>
                </td>
                <td className="text-muted">{cat.slug}</td>
                <td>{cat.order}</td>
                <td>
                  <span className={`admin-status-pill ${cat.isActive ? "admin-status-pill--active" : "admin-status-pill--inactive"}`}>
                    {cat.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="admin-table-actions">
                  <Link href={`/category/${cat.slug}`} className="admin-btn admin-btn--sm admin-btn--secondary mr-2">
                    View
                  </Link>
                  <button type="button" className="admin-btn admin-btn--sm admin-btn--secondary mr-2" onClick={() => openEdit(cat)}>
                    <Pencil className="w-3 h-3" />
                  </button>
                  <button type="button" className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => remove(cat._id)}>
                    <Trash2 className="w-3 h-3" />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <p className="admin-empty">No categories yet.</p>
        )}
      </div>

      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)} role="presentation">
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} role="dialog">
            <div className="admin-modal-header">
              <h2>{editing ? "Edit category" : "New category"}</h2>
            </div>
            <div className="admin-modal-body admin-form-grid">
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="admin-field">
                <label>Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="admin-field">
                <label>Description</label>
                <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="admin-field">
                <label>Color</label>
                <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
              </div>
              <div className="admin-field">
                <label>Order</label>
                <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Active
              </label>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="button" className="admin-btn admin-btn--primary" disabled={loading || !form.name} onClick={save}>
                {loading ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
