import { TRUST_PARTNERS } from "@/data/trust-partners";

export function TrustStrip() {
  const partners = [...TRUST_PARTNERS, ...TRUST_PARTNERS];

  return (
    <div className="trust-strip" role="region" aria-label="Médias partenaires">
      <div className="container trust-strip-inner">
        <div className="trust-strip-label-wrap">
          <span className="trust-strip-label">Ils nous citent</span>
        </div>
        <div className="trust-strip-viewport">
          <div className="trust-strip-track">
            {partners.map((partner, i) => (
              <span key={`${partner.name}-${i}`} className="trust-strip-logo" title={partner.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="trust-strip-logo-img"
                  loading="lazy"
                  decoding="async"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
