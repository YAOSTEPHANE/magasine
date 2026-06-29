"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CmsToggleProps {
  on: boolean;
  onChange: (value: boolean) => void;
  label: ReactNode;
}

export function CmsToggle({ on, onChange, label }: CmsToggleProps) {
  return (
    <button
      type="button"
      className="cms-toggle-row"
      onClick={() => onChange(!on)}
      aria-pressed={on}
    >
      <div className={cn("tog", on && "on")} aria-hidden />
      <span>{label}</span>
    </button>
  );
}
