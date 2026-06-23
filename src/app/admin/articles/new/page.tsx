"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

interface Category {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
}

export default function NewArticlePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    categoryId: "",
    authorId: "",
    tags: "",
    status: "draft",
    isFeatured: false,
    isEditorsChoice: false,
    isTopStory: false,
    isUrgent: false,
    isPremium: false,
  });

  useEffect(() => {
    fetch("/api/admin/meta")
      .then((r) => r.json())
      .then((data) => {
        setCategories(data.categories ?? []);
        setAuthors(data.authors ?? []);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        router.push("/admin/articles");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminPageTitle title="New article" backHref="/admin/articles" />
      <form onSubmit={handleSubmit} className="admin-content max-w-4xl">
        <div className="admin-form-panel admin-form-grid">
          <h2 className="admin-form-panel-title">Story</h2>
          <div className="admin-field">
            <label>Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="admin-field">
            <label>Subtitle</label>
            <input
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label>Lead / Excerpt</label>
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
            />
          </div>
          <div className="admin-field">
            <label>Content</label>
            <RichTextEditor
              value={form.content}
              onChange={(content) => setForm({ ...form, content })}
            />
          </div>
          <div className="admin-field">
            <label>Featured image (URL)</label>
            <input
              value={form.featuredImage}
              onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="admin-form-panel admin-form-grid-2">
          <h2 className="admin-form-panel-title" style={{ gridColumn: "1 / -1" }}>Metadata</h2>
          <div className="admin-field">
            <label>Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              required
            >
              <option value="">Select</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label>Author</label>
            <select
              value={form.authorId}
              onChange={(e) => setForm({ ...form, authorId: e.target.value })}
              required
            >
              <option value="">Select</option>
              {authors.map((a) => (
                <option key={a._id} value={a._id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label>Tags (comma-separated)</label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="review">In review</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="admin-form-panel">
          <h2 className="admin-form-panel-title">Editorial options</h2>
          <div className="admin-checkbox-grid">
            {[
              { key: "isFeatured", label: "Featured" },
              { key: "isTopStory", label: "Top Story" },
              { key: "isUrgent", label: "Urgent" },
              { key: "isEditorsChoice", label: "Editor's choice" },
              { key: "isPremium", label: "Premium" },
            ].map(({ key, label }) => (
              <label key={key} className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={form[key as keyof typeof form] as boolean}
                  onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div className="admin-form-actions">
          <Button type="submit" variant="gold" disabled={loading}>
            {loading ? "Saving..." : "Save article"}
          </Button>
          <Button href="/admin/articles" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
