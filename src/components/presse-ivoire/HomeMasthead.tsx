import { getEditorialDateParts } from "@/lib/editorial-date";

interface HomeMastheadProps {
  dateParts?: ReturnType<typeof getEditorialDateParts>;
}

export function HomeMasthead({ dateParts }: HomeMastheadProps) {
  const { weekday: weekdayCap, dayMonth } = dateParts ?? getEditorialDateParts();

  return (
    <div className="home-masthead home-masthead--revolution notranslate" translate="no" lang="en">
      <div className="home-masthead-ornament" aria-hidden />
      <div className="container">
        <div className="home-masthead-card">
          <div className="home-masthead-bar">
            <div className="home-masthead-left">
              <span className="home-masthead-badge">Today&apos;s Edition</span>
              <span className="home-masthead-volume">Vol. XII · N° 1847</span>
            </div>

            <p className="home-masthead-date" aria-label={`${weekdayCap} ${dayMonth}`} suppressHydrationWarning>
              <span className="home-masthead-date-week">{weekdayCap}</span>
              <span className="home-masthead-date-sep" aria-hidden>
                ·
              </span>
              <span className="home-masthead-date-rest">{dayMonth}</span>
            </p>

            <div className="home-masthead-right">
              <span className="home-masthead-live" suppressHydrationWarning>
                <span className="home-masthead-live-dot" />
                Live
              </span>
              <span className="home-masthead-divider" aria-hidden />
              <span className="home-masthead-stat">
                <strong>Abidjan</strong> · Dakar · Nairobi
              </span>
            </div>
          </div>

          <p className="home-masthead-tagline">
            <span className="home-masthead-diamond" aria-hidden>
              ◆
            </span>
            The voice of the Global South — independent &amp; committed journalism
            <span className="home-masthead-diamond" aria-hidden>
              ◆
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
