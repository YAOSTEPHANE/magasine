"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HeartHandshake } from "lucide-react";
import { HEADER_TOP_ACTIONS, MOBILE_NAV, NAV_SUBSCRIBE_LINK } from "@/data/presse-ivoire-home";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

function useNavActive() {
  const pathname = usePathname();
  return (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.split("#")[0] ?? href;
    return pathname === base || pathname.startsWith(`${base}/`);
  };
}

function MobileNavSection({
  label,
  links,
  onClose,
  linkClassName = "mobile-nav-link",
}: {
  label: string;
  links: readonly { label: string; href: string }[];
  onClose: () => void;
  linkClassName?: string;
}) {
  const isActive = useNavActive();

  return (
    <>
      <p className="mobile-nav-section-label">{label}</p>
      <ul className="mobile-nav-list">
        {links.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className={`${linkClassName}${isActive(item.href) ? " is-active" : ""}`}
              onClick={onClose}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.split("#")[0] ?? href;
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  return createPortal(
    <>
      <button
        type="button"
        className={`mobile-nav-overlay${open ? " is-open" : ""}`}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <div
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        aria-hidden={!open}
      >
        <div className="mobile-nav-drawer-head">
          <span className="mobile-nav-drawer-title">Menu</span>
          <button
            type="button"
            className="mobile-nav-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="mobile-nav-body" aria-label="Mobile navigation">
          <MobileNavSection
            label="News"
            links={MOBILE_NAV.news}
            onClose={onClose}
          />

          <MobileNavSection
            label="Sections"
            links={MOBILE_NAV.sections}
            onClose={onClose}
          />

          <MobileNavSection
            label="Regions"
            links={MOBILE_NAV.regions}
            onClose={onClose}
            linkClassName="mobile-nav-link mobile-nav-link--region"
          />

          <MobileNavSection
            label="Formats"
            links={MOBILE_NAV.formats}
            onClose={onClose}
            linkClassName="mobile-nav-link mobile-nav-link--region"
          />
        </nav>

        <div className="mobile-nav-about">
          <p className="mobile-nav-about-label">About</p>
          <ul className="mobile-nav-about-list">
            {MOBILE_NAV.about.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className={`mobile-nav-about-link${isActive(item.href) ? " is-active" : ""}`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mobile-nav-about mobile-nav-about--support">
          <p className="mobile-nav-about-label">Support</p>
          <ul className="mobile-nav-about-list">
            {MOBILE_NAV.support.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className={`mobile-nav-about-link${isActive(item.href) ? " is-active" : ""}`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mobile-nav-about mobile-nav-about--legal">
          <p className="mobile-nav-about-label">Legal</p>
          <ul className="mobile-nav-about-list">
            {MOBILE_NAV.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`mobile-nav-about-link${isActive(item.href) ? " is-active" : ""}`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/accessibility"
                className={`mobile-nav-about-link${isActive("/accessibility") ? " is-active" : ""}`}
                onClick={onClose}
              >
                Accessibility
              </Link>
            </li>
          </ul>
        </div>

        <div className="mobile-nav-footer">
          <Link
            href={NAV_SUBSCRIBE_LINK.href}
            className="mobile-nav-cta mobile-nav-cta--primary"
            onClick={onClose}
          >
            {NAV_SUBSCRIBE_LINK.label}
          </Link>
          <Link
            href={HEADER_TOP_ACTIONS[0].href}
            className="mobile-nav-cta mobile-nav-cta--secondary"
            onClick={onClose}
          >
            <HeartHandshake size={16} strokeWidth={2} aria-hidden />
            {HEADER_TOP_ACTIONS[0].label}
          </Link>
        </div>
      </div>
    </>,
    document.body
  );
}

interface MobileMenuButtonProps {
  open: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ open, onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className={`btn-mobile-menu${open ? " is-open" : ""}`}
      aria-expanded={open}
      aria-controls="mobile-nav-drawer"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
    >
      <span className="btn-mobile-menu-bars" aria-hidden>
        <span />
        <span />
        <span />
      </span>
      <span className="btn-mobile-menu-label">Menu</span>
    </button>
  );
}
