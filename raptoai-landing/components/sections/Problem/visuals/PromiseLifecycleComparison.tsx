"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  FileText,
  MessageSquare,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { promiseComparison } from "../problem.content";
import { cn } from "@/lib/utils";

export function PromiseLifecycleComparison() {
  const [activeTab, setActiveTab] = useState<"traditional" | "rapto">("rapto");
  const data = promiseComparison[activeTab];

  const getStepIcon = (iconName: string, isRapto: boolean) => {
    const iconClass = isRapto
      ? "w-4 h-4 text-emerald-500"
      : "w-4 h-4 text-neutral-500 dark:text-neutral-400";

    switch (iconName) {
      case "mic":
        return <Mic className={iconClass} />;
      case "file":
        return <FileText className={iconClass} />;
      case "message":
        return <MessageSquare className={iconClass} />;
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "brain":
        return <Cpu className={iconClass} />;
      case "sync":
        return <RefreshCw className={iconClass} />;
      case "check":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-md">
      {/* Interactive Switcher Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200/60 dark:border-neutral-800/80 pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-brand-600)] font-bold block mb-1">
            LIFECYCLE DIAGNOSTIC
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
            How a Spoken Promise Evolves Over 7 Days
          </h3>
        </div>

        {/* Segmented Control Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab("traditional")}
            className={cn(
              "flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200",
              activeTab === "traditional"
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            Traditional Tools
          </button>
          <button
            onClick={() => setActiveTab("rapto")}
            className={cn(
              "flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 flex items-center justify-center gap-1.5",
              activeTab === "rapto"
                ? "bg-[var(--color-brand-500)] text-white shadow-xs font-semibold"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            <Sparkles className="w-3 h-3" />
            The Rapto Standard
          </button>
        </div>
      </div>

      {/* Dynamic Content Body with Motion Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="pt-6"
        >
          {/* Subheader Banner */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider",
                  activeTab === "rapto"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                )}
              >
                {data.badge}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium hidden sm:inline">
                {data.subtitle}
              </span>
            </div>
          </div>

          {/* Stepped Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {data.steps.map((step, idx) => {
              const isFinalSuccess = activeTab === "rapto" && idx === 3;
              const isFinalFailure = activeTab === "traditional" && idx === 3;

              return (
                <div
                  key={idx}
                  className={cn(
                    "rounded-xl p-4 flex flex-col justify-between border transition-all duration-300 relative overflow-hidden",
                    activeTab === "rapto"
                      ? "bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-900/10 dark:border-emerald-500/20"
                      : "bg-neutral-50 dark:bg-neutral-950/50 border-neutral-200/70 dark:border-neutral-800",
                    isFinalSuccess && "ring-1 ring-emerald-500/40 bg-emerald-500/5",
                    isFinalFailure && "ring-1 ring-red-500/40 bg-red-500/5"
                  )}
                >
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-400 tracking-wider">
                      {step.time}
                    </span>
                    <div className="p-1.5 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-700/60 shadow-2xs">
                      {getStepIcon(step.icon, activeTab === "rapto")}
                    </div>
                  </div>

                  {/* Step Title & Detail */}
                  <div className="mb-3">
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-1 tracking-tight">
                      {step.label}
                    </h4>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-mono">
                      {step.detail}
                    </p>
                  </div>

                  {/* Step Status Pill */}
                  <div className="mt-auto pt-2 border-t border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-between">
                    <span
                      className={cn(
                        "text-[9px] font-mono font-semibold",
                        isFinalSuccess
                          ? "text-emerald-600 dark:text-emerald-400 font-bold"
                          : isFinalFailure
                          ? "text-red-600 dark:text-red-400 font-bold"
                          : "text-neutral-500 dark:text-neutral-400"
                      )}
                    >
                      {step.status}
                    </span>
                    {isFinalSuccess && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                    {isFinalFailure && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
