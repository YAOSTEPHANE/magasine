"use client";

import { Link2 } from "lucide-react";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/ui/SocialIcons";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      label: "Facebook",
      brand: "facebook",
    },
    {
      icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
      label: "X (Twitter)",
      brand: "twitter",
    },
    {
      icon: WhatsappIcon,
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      label: "WhatsApp",
      brand: "whatsapp",
    },
    {
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      label: "LinkedIn",
      brand: "linkedin",
    },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted tracking-wider uppercase mr-2">Partager</span>
      {shareLinks.map(({ icon: Icon, href, label, brand }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Partager sur ${label}`}
          className={`social-link social-link--${brand} w-9 h-9 flex items-center justify-center rounded-md hover:scale-110 transition-transform`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copier le lien"
        className="w-9 h-9 flex items-center justify-center rounded-sm border border-border hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
      >
        <Link2 className="w-4 h-4" />
      </button>
    </div>
  );
}
