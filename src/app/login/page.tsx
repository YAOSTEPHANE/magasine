import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginPageClient, LoginPageFallback } from "@/components/auth/LoginPageClient";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to Global South Watch — save articles, track your reading history, and join the conversation on independent journalism from the Global South.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageFallback />}>
      <LoginPageClient />
    </Suspense>
  );
}
