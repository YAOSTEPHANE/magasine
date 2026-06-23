import Link from "next/link";
import type { HomePageViewModel } from "@/types/home";
import { HeroCarousel } from "@/components/presse-ivoire/HeroCarousel";
import { SectionImage } from "@/components/presse-ivoire/SectionImage";

interface HeroHomeProps {
  data: Pick<HomePageViewModel, "heroSlides" | "miniCards" | "topStories" | "popularTags">;
}

export function HeroHome({ data }: HeroHomeProps) {
  if (data.heroSlides.length === 0) return null;

  return (
    <section className="hero hero-premium">
      <div className="container hero-shell">
        <div className="hero-grid">
          <div className="hero-main reveal">
            <HeroCarousel slides={data.heroSlides} />

            <div className="hero-sub-section">
              <div className="hero-sub-header">
                <h3 className="hero-sub-title">Also read</h3>
                <Link href="/search" className="hero-sub-link">
                  All news
                </Link>
              </div>
              <div className="hero-sub-articles">
                {data.miniCards.map((card, i) => (
                  <Link
                    key={card.slug ?? card.title}
                    href={card.slug ?? "#"}
                    className="mini-card-h reveal"
                    data-reveal-delay={i * 80}
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

          <aside className="hero-sidebar hero-sidebar-premium reveal" data-reveal-delay={120}>
            <div className="sidebar-panel sidebar-panel--live">
              <div className="sidebar-section-title">
                <span className="sidebar-live-label">
                  <span className="sidebar-live-dot" />
                  Top Stories
                </span>
                <Link href="/search">View all</Link>
              </div>

              {data.topStories.map((story) => (
                <Link key={story.num} href={story.slug} className="sidebar-article">
                  <div className="sa-num">{story.num}</div>
                  <div className="sa-thumb">
                    <SectionImage src={story.image} alt={story.title} sizes="72px" />
                  </div>
                  <div className="sa-info">
                    <div className="sa-cat">{story.cat}</div>
                    <div className="sa-title">{story.title}</div>
                    <div className="sa-meta">{story.meta}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="sidebar-panel sidebar-tags-panel sidebar-panel--accent">
              <div className="sidebar-section-title">Popular tags</div>
              <div className="tags-cloud">
                {data.popularTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag.replace("#", ""))}`}
                    className="cloud-tag"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-premium-cta sidebar-newsletter-cta">
              <span className="sidebar-premium-cta-label">Newsletter</span>
              <p className="sidebar-premium-cta-text">
                Free morning briefing and regional editions — curated by our newsroom.
              </p>
              <Link href="/newsletter" className="sidebar-premium-cta-btn">
                Subscribe for free
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
