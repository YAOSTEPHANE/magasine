"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/presse-ivoire/SiteHeader";
import { HomeQuickNav } from "@/components/presse-ivoire/HomeQuickNav";
import { SiteFooter } from "@/components/presse-ivoire/SiteFooter";
import { ProgressBar } from "@/components/presse-ivoire/ProgressBar";
import { ScrollReveal } from "@/components/presse-ivoire/ScrollReveal";
interface SiteChromeProps {
  children: ReactNode;
  categories: { name: string; slug: string }[];
}

function isAdminRoute(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function SiteChrome({ children, categories }: SiteChromeProps) {
  const pathname = usePathname();
  const admin = isAdminRoute(pathname);

  if (admin) {
    return <div className="admin-root admin-root--cms">{children}</div>;
  }

  return (
    <>
      <ProgressBar />
      <div className="site-header-stack">
        <SiteHeader />
        <HomeQuickNav />
      </div>
      <main>{children}</main>
      <SiteFooter />
      <ScrollReveal />
    </>
  );
}
