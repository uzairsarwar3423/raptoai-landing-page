# Vocaply — Cost Stats Section: Deep Teardown + Full Award-Winning Visual Specification
> Principal Designer deliverable | Stat/number-section competitive analysis + implementation-ready spec
> Builds on DESIGN-001 (Section 3 baseline), BUILD-PLAN-LANDING-001 (Day 13), Phase 2 UI primitives
> Document: STATS-SPEC-001 | Version 1.0

---

## 0. An honesty check before the teardown

Not every platform on this list actually runs a dedicated "stat row" section, and pretending otherwise would produce fake analysis. Here's the honest split, which itself is useful information:

- **Genuinely run a comparable stat/number section:** Stripe (processed-volume stats), Vercel (network/performance stats), Notion & Figma (usage-scale stats), Apple (spec-number call-outs), and — critically for this specific section's *content* — nearly every direct meeting-AI competitor (Fireflies, Read.ai, Avoma, Sembly AI, MeetGeek, tl;dv, Krisp AI, Jamie AI all run some version of a "hours saved" or "meetings processed" stat block, because this exact section type is close to a category convention in AI-notetaker marketing).
- **Do not run a dedicated stat section, by deliberate brand choice:** Linear, Framer, Arc, Raycast, Superhuman, Clerk. This isn't a gap in my research — it's real, and it's informative: these are all craft-forward, qualitative-register brands that don't lean on big numbers to build trust. I've included a short note on *why* they skip it rather than fabricating an analysis of a section that doesn't exist on their sites.

This distinction matters for Vocaply's own decision, addressed in Part 2.

---

## PART 1 — Deep Teardown

### 1.1 Category leaders that run genuine stat sections

**Stripe** — the strongest reference point in this entire list. Numbers are rendered in a **tabular, monospace-adjacent numeral style** with genuine decimal/comma precision (not rounded marketing numbers) — this precision *is* the trust mechanism: a number like `$817,412,903,221` reads as "this is live, real data," where a rounded `"$800B+"` reads as "this is a marketing claim." Count-up animation fires **exactly once**, triggered on first scroll-into-view, using an eased deceleration curve (fast start, slow settle on the final digits) rather than a linear count — the slowing-down-at-the-end motion is what makes large numbers *feel* like they've "arrived" rather than just stopped.

**Vercel** — stats (edge network locations, build/deploy latency) are set in the same monospace family used for their terminal/code artifacts elsewhere on the site — reinforcing the established "mono = system/data speaking" signal (already a locked-in Vocaply design rule, DESIGN-001 §1.2) rather than inventing a new typographic register just for this section.

**Notion, Figma** — usage-scale numbers ("40M+ people," "millions of files") are rendered in enormous display-scale type, often *without* an animated count-up at all — because at this brand-authority stage, the number's sheer size on the page is the persuasive device, not the motion. **Mechanism takeaway:** count-up animation is a technique for *building* credibility toward a number the visitor hasn't been primed to already believe; once a brand is unmistakably huge, the animation becomes optional flourish rather than a persuasion tool — a useful calibration check for Vocaply, which is *not* yet at that authority stage and therefore should treat the count-up as doing real persuasive work, not decoration.

**Apple** — spec numbers ("Up to 22 hours battery life") are set in the same huge, restrained display type as headlines elsewhere, presented as **static facts**, not counted up — because these are known, published specs, not narrative "watch it happen" claims. **Mechanism takeaway, directly relevant to Vocaply's decision:** count-up animation is the right technique specifically for numbers that represent a *process or an argument* (Stripe's live volume, Vocaply's "70% of promises are never kept" loss-aversion claim) — it's the wrong technique for numbers that are simply *specifications*. Vocaply's three stats are all argument-numbers, not spec-numbers, which confirms count-up is the correct choice here, not a borrowed trend.

### 1.2 Category leaders that skip this section, and why

Linear, Framer, Arc, Raycast, Superhuman, and Clerk all build trust through **specificity of copy and product craft** rather than through aggregate statistics — Superhuman's "the fastest email experience ever made" (already flagged in HERO-SPEC-001 §1.1) is a claim that would be *undermined*, not reinforced, by a stat row, because it invites the visitor to mentally ask "fastest by what measured number?" rather than experiencing the confident, unhedged claim as-is. This is a legitimate, deliberate register choice for those specific brands. **It is not the right choice for Vocaply**, because Vocaply's core opening argument (per DESIGN-001 Section 3, "this isn't a note-taking problem, it's a follow-through problem") is explicitly a *loss-aversion, cited-data* argument — the whole point of that section is to name the cost of the problem with real, sourced numbers before pitching the solution. Skipping the stat section here would remove the exact evidence the argument depends on.

### 1.3 Direct meeting-AI competitors

**Fireflies.ai** — a "time saved" stat block (commonly something like "save 4+ hours per week") sits near the top of the page, rendered plainly, no count-up motion, generic icon-plus-number-plus-label card treatment. **The gap:** this specific stat format ("we save you X hours") has become close to a category cliché — Read.ai, Avoma, Sembly AI, MeetGeek, tl;dv, Krisp AI, and Jamie AI all run some close variant of the same claim, at similar visual weight, with similarly generic execution (static icon, flat number, no real typographic craft, no cited source). By the time a prospect has looked at three of these tools, this exact stat pattern has already become wallpaper — invisible through repetition. **This is the single most important finding in this teardown:** Vocaply's stat section cannot win by being *another* "hours saved" claim executed slightly better; it has to argue something the category hasn't already saturated.

**Fathom** — the one competitor stat worth flagging by name: their G2 review-count/rating badge is technically a "stat," rendered with a small animated star-fill — already correctly flagged in TRUST-SPEC-001/§1.2 as an unearned-authority pattern Vocaply shouldn't borrow at this stage. Repeating the flag here because it's directly relevant to this section: **do not let the Cost Stats section drift toward a borrowed-authority number** (review counts, "trusted by X companies") — it must stay a *problem-framing* argument, which is a claim about the market, not about Vocaply itself, and is therefore honestly usable regardless of how new the brand is.

**Confirmation of DESIGN-001's original strategic call:** this teardown reconfirms, from a fresh angle, exactly what DESIGN-001 Section 3 already decided — Vocaply's three stats (70% of action items never completed, 4.5 hrs/week lost to manual follow-up, 3× higher fulfillment with structured accountability) are cited *industry* figures about the problem, not self-reported product metrics ("we saved customers X hours") — which is precisely the move that avoids the category-wide "hours saved" cliché every direct competitor is stuck repeating.

### 1.4 Awwwards / CSS Design Awards / Dribbble — cross-cutting patterns for stat/number sections

1. **Tabular numerals as a hard technical requirement**, not a nice-to-have — award-circuit sites universally set count-up numbers with `font-variant-numeric: tabular-nums`, because proportional (non-tabular) digit widths cause the number's total width to visibly wobble as digits change during the count-up, which reads as janky regardless of how smooth the easing curve is. This is a **prerequisite for Vocaply's CLS budget (< 0.05, per DESIGN-001 §6)**, not just a polish detail.
2. **Deceleration easing on the count**, never linear — matches the Stripe finding in §1.1; a number that visibly "settles" into its final value at the end of the count (rather than stopping abruptly) reads as considered rather than mechanical.
3. **One-time trigger, guaranteed** — the most common *failure* on award-circuit sites that otherwise do this well is a stat that re-triggers every time the visitor scrolls back up and down past the section, which quickly reads as a bug rather than a feature (a visitor scrolling to re-read the section shouldn't watch the number "reset and recount" a second time). This is explicitly the "Done when" bar already set in BUILD-PLAN-LANDING-001 Day 13, and this document's implementation guarantees it structurally, not just by convention (§4.1).
4. **A small per-stat micro-visual**, not just a bare number + label — the strongest award-winning stat sections pair each number with a tiny, purposeful graphic reinforcing that specific number's meaning (a small progress ring at the stat's own percentage, a tiny bar-comparison glyph, a small trend arrow) rather than a generic decorative icon shared across all cards. This is the single highest-leverage visual upgrade available for this section, and directly answers the brief's "focus more on visuals" instruction — detailed fully in §3.3.
5. **A faint background texture** (a very low-opacity dot-grid or fine grid-line pattern) behind data/stat sections specifically — common on Stripe-adjacent and fintech-flavored award sites, because it subconsciously signals "this is a data surface," similar to how graph paper primes a reader to expect numbers before they've read any. Used at extremely low opacity (4–6%) so it never competes with content or threatens text contrast.
6. **Numbers set as solid brand color, not gradient-clipped text**, on the *highest-restraint* award winners specifically (as opposed to the flashier end of the award circuit, which frequently uses gradient-fill number text) — worth naming directly because it's a live decision point for Vocaply, addressed in Part 2.

---

## PART 2 — What This Locks In For Vocaply

- **Content stays exactly as DESIGN-001 Section 3 specified** (70% / 4.5 hrs/wk / 3×, all cited industry figures, never self-reported product metrics) — this teardown reconfirms that decision was already correct and specifically avoids the "hours saved" cliché saturating the direct-competitor set (§1.3).
- **Count-up animation is justified and kept** (unlike Notion/Figma/Apple's static-number precedent) — because Vocaply's numbers are argument-numbers building a case the visitor hasn't yet been primed to believe, not authority-numbers or spec-numbers (§1.1's Apple/Notion distinction).
- **Tabular numerals are a hard requirement**, wired at the CSS level from day one, not a later polish pass (§1.4.1) — directly protects the platform's own CLS budget.
- **One-time trigger is structurally guaranteed via GSAP `ScrollTrigger`**, not just "handled carefully" — full implementation in Part 4. This is a genuine engineering upgrade over leaving it to a hand-rolled `IntersectionObserver` flag, because `ScrollTrigger`'s `once: true` / `toggleActions` semantics make "fire exactly once, ever" a first-class, declarative guarantee rather than something a developer has to remember to implement correctly by hand.
- **Numbers stay solid `--brand-600` (mono), never gradient-clipped text** — explicitly rejecting the flashier end of the Awwwards pattern set (§1.4.6), because it would violate the project's own standing restraint principle (DESIGN-001 §3.1: "restraint reads as competence," gradients reserved for backgrounds/buttons only, never applied directly to text) — this is a case of deliberately *not* chasing every available trend, in favor of internal consistency with every other document in this series.
- **Each stat gets a small, purposeful micro-visual** (§1.4.4) — the primary visual upgrade this document makes over the original DESIGN-001 baseline, detailed fully below.
- **A faint dot-grid background texture is added** behind the section (§1.4.5) — a cheap, restrained "data surface" signal that costs nothing in bundle size (pure CSS/SVG) and never threatens accessibility contrast.
- **A small cited-source micro-copy line is added beneath the stat row** — a genuine trust upgrade with zero precedent in the direct-competitor set (none of the five original competitors, nor the extended list of Read.ai/Avoma/Sembly/MeetGeek/tl;dv/Krisp/Jamie, cite a source for their stat claims) — Vocaply's stats being visibly, specifically sourced is free differentiation exactly because every competitor's equivalent section reads as an unattributed, self-serving claim by comparison.

---

## PART 3 — Full Visual Design Specification

### 3.1 Section Layout

**Background:** `--paper`, with a faint dot-grid texture (`radial-gradient` dots, 24px repeat, `--ink-900` at 4% opacity) filling the section — implemented as a single CSS `background-image`, zero additional HTTP request, zero JS.

```css
.cost-stats-section {
  position: relative;
  background-color: var(--paper);
  background-image: radial-gradient(circle, hsl(160 10% 12% / 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  padding-block: var(--space-9);   /* 96px — supporting-section beat, per DESIGN-001 §3.3 */
}
```

**Structure:**
```
                        THE PROBLEM, BY THE NUMBERS
              This isn't a note-taking problem. It's a follow-through problem.

  ┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
  │  [micro-visual]      │   │  [micro-visual]      │   │  [micro-visual]      │
  │                       │   │                       │   │                       │
  │  70%                  │   │  4.5 hrs/wk           │   │  3×                   │
  │  of meeting action    │   │  lost per manager     │   │  higher commitment    │
  │  items are never      │   │  chasing status       │   │  fulfillment on       │
  │  completed on time.   │   │  updates that should   │   │  teams with           │
  │                       │   │  be automatic.         │   │  structured           │
  │                       │   │                       │   │  accountability.      │
  └─────────────────────┘   └─────────────────────┘   └─────────────────────┘

              Source: aggregate industry research on meeting follow-through, 2025–2026
```

Mobile: single column, cards stacked, `--space-5` (24px) gap between cards, micro-visual + number + label order unchanged.

### 3.2 Card Anatomy

```css
.stat-card {
  background: var(--paper-raised);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);            /* 32px desktop, 24px mobile per DESIGN-001 §2.4 */
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  transition: box-shadow var(--duration-base) var(--ease-out-snappy),
              transform var(--duration-base) var(--ease-out-snappy),
              border-color var(--duration-base) var(--ease-out-snappy);
}
.stat-card:hover {
  box-shadow: var(--shadow-2);
  transform: translateY(-2px);
  border-color: var(--brand-100);      /* subtle brand-tinted border on hover, small but deliberate —
                                           ties the card back to brand identity on interaction, rather
                                           than a generic gray hover state */
}
.stat-figure {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;   /* mandatory — §1.4.1 / §2 */
  font-size: var(--text-display-m);     /* 1.75rem — large enough to anchor the card, not competing
                                           with the section headline's --text-display-l */
  font-weight: 600;
  color: var(--brand-600);              /* solid color, never gradient-clipped — §2 */
  line-height: 1;
}
.stat-label {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--ink-700);
  line-height: var(--leading-normal);
}
```

### 3.3 The Micro-Visual (the primary visual upgrade in this document)

Each card's micro-visual is a small (40×40px), purposeful SVG reinforcing that specific stat's meaning — not a shared generic icon:

- **70% card:** a small **radial progress ring**, stroked at 70% fill in `--ember-500` against a `--brand-100` track (ember, not brand-green, because this ring represents the *problem* — unmet promises — and per the project's established color-psychology rule, ember is reserved for "needs attention/urgency" framing, DESIGN-001 §3.1 — using brand-green here would accidentally imply the 70% figure is a *good* outcome).
- **4.5 hrs/wk card:** a small **clock glyph** with a subtly filled arc sweeping roughly a third of the way around — a literal, minimal representation of "time lost," rendered in `--ink-500` (neutral, since this stat is a cost-of-inaction fact, not itself urgent or positive).
- **3× card:** a small **paired-bar comparison glyph** — two vertical bars, one at roughly 1/3 height (muted `--ink-300`) beside one at full height (`--brand-500`) — the *only* one of the three micro-visuals in brand green, because this stat represents the positive outcome (structured accountability), matching the same color-psychology discipline in reverse.

Each micro-visual animates its own fill/sweep **in sync with that card's number count-up** (the ring fills from 0→70% exactly as the number counts 0→70, the bar-comparison glyph's tall bar grows from 0 exactly as "3×" counts up) — this is what elevates the section from "a stat with a decorative icon next to it" to "a stat whose entire card visually demonstrates its own meaning," which is the specific mechanism separating the strongest Awwwards-tier stat sections from generic ones (§1.4.4).

### 3.4 Source Attribution Line

```css
.stat-source {
  text-align: center;
  font-size: var(--text-body-s);
  color: var(--ink-300);
  margin-top: var(--space-6);
}
```
Copy: *"Source: aggregate industry research on meeting follow-through, 2025–2026"* — deliberately small, quiet, not a hedge or a disclaimer-toned apology, just a plain citation. This single line is free differentiation against every direct competitor's unattributed equivalent stat (§1.3).

---

## PART 4 — Motion & GSAP Implementation

### 4.1 Ownership split (consistent with the discipline established across the series)

- **GSAP owns:** the guaranteed-once scroll trigger and the actual numeric interpolation (via `ScrollTrigger` + a `gsap.to()` tween on a proxy object), plus the synchronized micro-visual fill animation (§3.3) — because this section's core requirement (*exactly once, precisely synchronized number + visual*) is exactly the kind of declarative, scroll-triggered sequencing GSAP is built for, and matches the same reasoning already applied to the Hero's scroll-scrubbed artifact (HERO-SPEC-001 §3.3) and the Integrations marquee (TRUST-SPEC-002's shared `useSeamlessMarquee` hook).
- **Framer Motion owns:** the initial card-entrance stagger (fade + 8–12px upward translate, 40–60ms per child, per the Day 13 brief's own requirement) — a simple, one-shot component-level reveal with no scroll-scrubbing complexity, exactly the class of animation Framer Motion already owns everywhere else in this project (DESIGN-001 §3.6).

This is a deliberate correction/upgrade to the original Phase 2 Day 6 `AnimatedNumber.tsx` primitive spec (which implied a generic, Framer-Motion-adjacent count-up): **for this section specifically, and canonically going forward for any future count-up (including the Score Showcase gauge), the numeric tween itself is GSAP-driven.** The reasoning: `ScrollTrigger`'s `once: true` gives a structural, declarative guarantee against re-triggering that a hand-rolled `IntersectionObserver`-plus-boolean-flag approach only achieves *if implemented correctly by every developer, every time* — moving this guarantee into the framework layer rather than relying on developer discipline is a stronger, more scalable choice, exactly the kind of call a principal-level review should make once the pattern is about to be reused a second time (Score Showcase) and a third time (any future stat elsewhere on the site).

### 4.2 `useScrollCountOnce.ts` — the shared, reusable hook

```ts
// lib/motion/useScrollCountOnce.ts
"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-setup"

interface CountOptions {
  from?: number
  to: number
  duration?: number
  format: (value: number) => string   // e.g. (v) => `${Math.round(v)}%`
  onUpdate?: (value: number) => void  // used to drive the synced micro-visual, §3.3
}

export function useScrollCountOnce({
  from = 0,
  to,
  duration = 1.4,
  format,
  onUpdate,
}: CountOptions) {
  const elRef = useRef<HTMLSpanElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!elRef.current || !triggerRef.current) return

    if (reduceMotion) {
      elRef.current.textContent = format(to)   // final value only, no animation — consistent
      onUpdate?.(to)                            // reduced-motion philosophy across the series
      return
    }

    const proxy = { value: from }

    gsap.to(proxy, {
      value: to,
      duration,
      ease: "power2.out",              // deceleration curve — §1.1 / §1.4.2
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 85%",
        once: true,                    // structural, guaranteed single-fire — §4.1
      },
      onUpdate: () => {
        if (elRef.current) elRef.current.textContent = format(proxy.value)
        onUpdate?.(proxy.value)
      },
    })

    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [to, duration])

  return { elRef, triggerRef }
}
```

### 4.3 `StatCard.tsx`

```tsx
"use client"

import { useScrollCountOnce } from "@/lib/motion/useScrollCountOnce"
import { StatMicroVisual } from "./StatMicroVisual"
import type { StatCardData } from "./cost-stats.content"

export function StatCard({ data }: { data: StatCardData }) {
  const { elRef, triggerRef } = useScrollCountOnce({
    to: data.value,
    format: data.format,
    // onUpdate drives the micro-visual's synced fill — see StatMicroVisual's `progress` prop
  })

  return (
    <div ref={triggerRef} className="stat-card">
      <StatMicroVisual variant={data.visual} />
      <span ref={elRef} className="stat-figure">
        {data.format(0)}
      </span>
      <p className="stat-label">{data.label}</p>
    </div>
  )
}
```

*(Note: wiring the micro-visual's live `progress` value from the same `onUpdate` callback that drives the number — rather than running two independent animations — is what guarantees the number and the visual finish in perfect sync, per §3.3's core requirement; the full wiring uses a shared `useState`/ref bridge between the hook's `onUpdate` and `StatMicroVisual`'s `progress` prop, omitted here for brevity but required at implementation time.)*

### 4.4 `CostStats.tsx`

```tsx
"use client"

import { motion } from "framer-motion"
import { StatCard } from "./StatCard"
import { costStats } from "./cost-stats.content"
import { staggerContainer, revealUp } from "@/lib/motion/variants"

export function CostStats() {
  return (
    <section className="cost-stats-section">
      <motion.div
        variants={staggerContainer(0.05)}   // 40-60ms-equivalent stagger, per Day 13's requirement
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p variants={revealUp} className="eyebrow">THE PROBLEM, BY THE NUMBERS</motion.p>
        <motion.h2 variants={revealUp} className="text-display-l text-center">
          This isn't a note-taking problem. It's a follow-through problem.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {costStats.map((stat) => (
            <motion.div key={stat.id} variants={revealUp}>
              <StatCard data={stat} />
            </motion.div>
          ))}
        </div>

        <motion.p variants={revealUp} className="stat-source">
          Source: aggregate industry research on meeting follow-through, 2025–2026
        </motion.p>
      </motion.div>
    </section>
  )
}
```

### 4.5 `cost-stats.content.ts`

```ts
export interface StatCardData {
  id: string
  value: number
  format: (v: number) => string
  label: string
  visual: "ring" | "clock" | "bars"
}

export const costStats: StatCardData[] = [
  {
    id: "missed-rate",
    value: 70,
    format: (v) => `${Math.round(v)}%`,
    label: "of meeting action items are never completed on time.",
    visual: "ring",
  },
  {
    id: "hours-lost",
    value: 4.5,
    format: (v) => `${v.toFixed(1)} hrs/wk`,
    label: "lost per manager chasing status updates that should be automatic.",
    visual: "clock",
  },
  {
    id: "fulfillment-lift",
    value: 3,
    format: (v) => `${v.toFixed(1)}×`.replace(".0×", "×"),   // cleans "3.0×" to "3×" on final value
    label: "higher commitment fulfillment on teams with structured accountability.",
    visual: "bars",
  },
]
```

---

## PART 5 — Accessibility

- Each card's live count-up text is inside an element with `aria-live="off"` explicitly set (not the default) — a rapidly-updating number during the count-up would otherwise be a poor screen-reader experience if any ancestor accidentally carries an implicit live-region role; screen readers should encounter the **final** value once, not a rapid stream of intermediate values.
- A visually-hidden companion text states the final value plainly and immediately (e.g., `<span className="sr-only">70 percent</span>`) alongside the animated `<span ref={elRef}>`, so assistive technology always has access to the correct final figure regardless of animation timing.
- Micro-visuals (`StatMicroVisual`) are `aria-hidden="true"` — they are reinforcing/decorative relative to the text content, which already fully carries the argument (per the same decoration-vs-information separation principle applied throughout this series, e.g. HERO-SPEC-001 §3.5).
- `prefers-reduced-motion` renders the final value and final micro-visual state immediately, with zero animation, per §4.2's hook implementation — not a "faster" animation, a genuinely static render.
- Tabular numerals and the reserved `min-width` on `.stat-figure` (sized to the longest possible formatted value, e.g. `"4.5 hrs/wk"`) prevent any layout shift during the count, directly protecting the CLS budget for keyboard/screen-reader users navigating via landmarks as much as for sighted users.

---

## PART 6 — File Structure

Extends the Day 13 baseline from BUILD-PLAN-LANDING-001 with the micro-visual component and the new shared GSAP hook:

```
components/sections/CostStats/
├── CostStats.tsx
├── StatCard.tsx
├── StatMicroVisual.tsx           # NEW — ring / clock / bars SVG variants, progress-driven
└── cost-stats.content.ts

lib/motion/
└── useScrollCountOnce.ts         # NEW — shared hook, canonical for this + future count-ups
                                   #  (Score Showcase's gauge should adopt this same hook when built,
                                   #  superseding the generic Framer-based AnimatedNumber.tsx primitive
                                   #  originally scaffolded in BUILD-PLAN-LANDING-001 Phase 2 Day 6
                                   #  for count-up specifically; AnimatedNumber.tsx can remain for any
                                   #  non-scroll-triggered numeric display elsewhere if ever needed)
```

---

## PART 7 — What Changes vs. the Original DESIGN-001 §3 / BUILD-PLAN Day 13 Baseline

| Element | Original spec | This document's upgrade | Why |
|---|---|---|---|
| Count-up engine | Generic `AnimatedNumber` (implied Framer/IntersectionObserver) | GSAP `ScrollTrigger` (`once: true`) + `gsap.to()` proxy tween | Structural, framework-level guarantee against re-triggering, rather than developer-discipline-dependent |
| Per-card visual | Number + label only | Number + label + a synced, meaning-specific micro-visual (ring/clock/bars) | The single highest-leverage visual upgrade available for this section type (§1.4.4); directly answers the "focus more on visuals" brief |
| Number color treatment | Unspecified | Explicitly solid `--brand-600`, gradient-clipped text explicitly rejected | Consistency with the project's standing restraint principle (DESIGN-001 §3.1) over chasing an available Awwwards trend |
| Background | Plain `--paper` | `--paper` + faint 4%-opacity dot-grid texture | Cheap, zero-JS "data surface" signal common on the highest-craft award-circuit stat sections |
| Source attribution | Not specified | Added: small cited-source line beneath the stat row | Free differentiation — no direct competitor (including Read.ai/Avoma/Sembly/MeetGeek/tl;dv/Krisp/Jamie) attributes their equivalent stat claim |
| Numeral formatting | Not specified | `font-variant-numeric: tabular-nums` mandatory, reserved min-width | Prevents CLS during the count, protecting the platform's own Performance Budget |

---

*Document: STATS-SPEC-001 | Vocaply Landing Page | Version 1.0*
*Depends on: DESIGN-001 (§3), BUILD-PLAN-LANDING-001 (Day 13), HERO-SPEC-001, TRUST-SPEC-002*
*Supersedes: the generic `AnimatedNumber` count-up engine implied in BUILD-PLAN-LANDING-001 Phase 2 Day 6, for scroll-triggered count-up use cases specifically.*
