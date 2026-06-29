"use client";

import { SessionProvider } from "next-auth/react";
import { SiteBrandingProvider, type SiteBrandingValue } from "@/components/SiteBranding";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";

interface ProvidersProps {
  children: React.ReactNode;
  branding?: SiteBrandingValue;
}

export function Providers({ children, branding }: ProvidersProps) {
  const content = (
    <SessionProvider>
      {children}
      <ToastProvider />
    </SessionProvider>
  );

  if (!branding) return content;

  return <SiteBrandingProvider value={branding}>{content}</SiteBrandingProvider>;
}
