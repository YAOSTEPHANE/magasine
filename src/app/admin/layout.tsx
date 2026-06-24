import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { canManageArticles } from "@/lib/permissions";
import { getAdminNavStats } from "@/lib/admin-nav";
import { AdminShell } from "@/components/admin/AdminShell";
import "./cms-shell.css";
import "./admin.css";
import "./admin-premium.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || !canManageArticles(session.user.role)) {
    redirect("/login?callbackUrl=/admin");
  }

  const navStats = await getAdminNavStats();

  return (
    <div
      className={`admin-layout-root ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}
    >
      <AdminShell user={session.user} navStats={navStats}>
        {children}
      </AdminShell>
    </div>
  );
}
