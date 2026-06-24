"use client";

import { cn } from "@/lib/utils";

interface CmsToggleProps {
  on: boolean;
  onChange: (value: boolean) => void;
  label: string;
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
