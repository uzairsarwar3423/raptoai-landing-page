# Vocaply — Mechanism Section: Sticky-Scroll Product Story
> Deep Teardown + Full Award-Winning Build Specification
> Supersedes DESIGN-001 Section 4 in full | Builds on HERO-SPEC-001, STATS-SPEC-001
> Document: MECHANISM-SPEC-002 | Version 2.0

---

## 0. Two corrections before the spec, because they change what gets built

**Correction 1 — naming.** Your brief is written for "Rapto AI." Our product is **Vocaply**. Everything below is translated to Vocaply's actual brand, copy, and (most importantly) actual product architecture — not a generic reskin. This matters because the six workflow steps you listed aren't arbitrary marketing steps for us — they map almost exactly onto Vocaply's real, already-documented AI extraction pipeline (transcript processing → Claude extraction → commitments/action items/decisions/blockers → score). That's a gift, not a coincidence: it means this section can show the *actual product mechanism*, not an invented metaphor, which is exactly the "show the artifact, not the metaphor" principle this entire design series has been built on since document one.

**Correction 2 — no screenshots were actually attached to this conversation.** I'm designing this section's product-window content from Vocaply's real, already-specified in-product components (`MeetingSummaryStream`, `CommitmentCard`, `ActionItemCard`, `Blocker`/`OverdueAlert`, `CommitmentScore`, `TeamHealthDashboard` — all named and speced in the platform's own architecture docs), built as high-fidelity mockups matching those components' real data shapes. **When real product screenshots exist, they should replace these mockups directly** — the layout, morph mechanics, and pacing below are all built to accept real screenshots as a drop-in swap without redesign, which is exactly the "don't redesign the product, transform it into a showcase" instruction in your brief.

**This document fully replaces DESIGN-001 Section 4** (the original 3-beat vertical timeline concept). The sticky-scroll, morph-based approach in this document is a genuinely stronger execution of the same underlying goal ("mechanism transparency beats a generic 3-step claim," DESIGN-001 §Section 4's original rationale) — it isn't a different idea, it's a better-built version of the same idea, with six real steps instead of three, because the extra granularity happens to match the real pipeline exactly.

---

## PART 1 — Deep Teardown: Sticky-Scroll Product Storytelling

The brief specifically calls out Cursor as inspiration by name — Cursor isn't in your original platform list, so I'm covering it first since it's the most directly relevant precedent, then working through the full list.

### 1.1 Cursor (the closest real-world precedent to what's being asked for)

Cursor's homepage runs the exact pattern this brief describes: a **sticky code-editor window on one side, numbered narrative on the other**, and — critically — the editor's content doesn't *cut* between states, it **live-updates in place**: text highlights, autocomplete ghost-text fades in, a diff appears — all synced tightly to scroll position. The editor never disappears and reappears; it's the same object the whole time, continuously transforming. **This is the single most important mechanical lesson for Vocaply's build:** the floating product window must be one persistent DOM element whose *internal content* morphs, never a component that unmounts/remounts between steps (unmount/remount always produces a visible flash or layout jump, no matter how well-timed the crossfade). GSAP's `ScrollTrigger` scrub, driving opacity/blur/scale on swapped *inner* content layers within one fixed outer frame, is exactly the mechanism that achieves this (§4).

### 1.2 Stripe

Several of Stripe's product pages (e.g. their payments/embedded-finance explainer sections) use a sticky visualization card that **morphs its internal state** as a narrative scrolls beside it — a payment flow diagram re-arranging itself, a data table's rows re-sorting — always inside one consistently-framed card, never a full swap. The card itself has a soft, almost glass-like elevation (soft shadow, faint border, very slight background blur against whatever sits behind it) — a lighter-touch precursor to full glassmorphism, tuned for Stripe's brighter overall palette. **Lesson:** the "floating glass card" aesthetic doesn't require going fully dark/neon to read as premium — but for Vocaply specifically, going dark for *this* section is still the right call (§2), because it's one of the page's designated "conviction" moments (alongside the Hero and Score Showcase), not an "argument" moment like Cost Stats.

### 1.3 Vercel

Vercel's feature-explainer sections (e.g. build pipeline / deployment visualization) use a similar sticky-narrative-plus-morphing-visual pattern, rendered in Vercel's signature dark canvas with a **precise, almost architectural** internal layout (grid lines, exact alignment, monospace labels) — reinforcing the "mono = system speaking" principle already locked into Vocaply's own design language (DESIGN-001 §1.2), which transfers directly: any literal data shown inside Vocaply's product window (a due date, a confidence score, a status chip) should render in mono, exactly as it does in the actual in-product UI.

### 1.4 Apple

Apple's product pages are the deepest, most refined version of "one object continuously transforms as you scroll" in the entire industry (chip pages, AirPods Pro pages, MacBook pages) — an object rotates, a material appears to change, a cross-section reveals internal detail, all tied to scroll position with zero jump-cuts. **The single most important craft lesson to borrow:** Apple's transformations are never *instant* state swaps even at full scroll speed — there's always a perceptible, physically-plausible transition *between* states, even when the visitor scrolls fast. This means Vocaply's morph transitions need a **minimum transition duration enforced independent of scroll speed** (§4.2) — a visitor scrolling very fast should see a slightly compressed but still-smooth morph, never an instant hard-cut, which is the exact failure mode most amateur scroll-scrub implementations fall into when they map animation progress 1:1 to raw scroll delta with no smoothing.

### 1.5 Arc Browser

Arc's own feature-showcase sections use a similar sticky-narrative pattern but with looser, more playful transition easing (slight overshoot) and a brighter, more saturated background treatment — consistent with Arc's already-established "delight over rigor" register (HERO-SPEC-001 §1.1), and, consistent with every prior document in this series, **not the register Vocaply should borrow** — Vocaply's transitions stay on the `--ease-out-snappy` curve already established project-wide, no overshoot/bounce.

### 1.6 Linear, Framer, Notion, Figma

Linear's feature/method pages use a sticky-panel-plus-visual layout but favor **hard-cut crossfades** between states rather than continuous morphing — consistent with Linear's overall "precision over decoration" restraint already noted repeatedly in this series. Framer's own marketing site doesn't need to *simulate* a morphing product window because the product itself already lives in the hero as a literal interactive canvas (HERO-SPEC-001 §1.1) — a different, more extreme solution to the same underlying goal, not directly portable to Vocaply's actual product shape. Notion and Figma lean on static feature grids for most of their page, reserving sticky-scroll storytelling for smaller moments, if at all — confirming (again) that this technique is a deliberate, premium-tier choice reserved for a product's single most important explanatory moment, not something to sprinkle throughout a page — which is exactly why it's reserved for *this one section* on Vocaply's page, and nowhere else.

### 1.7 Raycast, Superhuman, Clerk

Raycast and Superhuman stay minimal here too, consistent with their established restraint (STATS-SPEC-001 §1.2's finding about the same brands skipping stat sections). Clerk is the most relevant of the three: their "how authentication works" explainer uses a sticky code-panel that highlights/updates line-by-line as the narrative scrolls — structurally the same Cursor/Stripe pattern, applied to a developer audience. **Confirms, once more, that this pattern's core mechanism (one persistent artifact, internally morphing, tightly scroll-synced) is the common thread across every high-craft execution of this idea, regardless of surface styling** — which is why Part 4 of this document treats that mechanism as non-negotiable, while treating surface styling (glass, glow, color) as the part that gets tuned to Vocaply's specific brand.

### 1.8 Direct meeting-AI competitors — the honest finding

None of Otter, Fireflies, Grain, Granola, Fathom, Read.ai, Avoma, Sembly AI, MeetGeek, tl;dv, Krisp AI, or Jamie AI run a sticky-scroll morphing product story anywhere on their marketing sites. Every one of them either uses a static feature grid, a simple auto-playing video/GIF carousel, or a generic numbered-icon "how it works" row (the exact pattern this entire project has explicitly rejected since the very first strategy document). **This is, once again, uncontested ground.** Building this section to the standard described in this document isn't just "matching the industry's best" — in this specific category, it's a section type that *doesn't exist anywhere in the direct competitive set at all*, which is a stronger form of differentiation than out-executing a pattern competitors already use.

### 1.9 Awwwards / CSS Design Awards / Dribbble — cross-cutting patterns for this exact section type

1. **A pinned container with scroll-progress mapped to discrete step boundaries, not free-scrub across the whole distance** — the strongest award-winning implementations don't blend continuously between all six states as one long scrub; they define **six scroll "zones"** within the pin, each zone driving one step's narrative-panel content and the product window's transition *into* that step's state, then holding briefly before the next zone begins. This avoids the disorienting "everything is always half-transitioning" feeling that a naive continuous-scrub-across-everything implementation produces.
2. **Glass card construction**: `backdrop-filter: blur()` + a very subtle inner border-highlight (a 1px inset light line along the top edge, simulating a light source) + a soft ambient glow *behind* the card (never a hard drop shadow alone) is the specific recipe that reads as "glass," rather than just "a card with blur applied," which is a common shallow execution of glassmorphism that ends up looking murky rather than premium.
3. **A progress rail beside the step numbers, not a horizontal stepper** — exactly matching your brief's explicit instruction to avoid timeline UI — the award-circuit convention here is a thin vertical line running behind/beside the step numbers, with a filled segment tracking scroll progress through the current step, and the *completed* steps' numbers shifting to a lower-opacity/smaller treatment while the *active* step's number is large and full-opacity — this typographic scale-shift (not a checkmark, not a filled circle) is what avoids "timeline" while still clearly communicating progress.
4. **Color-coded ambient glow per step, at low intensity** — many award-winning sticky-story sections tint each step's ambient background glow slightly differently (matching that step's semantic meaning) rather than using one static glow color throughout — directly relevant to Vocaply, where step 5 (Risks & Blockers) should read differently in tone from step 6 (Accountability Dashboard), addressed in §3.4.

---

## PART 2 — What This Locks In For Vocaply

- **The section is dark** (`--canvas-dark`), a deliberate departure from DESIGN-001's original light-background Mechanism spec — because per the teardown (§1.2, §1.3), this class of "flagship mechanism reveal" section reads as most premium on a dark canvas, and because this section is now one of the page's three designated "conviction" moments (Hero, Mechanism, Score Showcase), which the page's dark/light rhythm should reflect honestly rather than forcing alternation for its own sake. **Updated page-level rhythm:**
  ```
  Hero (dark) → Trusted Brand Strip (light) → Cost Stats (light) →
  Mechanism (dark) → Score Showcase (dark) → Trust Statement (light) →
  Integrations (light-sunken) → Pricing (light) → Final CTA (dark) → Footer (dark)
  ```
  Two consecutive dark sections (Mechanism → Score) is intentional, not an oversight: together they form one continuous "here's the magic, and here's the proof it's fair" chapter at the emotional center of the page, bracketed on both sides by lighter argument/proof sections. This is a considered rhythm decision, not a rule violation — DESIGN-001 §4's original alternation guidance was a *default*, not a law, and a principal-level review should update it when a stronger structural reason emerges, exactly as it has here.
- **Six real steps, not three, and not generic** — each one maps to an actual, already-documented piece of the extraction pipeline (§0, §3.1).
- **One persistent glass product window, internally morphing** — never unmount/remount between steps (§1.1's Cursor lesson, implemented in §4).
- **A vertical progress rail, not a timeline** — per your explicit instruction and the Awwwards convention in §1.9.3.
- **Discrete scroll zones, not continuous free-scrub** — per §1.9.1, avoiding the "everything half-transitions at once" failure mode.
- **AI-green ambient glow uses `--brand-500`/`--brand-300`, at low intensity** — this is a legitimate, deliberate use of brand green (not ember): the glow represents *intelligence/processing*, a calm-success register exactly matching what brand green already means in this project's color system (DESIGN-001 §3.1) — ember stays reserved exclusively for urgency/attention framing, and step 5 (Risks & Blockers) is the one moment in this section where a touch of ember-tinted glow is earned, addressed in §3.4.
- **Minimum enforced transition duration**, independent of scroll speed — per Apple's lesson (§1.4), preventing hard-cut artifacts on fast scrolling.

---

## PART 3 — Full Design Specification

### 3.1 The Six Steps — Real Content, Not Placeholder Copy

| # | Title | One-liner | Product window shows |
|---|---|---|---|
| 01 | **AI Processing** | "Every word, understood." | A transcript stream with speaker tags resolving live from `"Speaker 1"` into real names (`Ahmed Hassan`), lines highlighting as they're "read" — mirrors the real `transcript_processor.py` + `owner-resolver.service.ts` pipeline. |
| 02 | **Meeting Summary** | "The 30-second version, the moment the call ends." | A `MeetingSummaryStream`-style bullet list fading in line by line — matches the real in-product component of the same name. |
| 03 | **Commitments Extracted** | "Every promise, caught — automatically." | A `CommitmentCard`: avatar, quoted first-person promise, due-date chip in `chip-pending`, confidence score in mono. |
| 04 | **Action Items Created** | "Assigned, not assumed." | An `ActionItemCard`: assignee, `HIGH` priority badge, due date — matches the real `action_items` schema fields exactly. |
| 05 | **Risks & Blockers Detected** | "Nothing stays hidden until it's too late." | A blocker flag card (styled from the real `Blocker` model — text + affected user), rendered with the one deliberate ember-tinted glow moment in this section (§3.4). |
| 06 | **Accountability Dashboard** | "The whole team, at a glance." | A composite view: the `CommitmentScore` donut gauge (reused from the Score Showcase section, §Part 3 of DESIGN-001) beside a compact `TeamHealthDashboard`-style mini bar row. |

**Why this content is stronger than a generic six-step "how it works":** every single one of these is a literal, named component that already exists in Vocaply's actual product architecture (per the platform's own Full Scalable API and Low Level System documents) — nothing here is invented for the marketing page. This is the deepest possible expression of the "show the artifact, not the metaphor" principle this entire project has followed since the first strategy document.

### 3.2 Layout

```
┌───────────────────────────────────────────────────────────────────────┐
│  ┃                                                                     │
│  ┃  02                          ┌─────────────────────────────────┐   │
│  ┃  ─────                       │                                  │   │
│  ┃  Meeting Summary              │      [glass product window]     │   │
│  ┃                               │      currently showing:          │   │
│  ┃  The 30-second version,       │      MeetingSummaryStream mock  │   │
│  ┃  the moment the call ends.    │                                  │   │
│  ┃                               │                                  │   │
│  ┃  (progress rail fills as      └─────────────────────────────────┘   │
│  ┃   this step's zone plays)                                          │
│  ┃                                                                     │
│  ┃  03  Commitments Extracted   (upcoming — lower opacity, smaller)   │
│  ┃  01  AI Processing            (completed — lower opacity, smaller) │
└───────────────────────────────────────────────────────────────────────┘
        35% — sticky narrative                65% — sticky glass window
```

- **Left panel (35%):** a thin vertical rail (`2px`, `--border-on-dark` base, filling with `--brand-500` as the active step's zone progresses) runs along the left edge. Only the **active** step is rendered at full size/opacity (`--text-display-l`-scale step number, `--text-display-m` title, `--text-body-l` one-liner); the immediately-adjacent steps (one above, one below) are visible but **shrunk and dimmed** (60% scale, 35% opacity) — giving the visitor peripheral awareness of "where in the sequence we are" without ever assembling into a literal numbered-circle timeline row, satisfying your explicit instruction directly.
- **Right panel (65%):** one fixed-position glass card (`--radius-xl`, ~560×420px reference size, scales responsively), pinned vertically centered within the section's pin range, background content morphing per §4.

### 3.3 The Glass Product Window — construction

```css
.mechanism-glass-card {
  position: relative;
  border-radius: var(--radius-xl);         /* 24px */
  background: hsl(160 14% 10% / 0.55);      /* --canvas-dark-raised at reduced opacity — the
                                                translucency IS the glass effect's base */
  backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid hsl(60 9% 96% / 0.08);  /* faint, --border-on-dark equivalent */
  box-shadow:
    0 24px 64px -12px hsl(160 20% 4% / 0.5),      /* grounding shadow beneath the card */
    inset 0 1px 0 hsl(60 9% 96% / 0.12);           /* the "light source" top-edge highlight —
                                                       §1.9.2's inset-highlight recipe, this single
                                                       line is what separates "glass" from "blurred box" */
  overflow: hidden;
}
.mechanism-glass-card::before {
  content: "";
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle at 50% 30%, hsl(149 62% 32% / 0.25), transparent 60%);
  filter: blur(60px);
  z-index: -1;
  transition: background var(--duration-slow) var(--ease-out-snappy);   /* the ambient glow —
                                                                            §3.4 changes its hue
                                                                            per active step */
}
```

### 3.4 Ambient Glow — Per-Step Color Mapping

| Step | Glow tint | Why |
|---|---|---|
| 01–04, 06 | `--brand-500` at 25% (as coded above) | The default "intelligence/processing/success" register — matches this project's established green semantics |
| 05 (Risks & Blockers) | Blended: `--brand-500` at 15% + `--ember-500` at 12%, both present simultaneously (not a full swap to ember) | A blocker is a real, meaningful signal worth a touch of urgency-adjacent warmth — but per the project's standing rule (never frame these states as alarming/red, TrustStatement section's whole thesis), the glow *blends* rather than fully replaces the calm green, so it reads as "worth noticing," not "something failed" |

This blended-not-replaced treatment on step 5 is a small, deliberate detail that keeps this section's emotional tone consistent with the Trust Statement section built two documents ago ("Vocaply never grades a bad day") — a blocker flag glowing full alarm-red here would quietly contradict that promise before the visitor even reaches the section that states it explicitly.

### 3.5 Typography

- Step number (`01`–`06`): `--font-mono`, since a step index is structured/system data by the project's own standing typographic rule (DESIGN-001 §1.2) — set at `--text-display-l` scale for the active step, `--text-body-l` scale for adjacent dimmed steps.
- Step title: `--font-display`, `--text-display-m`, `--ink-on-dark`.
- One-liner: `--font-body`, `--text-body-l`, `--ink-on-dark-muted`.
- Any literal data rendered *inside* the glass window (due dates, confidence scores, status chips) uses `--font-mono`, exactly matching the real in-product components they're mocking (§3.1) — visual continuity between the marketing mockup and the actual product UI is itself a small trust signal (a visitor who later logs into the real dashboard should feel "oh, this is exactly what I was shown," not a bait-and-switch).

---

## PART 4 — Motion & GSAP Implementation

### 4.1 The pin & zone structure

```ts
// components/sections/Mechanism/useMechanismScroll.ts
"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-setup"

const STEP_COUNT = 6

export function useMechanismScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)   // 0-indexed, drives both panels

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!sectionRef.current || reduceMotion) return
    // Reduced-motion fallback: renders as a static, non-pinned stacked list — see §4.4

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${STEP_COUNT * 100}%`,   // one full viewport height of scroll distance PER STEP —
                                        // generous enough that each zone doesn't feel rushed,
                                        // short enough (per HERO-SPEC-001 §3.6's "never feel stuck"
                                        // guardrail) that six steps don't turn into an exhausting scroll
      pin: true,
      pinSpacing: true,                // unlike the Footer's curtain reveal (pinSpacing: false,
                                        // FOOTER-SPEC-001 §3.5), THIS pin legitimately needs its
                                        // full scroll distance reserved — it's the primary content
                                        // of this scroll range, not a transitional effect layered
                                        // on top of something else
      scrub: 0.8,
      snap: {
        snapTo: (progress) => Math.round(progress * (STEP_COUNT - 1)) / (STEP_COUNT - 1),
        duration: { min: 0.2, max: 0.4 },   // enforces Apple's "never an instant hard-cut even on
                                              // fast scroll" lesson (§1.4) — GSAP's snap always
                                              // animates TO the nearest zone boundary over a real,
                                              // minimum-duration tween, never teleports
        ease: "power2.inOut",
      },
      onUpdate: (self) => {
        const step = Math.round(self.progress * (STEP_COUNT - 1))
        setActiveStep(step)
      },
    })

    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [])

  return { sectionRef, activeStep }
}
```

### 4.2 The morph — inner content crossfade, one persistent outer frame

```tsx
// components/sections/Mechanism/MechanismWindow.tsx
"use client"

import { AnimatePresence, motion } from "framer-motion"
import { STEP_VISUALS } from "./mechanism.content"

export function MechanismWindow({ activeStep }: { activeStep: number }) {
  const Visual = STEP_VISUALS[activeStep]

  return (
    <div className="mechanism-glass-card" data-step={activeStep}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}   // --ease-out-snappy equivalent
        >
          <Visual />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

**Ownership split, consistent with every prior document's discipline:** GSAP (`ScrollTrigger` + `snap`, §4.1) owns *when* the active step changes and guarantees the zone/pin mechanics; Framer Motion's `AnimatePresence` owns the *actual crossfade/scale/blur morph* of the inner visual once `activeStep` changes — the same clean boundary already established for the Hero (chip morph) and the Score Showcase. The outer `.mechanism-glass-card` frame itself never unmounts — only the `motion.div` *inside* it swaps keys, which is what prevents the Cursor-lesson failure mode (§1.1) of the whole window flashing/jumping between steps.

### 4.3 The Narrative Panel — active/adjacent scale-and-dim treatment

```tsx
// components/sections/Mechanism/StepList.tsx (conceptual — full implementation maps activeStep
// to CSS custom properties driving opacity/scale per step, via Framer Motion's animate prop,
// each transitioning over --duration-base, so a scroll-driven activeStep change produces a
// smooth re-weighting across all visible steps, not an abrupt swap)

<motion.div
  animate={{
    opacity: isActive ? 1 : isAdjacent ? 0.35 : 0,
    scale: isActive ? 1 : 0.6,
    height: isActive || isAdjacent ? "auto" : 0,
  }}
  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
>
  {/* step number, title, one-liner */}
</motion.div>
```

### 4.4 Reduced-Motion Fallback (this section's highest-stakes accessibility decision)

Given this is now the **longest and most animation-dense pinned sequence on the entire page** — longer than the Hero's 60vh pin (HERO-SPEC-001 §3.6) — the reduced-motion path is not a "lighter version," it's a **structurally different, unpinned layout**: all six steps render as a simple static vertical stack (title, one-liner, and a static screenshot/mockup of that step's product window, no glass blur, no glow, no pin, no scroll-jacking whatsoever). A visitor with `prefers-reduced-motion` enabled should be able to scroll through this section at completely normal document-flow speed, exactly like any other section on the page — this is treated as a hard requirement, not a graceful-degradation nice-to-have, precisely because this section carries more scroll-hijacking risk than any other on the page and therefore deserves the strictest fallback discipline of any section in this entire specification series.

### 4.5 Performance Guardrails (the strictest on the page, given the pin length)

- `force3D: true` on both the glass card's morph layer and the narrative panel's scale/opacity transitions — mandatory GPU compositing, per HERO-SPEC-001 §3.6's established rule, now applied across a much longer pinned sequence where the cumulative jank-risk is higher.
- **Only `opacity`, `transform` (scale/translate), and `filter: blur()`** are ever animated during the pin — never `backdrop-filter`'s blur *radius* itself animated per-frame (the static `20px` blur on the glass card is set once and left alone; only the *content inside* animates) — `backdrop-filter` recalculation is one of the most expensive operations a browser can perform per-frame, and animating it continuously during a scrub would be the single most likely cause of dropped frames in this entire section.
- The `ScrollTrigger.create()` instance for this section is the **only** scroll-scrubbed instance active on the page at any given scroll position (the Hero's own pin has long since released by the time a visitor reaches this section) — confirmed explicitly during the build/QA day, since two simultaneously-active scrub instances competing for the scroll-position calculation is a known source of stutter.
- `ScrollTrigger.normalizeScroll(true)` (already enabled globally per HERO-SPEC-001 §3.6) covers this section's mobile scroll-bounce smoothing too — no additional per-section configuration needed.
- Given the section's total pin distance (`6 × 100vh`), this is explicitly flagged for **real-device testing on a mid-tier Android phone**, not just desktop Chrome — the single highest-risk item in this entire document from a pure performance standpoint, and the one place in the whole build plan where "it feels smooth on my MacBook" is an insufficient QA bar.

---

## PART 5 — File Structure

```
components/sections/Mechanism/
├── Mechanism.tsx                  # Section shell — orchestrates useMechanismScroll,
│                                   #  renders StepList (35%) + MechanismWindow (65%)
├── useMechanismScroll.ts          # GSAP ScrollTrigger pin + snap + zone logic — §4.1
├── MechanismWindow.tsx             # The one persistent glass card, Framer Motion inner morph — §4.2
├── StepList.tsx                    # Narrative panel — active/adjacent scale-dim treatment — §4.3
├── ProgressRail.tsx                 # The vertical fill-line, NOT a horizontal timeline — §3.2
├── visuals/
│   ├── ProcessingVisual.tsx        # Step 01 mockup — transcript stream + speaker resolution
│   ├── SummaryVisual.tsx           # Step 02 — MeetingSummaryStream-style bullet reveal
│   ├── CommitmentVisual.tsx        # Step 03 — CommitmentCard mockup
│   ├── ActionItemVisual.tsx        # Step 04 — ActionItemCard mockup
│   ├── BlockerVisual.tsx           # Step 05 — Blocker flag, blended glow per §3.4
│   └── DashboardVisual.tsx         # Step 06 — CommitmentScore + TeamHealthDashboard mini-view
└── mechanism.content.ts            # Typed step data: title, one-liner, visual component ref
```

`mechanism.content.ts`:
```ts
import { ProcessingVisual } from "./visuals/ProcessingVisual"
import { SummaryVisual } from "./visuals/SummaryVisual"
import { CommitmentVisual } from "./visuals/CommitmentVisual"
import { ActionItemVisual } from "./visuals/ActionItemVisual"
import { BlockerVisual } from "./visuals/BlockerVisual"
import { DashboardVisual } from "./visuals/DashboardVisual"

export const STEP_VISUALS = [
  ProcessingVisual, SummaryVisual, CommitmentVisual,
  ActionItemVisual, BlockerVisual, DashboardVisual,
] as const

export const mechanismSteps = [
  { title: "AI Processing", line: "Every word, understood." },
  { title: "Meeting Summary", line: "The 30-second version, the moment the call ends." },
  { title: "Commitments Extracted", line: "Every promise, caught — automatically." },
  { title: "Action Items Created", line: "Assigned, not assumed." },
  { title: "Risks & Blockers Detected", line: "Nothing stays hidden until it's too late." },
  { title: "Accountability Dashboard", line: "The whole team, at a glance." },
] as const
```

---

## PART 6 — Accessibility

- The entire pinned/morphing experience is `aria-hidden="true"` at the visual layer; a parallel, always-present (non-visually-hidden, since this section's argument is substantial enough to warrant real on-page text) plain-text version of all six steps' title + one-liner renders in normal document flow for screen-reader users and for the reduced-motion fallback (§4.4) — meaning the accessible version and the reduced-motion version are the same build, not two separate implementations to maintain.
- Keyboard focus is never trapped by the pin — `ScrollTrigger`'s pinning affects scroll position only, never `tabIndex`/focus order, verified explicitly during this section's build day (mirroring the same explicit check already mandated for the Hero, HERO-SPEC-001 §3.5).
- Color is never the sole signal for step 5's slightly different tone (§3.4) — the blocker visual's own text content ("Blocked by...", "Waiting on...") carries the meaning; the blended glow is reinforcing, not load-bearing.

---

## PART 7 — What Changes vs. DESIGN-001 Section 4 (Full Replacement)

| Element | Original DESIGN-001 §4 | This document | Why |
|---|---|---|---|
| Structure | 3-beat vertical timeline, alternating left/right blocks | 35/65 sticky split, one persistent morphing glass window | Directly matches the Cursor/Stripe/Apple sticky-storytelling mechanism, avoids the "timeline" pattern explicitly rejected in this brief |
| Step count | 3 (extraction / resolution / score-update) | 6, mapped exactly to the real extraction pipeline's actual output types | More granular AND more grounded — each step is a real, named product component, not a summarized composite |
| Background | Light (`--paper`) | Dark (`--canvas-dark`) | Reclassified as a "conviction" section alongside Hero and Score Showcase; page rhythm updated accordingly (§2) |
| Transition mechanic | Scroll-reveal-in per beat (Framer Motion only) | GSAP-driven pin/snap/zone system + Framer Motion inner morph | Matches the category-leading "one persistent artifact, internally morphing" mechanism (§1.1–§1.7) |
| Progress UI | Implicit (beats appear in sequence) | Explicit vertical progress rail, non-timeline | Directly fulfills the brief's explicit "avoid timeline-style UI" instruction |

---

*Document: MECHANISM-SPEC-002 | Vocaply Landing Page | Version 2.0*
*Depends on: DESIGN-001 (superseded at Section 4), HERO-SPEC-001, STATS-SPEC-001*
*Highest QA priority in the build: §4.5's real-device performance testing, given this is now the longest pinned scroll sequence on the page.*
