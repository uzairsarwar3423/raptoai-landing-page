"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function ChasingLoopVisual() {
  const pings = [
    { label: "Slack DM", time: "11:42", x: "18%", y: "24%", delay: 0 },
    { label: "Check-in", time: "14:15", x: "82%", y: "30%", delay: 0.6 },
    { label: "Status Sync", time: "16:50", x: "68%", y: "78%", delay: 1.2 },
    { label: "Ping: Blocked", time: "09:10", x: "24%", y: "76%", delay: 1.8 },
  ];

  return (
    <div className="relative w-full h-[140px] sm:h-[150px] rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/70 dark:border-neutral-800/80 p-3 overflow-hidden flex items-center justify-center">
      {/* Background Radar Grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[120px] h-[120px] rounded-full border border-neutral-300 dark:border-neutral-700" />
        <div className="w-[70px] h-[70px] rounded-full border border-neutral-300 dark:border-neutral-700 border-dashed" />
        <div className="w-full h-px bg-neutral-300 dark:bg-neutral-800" />
        <div className="h-full w-px bg-neutral-300 dark:bg-neutral-800" />
      </div>

      {/* Rotating Scanning Radar Sweep */}
      <motion.div
        className="absolute w-[120px] h-[120px] rounded-full pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 70%, rgba(249, 115, 22, 0.18) 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Central Manager Pulse Node */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-7 h-7 rounded-full bg-orange-500/10 border border-orange-500/40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping opacity-75" />
          <div className="absolute w-2 h-2 rounded-full bg-orange-500" />
        </div>
        <span className="text-[8px] font-mono font-bold text-orange-600 dark:text-orange-400 mt-1 uppercase tracking-wider">
          CHASING
        </span>
      </div>

      {/* Surrounding Ping Nodes */}
      {pings.map((ping, i) => (
        <motion.div
          key={i}
          className="absolute z-20 flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-700 shadow-xs backdrop-blur-xs text-[9px] font-mono"
          style={{ left: ping.x, top: ping.y, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0.7, scale: 0.95 }}
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [0.95, 1.02, 0.95],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: ping.delay,
            ease: "easeInOut",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span className="text-neutral-700 dark:text-neutral-300 font-medium">
            {ping.label}
          </span>
          <span className="text-neutral-400 text-[8px]">{ping.time}</span>
        </motion.div>
      ))}
    </div>
  );
}
