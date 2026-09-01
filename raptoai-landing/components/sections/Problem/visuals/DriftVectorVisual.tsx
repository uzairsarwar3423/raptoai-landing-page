"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function DriftVectorVisual() {
  return (
    <div className="relative w-full h-[140px] sm:h-[150px] rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/70 dark:border-neutral-800/80 p-3 overflow-hidden flex flex-col justify-between">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between text-[9px] font-mono border-b border-neutral-200/60 dark:border-neutral-800/60 pb-1.5 z-10">
        <span className="text-neutral-500 uppercase tracking-wider">
          Trajectory Divergence
        </span>
        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
          Δ 3.2× DRIFT
        </span>
      </div>

      {/* SVG Divergence Chart */}
      <div className="relative w-full h-[90px] flex items-center justify-center">
        <svg
          viewBox="0 0 260 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Grid Line Gradient */}
            <linearGradient id="drift-grid" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            {/* Shaded Divergence Gap */}
            <linearGradient id="gap-shade" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Horizontal Reference Lines */}
          <line x1="10" y1="20" x2="250" y2="20" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeDasharray="3 3" />
          <line x1="10" y1="50" x2="250" y2="50" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeDasharray="3 3" />
          <line x1="10" y1="80" x2="250" y2="80" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeDasharray="3 3" />

          {/* Divergence Polygon Gap Area */}
          <polygon
            points="20,50 80,48 160,32 240,15 240,78 160,62 80,54 20,50"
            fill="url(#gap-shade)"
          />

          {/* Baseline Expected Trajectory (Green / Target) */}
          <motion.path
            d="M 20,50 L 80,48 L 160,32 L 240,15"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Actual Drift Trajectory (Ember / Unaligned) */}
          <motion.path
            d="M 20,50 L 80,54 L 160,65 L 240,80"
            stroke="#f59e0b"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          {/* Origin Node (Meeting Agreement) */}
          <circle cx="20" cy="50" r="4" fill="#10b981" />
          <circle cx="20" cy="50" r="7" stroke="#10b981" strokeOpacity="0.4" fill="none" />

          {/* Target Node (Intended Finish) */}
          <circle cx="240" cy="15" r="3.5" fill="#10b981" />

          {/* Drift Endpoint (Surprise Blocker) */}
          <circle cx="240" cy="80" r="4" fill="#ef4444" className="animate-ping" style={{ transformOrigin: "240px 80px" }} />
          <circle cx="240" cy="80" r="4" fill="#ef4444" />
        </svg>

        {/* Labels overlay */}
        <div className="absolute right-2 top-0 text-[8px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
          INTENDED PLAN
        </div>
        <div className="absolute right-2 bottom-0 text-[8px] font-mono text-amber-600 dark:text-amber-400 font-bold">
          MUTATED SCOPE
        </div>
      </div>
    </div>
  );
}
