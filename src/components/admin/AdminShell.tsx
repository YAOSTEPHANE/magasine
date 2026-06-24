"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import type { UserRole } from "@/types";
import type { AdminNavStats } from "@/lib/admin-nav";
import { CmsSidebar } from "@/components/admin/cms/CmsSidebar";
import { CmsTopBar } from "@/components/admin/cms/CmsTopBar";
import { cn } from "@/lib/utils";

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
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "";
    html.style.height = "";
    body.style.overflow = "";
    body.style.height = "";
    return () => {
      html.style.overflow = "";
      html.style.height = "";
      body.style.overflow = "";
      body.style.height = "";
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, closeMobile]);

  return (
    <div className={cn("cms-shell", mobileOpen && "cms-shell--menu-open")}>
      <div className="shell">
        <Suspense fallback={<aside className="sidebar" aria-hidden />}>
          <CmsSidebar
            user={user}
            stats={navStats}
            mobileOpen={mobileOpen}
            onCloseMobile={closeMobile}
          />
        </Suspense>

        <div className="workspace">
          <CmsTopBar stats={navStats} onOpenMenu={() => setMobileOpen(true)} />
          <main className="content">{children}</main>
        </div>
      </div>
    </div>
  );
}
