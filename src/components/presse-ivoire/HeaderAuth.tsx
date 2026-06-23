"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { isAdminRole } from "@/lib/permissions";

export function HeaderAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="header-auth-placeholder" aria-hidden />;
  }

  if (!session?.user) {
    return (
      <Link href="/connexion" className="btn-login" title="Connexion">
        <User className="w-4 h-4" />
      </Link>
    );
  }

  return (
    <div className="header-auth">
      <Link href="/profil" className="btn-login" title="Mon profil">
        <User className="w-4 h-4" />
      </Link>
      {isAdminRole(session.user.role) && (
        <Link href="/admin" className="btn-admin" title="Administration">
          <LayoutDashboard className="w-4 h-4" />
        </Link>
      )}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="btn-logout"
        title="Déconnexion"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
