"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

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

  const inputClass =
    "w-full px-4 py-3 bg-muted-bg border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30 text-charcoal";
  const labelClass = "block text-xs font-medium tracking-wider uppercase text-muted mb-2";

  return (
    <div className="min-h-screen bg-muted-bg">
      <div className="bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
          <Link href="/admin/articles" className="text-white/60 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-xl font-bold">Nouvel article</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-surface border border-border rounded-sm p-6 space-y-5">
          <div>
            <label className={labelClass}>Titre</label>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Sous-titre</label>
            <input
              className={inputClass}
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Chapô / Extrait</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Contenu (HTML)</label>
            <textarea
              className={`${inputClass} resize-y font-mono text-sm`}
              rows={12}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Image à la une (URL)</label>
            <input
              className={inputClass}
              value={form.featuredImage}
              onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Catégorie</label>
            <select
              className={inputClass}
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              required
            >
              <option value="">Sélectionner</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Auteur</label>
            <select
              className={inputClass}
              value={form.authorId}
              onChange={(e) => setForm({ ...form, authorId: e.target.value })}
              required
            >
              <option value="">Sélectionner</option>
              {authors.map((a) => (
                <option key={a._id} value={a._id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Tags (séparés par virgule)</label>
            <input
              className={inputClass}
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Statut</label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Brouillon</option>
              <option value="review">En révision</option>
              <option value="published">Publié</option>
              <option value="archived">Archivé</option>
            </select>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-sm p-6">
          <label className={labelClass}>Options éditoriales</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {[
              { key: "isFeatured", label: "À la une" },
              { key: "isTopStory", label: "Top Story" },
              { key: "isUrgent", label: "🔥 Urgent" },
              { key: "isEditorsChoice", label: "Choix rédaction" },
              { key: "isPremium", label: "Premium" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[key as keyof typeof form] as boolean}
                  onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                  className="rounded border-border text-gold focus:ring-gold"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" variant="gold" disabled={loading}>
            {loading ? "Enregistrement..." : "Enregistrer l'article"}
          </Button>
          <Button href="/admin/articles" variant="outline">
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}
