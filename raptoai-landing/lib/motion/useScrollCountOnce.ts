"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap-setup";

interface CountOptions {
  from?: number;
  to: number;
  duration?: number;
  format: (value: number) => string;
  onUpdate?: (value: number) => void;
}

export function useScrollCountOnce({
  from = 0,
  to,
  duration = 1.4,
  format,
  onUpdate,
}: CountOptions) {
  const elRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const formatRef = useRef(format);
  const onUpdateRef = useRef(onUpdate);

  formatRef.current = format;
  onUpdateRef.current = onUpdate;

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!elRef.current || !triggerRef.current) return;

    if (reduceMotion) {
      elRef.current.textContent = formatRef.current(to);
      onUpdateRef.current?.(to);
      return;
    }

    const proxy = { value: from };

    const tween = gsap.to(proxy, {
      value: to,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (elRef.current) elRef.current.textContent = formatRef.current(proxy.value);
        onUpdateRef.current?.(proxy.value);
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, duration, from]);

  return { elRef, triggerRef };
}
