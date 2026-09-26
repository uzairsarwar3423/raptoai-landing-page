"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap-setup";

interface HeroHeadlineProps {
  title?: string;
  subline?: string;
  lines?: string[];
}

export function HeroHeadline({
  title = "AI Meeting Accountability & Action Item Tracker",
  subline = "70% of meeting promises are never kept. Rapto makes sure yours are.",
  lines,
}: HeroHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const displayTitle = lines && lines.length > 0 ? lines[0] : title;
  const displaySubline = lines && lines.length > 1 ? lines[1] : subline;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.to(".headline-anim", { opacity: 1, y: "0%", duration: 0.4 });
        return;
      }

      gsap.fromTo(
        ".headline-anim",
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: "power4.out",
          delay: 0.15,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <h1
      ref={containerRef}
      className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-8 leading-[1.08] text-white"
    >
      <div className="overflow-hidden pb-1">
        <span className="headline-anim block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/90">
          {displayTitle}
        </span>
      </div>
      {displaySubline && (
        <div className="overflow-hidden pb-1 mt-3">
          <span className="headline-anim block text-xl sm:text-2xl lg:text-3xl font-medium text-[var(--color-ink-on-dark-muted)] tracking-normal">
            {displaySubline}
          </span>
        </div>
      )}
    </h1>
  );
}
