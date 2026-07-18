"use client";

import { motion } from "framer-motion";

interface StatMicroVisualProps {
  variant: "ring" | "clock" | "bars";
  progress: number;
}

export function StatMicroVisual({ variant, progress }: StatMicroVisualProps) {
  if (variant === "ring") {
    // Progress goes 0 to 70
    const dashOffset = 100 - (progress / 100) * 100; // max value is 70%

    return (
      <svg width="56" height="56" viewBox="0 0 40 40" className="rotate-[-90deg]" aria-hidden="true">
        <circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-ink-900)" strokeOpacity="0.05" strokeWidth="6" />
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="var(--color-ember-500)"
          strokeWidth="6"
          strokeDasharray="100 100"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
    );
  }

  if (variant === "clock") {
    // Progress goes 0 to 4.5. A third of a clock is about 4 hours.
    // Let's sweep the clock hand. Progress 0->4.5 maps to roughly 0->135 degrees.
    const degrees = (progress / 4.5) * 135;

    return (
      <svg width="56" height="56" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="16" fill="var(--color-ink-900)" fillOpacity="0.02" stroke="var(--color-ink-900)" strokeOpacity="0.05" strokeWidth="4" />
        <path
          d={`M20 20 L20 8 A12 12 0 0 1 ${20 + 12 * Math.sin((degrees * Math.PI) / 180)} ${
            20 - 12 * Math.cos((degrees * Math.PI) / 180)
          } Z`}
          fill="var(--color-ink-500)"
          opacity="0.25"
          className="transition-all duration-300 ease-out"
        />
        <line x1="20" y1="20" x2="20" y2="10" stroke="var(--color-ink-700)" strokeWidth="3" strokeLinecap="round" />
        <line
          x1="20"
          y1="20"
          x2={20 + 10 * Math.sin((degrees * Math.PI) / 180)}
          y2={20 - 10 * Math.cos((degrees * Math.PI) / 180)}
          stroke="var(--color-ember-500)"
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
    );
  }

  if (variant === "bars") {
    // Progress goes 0 to 3
    const heightProgress = progress / 3;

    return (
      <svg width="56" height="56" viewBox="0 0 40 40" aria-hidden="true">
        <rect x="6" y="22" width="10" height="10" rx="3" fill="var(--color-ink-900)" fillOpacity="0.08" />
        <rect
          x="24"
          y={32 - 24 * heightProgress}
          width="10"
          height={Math.max(4, 24 * heightProgress)}
          rx="3"
          fill="var(--color-brand-500)"
          className="transition-all duration-300 ease-out"
        />
      </svg>
    );
  }

  return null;
}
