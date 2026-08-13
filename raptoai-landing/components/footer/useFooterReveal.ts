"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-setup";

export function useFooterReveal(finalCtaSelector: string) {
  const scope = useRef<HTMLDivElement>(null);

  // Scroll reveal animation disabled per user request - footer follows standard document flow
  return scope;
}
