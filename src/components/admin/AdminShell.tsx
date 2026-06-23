"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Plus } from "lucide-react";
import { SITE_LOGO } from "@/lib/images";
import type { UserRole } from "@/types";
import type { AdminNavStats } from "@/lib/admin-nav";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

interface AdminShellProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    role: UserRole;
  };
  navStats: AdminNavStats;
}

export function AdminShell({ children, user, navStats }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, closeMobile]);

  return (
    <div className="admin-shell">
      <header className="admin-mobile-bar">
        <button
          type="button"
          className="admin-mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link href="/admin" className="admin-mobile-logo">
          <Image
            src={SITE_LOGO}
            alt="Global South Watch"
            width={120}
            height={30}
            style={{ height: 28, width: "auto" }}
          />
        </Link>
        <Link href="/admin/articles/new" className="admin-mobile-new" aria-label="New article">
          <Plus className="w-5 h-5" />
        </Link>
      </header>

      {mobileOpen && (
        <button
          type="button"
          className="admin-sidebar-backdrop"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      )}

      <Suspense fallback={<aside className="admin-sidebar admin-sidebar--skeleton" aria-hidden />}>
        <AdminSidebar
          user={user}
          stats={navStats}
          mobileOpen={mobileOpen}
          onCloseMobile={closeMobile}
        />
      </Suspense>

      <div className="admin-main">{children}</div>
    </div>
  );
}
