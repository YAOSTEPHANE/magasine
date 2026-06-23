"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            el.target.classList.add("visible");
            observer.unobserve(el.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      const delay = el.getAttribute("data-reveal-delay");
      if (delay) {
        (el as HTMLElement).style.transitionDelay = `${delay}ms`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
