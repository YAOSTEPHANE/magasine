export function HomePulseStrip() {
  return (
    <div className="home-pulse-strip" aria-label="Live editorial indicators">
      <div className="container home-pulse-strip-inner">
        <div className="home-pulse-item home-pulse-item--live">
          <span className="home-pulse-dot" aria-hidden />
          <span>
            Newsroom <strong>live</strong>
          </span>
        </div>
        <div className="home-pulse-item">
          <span>
            <strong>54</strong> countries covered
          </span>
        </div>
        <div className="home-pulse-item">
          <span>
            <strong>127</strong> articles / week
          </span>
        </div>
        <div className="home-pulse-item">
          <span>
            <strong>2M+</strong> active readers
          </span>
        </div>
      </div>
    </div>
  );
}
