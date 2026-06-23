"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { HeroSlide } from "@/types/home";
import { SectionImage } from "@/components/presse-ivoire/SectionImage";
import { isVideoFile, toVideoEmbedUrl } from "@/lib/format-article";

interface HeroCarouselProps {
  slides: HeroSlide[];
}

const AUTO_MS = 7000;

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const slide = slides[active] ?? slides[0];

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActive(((index % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [count, paused, active]);

  if (!slide) return null;

  const isVideo = slide.contentType === "video" && !!slide.videoUrl;
  const embedUrl = slide.videoUrl ? toVideoEmbedUrl(slide.videoUrl) : null;
  const isFileVideo = slide.videoUrl ? isVideoFile(slide.videoUrl) : false;

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link href={`/article/${slide.slug}`} className="hero-cover-link">
        <div className="hero-frame">
          <div className="hero-illustration hero-carousel-slide">
            {isVideo && embedUrl && !isFileVideo ? (
              <div className="hero-video-wrap">
                <iframe
                  key={`${slide.slug}-${active}`}
                  src={embedUrl}
                  title={slide.title}
                  className="hero-video-embed"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="hero-video-overlay" aria-hidden />
              </div>
            ) : isVideo && slide.videoUrl && isFileVideo ? (
              <video
                key={slide.slug}
                className="hero-video-native"
                src={slide.videoUrl}
                poster={slide.image}
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <SectionImage
                src={slide.image}
                alt={slide.title}
                priority={active === 0}
                sizes="(max-width: 1024px) 100vw, 800px"
                className="hero-illustration-photo"
              />
            )}

            <div className="hero-illustration-text">
              <div className="hero-cover-badges">
                <span className="breaking-badge">
                  <span className="breaking-dot" />
                  {slide.badge}
                </span>
                {slide.isPremium && (
                  <span className="premium-badge premium-badge-glow">★ Premium</span>
                )}
                {isVideo && <span className="hero-video-badge">▶ Vidéo</span>}
              </div>
              <div className="hero-img-title">
                {slide.title}
                {slide.titleEm && <em>{slide.titleEm}</em>}
              </div>
              <div className="hero-img-meta">
                <span>
                  Par <strong>{slide.author}</strong>
                </span>
                <span aria-hidden>·</span>
                <span>{slide.readingTime}</span>
                <span aria-hidden>·</span>
                <span>{slide.timeAgo}</span>
              </div>
            </div>

            <span className="hero-corner hero-corner--tl" aria-hidden />
            <span className="hero-corner hero-corner--tr" aria-hidden />
            <span className="hero-corner hero-corner--bl" aria-hidden />
            <span className="hero-corner hero-corner--br" aria-hidden />
          </div>
        </div>
      </Link>

      {count > 1 && (
        <>
          <div className="hero-carousel-controls">
            <button
              type="button"
              className="hero-carousel-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prev();
              }}
              aria-label="Article précédent"
            >
              ‹
            </button>
            <button
              type="button"
              className="hero-carousel-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                next();
              }}
              aria-label="Article suivant"
            >
              ›
            </button>
          </div>

          <div className="hero-carousel-dots" role="tablist" aria-label="Articles à la une">
            {slides.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Slide ${i + 1} : ${s.title}`}
                className={`hero-carousel-dot${i === active ? " active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <div className="hero-carousel-progress" aria-hidden>
            <span
              key={active}
              className="hero-carousel-progress-bar"
              style={{ animationDuration: `${AUTO_MS}ms` }}
            />
          </div>
        </>
      )}

      <div className="hero-caption" key={slide.slug}>
        <div className="hero-caption-top">
          <span className="tag outline">{slide.category}</span>
          <Link href={`/article/${slide.slug}`} className="hero-cta">
            Lire maintenant
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <p className="hero-excerpt">{slide.excerpt}</p>
        <div className="hero-meta">
          <div className="hero-author">
            <div className="hero-avatar">{slide.authorInitials}</div>
            <div>
              <div className="hero-author-name">{slide.author}</div>
              <div className="hero-author-role">{slide.authorRole}</div>
            </div>
          </div>
          <span className="hero-dot" aria-hidden>·</span>
          <span>{slide.date}</span>
        </div>
      </div>
    </div>
  );
}
