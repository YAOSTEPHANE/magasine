import { STATS } from "@/data/presse-ivoire-home";

const ICONS = ["◈", "✦", "◇", "◎"];

export function StatsStrip() {
  return (
    <div className="stats-strip stats-strip-premium">
      <div className="stats-inner container">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="stat-item reveal" data-reveal-delay={i * 80}>
            <span className="stat-icon" aria-hidden>
              {ICONS[i]}
            </span>
            <div className="stat-num">
              {stat.num}
              <span>{stat.suffix}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
