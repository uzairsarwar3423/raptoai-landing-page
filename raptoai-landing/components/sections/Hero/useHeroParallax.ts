import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap-setup";

export function useHeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop where hover makes sense
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || prefersReducedMotion) return;

    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    // quickTo is highly performant for things that update frequently like mousemove
    const xTo = gsap.quickTo(target, "rotationY", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(target, "rotationX", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      const normalizedX = (relX / rect.width) * 2 - 1;
      const normalizedY = (relY / rect.height) * 2 - 1;

      // Max tilt of 4 degrees
      xTo(normalizedX * 4);
      yTo(-normalizedY * 4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return { containerRef, targetRef };
}
