"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Bookmark } from "lucide-react";

export function SaveArticleButton({ articleId }: { articleId: string }) {
  const { data: session, status } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((data) => {
        const ids = (data.savedArticles ?? []).map((a: { _id: string }) => a._id);
        setSaved(ids.includes(articleId));
      })
      .catch(() => undefined);
  }, [session, articleId]);

  const toggle = async () => {
    if (!session?.user) {
      window.location.href = `/connexion?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
      });
      if (res.ok) {
        const data = await res.json();
        setSaved(data.saved);
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return null;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-2 text-sm transition-colors disabled:opacity-50 ${
        saved ? "text-gold" : "text-muted hover:text-accent"
      }`}
    >
      <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
