"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap-setup";

interface HeroHeadlineProps {
  lines: string[];
}

export function HeroHeadline({ lines }: HeroHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.to(".headline-line span", { opacity: 1, y: "0%", duration: 0.5 });
      return;
    }

    gsap.fromTo(
      ".headline-line span",
      { y: "100%" },
      { 
        y: "0%", 
        duration: 0.8, 
        stagger: 0.12, 
        ease: "power4.out",
        delay: 0.2 
      }
    );
  }, { scope: containerRef });

  return (
    <h1 ref={containerRef} className="text-[length:var(--text-display-xl)] font-display font-bold tracking-tight mb-8 leading-[1.05]">
      {lines.map((line, i) => (
        <div key={i} className="headline-line overflow-hidden pb-2">
          <span className="block translate-y-full opacity-100 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">
            {line}
          </span>
        </div>
      ))}
    </h1>
  );
}
