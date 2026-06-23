export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/globalsouthwatch",
  twitter: "https://twitter.com/globalsouthwatch",
  instagram: "https://www.instagram.com/globalsouthwatch",
  youtube: "https://www.youtube.com/@globalsouthwatch",
  linkedin: "https://www.linkedin.com/company/globalsouthwatch",
  whatsapp: "https://wa.me/22500000000",
} as const;

export type SocialNetwork = keyof typeof SOCIAL_LINKS;
