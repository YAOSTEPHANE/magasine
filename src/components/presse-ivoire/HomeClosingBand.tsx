import { StatsStrip } from "@/components/presse-ivoire/StatsStrip";
import { NewsletterBanner } from "@/components/presse-ivoire/NewsletterBanner";

export function HomeClosingBand() {
  return (
    <section className="home-band home-band--closing" aria-label="Stats and newsletter">
      <StatsStrip />
      <NewsletterBanner />
    </section>
  );
}
