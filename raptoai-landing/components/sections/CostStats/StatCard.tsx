"use client";

import { useState } from "react";
import { useScrollCountOnce } from "@/lib/motion/useScrollCountOnce";
import { StatMicroVisual } from "./StatMicroVisual";
import type { StatCardData } from "./cost-stats.content";

export function StatCard({ data }: { data: StatCardData }) {
  const [progress, setProgress] = useState(0);

  const { elRef, triggerRef } = useScrollCountOnce({
    to: data.value,
    format: data.format,
    onUpdate: (val) => setProgress(val),
  });

  return (
    <div
      ref={triggerRef}
      className="relative overflow-hidden bg-white/50 backdrop-blur-md border border-[var(--color-ink-900)]/5 rounded-[2rem] p-8 md:p-10 flex flex-col min-h-[320px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-tier-3 hover:-translate-y-1 hover:bg-white group"
    >
      {/* Subtle top inner glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
      
      {/* Icon placed top right */}
      <div className="flex justify-end w-full mb-8">
        <div className="p-3 rounded-2xl bg-[var(--color-paper-sunken)]/50 border border-[var(--color-ink-900)]/5 shadow-inner transition-transform duration-500 group-hover:scale-110">
          <StatMicroVisual variant={data.visual} progress={progress} />
        </div>
      </div>
      
      {/* Content pushed to the bottom */}
      <div className="flex flex-col gap-3 mt-auto">
        <span className="sr-only">{data.format(data.value)} {data.label}</span>
        
        <span
          ref={elRef}
          aria-live="off"
          className={`font-mono tabular-nums font-bold tracking-tighter text-[var(--color-ink-900)] leading-none ${
            data.format(data.value).length > 5 
              ? "text-4xl lg:text-5xl whitespace-nowrap" 
              : "text-6xl md:text-7xl lg:text-[5rem]"
          }`}
          style={{ minWidth: `${data.format(data.value).length}ch` }}
        >
          {data.format(0)}
        </span>
        
        <p className="font-body text-[var(--text-body-l)] text-[var(--color-ink-500)] leading-relaxed font-medium mt-2">
          {data.label}
        </p>
      </div>
    </div>
  );
}
