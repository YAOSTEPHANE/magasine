"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function TrackReading({ articleId }: { articleId: string }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/user/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId }),
    }).catch(() => undefined);
  }, [session, articleId]);

  return null;
}
