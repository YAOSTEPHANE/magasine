import Link from "next/link";
import Image from "next/image";
import { FOOTER_COLS } from "@/data/presse-ivoire-home";
import { SocialLinks } from "@/components/ui/SocialIcons";
import { SITE_LOGO } from "@/lib/images";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link">
              <Image
                src={SITE_LOGO}
                alt="Global South Watch"
                width={190}
                height={44}
                style={{ height: 44, width: "auto" }}
              />
            </Link>
            <p className="footer-brand-desc">
              Global South Watch — the leading news portal for Africa and the Global South. Independent, rigorous, and committed journalism.
            </p>
            <SocialLinks />
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-col-title">Sections</div>
              <ul>
                {FOOTER_COLS.rubriques.map((l) => (
                  <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Formats</div>
              <ul>
                {FOOTER_COLS.formats.map((l) => (
                  <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Global South Watch</div>
              <ul>
                {FOOTER_COLS.presse.map((l) => (
                  <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Legal</div>
              <ul>
                {FOOTER_COLS.legal.map((l) => (
                  <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Global South Watch — Digitalpro Solutions. All rights reserved.</span>
          <div className="footer-bottom-links">
            <Link href="/sitemap.xml">Sitemap</Link>
            <a href="/api/feed">RSS</a>
            <Link href="/accessibilite">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
