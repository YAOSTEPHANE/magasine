import Link from "next/link";
import type { HomeLatest, HomePageViewModel } from "@/types/home";
import { HeroCarousel } from "@/components/presse-ivoire/HeroCarousel";
import { LatestNewsColumn } from "@/components/presse-ivoire/LatestNewsColumn";
import { SectionImage } from "@/components/presse-ivoire/SectionImage";

interface HeroHomeProps {
  data: Pick<HomePageViewModel, "heroSlides" | "miniCards">;
  latest: HomeLatest;
}

export function HeroHome({ data, latest }: HeroHomeProps) {
  if (data.heroSlides.length === 0) return null;

  return (
    <section className="hero hero-premium">
      <div className="container hero-shell">
        <div className="hero-grid hero-grid--amargi">
          <div className="hero-lead reveal">
            <HeroCarousel slides={data.heroSlides} />
          </div>

          <div className="hero-center reveal" data-reveal-delay={80}>
            <div className="hero-sub-section">
              <div className="hero-sub-header">
                <h3 className="hero-sub-title">Also read</h3>
                <Link href="/search" className="hero-sub-link">
                  All news
                </Link>
              </div>
              <div className="hero-sub-articles hero-sub-articles--stack">
                {data.miniCards.slice(0, 4).map((card, i) => (
                  <Link
                    key={card.slug ?? card.title}
                    href={card.slug ?? "#"}
                    className="mini-card-h reveal visible"
                    data-reveal-delay={i * 60}
                  >
                    <div className="mini-card-h-media">
                      <SectionImage src={card.image} alt={card.title} sizes="160px" />
                      <span className="mini-card-index">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="mini-card-h-body">
                      <div className="mini-card-cat">{card.cat}</div>
                      <div className="mini-card-title">{card.title}</div>
                      <div className="mini-card-meta">{card.meta}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <LatestNewsColumn data={latest} />
        </div>
      </div>
    </section>
  );
}
