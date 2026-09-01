"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function DecayGauge({ value = 70 }: { value?: number }) {
  // SVG circle calculations
  const size = 140;
  const strokeWidth = 8;
  const center = size / 2;
  const radius = center - strokeWidth - 6;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * value) / 100;

  return (
    <div className="relative w-[130px] h-[130px] sm:w-[140px] sm:h-[140px] flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="decay-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <filter id="decay-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-neutral-200/80 dark:text-neutral-800/80"
        />

        {/* Inner Ticks Grid */}
        <circle
          cx={center}
          cy={center}
          r={radius - 12}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="2 6"
          className="text-neutral-300 dark:text-neutral-700"
        />

        {/* Animated Decay Arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#decay-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: dashOffset }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
          filter="url(#decay-glow)"
        />
      </svg>

      {/* Center Readout & HUD Indicator */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold">
          LOST
        </span>
        <span className="font-mono text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          -{value}%
        </span>
        <span className="text-[8px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
          in 48 hrs
        </span>
      </div>
    </div>
  );
}
