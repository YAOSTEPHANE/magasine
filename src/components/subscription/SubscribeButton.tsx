"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface SubscribeButtonProps {
  plan: "monthly" | "yearly";
  label: string;
  variant?: "gold" | "outline";
  className?: string;
}

export function SubscribeButton({ plan, label, variant = "gold", className }: SubscribeButtonProps) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubscribe = async () => {
    if (!session?.user) {
      router.push(`/login?callbackUrl=/subscription`);
      return;
    }

    if (session.user.isPremium) {
      router.push("/profile");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (res.ok) {
        setDone(true);
        await update({ user: { isPremium: true } });
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  if (session?.user?.isPremium || done) {
    return (
      <Button href="/profile" variant="outline" className={className}>
        Active subscription ✓
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={handleSubscribe}
      disabled={loading}
    >
      {loading ? "Activating..." : label}
    </Button>
  );
}
