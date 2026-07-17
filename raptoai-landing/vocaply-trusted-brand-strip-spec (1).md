# Vocaply — Trusted Brand Strip: Full Design & Build Specification
> Principal Designer deliverable | A lightweight, early-page credibility band — distinct from the
> separate, later, deep-dive Integrations section
> Document: TRUST-SPEC-002 | Version 1.0 (supersedes the merged framing in TRUST-SPEC-001)

---

## 0. Correction & Reconciliation

Confirmed: **"Trusted Brand" and "Integrations" are two separate sections with two separate jobs**, and TRUST-SPEC-001 incorrectly merged them into one. Here's the clean split going forward:

| | **Trusted Brand Strip** (this document) | **Integrations Section** (deep-dive, built separately later) |
|---|---|---|
| Job | Fast, ambient credibility — "this plugs into tools you already trust," read in under 2 seconds | Functional explainer — how syncing actually works, what data flows where, per-tool detail |
| Placement | Early — directly beneath the Hero, before the Cost/problem section | Late — after the Mechanism and Trust Statement sections, once real trust is already earned (per the earlier "don't lead with unearned authority" principle) |
| Content depth | Logos only, near-zero copy, no explanation of *how* | Logos + explanation + possibly per-tool detail, doc links, maybe a small product screenshot per integration |
| Grouping | Flat — one continuous row/strip, no labeled clusters (grouping would slow down a section whose entire value is speed-of-recognition) | Grouped by function (meeting platforms vs. sync targets), since a functional explainer benefits from that structure |
| Tile styling | Light — plain logo, generous spacing, no card frame (keeps it feeling like an ambient band, not an informational block) | Heavier — bordered rounded-square tile (Linear-derived), since it's a deliberate, considered section the visitor is meant to pause on |
| Motion | Continuous, slow, ambient marquee at every breakpoint | Static grid desktop / marquee mobile only |

**What carries over unchanged from TRUST-SPEC-001, because it was correct there and is equally correct here:**
- **Recall.ai is still excluded from customer-facing display**, in both sections — it's sub-processor infrastructure, not a customer-facing integration, and belongs in the `/security` page's sub-processor disclosure only. This doesn't change based on which section we're talking about; it's a fact about what Recall.ai *is*, not about section placement.
- **No fake customer logos.** This strip never claims "trusted by [Company]" — it claims "compatible with [Tool]," which is an honest, verifiable claim about the product itself, not borrowed authority from unearned customers.
- All brand-guideline/trademark-usage cautions (unmodified logo marks, verify Zoom/Microsoft's stricter guidelines before shipping) still apply.

TRUST-SPEC-001's Part 3–5 content (the two-cluster, bordered-tile, static-desktop-grid design) is **not discarded** — it's simply correctly re-labeled as the future **Integrations section spec**, to be picked up again when that section is built later in the sprint plan. This document only covers the new, separate, lightweight strip.

---

## PART 1 — Why This Placement & Treatment Is Correct (the psychology)

**Why early-page placement is legitimate here, when a customer logo wall wouldn't be:** the distinction from TRUST-SPEC-001 §0 still holds — a customer wall says "these companies chose us" (borrowed authority, must be earned), while a compatibility strip says "this thing works the way your tools already work" (a claim about *product design*, provable on day one). Placing a *compatibility* signal early is standard, expected practice across the category leaders already torn down in prior documents (Stripe, Vercel, Notion all place their "works with" strip within the first two scroll-lengths of the homepage) — it reduces a very specific, very early visitor anxiety ("will I have to rip out my existing tools to use this?") before that anxiety has a chance to cause a bounce.

**Why zero-explanation, ambient motion is the correct register (not a labeled, static, informational grid):** this section's entire psychological job is **fast pattern-recognition, not comprehension**. A visitor's eye doesn't need to *read* this section — it needs to *recognize* 3–4 familiar logos in under two seconds and feel a small, automatic "oh, this fits my world" response (a mechanism close to the **mere-exposure effect**: familiarity itself, without any accompanying claim, produces a small positive trust bump). Adding labels, clusters, or explanatory copy here would force the visitor to *read* rather than *recognize*, slowing the section down and undermining the exact speed that makes it work. This is precisely why the deep functional explanation is deliberately deferred to the separate, later Integrations section — where the visitor has already been persuaded enough to *want* the detail, rather than being handed it before they've decided to care.

**Why continuous ambient marquee (not static) fits this specific section, when the deeper Integrations section correctly uses a static desktop grid:** motion itself is doing representational work here — a slow, continuous drift of recognizable logos reads as "a living ecosystem," reinforcing the "this fits into your world" claim *through the motion itself*, not just through the logos' content. This is a different job than the later Integrations section's static grid, which is deliberately calmer because that section wants the visitor to stop and read, not glide past.

---

## PART 2 — Full Design Specification

### 2.1 Placement in the Page

```
Hero (Section 1)
  ↓
Trusted Brand Strip (Section 2 — NEW, this document)
  ↓
Cost Stats (was Section 3 in DESIGN-001, unchanged content, now bumped down one slot)
  ↓
Mechanism → Score Showcase → Trust Statement → [Integrations deep-dive, later] → Pricing → FAQ → Final CTA
```

### 2.2 Layout & Copy

**Background:** `--paper` (same surface as the section above/below it in the light-section run — this strip should feel like a quiet continuation of the page, not a distinct "boxed" module; no `--paper-sunken` tonal shift here, since that treatment is reserved for the later, more deliberate Integrations section per TRUST-SPEC-001).

**Vertical space:** deliberately compact — `--space-9` (96px) padding top/bottom, the "supporting section" rhythm beat from DESIGN-001 §3.3, never the full 160px "major section" beat, since this section should read as a brief pause, not a destination.

**Copy — a single line, nothing more:**
- Caption (`--text-body-s`, `--ink-500`, centered, uppercase, 0.04em tracking): **`WORKS SEAMLESSLY WITH THE TOOLS YOU ALREADY USE`**

No headline, no subhead, no section eyebrow-plus-heading pair (deliberately breaking from the `SectionHeading` primitive used everywhere else on the page — this is the one section quiet enough that a full heading treatment would overstate its own importance relative to its job).

### 2.3 The Logo Strip

- **Full logo set** (flat, no clusters): Zoom, Google Meet, Microsoft Teams, Slack, Jira, Linear, Notion, Google Calendar, Outlook Calendar — 9 logos, single continuous track.
- **Tile treatment (deliberately lighter than the future Integrations section):**
```css
.trusted-logo {
  height: 28px;              /* logo mark only, no frame/card — height-constrained, width auto */
  width: auto;
  filter: grayscale(100%) opacity(0.45);   /* quieter than the Integrations tile's 0.55 —
                                              this section should recede more, since it's
                                              ambient, not a considered stop */
  transition: filter var(--duration-fast) var(--ease-out-snappy);
  flex-shrink: 0;
}
.trusted-logo:hover,
.trusted-logo:focus-visible {
  filter: grayscale(0%) opacity(0.9);      /* full reveal caps at 0.9, not 1.0 — a small,
                                              deliberate restraint so even the "revealed" state
                                              stays quieter than the Integrations section's
                                              full-strength hover reveal */
}
```
- **Spacing between logos:** `--space-8` (64px) gap — generous, unhurried, reinforcing the "ambient drift" feeling rather than a dense, informational row.
- No card background, no border, no shadow, no rounded tile frame — logos sit directly on `--paper`, which is what makes this section visually distinct from (and lighter than) the later Integrations section's bordered tiles.

### 2.4 Motion — Continuous Ambient Marquee (all breakpoints)

Unlike the later Integrations section (static desktop / marquee mobile only), this strip runs the same **continuous, slow, seamless marquee at every breakpoint**, because the ambient-motion signal is part of the section's actual argument (§1), not just a mobile space-saving device.

**Build approach (GSAP core, same seamless-loop math already established):**
- Track duplicated exactly once (18 logos total: 9 real + 9 duplicate), single flex row.
- `gsap.to(track, { xPercent: -50, duration: 40, ease: "none", repeat: -1 })` — a notably slower duration (40s vs. the Integrations mobile marquee's 24s) — this strip should feel closer to imperceptible drift than to a "scrolling ticker," reinforcing calm ambient credibility rather than urgency or density.
- **Pause on hover (desktop) / touch (mobile):** same pattern as TRUST-SPEC-001 §3.5 — pause the specific tween instance directly, never the global GSAP timeline, so a visitor pausing to look at one logo doesn't freeze any other animation running elsewhere on the page.
- **Edge fade mask:** `mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent)` on the outer container — slightly gentler fade than the Integrations section's marquee (8%/92% vs. 10%/90%), matching this strip's overall softer, quieter register.
- **`prefers-reduced-motion`:** track renders as a single static flex row (all 9 logos, `flex-wrap: wrap` with centered alignment on narrow viewports) — no motion at all, consistent with the reduced-motion philosophy already established across every prior spec in this series.

### 2.5 Accessibility

- Duplicated half of the marquee track is `aria-hidden="true"`; the real 9 logos remain in the accessibility tree exactly once, each with proper `alt` text (`"Zoom logo"`, `"Slack logo"`, etc. — descriptive, not decorative-empty, since these logos *are* the section's content, unlike a purely ornamental background image).
- Logos here are **not individually clickable** (unlike the future Integrations section's per-logo doc links) — this section's job is recognition, not navigation, so wrapping each logo in an interactive element here would be adding false affordance for no purpose; save the "useful, clickable logo" treatment (per the Clerk-derived principle) for the deeper Integrations section where a visitor has actually formed the intent to learn more about a specific tool.
- Marquee auto-scroll satisfies WCAG 2.2.2 via the reduced-motion static fallback, same reasoning as TRUST-SPEC-001 §3.6.

---

## PART 3 — File Structure

A new, separate component folder — intentionally not nested inside or shared with the future `Integrations/` folder, since the two sections have almost no shared implementation once the Integrations section is eventually built out (different tile styling, different grouping, different motion timing, different link behavior):

```
components/sections/TrustedBrandStrip/
├── TrustedBrandStrip.tsx        # Section shell: caption + marquee track
├── TrustedLogo.tsx               # Single logo — no tile frame, just the filtered <img>/inline SVG
├── useSeamlessMarquee.ts         # Shared GSAP seamless-loop hook — duration + pause-target as props,
│                                 #  so this hook can ALSO be reused later by the Integrations section's
│                                 #  mobile marquee rather than duplicating the loop-math twice in the repo
└── trusted-brand.content.ts      # Typed flat logo list (reuses the same svgPath assets already
                                   #  placed in public/integrations/ — no duplicate asset files needed)
```

`trusted-brand.content.ts`:
```ts
import type { IntegrationLogo } from "../Integrations/integrations.content" // shared type, not duplicated

export const trustedBrandLogos: IntegrationLogo[] = [
  { name: "Zoom",             slug: "zoom",             svgPath: "/integrations/zoom.svg" },
  { name: "Google Meet",      slug: "google-meet",      svgPath: "/integrations/google-meet.svg" },
  { name: "Microsoft Teams",  slug: "teams",            svgPath: "/integrations/teams.svg" },
  { name: "Slack",            slug: "slack",            svgPath: "/integrations/slack.svg" },
  { name: "Jira",             slug: "jira",             svgPath: "/integrations/jira.svg" },
  { name: "Linear",           slug: "linear",           svgPath: "/integrations/linear.svg" },
  { name: "Notion",           slug: "notion",           svgPath: "/integrations/notion.svg" },
  { name: "Google Calendar",  slug: "google-calendar",  svgPath: "/integrations/google-calendar.svg" },
  { name: "Outlook Calendar", slug: "outlook",          svgPath: "/integrations/outlook.svg" },
]
// Recall.ai intentionally absent — sub-processor, not a customer-facing logo. See §0.
```

`useSeamlessMarquee.ts` — the shared, reusable hook (built once here, imported later by the Integrations section's mobile marquee too, avoiding the loop-math duplication flagged above):

```ts
"use client"

import { useRef, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/motion/gsap-setup"

export function useSeamlessMarquee(durationSeconds: number) {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useGSAP(() => {
    if (!trackRef.current) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return // caller renders the static fallback layout instead

    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: durationSeconds,
      ease: "none",
      repeat: -1,
    })

    return () => tweenRef.current?.kill()
  }, [durationSeconds])

  const pause  = () => tweenRef.current?.pause()
  const resume = () => tweenRef.current?.resume()

  return { trackRef, pause, resume }
}
```

`TrustedBrandStrip.tsx`:

```tsx
"use client"

import { useSeamlessMarquee } from "./useSeamlessMarquee"
import { TrustedLogo } from "./TrustedLogo"
import { trustedBrandLogos } from "./trusted-brand.content"

export function TrustedBrandStrip() {
  const { trackRef, pause, resume } = useSeamlessMarquee(40) // slow, ambient — see §2.4

  return (
    <section className="trusted-brand-strip py-24 bg-paper">
      <p className="text-body-s text-ink-500 text-center uppercase tracking-wide mb-8">
        Works seamlessly with the tools you already use
      </p>
      <div
        className="marquee-mask"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        <div ref={trackRef} className="marquee-track flex gap-16 items-center">
          {trustedBrandLogos.map((logo) => (
            <TrustedLogo key={logo.slug} logo={logo} />
          ))}
          {trustedBrandLogos.map((logo) => (
            <TrustedLogo key={`${logo.slug}-dup`} logo={logo} ariaHidden />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## PART 4 — Quick Reference: What NOT To Do Here (guardrails against scope creep back into the Integrations section)

- Do not add cluster labels ("meeting platforms" vs. "sync targets") to this strip — that grouping belongs to the later, informational Integrations section, and adding it here would slow this section down for no benefit (§1).
- Do not make logos individually clickable here — that's a deeper-engagement affordance appropriate once a visitor has already been persuaded, not on first ambient pass.
- Do not add a headline/eyebrow pair — a single quiet caption line is the entire copy budget for this section, by design.
- Do not reuse the bordered rounded-tile frame from the future Integrations section — the lack of a frame here is what visually signals "lighter, faster, ambient" versus that section's "considered, informational" register.
- Do not include Recall.ai, here or anywhere customer-facing (§0 — this is a fixed fact about what Recall.ai is, not a section-specific styling choice).

---

*Document: TRUST-SPEC-002 | Vocaply Landing Page | Version 1.0*
*Depends on: DESIGN-001, DESIGN-002, BUILD-PLAN-LANDING-001, HERO-SPEC-001*
*Reconciles with: TRUST-SPEC-001 (now correctly scoped as the future, separate, deep-dive Integrations section spec — not this document)*
