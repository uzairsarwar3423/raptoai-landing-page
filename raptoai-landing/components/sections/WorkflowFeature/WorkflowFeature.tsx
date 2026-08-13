"use client";

/**
 * WorkflowFeature.tsx
 * ─────────────────────────────────────────────────────────────────
 * Adapted from watermelon.sh feature-5 registry component.
 * Re-styled to match Rapto's design system:
 *   – Light paper background to alternate with dark Mechanism section
 *   – Brand green accents (--color-brand-*)
 *   – Framer Motion scroll-reveal animations
 *   – Three floating glass UI cards showing Rapto's workflow pipeline
 *   – Rapto-specific copy & iconography via lucide-react
 * ─────────────────────────────────────────────────────────────────
 */

import { motion } from "framer-motion";
import {
  LayoutGrid,
  Zap,
  BellDot,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Users,
} from "lucide-react";
import { staggerContainer, revealUp } from "@/lib/motion/variants";
import { cn } from "@/components/ui/Button";

// ─── Feature bullet items ───────────────────────────────────────
const featurePoints = [
  {
    icon: LayoutGrid,
    label: "Full pipeline visibility",
    sublabel: "Track every commitment across every meeting, team-wide",
  },
  {
    icon: Zap,
    label: "Instant accountability scoring",
    sublabel: "Real-time fulfilment rates per person and per project",
  },
  {
    icon: BellDot,
    label: "Proactive smart nudges",
    sublabel: "Catch drift before it becomes a missed deadline",
  },
];

// ─── Floating workflow card data ─────────────────────────────────
const floatingCards = [
  {
    id: "card-trigger",
    style: { top: 0, left: 0, width: 260 },
    delay: 0.05,
    content: (
      <div className="space-y-2.5">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-500)]">
          Meeting trigger
        </p>
        <p className="text-sm font-semibold text-[var(--color-ink-900)] leading-snug">
          New action items detected
        </p>
        <div className="flex gap-2 text-[10px]">
          <span className="rounded-md bg-[var(--color-brand-50)] text-[var(--color-brand-600)] px-2 py-0.5 font-medium">
            Live
          </span>
          <span className="rounded-md bg-[var(--color-paper-sunken)] text-[var(--color-ink-500)] px-2 py-0.5">
            Webhook
          </span>
        </div>
        <div className="text-[11px] text-[var(--color-ink-500)] space-y-0.5 font-mono">
          <div>Source: Zoom / Meet / Teams</div>
          <div>Owner: Auto-assigned</div>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] animate-status-pulse"
              aria-hidden="true"
            />
            <span>Status: Active</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "card-routing",
    style: { top: "7rem", right: 0, width: 248 },
    delay: 0.15,
    content: (
      <div className="space-y-3">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-500)]">
          Decision layer
        </p>
        <p className="text-sm font-medium text-[var(--color-ink-900)]">
          Priority & accountability routing
        </p>
        {/* Progress bar stack */}
        <div className="flex h-2 w-full gap-1 overflow-hidden rounded-full">
          <div
            className="bg-[var(--color-brand-500)] rounded-full"
            style={{ width: "52%" }}
          />
          <div
            className="bg-[var(--color-ember-400)] rounded-full"
            style={{ width: "28%" }}
          />
          <div
            className="bg-[var(--color-ink-300)] rounded-full"
            style={{ width: "20%" }}
          />
        </div>
        <div className="flex gap-3 text-[10px] text-[var(--color-ink-500)] font-mono">
          <span>Committed</span>
          <span>Pending</span>
          <span>Overdue</span>
        </div>
      </div>
    ),
  },
  {
    id: "card-execution",
    style: { bottom: "2rem", left: "2.5rem", width: 268 },
    delay: 0.25,
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[var(--color-ink-900)]">
            Follow-through confirmed
          </span>
          <span className="text-[10px] text-[var(--color-ink-300)] font-mono">
            Synced
          </span>
        </div>
        <p className="text-xs text-[var(--color-ink-500)] leading-relaxed">
          Ahmed's Thursday update fulfilled Monday's commitment — score updated
          automatically.
        </p>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="rounded-md bg-green-500/10 px-2 py-0.5 text-green-600 font-medium">
            Fulfilled ✓
          </span>
          <span className="rounded-md bg-[var(--color-brand-50)] text-[var(--color-brand-600)] px-2 py-0.5 font-medium">
            Score +12
          </span>
        </div>
      </div>
    ),
  },
];

// ─── Component ───────────────────────────────────────────────────
export function WorkflowFeature() {
  return (
    <section
      id="workflow-feature"
      aria-label="How Rapto automates accountability workflows"
      className="relative bg-[var(--color-paper)] border-t border-[var(--color-ink-900)]/5 py-28 md:py-36 overflow-hidden"
    >
      {/* Ambient background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-[100%] blur-[130px]"
        style={{
          background:
            "radial-gradient(ellipse, hsl(149 60% 93% / 0.55), transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          {/* ── Left: Copy column ──────────────────────────────── */}
          <div className="space-y-8">
            {/* Eyebrow badge */}
            <motion.div variants={revealUp}>
              <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-600)] tracking-wide uppercase">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)] animate-status-pulse"
                  aria-hidden="true"
                />
                Workflow automation
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={revealUp}
              className="font-display font-medium tracking-tighter leading-[1.08] text-4xl sm:text-5xl text-[var(--color-ink-900)]"
            >
              Run your accountability
              <br />
              <span className="text-[var(--color-ink-500)]">
                system — not just tasks.
              </span>
            </motion.h2>

            {/* Body copy */}
            <motion.p
              variants={revealUp}
              className="text-base sm:text-lg text-[var(--color-ink-500)] leading-relaxed max-w-lg"
            >
              Rapto coordinates commitments across every call, auto-assigns
              owners, scores follow-through, and nudges the right people —
              without a single manual update or tool-switch.
            </motion.p>

            {/* Feature bullets */}
            <motion.div variants={revealUp} className="space-y-4">
              {featurePoints.map(({ icon: Icon, label, sublabel }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      "bg-[var(--color-brand-50)] text-[var(--color-brand-600)]",
                      "border border-[var(--color-brand-100)]"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-ink-900)]">
                      {label}
                    </p>
                    <p className="text-xs text-[var(--color-ink-500)] mt-0.5 leading-relaxed">
                      {sublabel}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div
              variants={revealUp}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="https://app.rapto.cloud/register"
                className={cn(
                  "inline-flex items-center gap-2 px-6 h-11 rounded-[10px]",
                  "bg-[var(--color-brand-500)] text-white text-sm font-semibold",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
                  "hover:bg-[var(--color-brand-600)] hover:shadow-[0_8px_24px_-4px_hsl(149_62%_32%_/_0.35)]",
                  "hover:-translate-y-[1px] active:translate-y-0 transition-all duration-150"
                )}
              >
                Start for free
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <div className="flex items-center gap-4 text-xs text-[var(--color-ink-500)]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-brand-500)]" />
                  No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[var(--color-brand-500)]" />
                  5 free meetings/mo
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Floating workflow card panel ────────────── */}
          <motion.div
            variants={revealUp}
            className={cn(
              "relative flex justify-center rounded-2xl p-8 min-h-[420px]",
              "bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/5",
              "shadow-[inset_0_0_8px_hsl(160_20%_8%_/_0.05)]"
            )}
          >
            {/* Decorative dot pattern inside panel */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, hsl(160 10% 12% / 0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Floating pipeline label */}
            <div
              aria-hidden="true"
              className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono text-[var(--color-brand-600)] bg-[var(--color-brand-50)] border border-[var(--color-brand-100)]"
            >
              <RefreshCw className="h-2.5 w-2.5" />
              RAPTO PIPELINE
            </div>

            {/* Cards container */}
            <div className="relative w-full max-w-sm h-[380px]">
              {floatingCards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: card.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className={cn(
                    "absolute rounded-xl p-4",
                    "bg-[var(--color-paper-raised)]/90",
                    "border border-[var(--color-ink-900)]/8",
                    "shadow-tier-2",
                    "backdrop-blur-md"
                  )}
                  style={card.style as React.CSSProperties}
                >
                  {card.content}
                </motion.div>
              ))}

              {/* Connector lines (decorative) */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
              >
                {/* Vertical connector from card 1 to card 2 */}
                <line
                  x1="130"
                  y1="115"
                  x2="250"
                  y2="140"
                  stroke="hsl(149 45% 55% / 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                {/* Diagonal connector from card 2 to card 3 */}
                <line
                  x1="250"
                  y1="220"
                  x2="135"
                  y2="310"
                  stroke="hsl(149 45% 55% / 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                {/* Node dots */}
                <circle cx="130" cy="115" r="3" fill="hsl(149 45% 55% / 0.5)" />
                <circle cx="250" cy="140" r="3" fill="hsl(149 45% 55% / 0.5)" />
                <circle cx="250" cy="220" r="3" fill="hsl(149 45% 55% / 0.5)" />
                <circle cx="135" cy="310" r="3" fill="hsl(149 45% 55% / 0.5)" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
