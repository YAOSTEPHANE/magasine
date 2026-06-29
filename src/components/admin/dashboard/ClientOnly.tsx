"use client";

import type { ReactNode } from "react";
import { useIsClient } from "@/lib/use-is-client";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const mounted = useIsClient();

  if (!mounted) {
    return fallback;
  }

  return children;
}
