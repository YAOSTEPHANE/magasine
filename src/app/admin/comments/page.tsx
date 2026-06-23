"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
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

type Filter = "all" | "pending" | "approved";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  const load = () => {
    setLoading(true);
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

  const filtered = comments.filter((c) => {
    if (filter === "pending") return !c.isApproved;
    if (filter === "approved") return c.isApproved;
    return true;
  });

  return (
    <>
      <AdminPageTitle
        title="Comment moderation"
        description="Approve, hide, or remove reader comments."
      />
      <div className="admin-content">
        <div className="admin-toolbar">
          <div className="admin-toolbar-filters">
            {(
              [
                ["all", "All"],
                ["pending", "Pending"],
                ["approved", "Approved"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`admin-filter-pill${filter === value ? " admin-filter-pill--active" : ""}`}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="admin-loading">Loading comments…</p>
        ) : filtered.length === 0 ? (
          <p className="admin-empty">No comments in this view.</p>
        ) : (
          <div className="admin-comment-list">
            {filtered.map((c) => (
              <div
                key={c._id}
                className={`admin-comment-card${c.isApproved ? "" : " admin-comment-card--pending"}`}
              >
                <div className="admin-comment-head">
                  <div>
                    <p className="admin-comment-author">{c.user?.name}</p>
                    <p className="admin-comment-email">{c.user?.email}</p>
                  </div>
                  <span className="admin-comment-time">{formatRelativeDate(c.createdAt)}</span>
                </div>
                <p className="admin-comment-body">{c.content}</p>
                {c.isReported && (
                  <p className="admin-comment-flag">Reported by readers</p>
                )}
                {c.article?.slug && (
                  <Link href={`/article/${c.article.slug}`} className="admin-comment-article">
                    On: {c.article.title}
                  </Link>
                )}
                <div className="admin-comment-actions">
                  {!c.isApproved && (
                    <button
                      type="button"
                      onClick={() => moderate(c._id, "approve")}
                      className="admin-btn admin-btn--sm admin-btn--secondary"
                    >
                      Approve
                    </button>
                  )}
                  {c.isApproved && (
                    <button
                      type="button"
                      onClick={() => moderate(c._id, "reject")}
                      className="admin-btn admin-btn--sm admin-btn--secondary"
                    >
                      Hide
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => moderate(c._id, "delete")}
                    className="admin-btn admin-btn--sm admin-btn--danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
