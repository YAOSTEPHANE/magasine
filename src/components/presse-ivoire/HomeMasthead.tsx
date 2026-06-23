import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function HomeMasthead() {
  const today = new Date();
  const weekday = format(today, "EEEE", { locale: fr });
  const dayMonth = format(today, "d MMMM yyyy", { locale: fr });
  const weekdayCap = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  return (
    <div className="home-masthead home-masthead--revolution">
      <div className="home-masthead-ornament" aria-hidden />
      <div className="container">
        <div className="home-masthead-bar">
          <div className="home-masthead-left">
            <span className="home-masthead-badge">Édition du jour</span>
            <span className="home-masthead-volume">Vol. XII · N° 1847</span>
          </div>

          <p className="home-masthead-date" aria-label={`${weekdayCap} ${dayMonth}`}>
            <span className="home-masthead-date-week">{weekdayCap}</span>
            <span className="home-masthead-date-sep" aria-hidden>
              ·
            </span>
            <span className="home-masthead-date-rest">{dayMonth}</span>
          </p>

          <div className="home-masthead-right">
            <span className="home-masthead-live">
              <span className="home-masthead-live-dot" />
              En direct
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
          La voix du Sud global — journalisme indépendant &amp; engagé
          <span className="home-masthead-diamond" aria-hidden>
            ◆
          </span>
        </p>
      </div>
    </div>
  );
}
