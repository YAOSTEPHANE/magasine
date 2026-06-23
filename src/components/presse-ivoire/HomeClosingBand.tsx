import { StatsStrip } from "@/components/presse-ivoire/StatsStrip";
import { NewsletterBanner } from "@/components/presse-ivoire/NewsletterBanner";
import type { PublicSiteSettings } from "@/lib/site-settings";

interface HomeClosingBandProps {
  settings: Pick<
    PublicSiteSettings,
    | "closingStats"
    | "newsletterEnabled"
    | "newsletterTitle"
    | "newsletterTitleEm"
    | "newsletterDescription"
    | "newsletterBenefits"
  >;
}

export function HomeClosingBand({ settings }: HomeClosingBandProps) {
  return (
    <section className="home-band home-band--closing" aria-label="Stats and newsletter">
      <StatsStrip stats={settings.closingStats} />
      <NewsletterBanner
        enabled={settings.newsletterEnabled}
        title={settings.newsletterTitle}
        titleEm={settings.newsletterTitleEm}
        description={settings.newsletterDescription}
        benefits={settings.newsletterBenefits}
      />
    </section>
  );
}
