# Vocaply — Hero Section: Deep Teardown + Full Design & Build Specification
> Principal Designer deliverable | Hero-section-only competitive analysis + implementation-ready spec
> Builds on DESIGN-001, DESIGN-002, BUILD-PLAN-LANDING-001, BUILD-PLAN-PHASE1-001
> Document: HERO-SPEC-001 | Version 1.0

---

## 0. Why the hero gets its own document

The hero is the only section every single visitor sees, and the only section where the decision to keep scrolling or leave is made in under 3 seconds. Everything else on the page can be A/B tested and iterated post-launch; the hero has to be right on day one. This document does three things:

1. **Mechanical teardown** of the hero sections of the category leaders and the direct competitors — not "what it looks like" but "what it's *doing* to the visitor's brain, in what order, and why."
2. **Locks the exact hero we're building** — copy, layout, visual, motion — already implied by DESIGN-001 but expanded here to implementation depth.
3. **Full GSAP build plan** — timelines, ScrollTrigger wiring, performance guardrails, and file structure, since the hero is the single most animation-dense section on the page and the one place GSAP earns its place over Framer Motion (per the motion-ownership rule set in BUILD-PLAN-PHASE1-001 §0).

A note on the GSAP naming in the brief: GSAP itself ships as one core package (`gsap`) plus optional plugins. The concepts you listed map onto real packages/plugins like this — I'll use these exact names throughout so there's no ambiguity when installing:

| What you called it | What it actually is | Used for in this hero |
|---|---|---|
| gsap-core | `gsap` (core library) | Timeline sequencing, tweening |
| gsap-plugins | `ScrollTrigger`, `SplitText`, `MotionPathPlugin` (registered plugins) | Scroll-scrubbing, headline character reveal, arc path |
| gsap-react | `@gsap/react`'s `useGSAP()` hook | Safe mount/unmount + React re-render handling |
| gsap-scrolltriggers | `ScrollTrigger` (same plugin, scroll-specific config) | Pinning, scroll-scrubbed sequences |
| gsap-utils | GSAP's utility methods (`gsap.utils.clamp`, `interpolate`, `mapRange`) | Responsive value scaling without extra libraries |
| gsap-performance | `will-change` + `force3D` + `gsap.ticker` best practices | Keeping the hero loop at 60fps |
| gsap-framework | The project's own `lib/motion/gsap-setup.ts` convention (not an official package) | Centralized plugin registration, one place to import from |

---

## PART 1 — Hero Section Deep Teardown

Rule for this teardown, same as before: no "clean and modern." Every entry names the *mechanism* — what moves, in what order, timed to what, and why that specific choice serves that specific product's positioning.

### 1.1 Category leaders

**Stripe**
- The hero background is a **slow-drifting, multi-stop mesh gradient rendered on canvas/WebGL**, not a static CSS gradient — it has genuine depth (multiple blurred blob layers moving at slightly different speeds, a parallax-of-one effect). It never moves fast enough to distract from the headline; the eye reads it as "alive" rather than "playing."
- The headline is followed, within the same viewport, by a **live-feeling code/data artifact** (a snippet of real-looking API JSON, or a dashboard fragment) — not below the fold, in the hero itself. This means the visitor's very first scroll-free impression already contains proof, not just a claim.
- Text entrance: headline words fade up with a very slight (8–12px) vertical translate, staggered per line (not per character — character-stagger would read as "flashy," line-stagger reads as "considered"). Duration is short (~500ms per line) so it never feels like the visitor is waiting for copy to finish appearing before they can read it.
- **Mechanism takeaway:** background motion signals "sophisticated technology," the adjacent artifact signals "real product," and the restrained text entrance signals "we don't need to perform for you." Three separate signals, each doing a distinct job, none competing for attention with the others.

**Linear**
- Near-static hero. The only motion is a **very subtle grain/noise texture animating at low opacity** over the dark canvas, plus a one-time headline fade-in with no scroll-triggered replay logic at all (it's not scroll-linked because there's nothing to scroll into — it's the first thing rendered).
- The product screenshot (their actual issue-tracker UI) sits inside a precisely detailed frame with **cursor/hover states already "mid-interaction"** in the screenshot itself — i.e., the artifact isn't a passive image, it's frozen at a moment that implies activity (a dropdown half-open, a keyboard shortcut hint visible).
- **Mechanism takeaway:** for a brand built on "speed and precision," even the *absence* of showy animation is a positioning statement. The restraint isn't a lack of craft — the noise-grain texture, the razor-sharp frame, the intentionally mid-action screenshot are all still deliberate — it's craft aimed at a different signal (rigor) than Stripe's (sophistication).

**Vercel**
- Hero background uses a genuine **shader-driven gradient mesh** (this is one of the few hero sections on the web actually running a fragment shader, not a CSS approximation) — colors shift slowly based on a noise function, giving it an organic, non-repeating quality a CSS gradient animation can't replicate.
- A terminal/deploy-log artifact **types itself out character by character** on load, then holds — a direct, literal demonstration of "deploy in seconds," using motion as *evidence* rather than decoration.
- **Mechanism takeaway:** the shader background exists specifically because Vercel's product claim is about rendering performance and edge computation — using an actually-computationally-interesting visual technique is a subtle "we understand performance at a deep level" signal, consistent with brand claim.

**Framer**
- The entire hero is **the product's own canvas-editing surface**, live and draggable in some hero variants — the visitor can literally click and drag an element in the hero and watch it respond with real spring physics. This is the most extreme version of "show the artifact" in this list: the artifact isn't shown, it's handed to the visitor.
- Where it's not literally interactive, the fallback is a **scroll-scrubbed animation** — dragging a card, resizing a shape — driven by scroll position, so the visitor's own scroll gesture becomes the "hand" moving the product, which is the single strongest way to make a marketing site *feel* like using the product itself.
- **Mechanism takeaway:** when your product's core value prop is "direct manipulation," the hero has to *be* direct manipulation, not describe it. This is the highest-effort/highest-relevance hero pattern in the entire list.

**Notion**
- Warm illustration + a floating, softly-shadowed screenshot with **very slow parallax drift** (a few px of movement tied to mouse position on desktop, disabled on touch). Illustration elements (small icons, doodled arrows) fade and drift in with generous stagger delays — slower than Stripe's, matching the "calm notebook" brand register.
- **Mechanism takeaway:** parallax-on-mouse-move (rather than scroll) is a lower-intensity motion signal reserved for brands wanting to feel approachable rather than technically impressive — a deliberate register choice, not a lesser version of Stripe's technique.

**Figma**
- Hero shows **actual multiplayer cursors moving live** (pre-recorded or simulated) across a design canvas — colored cursor dots with name labels drift and click around a mock file. This is Framer's "hand the visitor the product" principle applied to a claim (real-time collaboration) that's inherently about *other people's* presence, which a static screenshot literally cannot communicate.
- **Mechanism takeaway:** when the core differentiator is a *social/relational* property of the product (multiple people, real-time), the hero visual must depict multiple agents acting simultaneously — a single-user screenshot structurally cannot prove this claim regardless of how polished it is.

**Arc Browser**
- Bold gradient background (saturated, multi-hue) with a **playful, slightly bouncy spring** on the browser-window mockup's entrance (overshoot easing, not just ease-out) — consistent with Arc's consumer-personal-tool positioning, where "fun" is an asset rather than a liability.
- **Mechanism takeaway:** overshoot/bounce easing is almost always wrong for B2B trust-building products (it reads as "toy"), but exactly right here because Arc is deliberately selling delight over rigor.

**Apple**
- Hero product shots use **scroll-scrubbed 3D rotation** (a device model rotating in perfect sync with scroll position, not time) — this is the single most copied Apple technique across the web, and for good reason: tying rotation to scroll position rather than a timer means the animation always feels "caused by you," never "happening at you."
- Typography is enormous, extremely restrained (often a single word or short phrase), centered, with generous negative space — the product image *is* the argument; text is a caption, not a pitch.
- **Mechanism takeaway:** scroll-position-driven (not time-driven) animation is the highest-craft version of "respecting user agency" in this entire list — this is the exact principle GSAP's ScrollTrigger with `scrub: true` exists to implement, and it's the one Apple-derived technique this hero build will borrow directly (§3 below).

**Raycast**
- Dark, near-black canvas (Linear-adjacent), with the hero visual being the **command palette itself, mid-search**, showing real-looking results populate with a subtle stagger as if a search query is actively being typed — a small, cheap, extremely effective "show the artifact mid-use" technique that requires no complex animation library, just staggered opacity/transform on a fixed set of list items.
- **Mechanism takeaway:** you don't need Framer's full interactivity or Vercel's shader budget to achieve "show the artifact live" — a well-timed stagger on realistic content can carry most of the persuasive weight at a fraction of the engineering cost.

**Superhuman**
- Minimal motion; hero leans almost entirely on **copy specificity** ("the fastest email experience ever made") paired with a single, sharp product screenshot with a soft glow/shadow. Motion budget is spent almost entirely on the CTA button's hover state, not the hero visual itself.
- **Mechanism takeaway:** not every world-class hero needs to be animation-heavy — when the copy claim is strong and specific enough, over-investing in hero motion can actually dilute the claim's confidence. Worth remembering as a check against over-animating Vocaply's hero out of habit.

**Clerk**
- Developer-tool register: a **live, real-looking authentication UI component** embedded directly in the hero (an actual working-looking sign-in modal), with a small code snippet beside it showing the 3 lines of code that produced it. Motion is limited to a soft glow pulse on the modal's border and a syntax-highlighted code block that highlights line-by-line on a slow loop.
- **Mechanism takeaway:** pairing a rendered UI artifact with the literal code that generated it is an extremely strong trust mechanism for a technical audience — it collapses the gap between "marketing claim" and "thing I could paste into my editor right now."

### 1.2 Direct competitors — hero sections specifically

**Otter.ai** — bright gradient hero, a browser-chrome-framed screenshot of the live-transcription UI mid-transcription (text appearing line by line, a subtle typing-cursor blink). Motion: text lines fade in top-to-bottom on a loop. **Gap:** the hero visual proves "we transcribe," which per the earlier competitive teardown is now a commoditized claim across the entire category — the hero is technically well-executed but argues the wrong thing.

**Fireflies.ai** — dashboard screenshot (CRM-integration-heavy view), static, no hero-level motion beyond a fade-in on load. **Gap:** zero motion investment in the hero at all — for a category where competitors increasingly use motion as a craft signal, a fully static hero reads as dated by comparison, independent of the screenshot's own quality.

**Grain** — a colorful, auto-playing video-clip carousel behind/beside the headline — the most visually active hero among direct competitors, and the most memorable, precisely because the moving artifact *is* the product's actual output (a highlight clip), not a generic screenshot.

**Granola** — the calmest hero in the category: a single soft note-card visual with barely-there entrance fade, no loop, no scroll-scrub. Consistent with their "ambient, invisible" brand voice (already flagged in the earlier teardown as the wrong register for Vocaply specifically, but a well-executed match for Granola's own positioning).

**Fathom** — bright violet gradient, a rating-badge visible in the hero itself (G2 score inline with the headline), product screenshot with a small looping "highlight reel" thumbnail animation. **Gap (same as previously flagged):** leaning on unearned-for-us third-party validation this early; not a hero mechanism Vocaply should borrow at this stage of the brand's life.

### 1.3 Awwwards / CSS Design Awards / Dribbble — cross-cutting patterns worth stealing

Having reviewed the recurring winning patterns across award-circuit sites (independent of any single site, since these change month to month and the *pattern*, not the specific site, is what transfers):

1. **Scroll-scrubbed hero exits, not just entrances.** Winning sites don't just animate the hero *in* — they animate it *out* as the visitor scrolls past, tying opacity/scale/blur to scroll position so the hero visual feels like it's being "left behind" rather than abruptly cut off by the next section. This is a `ScrollTrigger` `scrub` pattern, directly applicable here.
2. **A single hero-level "hook" motion detail, never more than one.** Award-winning heroes almost always have exactly one standout technique (a shader, a scroll-scrub, a live cursor) — never three competing techniques. Sites that try to do everything in the hero read as unfocused even when each individual technique is well-executed.
3. **Cursor-following micro-parallax on desktop only**, disabled below ~1024px — a cheap, high-perceived-craft detail (a few degrees of 3D tilt or a few px of layer offset following the mouse) that costs little to build and reads as expensive.
4. **Text reveal via masked/clipped reveal, not opacity fade**, on the most award-forward sites — a headline that appears to slide up from behind a mask (like a window blind opening) rather than simply fading in reads as more "designed" because it implies the text was always there, just occluded — a subtly different (and more premium-feeling) mental model than "materializing from nothing."

---

## PART 2 — What This Locks In For Vocaply's Hero

Cross-referencing the teardown against Vocaply's actual constraints (challenger brand, no earned reviews yet, B2B trust-building product, differentiator = post-meeting accountability, not the meeting itself):

- **One hook, not three.** Per Awwwards pattern #2, Vocaply's hero gets exactly one standout technique: the **scroll-scrubbed commitment lifecycle animation** (Monday → Thursday, PENDING → FULFILLED) — already established in DESIGN-001 as the hero artifact, now upgraded from a timed 8-second autoplay loop to a **GSAP ScrollTrigger-scrubbed sequence**, borrowing Apple's "caused by you, not happening at you" principle directly. This is a meaningful upgrade over the original autoplay-loop spec — see §3.3 for why and exactly how.
- **No shader/WebGL background.** Vercel and Stripe's canvas/shader backgrounds are gorgeous but expensive (bundle size, GPU cost, complexity) and, more importantly, aren't earning their keep for Vocaply's specific claim — Vocaply's differentiation is behavioral/temporal (what happens *after* the meeting), not computational/visual, so a shader background would be craft for its own sake rather than craft in service of the claim. **Decision:** Mesh-Aurora stays as a CSS-only blurred-gradient (already spec'd in DESIGN-001), animated via GSAP for the slow drift rather than Vercel's shader approach — same visual register, far lower engineering cost, correctly scoped to what the claim needs.
- **Masked text reveal for the headline**, not a simple opacity fade — a small, cheap craft upgrade over the original spec, using `SplitText` to reveal by line with a clip-path mask.
- **No live-interactive canvas** (rejecting Framer's most extreme pattern) — Vocaply's core claim isn't "direct manipulation," so handing the visitor an interactive toy in the hero would be a category mismatch, per the same logic Figma/Framer use their specific techniques *because* they match their specific claims.
- **Cursor-parallax micro-detail retained**, desktop only, on the hero artifact card — cheap, on-brand, no claim mismatch.

---

## PART 3 — Full Hero Design Specification (Implementation-Ready)

### 3.1 Layout

Desktop (≥1024px): 2-column, 55/45 split, `--canvas-dark` background, `min-height: 100vh` (capped `max-height: 900px` on very tall viewports so the hero never feels like an empty void on a 4K monitor).

```
┌─────────────────────────────────────────────────────────────┐
│  [Nav — transparent state, per DESIGN-002]                   │
│                                                                │
│   EYEBROW                          ┌─────────────────────┐   │
│   Headline line 1                  │                     │   │
│   Headline line 2                  │   Hero Artifact     │   │
│                                     │   (scroll-scrubbed) │   │
│   Subhead copy, max-width 480px    │                     │   │
│                                     └─────────────────────┘   │
│   [Primary CTA] [Secondary CTA]                               │
│   Micro-trust line                                             │
└─────────────────────────────────────────────────────────────┘
```

Mobile (<640px): single column. Order: eyebrow → headline → subhead → CTA pair → micro-trust line → hero artifact (artifact moves *after* the conversion elements, per the original DESIGN-001 rationale — mobile visitors scroll past visuals faster than they read them, so copy has to convert before the artifact even needs to load).

### 3.2 Copy (final)

- Eyebrow (mono, `--brand-300`, uppercase, 0.08em tracking): `AI MEETING ACCOUNTABILITY`
- Headline (`--text-display-xl`, `--ink-on-dark`, two lines exactly as shown):
  ```
  70% of meeting promises are never kept.
  Vocaply makes sure yours are.
  ```
- Subhead (`--text-body-l`, `--ink-on-dark-muted`, max-width 480px): "Vocaply listens to every meeting, remembers every commitment, and follows up automatically — across every meeting after, not just the one it was made in."
- Primary CTA (`lg`): "Start your free team trial"
- Secondary CTA (`lg`, ghost, dark variant): "See a commitment get resolved →" (smooth-scrolls to the Mechanism section)
- Micro-trust line: "No credit card · 5 free meetings/month · Works with Zoom, Meet & Teams"

### 3.3 The Hero Artifact — from autoplay loop to scroll-scrubbed sequence

**Why this upgrade matters (the single most important decision in this document):** the original DESIGN-001 spec had the artifact autoplay on an 8-second timed loop. That's a fine baseline, but per Apple's mechanism (§1.1) and the Awwwards cross-cutting pattern (§1.3.1), a **scroll-scrubbed** sequence is strictly more persuasive for the same visual content, because it converts a passive animation the visitor watches into a sequence the visitor's own scroll gesture appears to *cause* — which is a well-documented driver of perceived agency and engagement (Self-Determination Theory, already cited in DESIGN-001 §3.6 for the Framer-derived scroll-reveal principle — this extends the same logic to the hero's signature visual, not just secondary reveals).

**Behavior:**
- On initial page load (before any scroll), the artifact **auto-plays the full sequence once** at a normal pace (so above-the-fold visitors who don't scroll immediately still see the proof) — then **holds on the resolved state**.
- Once the visitor scrolls, `ScrollTrigger` takes over: scrolling down past the hero **scrubs the sequence in reverse-then-forward** as a function of scroll position within a pinned range (the hero pins for roughly 60vh of scroll distance, during which the card transitions play out tied 1:1 to scroll delta) — then unpins and the page continues normally into the Cost section.
- Scrolling back up scrubs the sequence backward, exactly matching Apple's device-rotation mechanism.

**Sequence beats (same content as DESIGN-001, now scroll-position-mapped instead of time-mapped):**
| Scroll progress (0–1 within pin range) | Visual state |
|---|---|
| 0.0 – 0.15 | Card A ("Monday Standup," Ahmed, quote, `chip-pending`) fully visible, Card B not yet visible |
| 0.15 – 0.35 | Connecting line draws left-to-right, "matched by meaning, not keywords" label fades in |
| 0.35 – 0.65 | Card B ("Thursday Standup") fades/slides in; Card A's chip **morphs** `pending` → `fulfilled` |
| 0.65 – 0.85 | `+4 score` ember pill slides up next to Ahmed's avatar and fades out |
| 0.85 – 1.0 | Hold on fully resolved state; hero unpins, normal scroll resumes into Cost section |

### 3.4 Motion & Color Detail

- Card frame: `--canvas-dark-raised`, `--radius-xl`, `--shadow-3`, 1px `--border-on-dark`.
- Chip morph: color/label crossfade over 300ms, `--ease-out-snappy` — this single property is Framer Motion's job (a React-state-driven style change on a component), even though it's *triggered* by GSAP's scroll progress value — the ownership boundary here is: **GSAP owns scroll-progress-to-timeline mapping; Framer Motion owns the actual chip's internal color-morph render**, communicated via a shared progress value in a ref/state, not two libraries independently animating the same DOM node.
- Mesh-Aurora backdrop: CSS gradient (`--brand-900 → --brand-700 → transparent`, 35% max opacity), drift animated via a GSAP `gsap.to()` timeline on `background-position` / `transform`, infinite, `yoyo: true`, 20s duration, `ease: "sine.inOut"` — deliberately *not* ScrollTrigger-bound, since this background drift is ambient/decorative (should never stop or reverse based on scroll; it's atmosphere, not argument).
- Cursor-parallax (desktop only, ≥1024px): the hero artifact frame tilts up to 4° on X/Y axis following mouse position within the hero, using GSAP's `quickTo()` for a cheap, performant continuous-follow tween (avoids re-creating a tween on every mousemove event, which is the #1 performance mistake in mouse-parallax implementations).
- Headline reveal: `SplitText` splits into lines (not characters — per §1.1 Stripe takeaway), each line revealed via a `clip-path: inset()` mask animating open, staggered 80ms per line, `--ease-out-snappy`, 500ms per line — the Awwwards-derived "blind opening" reveal from §1.3.4, replacing a plain opacity fade.

### 3.5 Accessibility

- The entire artifact is `aria-hidden="true"`; a visually-hidden `<p>` immediately preceding it states the argument in one sentence: "Vocaply automatically recognized that Thursday's update fulfilled Monday's commitment, and updated Ahmed's accountability score."
- `prefers-reduced-motion`: ScrollTrigger pin/scrub is **disabled entirely** — the artifact renders directly in its fully-resolved end state, static, no pin, no scroll-jacking of any kind. This isn't a degraded animation, it's a completely different (simpler, static) render path — reduced-motion users should never experience scroll-hijacking regardless of how "smooth" the scrub feels to others.
- Headline `SplitText` reveal degrades to a single opacity fade (no line-mask animation) under reduced motion.
- Focus order is unaffected by the pin/scrub mechanism — `ScrollTrigger`'s pinning must never trap keyboard focus or alter tab order; verified explicitly in Day 27's accessibility pass (BUILD-PLAN-LANDING-001), called out here so it isn't missed.

### 3.6 Performance guardrails (the "gsap-performance" concern from the brief)

- `force3D: true` on the pinned/scrubbed timeline's target elements — forces GPU compositing layer, avoiding layout thrash during scrub.
- Only `transform` and `opacity` are ever animated by GSAP in this sequence — never `width`, `height`, `top`/`left`, or box-shadow blur radius (all layout-triggering properties are banned from scroll-scrubbed timelines specifically, since scrub re-evaluates every scroll-frame and layout-triggering properties are the single biggest cause of scroll-jank).
- `ScrollTrigger.normalizeScroll(true)` enabled site-wide once ScrollTrigger is registered — smooths out mobile browser scroll-bounce quirks that otherwise cause visible stutter in pinned sections specifically on iOS Safari.
- The pin range is capped at 60vh, not a full-viewport-multiple pin — long pins on a hero are a common cause of visitors feeling "stuck" mid-scroll, which directly hurts the exact conversion goal the hero exists to serve.
- GSAP's `gsap.ticker` (not a manual `requestAnimationFrame` loop) drives the mouse-parallax `quickTo()` tween, since `gsap.ticker` is already running for the ScrollTrigger instance — running a second independent RAF loop alongside it wastes a frame budget for no benefit.

---

## PART 4 — File Structure for the Hero (Scalable)

Extends the structure already locked in DESIGN-002, with the GSAP-specific setup file added:

```
components/sections/Hero/
├── Hero.tsx                      # Layout shell: eyebrow, headline, subhead, CTAs, micro-trust
├── HeroArtifact.tsx               # The scroll-scrubbed card sequence — GSAP timeline + ScrollTrigger
├── HeroArtifactCard.tsx           # Single card (A or B) — avatar, quote, chip, reused for both
├── HeroHeadline.tsx               # SplitText-driven masked line reveal, isolated for reuse/testing
├── useHeroParallax.ts             # Cursor-follow tilt hook (quickTo-based), desktop-only, SSR-safe
└── hero.content.ts                # Eyebrow/headline/subhead/CTA copy, typed and centralized

lib/motion/
├── gsap-setup.ts                  # Single source of truth: registers ScrollTrigger + SplitText once,
│                                    exports a typed `gsap` instance — imported everywhere GSAP is used,
│                                    never re-registered per-component (registering plugins multiple
│                                    times is harmless but wasteful and a common code-smell)
├── variants.ts                    # Framer Motion variants (chip morph, reveal stagger) — existing file
└── springs.ts                     # Existing file, unchanged
```

`lib/motion/gsap-setup.ts` (the "gsap-framework" concept from the brief, made concrete):
```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // Club GSAP plugin — confirm license tier before using
                                             // in production; a CSS-mask-based fallback split exists
                                             // in HeroHeadline.tsx if SplitText access isn't available

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  ScrollTrigger.normalizeScroll(true);
}

export { gsap, ScrollTrigger };
```

**Note on `SplitText` licensing:** as of GSAP's current distribution model, some plugins (including `SplitText`) may require a Club GSAP membership or ship under GSAP's standard "no paid plugins needed for most use cases" free core — since licensing terms are handled by Anthropic in this environment, verify current terms at gsap.com before installing in the actual repo (Day 1 already flagged this in BUILD-PLAN-PHASE1-001; this is the moment it's actually spent). If unavailable, `HeroHeadline.tsx` should fall back to a manual `<span>`-per-line markup with the same `clip-path` mask animation — same visual result, no plugin dependency, slightly more markup to hand-write.

### `HeroArtifact.tsx` — implementation sketch

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-setup";
import { HeroArtifactCard } from "./HeroArtifactCard";

export function HeroArtifact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // Static end-state, no timeline, no pin — see §3.5
      gsap.set(cardBRef.current, { opacity: 1, x: 0 });
      gsap.set(lineRef.current, { scaleX: 1 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=60%", // 60vh pin range, per §3.6
        pin: true,
        scrub: 1, // slight smoothing, avoids razor-sharp scroll-jank on trackpads
      },
    });

    tl.to(lineRef.current, { scaleX: 1, duration: 0.35, ease: "none" }, 0.15)
      .to(cardBRef.current, { opacity: 1, x: 0, duration: 0.4, ease: "none" }, 0.35);
      // Chip morph itself is a Framer Motion state change, triggered by tl.progress()
      // via an onUpdate callback — not animated directly by this GSAP timeline (see §3.4)

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[70vh] flex items-center justify-center">
      {/* Mesh-Aurora backdrop, cards, connecting line — full markup omitted for brevity */}
    </div>
  );
}
```

---

## PART 5 — What Changes vs. the Original DESIGN-001 Hero Spec

| Element | Original spec | This document's upgrade | Why |
|---|---|---|---|
| Artifact motion | Timed 8s autoplay loop | Scroll-scrubbed via ScrollTrigger, autoplay once on load as fallback | Converts passive viewing into visitor-caused motion — higher perceived agency (Apple mechanism, §1.1) |
| Headline reveal | Simple stagger fade | `SplitText` line-by-line clip-path mask reveal | Reads as "designed," not "animated" — Awwwards pattern §1.3.4 |
| Mesh-Aurora | Static CSS gradient, opacity-capped | Same CSS gradient, now GSAP-driven slow drift (ambient, not scroll-bound) | Adds the "alive background" signal from Stripe/Vercel without shader engineering cost |
| Desktop-only detail | None specified | Cursor-parallax tilt on the artifact frame | Cheap, high-perceived-craft, zero claim mismatch |
| Library ownership | Unspecified | Explicit split: GSAP owns scroll-progress mapping, Framer Motion owns component-level style changes | Prevents two animation libraries fighting over one DOM node later in Phase 4 |

---

*Document: HERO-SPEC-001 | Vocaply Landing Page | Version 1.0*
*Depends on: DESIGN-001, DESIGN-002, BUILD-PLAN-LANDING-001, BUILD-PLAN-PHASE1-001*
*Next: fold this spec into BUILD-PLAN-LANDING-001 Days 11–12 (Hero build days) as the authoritative source, superseding the autoplay-only artifact description in DESIGN-001 Section 2.*
