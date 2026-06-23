import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Global South Watch — editorial, partnerships, advertising, and reader tips.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
