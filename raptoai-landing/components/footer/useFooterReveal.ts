"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-setup";

export function useFooterReveal(finalCtaSelector: string) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finalCta = document.querySelector(finalCtaSelector);
    if (reduceMotion || !finalCta) return; // falls back to normal document-flow footer
    // Temporarily disabled the GSAP pinning because the current section above the footer
    // is a white placeholder, which causes awkward color overlap/clipping.
    // We will re-enable this once the real Final CTA section (with a dark background) is built.
    
    /*
    gsap.timeline({
      scrollTrigger: {
        trigger: finalCta,
        start: "bottom bottom",
        end: "+=30%", // a short, restrained reveal distance — not a long, jank-prone pin
        scrub: 0.5,
        pin: finalCta,
        pinSpacing: false, // critical: without this, pinning would add extra scroll distance
      },
    }).to(finalCta, { scale: 0.96, opacity: 0.6, ease: "none" });
    */

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [finalCtaSelector]);

  return scope;
}
