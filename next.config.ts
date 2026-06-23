import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/connexion", destination: "/login", permanent: true },
      { source: "/inscription", destination: "/register", permanent: true },
      { source: "/a-propos", destination: "/about", permanent: true },
      { source: "/abonnement", destination: "/subscription", permanent: true },
      { source: "/mentions-legales", destination: "/legal", permanent: true },
      { source: "/confidentialite", destination: "/privacy", permanent: true },
      { source: "/cgu", destination: "/terms", permanent: true },
      { source: "/recherche", destination: "/search", permanent: true },
      { source: "/profil", destination: "/profile", permanent: true },
      { source: "/equipe", destination: "/team", permanent: true },
      { source: "/charte-editoriale", destination: "/editorial-charter", permanent: true },
      { source: "/carrieres", destination: "/careers", permanent: true },
      { source: "/espace-presse", destination: "/press", permanent: true },
      { source: "/publicite", destination: "/advertising", permanent: true },
      { source: "/accessibilite", destination: "/accessibility", permanent: true },
      { source: "/categorie/:slug", destination: "/category/:slug", permanent: true },
      { source: "/auteur/:slug", destination: "/author/:slug", permanent: true },
      { source: "/admin/commentaires", destination: "/admin/comments", permanent: true },
      { source: "/admin/parametres", destination: "/admin/settings", permanent: true },
      { source: "/admin/auteurs", destination: "/admin/authors", permanent: true },
      { source: "/admin/articles/nouveau", destination: "/admin/articles/new", permanent: true },
    ];
  },
};

export default nextConfig;
