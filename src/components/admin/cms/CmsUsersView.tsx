"use client";

import { useCallback, useEffect, useState } from "react";
import { CmsPage } from "@/components/admin/cms/CmsPage";
import { CMS_ROLE_MATRIX } from "@/lib/cms-mock-data";
import { authorAvatarGradient, authorInitials } from "@/components/admin/cms/cms-ui";
import { CMS_ROLE_LABELS } from "@/components/admin/cms/cms-nav";
import type { UserRole } from "@/types";

interface UserRow {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isPremium: boolean;
  isBanned: boolean;
  articleCount: number;
  createdAt: string;
}

const ROLE_COLORS: Partial<Record<UserRole, string>> = {
  super_admin: "var(--cms-red)",
  admin: "var(--cms-red)",
  editor: "var(--purple)",
  author: "var(--blue)",
  contributor: "var(--amber)",
  reader: "var(--t3)",
};

function matrixCell(value: boolean | "own" | string) {
  if (value === true) return <span className="cms-matrix-yes">✓</span>;
  if (value === "own") return <span className="cms-matrix-own">Propres articles</span>;
  return <span className="cms-matrix-no">—</span>;
}

export function CmsUsersView() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => setUsers(data.users ?? []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setUsers(data.users ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const inviteMember = async () => {
    const name = window.prompt("Nom du membre");
    if (!name?.trim()) return;
    const email = window.prompt("Adresse e-mail");
    if (!email?.trim()) return;
    const role = window.prompt("Rôle (editor, author, contributor)", "author") ?? "author";

    const res = await fetch("/api/admin/users/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), role }),
    });
    const data = await res.json();
    if (!res.ok) {
      window.alert(data.error ?? "Invitation échouée");
      return;
    }
    window.alert(
      `Membre créé.\nE-mail : ${data.email}\nMot de passe temporaire : ${data.tempPassword}\nCommuniquez-le au collaborateur.`
    );
    load();
  };

  const changeRole = async (user: UserRow) => {
    const role = window.prompt(
      `Nouveau rôle pour ${user.name} (editor, author, contributor, admin)`,
      user.role
    );
    if (!role || role === user.role) return;
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, role }),
    });
    if (res.ok) load();
    else {
      const data = await res.json();
      window.alert(data.error ?? "Échec");
    }
  };

  const editorial = users.filter((u) =>
    ["super_admin", "admin", "editor", "author", "contributor"].includes(u.role)
  );

  return (
    <CmsPage>
      <div className="vhead">
        <div>
          <div className="vh1">Équipe éditoriale</div>
          <div className="vh2">
            {editorial.length} membres ·{" "}
            {users.filter((u) => u.role === "super_admin" || u.role === "admin").length} administrateurs
          </div>
        </div>
        <div className="vacts">
          <button type="button" className="btn btn-red" onClick={() => void inviteMember()}>
            + Inviter un membre
          </button>
        </div>
      </div>

      {loading ? (
        <p className="cms-empty">Chargement de l&apos;équipe…</p>
      ) : (
        <div className="ugrid">
          {editorial.slice(0, 6).map((user, index) => (
            <button
              key={user._id}
              type="button"
              className="ucard"
              onClick={() => void changeRole(user)}
              title="Cliquer pour modifier le rôle"
            >
              <div className="uav" style={{ background: authorAvatarGradient(user.name) }}>
                {index < 3 && <div className="uonline" />}
                {authorInitials(user.name)}
              </div>
              <div className="uname">{user.name}</div>
              <div className="urole" style={{ color: ROLE_COLORS[user.role] ?? "var(--t3)" }}>
                {CMS_ROLE_LABELS[user.role]}
                {user.isBanned ? " · Banni" : ""}
              </div>
              <div className="ustats">
                <div>
                  <div className="usv">{user.articleCount}</div>
                  <div className="usl">Articles</div>
                </div>
                <div>
                  <div className="usv">{user.isPremium ? "★" : "—"}</div>
                  <div className="usl">{user.isPremium ? "Premium" : "Standard"}</div>
                </div>
              </div>
            </button>
          ))}
          <button type="button" className="ucard ucard--invite" onClick={() => void inviteMember()}>
            <div className="ucard-invite-icon">+</div>
            <div>Inviter un membre</div>
          </button>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <span className="card-title">Matrice des rôles &amp; permissions</span>
        </div>
        <div className="card-np">
          <table className="tbl">
            <thead>
              <tr>
                <th>Rôle</th>
                <th>Rédiger</th>
                <th>Publier</th>
                <th>Éditer les autres</th>
                <th>Gérer utilisateurs</th>
                <th>Publicités</th>
                <th>Paramètres</th>
              </tr>
            </thead>
            <tbody>
              {CMS_ROLE_MATRIX.map((row) => (
                <tr key={row.role}>
                  <td style={{ fontWeight: 700, color: row.color }}>{row.role}</td>
                  <td>{matrixCell(row.write)}</td>
                  <td>{matrixCell(row.publish)}</td>
                  <td>{matrixCell(row.editOthers)}</td>
                  <td>{matrixCell(row.users)}</td>
                  <td>{matrixCell(row.ads)}</td>
                  <td>{matrixCell(row.settings)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CmsPage>
  );
}
