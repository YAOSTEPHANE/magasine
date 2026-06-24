"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import type { ArticleListRow } from "@/components/admin/cms/CmsArticlesView";
import { CmsStatusBadge, formatArticleDate, formatRelativeFr, authorAvatarGradient, authorInitials, categoryAccent } from "@/components/admin/cms/cms-ui";

interface CmsArticlesTableProps {
  articles: ArticleListRow[];
  activeCount: number;
  page: number;
  totalPages: number;
  baseHref: string;
}

async function bulkAction(action: string, articleIds: string[]) {
  await fetch("/api/admin/articles/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, articleIds }),
  });
}

export function CmsArticlesTable({
  articles,
  activeCount,
  page,
  totalPages,
  baseHref,
}: CmsArticlesTableProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);

  const toggleAll = () => {
    if (selected.size === articles.length) setSelected(new Set());
    else setSelected(new Set(articles.map((a) => a._id)));
  };

  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const runBulk = async (action: "publish" | "archive" | "restore" | "delete") => {
    if (selected.size === 0) return;
    if (action === "delete" && !confirm("Supprimer les articles sélectionnés ?")) return;
    setBusy(true);
    try {
      await bulkAction(action, Array.from(selected));
      setSelected(new Set());
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  const rowAction = async (id: string, action: "publish" | "archive" | "restore" | "delete") => {
    if (action === "delete" && !confirm("Supprimer cet article ?")) return;
    setBusy(true);
    try {
      if (action === "delete") {
        await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      } else {
        await bulkAction(action, [id]);
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  const importCsv = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,text/csv";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const text = await file.text();
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) {
        window.alert("CSV vide ou invalide.");
        return;
      }
      window.alert(
        `Import CSV : ${lines.length - 1} ligne(s) détectée(s). Créez les articles via l'éditeur pour l'instant — import automatique en cours de finalisation.`
      );
    };
    input.click();
  };

  return (
    <>
      <div className="vacts cms-articles-toolbar">
        <button type="button" className="btn btn-out" onClick={importCsv}>
          Importer CSV
        </button>
      </div>

      {selected.size > 0 && (
        <div className="qarow">
          <button type="button" className="qa" disabled={busy} onClick={() => void runBulk("publish")}>
            Publier ({selected.size})
          </button>
          <button type="button" className="qa" disabled={busy} onClick={() => void runBulk("archive")}>
            Archiver
          </button>
          <button type="button" className="qa" disabled={busy} onClick={() => void runBulk("delete")}>
            Supprimer
          </button>
        </div>
      )}

      <div className="card mb16">
        <div className="card-np">
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <input
                    type="checkbox"
                    aria-label="Tout sélectionner"
                    checked={articles.length > 0 && selected.size === articles.length}
                    onChange={toggleAll}
                  />
                </th>
                <th>Titre</th>
                <th>Auteur</th>
                <th>Rubrique</th>
                <th>Statut</th>
                <th>Vues</th>
                <th>Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 && (
                <tr>
                  <td colSpan={8} className="cms-empty-cell">
                    Aucun article ne correspond à vos filtres.
                  </td>
                </tr>
              )}
              {articles.map((article) => {
                const color = categoryAccent(article.categoryName);
                const dateLabel =
                  article.status === "published" && article.publishedAt
                    ? formatArticleDate(article.publishedAt)
                    : article.status === "scheduled" && article.scheduledAt
                      ? formatArticleDate(article.scheduledAt)
                      : article.status === "review"
                        ? `Soumis ${formatRelativeFr(article.updatedAt)}`
                        : article.status === "draft"
                          ? `Modifié ${formatRelativeFr(article.updatedAt)}`
                          : formatRelativeFr(article.updatedAt);

                return (
                  <tr key={article._id}>
                    <td>
                      <input
                        type="checkbox"
                        aria-label={`Sélectionner ${article.title}`}
                        checked={selected.has(article._id)}
                        onChange={() => toggleOne(article._id)}
                      />
                    </td>
                    <td>
                      <div className="tc-main">{article.title}</div>
                      <div className="tc-sub">
                        {article.readingTime > 0
                          ? `${article.readingTime} min de lecture`
                          : article.status === "draft"
                            ? "brouillon en cours"
                            : "—"}
                      </div>
                    </td>
                    <td>
                      <div className="cms-author-cell">
                        <div className="av" style={{ background: authorAvatarGradient(article.authorName) }}>
                          {authorInitials(article.authorName)}
                        </div>
                        <span>{article.authorName}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: "11.5px", color }}>{article.categoryName}</span>
                    </td>
                    <td>
                      <CmsStatusBadge status={article.status} scheduledAt={article.scheduledAt} />
                    </td>
                    <td style={{ fontFamily: "var(--mono)", fontSize: "11.5px" }}>
                      {article.views > 0 ? article.views.toLocaleString("fr-FR") : "—"}
                    </td>
                    <td className="tc-muted">{dateLabel}</td>
                    <td>
                      <div className="cms-row-actions">
                        {article.status === "review" && (
                          <button
                            type="button"
                            className="btn btn-red btn-xs"
                            disabled={busy}
                            onClick={() => void rowAction(article._id, "publish")}
                          >
                            Publier
                          </button>
                        )}
                        <Link href={`/admin/articles/${article._id}`} className="btn btn-ghost btn-xs btn-icon" title="Modifier">
                          ✏️
                        </Link>
                        {article.status !== "draft" && article.slug && (
                          <Link href={`/article/${article.slug}`} className="btn btn-ghost btn-xs btn-icon" title="Voir" target="_blank">
                            👁
                          </Link>
                        )}
                        {article.status === "archived" ? (
                          <button type="button" className="btn btn-ghost btn-xs" disabled={busy} onClick={() => void rowAction(article._id, "restore")}>
                            Restaurer
                          </button>
                        ) : article.status === "draft" ? (
                          <button type="button" className="btn btn-ghost btn-xs btn-icon" title="Supprimer" disabled={busy} onClick={() => void rowAction(article._id, "delete")}>
                            🗑
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pag">
        <div className="paginfo">
          Page {page} / {totalPages} — {activeCount.toLocaleString("fr-FR")} articles
        </div>
        <div className="pagbtns">
          {page > 1 && (
            <Link href={`${baseHref}${baseHref.includes("?") ? "&" : "?"}page=${page - 1}`} className="pagb">
              ←
            </Link>
          )}
          <span className="pagb on">{page}</span>
          {page < totalPages && (
            <Link href={`${baseHref}${baseHref.includes("?") ? "&" : "?"}page=${page + 1}`} className="pagb">
              →
            </Link>
          )}
        </div>
      </div>

    </>
  );
}
