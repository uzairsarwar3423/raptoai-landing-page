"use client";

// Mechanism.tsx — Flagship SaaS Sticky Product Story
//
// Architecture:
//  - GSAP ScrollTrigger pinning on containerRef (pin: true, pinSpacing: true)
//  - No overflow-hidden on outer section wrapper (preserves sticky/pin layout context)
//  - Tight, responsive pin scroll distance (70% viewport height per step, eliminates giant gaps)
//  - Desktop (lg+): 35/65 vertical progress rail stepper + floating glass product window
//  - Mobile (<lg): Horizontal scrollable pill stepper + responsive visual showcase + animated step card
//  - Glassmorphic window styling with top macOS header bar & live ambient glow

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap-setup";
import { mechanismSteps } from "./mechanism.content";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

export function Mechanism() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeStepData = mechanismSteps[activeStep] ?? mechanismSteps[0]!;
  const stepCount = mechanismSteps.length;

  // GSAP MatchMedia — Responsive ScrollTrigger logic:
  //  - Desktop (>= 1024px): Pinned sticky scroll story
  //  - Mobile (< 1024px): Natural touch scrolling with scroll-driven step sync & tap pills
  useGSAP(
    () => {
      if (!sectionRef.current || !containerRef.current) return;

      const mm = gsap.matchMedia();

      // Desktop Pinning
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          id: "mechanism-scroll-desktop",
          trigger: sectionRef.current,
          start: "top top+=80px",
          end: `+=${stepCount * 65}%`,
          pin: containerRef.current,
          pinSpacing: true,
          scrub: 0.5,
          snap: {
            snapTo: (progress) => Math.round(progress * (stepCount - 1)) / (stepCount - 1),
            duration: { min: 0.15, max: 0.35 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const newStep = Math.min(
              stepCount - 1,
              Math.max(0, Math.round(self.progress * (stepCount - 1)))
            );
            setActiveStep(newStep);
          },
        });
      });

      // Mobile / Tablet: Smooth unpinned scroll-driven sync
      mm.add("(max-width: 1023px)", () => {
        ScrollTrigger.create({
          id: "mechanism-scroll-mobile",
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          onUpdate: (self) => {
            const newStep = Math.min(
              stepCount - 1,
              Math.max(0, Math.round(self.progress * (stepCount - 1)))
            );
            setActiveStep(newStep);
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [stepCount] }
  );

  // Manual step click navigation handler
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      const desktopST = ScrollTrigger.getById("mechanism-scroll-desktop");
      if (desktopST) {
        const targetProgress = index / (stepCount - 1);
        const scrollPos = desktopST.start + targetProgress * (desktopST.end - desktopST.start);
        gsap.to(window, { scrollTo: scrollPos, duration: 0.4, ease: "power2.out" });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[hsl(160,14%,7%)] py-12 md:py-20"
      aria-label="How Vocaply works"
    >
      {/* Subtle background ambient dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(60 9% 96% / 0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Section Header */}
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative flex flex-col items-center text-center px-4 sm:px-6 mb-8 md:mb-12 max-w-4xl mx-auto z-10"
      >
        <motion.div variants={revealUp} className="flex items-center gap-2 mb-3">
          <span className="h-px w-5 bg-[hsl(149,62%,32%)]" />
          <p className="font-mono text-[0.6875rem] sm:text-xs font-semibold tracking-widest uppercase text-[hsl(149,45%,55%)]">
            How It Works
          </p>
          <span className="h-px w-5 bg-[hsl(149,62%,32%)]" />
        </motion.div>

        <motion.h2
          variants={revealUp}
          className="font-display font-medium tracking-tighter leading-[1.08] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[hsl(60,9%,96%)] max-w-3xl"
        >
          From raw recording{" "}
          <span className="text-[hsl(149,45%,55%)]">to full accountability.</span>
        </motion.h2>

        <motion.p
          variants={revealUp}
          className="mt-3 sm:mt-4 font-body leading-relaxed text-xs sm:text-sm md:text-base text-[hsl(160,6%,68%)] max-w-lg"
        >
          Vocaply's pipeline runs the moment your call ends. No setup. No prompting.
        </motion.p>
      </motion.div>

      {/* Pinned Mechanism Showcase Container */}
      <div ref={containerRef} className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-16 items-center">
          
          {/* Mobile Step Selector Pills (< lg) */}
          <div className="flex lg:hidden flex-col w-full gap-3">
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
              {mechanismSteps.map((step, i) => {
                const isActive = i === activeStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(i)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono transition-all duration-300 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    style={{
                      background: isActive
                        ? "hsl(160 12% 14%)"
                        : "hsl(160 14% 10% / 0.5)",
                      border: `1px solid ${
                        isActive
                          ? "hsl(149 62% 32% / 0.45)"
                          : "hsl(60 9% 96% / 0.08)"
                      }`,
                      color: isActive ? "hsl(60 9% 96%)" : "hsl(60 9% 96% / 0.5)",
                    }}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <span
                      className="font-bold text-[0.6875rem]"
                      style={{ color: isActive ? "hsl(149 45% 55%)" : "hsl(60 9% 96% / 0.3)" }}
                    >
                      {step.number}
                    </span>
                    <span className="font-sans font-medium text-xs">
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Left Stepper Cards (lg+) */}
          <div
            className="hidden lg:flex flex-col gap-3.5 flex-shrink-0 relative"
            style={{ width: "clamp(300px, 34%, 400px)" }}
            role="tablist"
          >
            {/* Background vertical progress line */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-4 bottom-4 w-[2px] bg-[hsl(60,9%,96%/0.08)] rounded-full z-0 pointer-events-none"
            >
              <div
                className="w-full bg-[hsl(149,45%,55%)] rounded-full transition-all duration-300"
                style={{
                  height: `${((activeStep + 1) / stepCount) * 100}%`,
                }}
              />
            </div>

            {mechanismSteps.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(i)}
                  className="text-left rounded-2xl p-5 sm:p-6 w-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 relative z-10"
                  style={{
                    background: isActive
                      ? "hsl(160 12% 11%)"
                      : "transparent",
                    border: `1px solid ${
                      isActive
                        ? "hsl(149 62% 32% / 0.35)"
                        : "hsl(60 9% 96% / 0.07)"
                    }`,
                    boxShadow: isActive
                      ? "0 0 0 1px hsl(149 62% 32% / 0.12), inset 0 1px 0 hsl(60 9% 96% / 0.06), 0 16px 40px -12px hsl(160 20% 4% / 0.6)"
                      : "none",
                    cursor: "pointer",
                  }}
                  role="tab"
                  aria-selected={isActive}
                >
                  {/* Step Number */}
                  <span
                    className="font-mono text-[0.6875rem] font-bold tracking-widest block mb-2 transition-colors duration-300"
                    style={{
                      color: isActive
                        ? "hsl(149 45% 55%)"
                        : "hsl(60 9% 96% / 0.3)",
                    }}
                  >
                    STEP {step.number}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-display font-medium leading-snug transition-all duration-300"
                    style={{
                      fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                      color: isActive
                        ? "hsl(60 9% 96%)"
                        : "hsl(60 9% 96% / 0.45)",
                      marginBottom: isActive ? "8px" : "0",
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Description — smoothly reveals when active */}
                  <div
                    style={{
                      maxHeight: isActive ? "100px" : "0px",
                      opacity: isActive ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s",
                    }}
                  >
                    <p
                      className="font-body text-[0.8125rem] leading-relaxed"
                      style={{ color: "hsl(160 6% 68%)" }}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Glowing active bar */}
                  <div
                    style={{
                      height: "1px",
                      marginTop: isActive ? "14px" : "0",
                      maxWidth: isActive ? "100%" : "0%",
                      background:
                        "linear-gradient(to right, hsl(149 62% 32%), transparent)",
                      transition: "max-width 0.4s cubic-bezier(0.16,1,0.3,1), margin-top 0.3s",
                      borderRadius: "99px",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Product Showcase Window (Floating Glass Card) */}
          <div className="w-full flex-1 min-w-0 flex flex-col items-center">
            <div
              className="relative w-full rounded-2xl overflow-hidden border border-[hsl(60,9%,96%/0.10)]"
              style={{
                background: "hsl(160 14% 10% / 0.60)",
                backdropFilter: "blur(20px) saturate(140%)",
                boxShadow:
                  "0 32px 80px -16px hsl(160 20% 4% / 0.8), inset 0 1px 0 hsl(60 9% 96% / 0.14)",
              }}
            >
              {/* Product Window Top Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(60,9%,96%/0.08)] bg-[hsl(160,14%,8%/0.6)]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[hsl(0,70%,50%/0.6)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[hsl(40,80%,50%/0.6)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[hsl(149,62%,32%/0.8)]" />
                </div>
                <div className="flex items-center gap-2 font-mono text-[0.6875rem] text-[hsl(160,6%,68%)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(149,45%,55%)] animate-pulse" />
                  <span>VOCAPLY PIPELINE</span>
                </div>
                <div className="font-mono text-[0.6875rem] text-[hsl(149,45%,55%)] font-semibold">
                  0{activeStep + 1} / 0{stepCount}
                </div>
              </div>

              {/* Main Visual Frame */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
                {/* Ambient dynamic radial glow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-0 pointer-events-none transition-all duration-700"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 10%, hsl(149 62% 32% / 0.28), transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />

                {/* Animated Image Morphing */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full h-full"
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <Image
                      src={activeStepData.imageSrc}
                      alt={activeStepData.imageAlt}
                      fill
                      className="object-cover object-top"
                      priority={activeStep === 0}
                      sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, (max-width: 1280px) 55vw, 750px"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Hidden prefetch for seamless instant step transitions */}
                <div className="sr-only" aria-hidden="true">
                  {mechanismSteps.map((step, idx) => (
                    idx !== activeStep ? (
                      <Image
                        key={step.id}
                        src={step.imageSrc}
                        alt=""
                        width={10}
                        height={10}
                        loading="lazy"
                      />
                    ) : null
                  ))}
                </div>

                {/* Step dot indicator pills */}
                <div
                  className="absolute bottom-3 sm:bottom-4 left-1/2 z-20 flex items-center gap-2"
                  style={{ transform: "translateX(-50%)" }}
                >
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{
                      background: "hsl(160 14% 7% / 0.88)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid hsl(60 9% 96% / 0.12)",
                    }}
                  >
                    {mechanismSteps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleStepClick(i)}
                        aria-label={`Step ${i + 1}`}
                        className="p-1 focus:outline-none cursor-pointer"
                      >
                        <span
                          className="block"
                          style={{
                            height: "6px",
                            width: i === activeStep ? "22px" : "6px",
                            borderRadius: "99px",
                            background:
                              i === activeStep
                                ? "hsl(149 45% 55%)"
                                : "hsl(60 9% 96% / 0.22)",
                            transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Active Step Description Card (< lg) */}
            <div className="flex lg:hidden flex-col items-center text-center mt-4 px-2 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider mb-1 text-[hsl(149,45%,55%)]">
                    Step 0{activeStepData.number} of 0{stepCount}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-medium mb-1 text-[hsl(60,9%,96%)]">
                    {activeStepData.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm max-w-md leading-relaxed text-[hsl(160,6%,68%)]">
                    {activeStepData.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


