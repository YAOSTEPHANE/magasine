import type { Metadata } from "next";
import { Syne, DM_Sans, Newsreader } from "next/font/google";
import { TopBar } from "@/components/presse-ivoire/TopBar";
import { SiteHeader } from "@/components/presse-ivoire/SiteHeader";
import { HomeQuickNav } from "@/components/presse-ivoire/HomeQuickNav";
import { SiteFooter } from "@/components/presse-ivoire/SiteFooter";
import { ProgressBar } from "@/components/presse-ivoire/ProgressBar";
import { ScrollReveal } from "@/components/presse-ivoire/ScrollReveal";
import { getLayoutNavData } from "@/lib/data";
import { Providers } from "@/components/Providers";
import "./globals.css";
import "./responsive.css";
import "./revolution.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Global South Watch — Portail Magazine & Presse en Ligne",
    template: "%s | Global South Watch",
  },
  description:
    "Global South Watch — le portail d'information de référence pour l'Afrique et le Sud global. Journalisme indépendant, rigoureux et engagé.",
  keywords: ["Global South", "Afrique", "actualités", "magazine", "presse", "Sud global"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Global South Watch",
    images: ["/images/logo-global-south-watch.png"],
  },
  icons: {
    icon: "/images/logo-global-south-watch.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

async function getLayoutData() {
  return getLayoutNavData();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { categories, alerts } = await getLayoutData();

  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable} ${newsreader.variable}`}>
      <body>
        <Providers>
          <ProgressBar />
          <TopBar alerts={alerts} />
          <SiteHeader />
          <HomeQuickNav categories={categories} />
          <main>{children}</main>
          <SiteFooter />
          <ScrollReveal />
        </Providers>
      </body>
    </html>
  );
}
