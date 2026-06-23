"use client";

import { useState } from "react";

const BENEFITS = [
  "Exclusive morning briefing",
  "Early access to investigations",
  "Ad-free analysis",
];

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setStatus((s) => (s === "loading" ? "idle" : s));
    }
  };

  return (
    <section className="newsletter-banner newsletter-premium">
      <div className="newsletter-pattern" aria-hidden />
      <div className="newsletter-inner">
        <div className="newsletter-copy">
          <div className="nl-emblem" aria-hidden>GSW</div>
          <div className="nl-label">Exclusive newsletter</div>
          <h2 className="nl-title">
            The essentials every morning,
            <br />
            <em>delivered straight to your inbox.</em>
          </h2>
          <p className="nl-desc">
            An editorial selection of the most important news from Africa
            and the Global South, curated by our newsroom.
          </p>
          <ul className="nl-benefits">
            {BENEFITS.map((b) => (
              <li key={b}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <circle cx="8" cy="8" r="8" fill="rgba(26,56,150,0.1)" />
                  <path d="M5 8l2 2 4-4" stroke="#1a3896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="newsletter-form-wrap">
          <div className="newsletter-form-card">
            <form className="nl-form nl-form-premium" onSubmit={handleSubmit}>
              <input
                className="nl-input"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="nl-btn" disabled={status === "loading"}>
                {status === "loading" ? (
                  "Signing up..."
                ) : (
                  <>
                    <span className="nl-btn-full">Subscribe for free</span>
                    <span className="nl-btn-short">Subscribe</span>
                  </>
                )}
              </button>
            </form>
            {status === "success" && (
              <p className="nl-note nl-note-success">Successfully subscribed. Thank you!</p>
            )}
            {status === "error" && (
              <p className="nl-note nl-note-error">Something went wrong. Please try again.</p>
            )}
            {status === "idle" && (
              <p className="nl-note">Free · No spam · Unsubscribe in one click</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
