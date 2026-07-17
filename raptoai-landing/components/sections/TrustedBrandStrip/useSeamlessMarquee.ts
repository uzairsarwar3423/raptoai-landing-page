"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/motion/gsap-setup";
import { gsap } from "@/lib/motion/gsap-setup";

export function useSeamlessMarquee(durationSeconds: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!trackRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return; // caller renders the static fallback layout instead

    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: durationSeconds,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, { scope: trackRef, dependencies: [durationSeconds] });

  const pause  = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.resume();

  return { trackRef, pause, resume };
}
