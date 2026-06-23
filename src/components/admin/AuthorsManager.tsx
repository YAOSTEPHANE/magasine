"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

interface AuthorRow {
  _id: string;
  name: string;
  slug: string;
  bio: string;
  email: string;
  avatar: string;
  twitter: string;
  linkedin: string;
}

const emptyForm = {
  name: "",
  bio: "",
  email: "",
  avatar: "",
  twitter: "",
  linkedin: "",
};

export function AuthorsManager({ initial }: { initial: AuthorRow[] }) {
  const [authors, setAuthors] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AuthorRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reload = useCallback(() => {
    fetch("/api/admin/authors")
      .then((r) => r.json())
      .then((data) => setAuthors(data.authors ?? []));
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

  const openEdit = (author: AuthorRow) => {
    setEditing(author);
    setForm({
      name: author.name,
      bio: author.bio,
      email: author.email,
      avatar: author.avatar,
      twitter: author.twitter,
      linkedin: author.linkedin,
    });
    setError("");
    setModalOpen(true);
  };

  const save = async () => {
    setLoading(true);
    setError("");
    try {
      const url = editing ? `/api/admin/authors/${editing._id}` : "/api/admin/authors";
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
    if (!window.confirm("Delete this author?")) return;
    const res = await fetch(`/api/admin/authors/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
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
          Add author
        </button>
      </div>

      <div className="admin-author-grid">
        {authors.map((author) => (
          <div key={author._id} className="admin-author-card">
            <div className="admin-author-card-head">
              <div>
                <h3 className="admin-author-name">{author.name}</h3>
                <p className="admin-author-slug">{author.slug}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="admin-btn admin-btn--sm admin-btn--secondary" onClick={() => openEdit(author)}>
                  <Pencil className="w-3 h-3" />
                </button>
                <button type="button" className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => remove(author._id)}>
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            {author.bio && <p className="admin-author-bio line-clamp-3">{author.bio}</p>}
            <Link href={`/author/${author.slug}`} className="admin-action-link" style={{ marginTop: 16 }}>
              View author page →
            </Link>
          </div>
        ))}
      </div>

      {authors.length === 0 && (
        <p className="admin-empty">No authors yet.</p>
      )}

      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)} role="presentation">
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} role="dialog">
            <div className="admin-modal-header">
              <h2>{editing ? "Edit author" : "New author"}</h2>
            </div>
            <div className="admin-modal-body admin-form-grid">
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="admin-field">
                <label>Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="admin-field">
                <label>Bio</label>
                <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              </div>
              <div className="admin-field">
                <label>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="admin-field">
                <label>Avatar URL</label>
                <input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
              </div>
              <div className="admin-field">
                <label>Twitter</label>
                <input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} />
              </div>
              <div className="admin-field">
                <label>LinkedIn</label>
                <input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
              </div>
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
