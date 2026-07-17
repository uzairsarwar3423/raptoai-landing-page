"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap-setup";
import { HeroArtifactCard } from "./HeroArtifactCard";
import { useHeroParallax } from "./useHeroParallax";

export function HeroArtifact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const emberRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<"pending" | "fulfilled">("pending");
  const { containerRef: parallaxContainerRef, targetRef: parallaxTargetRef } = useHeroParallax();

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(cardBRef.current, { opacity: 1, x: 0 });
      gsap.set(lineRef.current, { scaleX: 1 });
      setStatus("fulfilled");
      return;
    }

    // Mesh-Aurora backdrop drift animation (ambient, not scroll-bound)
    gsap.to(auroraRef.current, {
      yPercent: 10,
      xPercent: -8,
      rotation: 8,
      scale: 1.15,
      duration: 25,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Auto-play sequence on load
    const introTl = gsap.timeline();
    introTl
      .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut" })
      .fromTo(cardBRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, "-=0.6")
      .call(() => setStatus("fulfilled"), [], "-=0.3")
      .fromTo(emberRef.current, { opacity: 0, y: 15, scale: 0.8 }, { opacity: 1, y: -25, scale: 1, duration: 1, ease: "back.out(1.5)" })
      .to(emberRef.current, { opacity: 0, duration: 0.8, ease: "power2.in" }, "+=1.5");

    // Scroll-triggered scrub
    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=60%", // 60vh pin
        pin: true,
        scrub: 1, // 1s smoothing
        onUpdate: (self) => {
          // If scrub progress is past 0.35, flip status to fulfilled
          if (self.progress >= 0.35 && status !== "fulfilled") {
            setStatus("fulfilled");
          } else if (self.progress < 0.35 && status !== "pending") {
            setStatus("pending");
          }
        }
      }
    });

    // Reset initial states for the scrub timeline
    scrubTl
      .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: "none" }, 0.1)
      .fromTo(cardBRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3, ease: "none" }, 0.35)
      .fromTo(emberRef.current, { opacity: 0, y: 0, scale: 0.8 }, { opacity: 1, y: -25, scale: 1, duration: 0.2, ease: "none" }, 0.65)
      .to(emberRef.current, { opacity: 0, duration: 0.15, ease: "none" }, 0.85);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[80vh] min-h-[600px] flex items-center justify-center w-full my-12" aria-hidden="true">
      <div
        ref={parallaxContainerRef as any}
        className="relative w-full h-full flex items-center justify-center perspective-[1200px]"
      >
        {/* Deep Atmospheric Mesh-Aurora */}
        <div
          ref={auroraRef}
          className="absolute inset-0 -z-10 rounded-[100%] w-[140%] h-[140%] opacity-40 pointer-events-none mix-blend-screen"
          style={{
            background: `radial-gradient(circle at 40% 50%, var(--color-brand-700) 0%, transparent 40%), radial-gradient(circle at 60% 40%, var(--color-brand-900) 0%, transparent 50%)`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(80px)'
          }}
        />

        <div ref={parallaxTargetRef as any} className="relative w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 px-4">

          <div className="relative z-10 group">
            <HeroArtifactCard
              day="Monday Standup"
              name="Ahmed"
              quote="I'll have the Q3 report finished by Thursday."
              status={status}
              className="z-10 transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_40px_80px_-20px_rgba(34,197,94,0.15)]"
            />
            {/* Premium Ember Pill */}
            <div
              ref={emberRef}
              className="absolute -top-6 -right-6 bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] opacity-0 pointer-events-none border border-white/20 backdrop-blur-md"
            >
              +4 score
            </div>
          </div>

          {/* Premium Glowing Connecting Line */}
          <div className="flex-1 w-full md:w-auto h-[1px] relative mx-6 hidden md:block">
            {/* Dim background line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            {/* Bright animated line */}
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22c55e] to-[#22c55e] origin-left scale-x-0 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            />
            {/* Floating label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-canvas-dark)]/80 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-bold text-white/50 tracking-[0.2em] uppercase border border-white/5">
              matched by meaning
            </div>
          </div>

          <div ref={cardBRef} className="relative z-10 opacity-0 -translate-x-6 group">
            <HeroArtifactCard
              day="Thursday Standup"
              name="Ahmed"
              quote="The Q3 report is live in the shared drive."
              status="fulfilled"
              className="transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_40px_80px_-20px_rgba(34,197,94,0.15)]"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
