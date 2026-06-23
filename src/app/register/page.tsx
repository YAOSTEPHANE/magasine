import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterPageClient, RegisterPageFallback } from "@/components/auth/RegisterPageClient";
import { PUBLISHER_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Create account",
  description: `Create your free reader account on ${SITE_NAME} — save articles, track reading history, and join the conversation. Published by ${PUBLISHER_NAME}.`,
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterPageFallback />}>
      <RegisterPageClient />
    </Suspense>
  );
}
