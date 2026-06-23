import { PageTransition } from "@/components/presse-ivoire/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
