"use client";

import { useEffect, useState } from "react";
import { formatRelativeEn } from "@/lib/relative-time";

export { formatRelativeEn };

/**
 * Relative time safe for SSR — renders after mount to avoid React #418.
 */
export function RelativeTime({
  iso,
  className,
}: {
  iso: string;
  className?: string;
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    const update = () => setText(formatRelativeEn(iso));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [iso]);

  return (
    <span className={className} suppressHydrationWarning>
      {text || "\u00a0"}
    </span>
  );
}
