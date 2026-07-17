"use client";

import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { forwardRef } from "react";

export interface HeroArtifactCardProps {
  day: string;
  name: string;
  quote: string;
  status: "pending" | "fulfilled";
  className?: string;
  style?: React.CSSProperties;
}

export const HeroArtifactCard = forwardRef<HTMLDivElement, HeroArtifactCardProps>(
  ({ day, name, quote, status, className = "", style }, ref) => {
    return (
      <div 
        ref={ref}
        style={style}
        className={`relative w-64 sm:w-72 md:w-80 rounded-[var(--radius-xl)] bg-[#111111]/60 backdrop-blur-2xl border border-white/[0.08] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] p-6 flex flex-col gap-5 overflow-hidden ${className}`}
      >
        {/* Subtle inner top highlight for glass effect */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        
        <div className="flex justify-between items-center relative z-10">
          <span className="text-[10px] font-bold text-[var(--color-ink-on-dark-muted)] uppercase tracking-[0.15em]">{day}</span>
          <motion.div 
            initial={false}
            animate={{
              backgroundColor: status === "pending" ? "rgba(234, 179, 8, 0.1)" : "rgba(34, 197, 94, 0.1)",
              color: status === "pending" ? "#eab308" : "var(--color-brand-300)",
              borderColor: status === "pending" ? "rgba(234, 179, 8, 0.2)" : "rgba(34, 197, 94, 0.2)",
              boxShadow: status === "pending" ? "0 0 10px rgba(234,179,8,0.1)" : "0 0 15px rgba(34,197,94,0.15)"
            }}
            transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }} /* --ease-out-snappy */
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border"
          >
            {status === "pending" ? (
              <>
                <Clock className="w-3 h-3" />
                <span>PENDING</span>
              </>
            ) : (
              <>
                <Check className="w-3 h-3" />
                <span>FULFILLED</span>
              </>
            )}
          </motion.div>
        </div>

        <div className="flex gap-4 items-start relative z-10 mt-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent shrink-0 overflow-hidden flex items-center justify-center font-bold text-white shadow-inner border border-white/5">
            {name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white tracking-wide">{name}</span>
            <p className="text-sm text-white/60 leading-relaxed mt-1 font-light tracking-wide">"{quote}"</p>
          </div>
        </div>
      </div>
    );
  }
);
HeroArtifactCard.displayName = "HeroArtifactCard";
