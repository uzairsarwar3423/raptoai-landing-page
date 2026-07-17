# Vocaply — Footer Section: Deep Teardown + Full Design & Build Specification
> Principal Designer deliverable | Footer-section-only competitive analysis + implementation-ready spec
> Builds on DESIGN-001, DESIGN-002 (§2.5 baseline footer), BUILD-PLAN-LANDING-001, HERO-SPEC-001, TRUST-SPEC-002
> Document: FOOTER-SPEC-001 | Version 1.0

---

## 0. Why the footer isn't an afterthought

Every section before this one has been fighting for attention. The footer is the only section on the page where the visitor has *already* decided to keep going, or has *already* decided to leave and is scrolling to the bottom out of habit before closing the tab. That means the footer has exactly two honest jobs: **(1)** catch the small percentage of visitors who are still deciding and need one more trust signal or navigational path, and **(2)** function as the site's quiet, permanent index — for search engines, for a visitor who's already a customer looking for support, and for anyone checking legitimacy (legal pages, security disclosures) before they commit. A footer that tries to do a *third* job — squeeze in one more big conversion push, an aggressive newsletter popup-in-disguise, a wall of 60 links nobody will click — is optimizing for the wrong moment in the visitor's journey. This document treats the footer with exactly the seriousness that scope deserves: not decorative, not an afterthought, but also correctly *quiet*.

---

## PART 1 — Deep Teardown

### 1.1 Category leaders

**Stripe** — a genuinely enormous mega-footer (7+ columns: Products, Solutions, Developers, Resources, Company, and more), because Stripe's actual product surface area is enormous and the footer functions as a literal sitemap for a company with dozens of distinct products. **Mechanism takeaway, and why we reject copying the scale directly:** footer column count should be proportional to actual product surface area — Stripe's footer isn't "premium because it's big," it's *correct* because it matches the size of the real thing it's indexing. Vocaply is one product; a Stripe-scale footer here would misrepresent scope, exactly the same "positioning honesty" principle already applied to the navbar (DESIGN-002 §2.3) and the integrations section (TRUST-SPEC-002 §0).

**Linear** — the most restrained footer in the entire set: essentially one row, a handful of links (Product, Docs, Changelog, Careers, Terms, Privacy), social icons, copyright — no multi-column sitemap at all. Matches the brand's whole "precision, nothing extra" identity established across every prior teardown in this series.

**Vercel** — a multi-column footer, but with one distinctive, high-craft detail: a **live status indicator** ("All systems operational," small pulsing green dot) sitting in the footer's utility row, linking to their public status page. **Mechanism takeaway:** for an infrastructure-adjacent product where uptime/reliability is part of the trust proposition, showing a *live, real* system-health signal in the footer is a small but genuine credibility act — it says "we're not hiding anything, here's our real status, right now," which is a stronger trust signal than any amount of marketing copy could produce, because it's independently verifiable and constantly live.

**Notion** — a large, warm, multi-column footer with a language/region selector, download links per platform, and a distinctly *friendly* tone even in the legal-adjacent copy. Consistent with Notion's "notebook, not database" brand register already established.

**Figma** — dense, community-oriented footer (Community, Resources, Learn Design, Best Practices columns alongside the standard Product/Company) — reflects a product with a strong community/ecosystem dimension. Not directly transferable to Vocaply (no community hub exists yet), but the underlying principle — footer columns should reflect *real, currently-existing* destinations, not aspirational ones — is directly relevant and reinforces the "no fake sitemap depth" discipline.

**Arc Browser** — a small, playful footer with looser, more personal copy in places ("Made with love in NYC" style lines) — appropriate for Arc's consumer-personal register, and a useful negative data point: this tone would read as incongruent for Vocaply, an accountability tool for teams, in the same way Arc's bounce-easing was rejected for Vocaply's hero/button motion (HERO-SPEC-001 §1.1).

**Apple** — the most legally dense footer in the set by necessity (multi-region compliance, dozens of tiny legal disclaimers, a country/region selector, extremely small type) — this is what a footer looks like at the absolute largest end of legal complexity, and it's *correctly* unglamorous, because Apple's footer isn't trying to be beautiful, it's trying to be exhaustive and compliant. **Mechanism takeaway:** a footer's visual restraint should scale *down* with legal complexity for a company Vocaply's size — we don't need Apple's twelve-language legal disclaimer density, and forcing that level of formality into a young product's footer would feel borrowed and cold rather than appropriately serious.

**Raycast** — small, clean footer with a **Mac App Store badge**, changelog link, Discord/community link, and social icons — notably, no dense link column at all, just a single well-chosen row. A strong model for what a *disciplined single-product* footer looks like, closer to Vocaply's actual scale than any of the above.

**Superhuman** — minimal to the point of being almost an afterthought (a handful of links, no visual distinctiveness at all) — consistent with the earlier finding (HERO-SPEC-001 §1.1) that Superhuman spends its entire design budget on copy specificity rather than visual craft everywhere else on the page; the footer is simply not where this particular brand chooses to invest.

**Clerk** (developer-tool register, closest analog for a "we take reliability seriously" tone) — footer includes **GitHub, Discord, and a status-page link** prominently, alongside standard columns — for a developer-facing trust product, showing where the community lives and whether the system is currently healthy matters more than showing a large sitemap. **Mechanism takeaway, directly applicable to Vocaply:** an accountability product's footer should itself model accountability — a live status link is not just a Vercel-style nice-to-have here, it's thematically *on-brand* for a company whose entire pitch is "we make sure things don't quietly fail." Vocaply's own architecture docs already define a public status page (`status.vocaply.com`, per the platform's HLD observability section) — this document recommends surfacing it in the footer specifically *because* it reinforces the product's core promise, not just because Vercel/Clerk do it.

### 1.2 Direct competitors

**Otter.ai, Fireflies.ai, Grain, Granola, Fathom** — all five run a fairly generic 3–4 column marketing footer (Product/Company/Resources/Legal or a close variant), dark or light background depending on overall site theme, standard social icons, no live status indicator, no sub-processor/security disclosure link visible in the footer itself (security/compliance info, where it exists at all, is usually buried in a separate trust-center page with no footer entry point). **The gap, consistent with every prior teardown in this series:** none of the five direct competitors use their footer as a trust-reinforcement opportunity — it's treated purely as a navigational utility. For a category where "can I trust this AI tool with my meeting data" is a live, real objection (see TrustStatement section, DESIGN-001 Section 6), leaving the footer trust-neutral is a missed opportunity every competitor shares, which means doing it well here is free, uncontested differentiation.

### 1.3 Awwwards / CSS Design Awards / Dribbble — cross-cutting patterns

1. **The "reveal" or "curtain" footer** — the single most common award-circuit footer technique: the footer is visually pinned/fixed beneath the final content section, and as the visitor scrolls past the end of that section, the content appears to lift up and away, *revealing* the footer underneath rather than the footer simply appearing as the next element in normal document flow. This is a `ScrollTrigger`-pinning technique and is directly relevant to the GSAP tooling already in use across this project.
2. **Oversized closing typography** — many award-winning footers (especially agency/portfolio sites) end with one enormous headline-scale line of text right before the link columns (e.g., a giant "Let's talk" or a repeated brand statement) — this pattern is common on creative-agency sites where the footer is itself a final persuasive moment. **Explicitly not the right model for Vocaply:** the Final CTA section (DESIGN-001 Section 9) already delivers this exact persuasive beat, immediately before the footer — repeating an oversized closing statement in the footer too would be redundant and would dilute, not reinforce, the CTA that already did this job one section earlier. This is a case where an award-circuit pattern should be *consciously rejected*, not blindly imitated.
3. **Micro-interaction-dense link hovers** — sliding underlines, letter-by-letter stagger reveals, or magnetic cursor-follow buttons on footer links, common on high-craft award sites. Useful in small doses (a sliding underline on footer links is cheap and tasteful) but magnetic/cursor-follow effects specifically are more common on *agency/portfolio* sites selling creative flair — the same register mismatch already flagged for Arc's bounce-easing applies here: a serious B2B accountability tool's footer should feel considered, not playful, so magnetic buttons are explicitly rejected for Vocaply (see Part 2).

---

## PART 2 — What This Locks In For Vocaply

- **Footer column count and depth matches Vocaply's actual current scope** — 4 columns (Product, Company, Resources, Legal), never a Stripe/Notion-scale mega-footer, per the "positioning honesty" principle already applied consistently across this entire series of documents.
- **A live status indicator is added to the footer's bottom bar** — this is a genuine upgrade over the DESIGN-002 §2.5 baseline (which specified only logo + copyright + social icons in the bottom bar) — linking to the platform's real, already-planned `status.vocaply.com` page. This is the single most on-brand addition this document makes: an accountability product's footer modeling accountability.
- **A Legal column entry specifically for sub-processor disclosure** — this is where Recall.ai's logo/name finally appears customer-facing, exactly as promised in TRUST-SPEC-002 §0 ("Recall.ai... belongs in the `/security` page's sub-processor disclosure only") — the footer's Legal column links directly to that disclosure, closing the loop opened two documents ago.
- **No newsletter capture form** — reconfirmed from DESIGN-002 §2.5; nothing in this teardown changes that reasoning (footer forms convert poorly and dilute the page's single conversion goal, which the Final CTA section already carries).
- **No repeated oversized closing headline** — explicitly rejecting the Awwwards agency-footer pattern (§1.3.2) as redundant with the immediately-preceding Final CTA section.
- **No magnetic/cursor-follow link interactions** — explicitly rejecting that specific Awwwards pattern (§1.3.3) as a register mismatch for a serious accountability product; a simple, tasteful sliding-underline hover is adopted instead (cheap, premium-feeling, correctly restrained).
- **The GSAP "curtain reveal" pin technique (§1.3.1) is adopted, with strict guardrails** — it's a genuinely premium, high-craft detail and directly usable with the GSAP tooling already established for the Hero and Integrations marquee, but it's the single most performance-risky pattern in this document, so it ships with an explicit fallback and a hard rule: it may never cause layout jank or trap scroll — full guardrails in Part 3.5.
- **Column headers use the mono typeface** — a small, deliberate typographic detail: per the project's standing rule that mono type signals "structured/system data" (DESIGN-001 §1.2), treating the footer's column headers (PRODUCT / COMPANY / RESOURCES / LEGAL) as small-caps mono labels reinforces the footer's identity as the site's *index*, distinct from every other section's narrative sans-serif headings — a subtle but genuinely considered detail, not decoration for its own sake.

---

## PART 3 — Full Design Specification

### 3.1 Structure

```
┌───────────────────────────────────────────────────────────────────────┐
│  [Logo wordmark]                                                       │
│  "Meeting promises, kept."  (one-line tagline, --ink-on-dark-muted)   │
│                                                                         │
│  PRODUCT          COMPANY          RESOURCES         LEGAL             │
│  Features         About            Help Center       Privacy Policy   │
│  Pricing          Careers          API Docs           Terms of Service │
│  Security         Blog             Compare            Data Processing │
│  Integrations     Contact          Case Studies        Agreement       │
│  Changelog                                              Sub-processors│
│                                                                         │
│  ─────────────────────────────────────────────────────────────────    │
│  © 2026 Vocaply       ● All systems operational       [social icons]  │
└───────────────────────────────────────────────────────────────────────┘
```

**Background:** `--canvas-dark` (matches the Final CTA section immediately above it — the dark→dark adjacency at the very end of the page is intentional continuity, per DESIGN-001 §4's rhythm rule: the page's last two sections both being dark reinforces "closing," rather than the alternation used mid-page.)

**Vertical space:** `--space-9` (96px) top padding, `--space-7` (48px) before the bottom bar, `--space-6` (32px) bottom padding — the footer is a supporting-section beat, never a major-section beat, consistent with DESIGN-001 §3.3.

### 3.2 Typography Detail

```css
.footer-column-header {
  font-family: var(--font-mono);
  font-size: var(--text-mono-s);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-on-dark-muted);
  margin-bottom: var(--space-4);
}
.footer-link {
  font-family: var(--font-body);
  font-size: var(--text-body-s);
  color: var(--ink-on-dark-muted);
  position: relative;
  padding-bottom: 2px;
  transition: color var(--duration-fast) var(--ease-out-snappy);
}
.footer-link::after {
  content: "";
  position: absolute;
  left: 0; bottom: 0;
  width: 0; height: 1px;
  background: var(--brand-300);
  transition: width var(--duration-fast) var(--ease-out-snappy);
}
.footer-link:hover,
.footer-link:focus-visible {
  color: var(--ink-on-dark);
}
.footer-link:hover::after,
.footer-link:focus-visible::after {
  width: 100%;                 /* the sliding-underline detail from §1.3.3, kept tasteful */
}
```

### 3.3 The Live Status Indicator (the single most on-brand addition in this document)

```css
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-mono-s);
  color: var(--ink-on-dark-muted);
}
.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--brand-500);
  animation: status-pulse 2.4s ease-in-out infinite;
}
@keyframes status-pulse {
  0%, 100% { box-shadow: 0 0 0 0 hsl(149 62% 32% / 0.5); }
  50%      { box-shadow: 0 0 0 5px hsl(149 62% 32% / 0); }
}
```
Label reads **"All systems operational"** when the linked status feed reports healthy (a live check against the status page's own API/RSS feed at build/revalidation time, not a hard-coded string — a footer claiming "operational" during an actual incident would be a direct, embarrassing trust violation for exactly the kind of company Vocaply is). If degraded, the dot switches to `--ember-500` and the label updates to "Some systems degraded — view status," linking through. **This is a small, cheap detail with an outsized trust payoff specifically because it's real and independently checkable** — precisely the mechanism already identified in the Vercel/Clerk teardown (§1.1).

### 3.4 Bottom Bar

```
© 2026 Vocaply    ·    ● All systems operational    ·    [Twitter/X] [LinkedIn] [GitHub]
```
Single row on desktop (space-between: copyright left, status center, social right), stacks to three centered rows on mobile (copyright → status → social icons), `--space-4` gap between stacked rows. Social icons: 20px line-icon style, `--ink-on-dark-muted` at rest, `--brand-300` on hover — matching DESIGN-002 §2.5's original spec, unchanged, since that detail was already correct.

### 3.5 The Curtain-Reveal Effect (GSAP, with strict guardrails)

**What it is:** as the visitor scrolls through the Final CTA section (the section immediately above the footer), that section is pinned briefly and its content fades/scales down slightly as the footer — positioned directly beneath it in normal document flow — becomes visible through the shrinking gap, creating the sensation that the final section is "lifting away" to reveal the footer underneath, rather than the footer simply sliding into view as the next block.

**Why it earns a place here specifically (not decoration for its own sake):** this is the *one* place on the entire page where this technique is appropriate, because it's the literal final transition a visitor experiences — a small moment of extra craft at the exact point the visitor is about to leave the page (converted or not) is a "last impression" investment, mirroring the same "narrative bookending" logic already used to justify the Final CTA section's own design (DESIGN-001 Section 9). Using this same pinning technique anywhere *else* on the page (between mid-page sections) would violate the "hard-cut section transitions" rule already established (DESIGN-002 §1.1's Linear-derived principle) — it is deliberately reserved for this single, final transition only.

**Implementation approach:**
```ts
// components/footer/useFooterReveal.ts
"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-setup"

export function useFooterReveal(finalCtaSelector: string) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finalCta = document.querySelector(finalCtaSelector)
    if (reduceMotion || !finalCta) return // falls back to normal document-flow footer — see below

    gsap.timeline({
      scrollTrigger: {
        trigger: finalCta,
        start: "bottom bottom",
        end: "+=30%",           // a short, restrained reveal distance — not a long, jank-prone pin
        scrub: 0.5,
        pin: finalCta,
        pinSpacing: false,       // critical: without this, pinning would add extra scroll
                                  // distance the visitor didn't ask for — see performance note below
      },
    }).to(finalCta, { scale: 0.96, opacity: 0.6, ease: "none" })

    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [finalCtaSelector])

  return scope
}
```

**Hard guardrails (non-negotiable, given this is the riskiest pattern in the document):**
- `pinSpacing: false` is mandatory — without it, GSAP's default pin behavior adds artificial scroll distance to compensate for the pinned element's removal from flow, which would make the page feel like it has "extra," unexplained scroll length right at the very end — the single most common complaint about curtain-reveal footers implemented carelessly.
- The reveal distance (`end: "+=30%"`) is deliberately short — a curtain effect that takes too much scroll distance to complete reads as the page being "stuck," which is precisely the failure mode already flagged and guarded against for the Hero's own pinned sequence (HERO-SPEC-001 §3.6: "the pin range is capped at 60vh... long pins are a common cause of visitors feeling stuck").
- **`prefers-reduced-motion` disables this entirely** — the footer renders in plain, normal document flow with no pin, no scale/opacity transform, exactly as if this section didn't exist. This is the same reduced-motion philosophy applied consistently across every spec in this series: a genuinely different, simpler static path, not a "toned down" version of the effect.
- If the Final CTA section's own content (from DESIGN-001 Section 9) is already animating on its own scroll-triggers, this effect must be sequenced to run *after* those complete, never simultaneously — verified manually during the build day for this feature, since two independent ScrollTrigger instances targeting overlapping scroll ranges on the same section is a common source of visual fighting.

### 3.6 Accessibility

- The footer is a real `<footer>` landmark element — screen reader users can jump directly to it via landmark navigation, which matters specifically because this is where legal/security disclosure links live.
- The curtain-reveal effect's `scale`/`opacity` transform on the Final CTA section must never reduce that section's text contrast below AA at any point in the animation — verified by capping the opacity floor at 0.6, not lower, in the tween above (already reflected in the code sample).
- Status indicator's pulsing dot is purely decorative (the actual status is conveyed via text, "All systems operational" / "Some systems degraded"), so the pulse animation itself carries no unique information — meaning it can safely respect `prefers-reduced-motion` (pulse disabled, dot renders static) without any loss of comprehension, a good example of decoration vs. information staying cleanly separated (per the same principle applied to the Hero's artifact `aria-hidden` treatment, HERO-SPEC-001 §3.5).
- All footer links maintain visible focus rings (`--brand-300` outline on dark background, verified for contrast against `--canvas-dark`) — footer link density means keyboard-only users will tab through many links in sequence here, so focus visibility matters more in this section than almost anywhere else on the page.

---

## PART 4 — File Structure

Extends DESIGN-002's already-scaffolded `components/footer/` folder:

```
components/footer/
├── Footer.tsx                    # Composition root — logo/tagline, 4 columns, bottom bar,
│                                  #  invokes useFooterReveal for the curtain effect
├── FooterColumn.tsx               # Single column — mono header + link list
├── FooterBottomBar.tsx            # Copyright + StatusIndicator + social icons row
├── StatusIndicator.tsx            # Live-checked status dot + label, links to status.vocaply.com
├── useFooterReveal.ts             # The GSAP curtain-pin hook — §3.5
└── footer.content.ts              # Typed column/link data, including the sub-processor list
```

`footer.content.ts`:
```ts
export const footerColumns = [
  {
    header: "Product",
    links: [
      { label: "Features", href: "/#mechanism" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    header: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    header: "Resources",
    links: [
      { label: "Help Center", href: "https://help.vocaply.com" },
      { label: "API Docs", href: "https://docs.vocaply.com" },
      { label: "Compare", href: "/compare/vs-fireflies" },
      { label: "Case Studies", href: "/customers" },
    ],
  },
  {
    header: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Data Processing Agreement", href: "/legal/dpa" },
      { label: "Sub-processors", href: "/security#sub-processors" }, // Recall.ai disclosed here
    ],
  },
] as const

export const statusPageUrl = "https://status.vocaply.com"
```

**Sub-processor disclosure content** (lives on `/security#sub-processors`, linked from the footer, resolving the Recall.ai question definitively): a simple table — provider name, purpose, data category — including Recall.ai (bot infrastructure / meeting audio), Anthropic (AI extraction), Supabase (primary database), MongoDB Atlas (transcript storage), Upstash/Redis (cache/queues), Resend (transactional email), Stripe (payments). This is the standard, expected format for this kind of disclosure and closes the loop opened across TRUST-SPEC-001 and TRUST-SPEC-002.

---

## PART 5 — What Changes vs. the Original DESIGN-002 §2.5 Footer Spec

| Element | Original spec | This document's upgrade | Why |
|---|---|---|---|
| Bottom bar content | Logo + copyright + social icons only | Adds a live, real status indicator between copyright and social icons | Reinforces the product's own accountability promise through the footer itself (Clerk/Vercel-derived principle, §1.1) |
| Legal column | Unspecified depth | Explicit "Sub-processors" entry, disclosing Recall.ai and other vendors | Resolves the Recall.ai customer-facing-disclosure question raised in TRUST-SPEC-002 §0 |
| Column headers | Unstyled | Mono, uppercase, small-caps treatment | Reinforces the project's standing "mono = structured/system data" rule; visually signals "this is the index," distinct from narrative sections |
| Section transition into footer | Standard hard-cut (implicit) | GSAP curtain-reveal pin, reserved for this one transition only | The single appropriate place on the page for this Awwwards-derived technique — the literal final moment of the visitor's journey |
| Newsletter form | Not present | Still not present (reconfirmed) | No change — original reasoning already correct |
| Closing headline | Not present | Still not present (explicitly rejected as redundant with Final CTA) | Avoids diluting the persuasive beat the Final CTA section already delivers |

---

*Document: FOOTER-SPEC-001 | Vocaply Landing Page | Version 1.0*
*Depends on: DESIGN-001, DESIGN-002 (§2.5 baseline), BUILD-PLAN-LANDING-001, HERO-SPEC-001, TRUST-SPEC-002*
*Next: fold this spec into BUILD-PLAN-LANDING-001 Day 10 (Footer build day) as the authoritative source, superseding the brief bottom-bar description in DESIGN-002 §2.5.*
