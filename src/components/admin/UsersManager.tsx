"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import type { UserRole } from "@/types";

interface UserRow {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isPremium: boolean;
  createdAt: string;
}

const ROLES: UserRole[] = [
  "super_admin",
  "admin",
  "editor",
  "author",
  "contributor",
  "reader",
];

export function UsersManager() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => setUsers(data.users ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateUser = async (userId: string, patch: { role?: UserRole; isPremium?: boolean }) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...patch }),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error ?? "Update failed");
      return;
    }
    load();
  };

  if (loading) {
    return <p className="admin-loading">Loading users…</p>;
  }

  return (
    <div className="admin-card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Premium</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="font-medium">{user.name}</td>
              <td className="text-muted">{user.email}</td>
              <td>
                <select
                  className="admin-select"
                  value={user.role}
                  onChange={(e) => updateUser(user._id, { role: e.target.value as UserRole })}
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={user.isPremium}
                  onChange={(e) => updateUser(user._id, { isPremium: e.target.checked })}
                />
              </td>
              <td className="text-muted text-sm">{formatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <p className="admin-empty">No users found.</p>
      )}
    </div>
  );
}
