"use client";

import { usePathname } from "next/navigation";

interface MaintenanceGateProps {
  children: React.ReactNode;
  maintenanceMode: boolean;
  siteName: string;
}

export function MaintenanceGate({ children, maintenanceMode, siteName }: MaintenanceGateProps) {
  const pathname = usePathname();
  const isExempt =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/api/");

  if (maintenanceMode && !isExempt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted-bg px-6">
        <div className="max-w-md text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-muted mb-4">{siteName}</p>
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-4">Maintenance in progress</h1>
          <p className="text-muted leading-relaxed">
            We are updating the newsroom systems. The site will be back online shortly.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
