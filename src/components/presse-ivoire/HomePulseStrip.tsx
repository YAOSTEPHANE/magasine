export function HomePulseStrip() {
  return (
    <div className="home-pulse-strip" aria-label="Indicateurs éditoriaux en direct">
      <div className="container home-pulse-strip-inner">
        <div className="home-pulse-item home-pulse-item--live">
          <span className="home-pulse-dot" aria-hidden />
          <span>
            Rédaction <strong>live</strong>
          </span>
        </div>
        <div className="home-pulse-item">
          <span>
            <strong>54</strong> pays couverts
          </span>
        </div>
        <div className="home-pulse-item">
          <span>
            <strong>127</strong> articles / semaine
          </span>
        </div>
        <div className="home-pulse-item">
          <span>
            <strong>2M+</strong> lecteurs actifs
          </span>
        </div>
      </div>
    </div>
  );
}
