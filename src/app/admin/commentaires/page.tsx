"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { formatRelativeDate } from "@/lib/utils";

interface CommentRow {
  _id: string;
  content: string;
  isApproved: boolean;
  isReported: boolean;
  createdAt: string;
  user: { name: string; email: string };
  article: { title: string; slug: string };
}

export default function AdminCommentairesPage() {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/admin/comments")
      .then((r) => r.json())
      .then((data) => setComments(data.comments ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const moderate = async (commentId: string, action: "approve" | "reject" | "delete") => {
    await fetch("/api/admin/comments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, action }),
    });
    load();
  };

  return (
    <div className="min-h-screen bg-muted-bg">
      <AdminPageHeader title="Modération des commentaires" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <p className="text-muted text-center py-12">Chargement...</p>
        ) : comments.length === 0 ? (
          <p className="text-muted text-center py-12">Aucun commentaire.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c._id}
                className={`bg-surface border rounded-sm p-5 ${
                  c.isApproved ? "border-border" : "border-gold/50 bg-gold-light/30"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium text-charcoal">{c.user?.name}</p>
                    <p className="text-xs text-muted">{c.user?.email}</p>
                  </div>
                  <span className="text-xs text-muted">{formatRelativeDate(c.createdAt)}</span>
                </div>
                <p className="text-sm text-charcoal/80 mb-3">{c.content}</p>
                {c.article?.slug && (
                  <Link href={`/article/${c.article.slug}`} className="text-xs text-accent hover:underline">
                    Sur : {c.article.title}
                  </Link>
                )}
                <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                  {!c.isApproved && (
                    <button
                      type="button"
                      onClick={() => moderate(c._id, "approve")}
                      className="text-xs text-green-700 hover:underline"
                    >
                      Approuver
                    </button>
                  )}
                  {c.isApproved && (
                    <button
                      type="button"
                      onClick={() => moderate(c._id, "reject")}
                      className="text-xs text-amber-700 hover:underline"
                    >
                      Masquer
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => moderate(c._id, "delete")}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
