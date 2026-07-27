# Rapto Landing Page — 30-Day Build Plan
> Day-by-day execution plan for the standalone `vocaply-landing` repository
> Builds directly on DESIGN-001 (design system + sections) and DESIGN-002 (file structure + navbar)
> Document: BUILD-PLAN-LANDING-001 | Version 1.0

---

## How this plan is organized

Each day lists: **what gets built**, **exact files touched**, and **what "done" means** (the functional/visual bar to clear before moving on). The order is deliberate — foundation before primitives, primitives before sections, structural sections before polish, polish before secondary pages, everything before performance/SEO/ship. Skipping ahead (e.g. building Pricing before the Button/Card primitives exist) is exactly how landing pages end up inconsistent, so the order is a hard dependency chain, not a suggestion.

```
PHASE 1 — Foundation & Tooling          Days 1–3
PHASE 2 — Design Tokens & UI Primitives Days 4–6
PHASE 3 — Navbar & Footer               Days 7–10
PHASE 4 — Core Landing Sections         Days 11–20
PHASE 5 — Secondary Pages               Days 21–24
PHASE 6 — Motion, Responsive, A11y      Days 25–27
PHASE 7 — SEO, Performance, Ship        Days 28–30
```

---

## PHASE 1 — Foundation & Tooling (Days 1–3)

### Day 1 — Repo Init & Project Scaffolding

**Build:**
- Initialize the standalone `vocaply-landing` repo (Next.js 14, App Router, TypeScript strict mode).
- Install core dependencies: `tailwindcss`, `framer-motion`, `clsx` + `tailwind-merge`, `@axe-core/playwright` (dev), `playwright` (dev).
- Set up `next.config.ts` (image domains, font optimization flags, strict mode on).
- Set up `tsconfig.json` with path aliases (`@/components`, `@/lib`, `@/content`).

**Files:**
```
next.config.ts
tsconfig.json
package.json
.eslintrc.js
.gitignore
.env.example
app/layout.tsx        (bare shell — no fonts/providers yet)
app/page.tsx           (placeholder "Hello Vocaply")
```

**Done when:** `pnpm dev` runs clean, TypeScript strict mode has zero errors, ESLint passes on the empty scaffold.

---

### Day 2 — Fonts, Metadata, Root Layout

**Build:**
- Self-host and register the three type families from DESIGN-001 §1.2 (General Sans, Inter Variable, JetBrains Mono) via `next/font/local`.
- Build the root `app/layout.tsx`: HTML lang, default metadata (title template, description, OG defaults), font variables applied to `<html>`.
- Write `app/robots.ts` and a stub `app/sitemap.ts`.

**Files:**
```
public/fonts/*.woff2
app/layout.tsx          (finalized: fonts + metadata)
lib/seo/metadata.ts     (per-page metadata builder function)
app/robots.ts
app/sitemap.ts
```

**Done when:** Fonts load with zero layout shift (verify via Lighthouse CLS = 0 on the placeholder page), `<title>`/meta tags render correctly in view-source.

---

### Day 3 — Design Tokens Into Code

**Build:**
- Transcribe the full token set from DESIGN-001 §1.1–§1.4 into `app/globals.css` as CSS custom properties (color, elevation, radii).
- Wire `tailwind.config.ts` to consume those CSS variables (so `bg-brand-500`, `text-ink-700`, `shadow-2` etc. all work as Tailwind utilities backed by the token source of truth — never hard-coded hex values in component files from this point forward).
- Add the dark-canvas variant classes/utilities for sections that use `--canvas-dark`.
- Write `lib/tokens.ts` — a typed JS-side re-export of the same values, for anywhere a token is needed inside JS/SVG (e.g. the animated Score gauge's stroke color) rather than CSS.

**Files:**
```
app/globals.css         (full token block from DESIGN-001 §1.1–1.4)
tailwind.config.ts       (extended theme mapped to CSS vars)
lib/tokens.ts
```

**Done when:** A throwaway test page renders every color swatch, every shadow tier, and both type families at every defined size — visually verified against DESIGN-001 before deleting the test page.

---

## PHASE 2 — Design Tokens & UI Primitives (Days 4–6)

### Day 4 — Button, Chip, Container

**Build:**
- `Button.tsx`: primary + secondary variants, `sm`/`md`/`lg` sizes, loading state (dot-pulse per DESIGN-001 §2.2), disabled state, `asChild`/polymorphic support (so it can render as a `<Link>` or `<button>` without duplicating styles).
- `Chip.tsx`: `fulfilled` / `pending` / `attention` variants exactly per DESIGN-001 §2.3 (color + dot + mono label).
- `Container.tsx`: the max-width + responsive inline-padding wrapper every section will use.

**Files:**
```
components/ui/Button.tsx
components/ui/Chip.tsx
components/ui/Container.tsx
```

**Done when:** All button states (rest/hover/active/focus-visible/loading/disabled) are manually clicked through and match DESIGN-001 §2.2 exactly, including the hover glow and press-compression micro-interaction.

---

### Day 5 — Card, SectionHeading, Toggle, Tooltip

**Build:**
- `Card.tsx`: base card with hover lift (§2.4), a `flat` prop variant for the integration-logo tiles (no shadow, border only).
- `SectionHeading.tsx`: the reusable eyebrow + headline + subhead block used at the top of nearly every section — built once here so every section afterward just passes props instead of re-implementing typography.
- `Toggle.tsx`: pill switch for the Pricing Monthly/Annual control.
- `Tooltip.tsx`: minimal, accessible (keyboard-triggerable, not hover-only) tooltip for later use (e.g., explaining "confidence score" inline).

**Files:**
```
components/ui/Card.tsx
components/ui/SectionHeading.tsx
components/ui/Toggle.tsx
components/ui/Tooltip.tsx
```

**Done when:** Each primitive has been dropped into a scratch page at both mobile (375px) and desktop (1280px) widths and visually holds up at both.

---

### Day 6 — AnimatedNumber, Accordion, Motion Provider

**Build:**
- `AnimatedNumber.tsx`: scroll-triggered count-up used by CostStats and ScoreShowcase — built once, shared. Takes `from`, `to`, `duration`, `format` (e.g. `"70%"`, `"4.5 hrs/wk"`, `"89"`).
- `Accordion.tsx`: used by FAQ and the mobile footer/nav — single-open or multi-open mode as a prop.
- `MotionProvider.tsx`: wraps the app, reads `prefers-reduced-motion` once at the root, exposes a context/hook (`useReducedMotion`) so every animated component downstream can branch cleanly instead of re-querying the media feature itself.
- `lib/motion/variants.ts` + `lib/motion/springs.ts`: the typed reveal/stagger variants and spring configs from DESIGN-001 §4, defined once, imported everywhere.

**Files:**
```
components/ui/AnimatedNumber.tsx
components/ui/Accordion.tsx
components/providers/MotionProvider.tsx
lib/motion/variants.ts
lib/motion/springs.ts
```

**Done when:** `AnimatedNumber` correctly counts up once on first scroll-into-view (verified it does NOT re-trigger on scroll-away-and-back), and toggling OS-level "reduce motion" measurably changes behavior across all animated primitives built so far.

---

## PHASE 3 — Navbar & Footer (Days 7–10)

### Day 7 — Navbar Structure & Scroll State Machine

**Build:**
- `useScrollState.ts`: the three-state hook (Transparent / Blurred / Compressed) from DESIGN-002 §3.4, built on `IntersectionObserver` against a sentinel element (not scroll-event polling).
- `Navbar.tsx`: composition root — logo, link row, CTA group, wired to `useScrollState` for background/blur/height/text-color transitions.
- `NavLogo.tsx`, `NavCTAGroup.tsx`.
- `nav.content.ts`: typed link + CTA data per DESIGN-002 §3.6.

**Files:**
```
components/nav/useScrollState.ts
components/nav/Navbar.tsx
components/nav/NavLogo.tsx
components/nav/NavCTAGroup.tsx
components/nav/nav.content.ts
```

**Done when:** Scrolling the placeholder page demonstrates all three states firing at the correct thresholds, including the text-color swap from light (`--ink-on-dark`) to dark (`--ink-900`) at the Transparent→Blurred boundary — this exact detail was flagged in DESIGN-002 as commonly missed, so it gets explicit manual verification here.

---

### Day 8 — Product Dropdown + Sliding Underline

**Build:**
- `NavLinks.tsx`, `NavLink.tsx` (plain link + dropdown-trigger variant).
- `NavDropdown/NavDropdown.tsx`, `NavDropdownPanel.tsx`, `NavDropdownItem.tsx` — the 4-item icon+title+description "Product" panel from DESIGN-002 §3.2, including the 120ms open-delay / 300ms close-delay safe-triangle timing.
- The sliding underline indicator (DESIGN-002 §3.3) — a single absolutely-positioned element whose `x`/`width` animates via spring to whichever link is hovered, resting under the active route otherwise.
- Full keyboard support: `aria-expanded`, `aria-haspopup`, arrow-key navigation inside the panel, `Escape`-to-close-and-return-focus.

**Files:**
```
components/nav/NavLinks.tsx
components/nav/NavLink.tsx
components/nav/NavDropdown/NavDropdown.tsx
components/nav/NavDropdown/NavDropdownPanel.tsx
components/nav/NavDropdown/NavDropdownItem.tsx
```

**Done when:** Dropdown opens/closes correctly with mouse (including the safe-triangle diagonal-mouse-move test) AND with keyboard-only navigation (tab to trigger, Enter to open, arrows to move, Escape to close, focus correctly returns) — both paths tested manually before moving on.

---

### Day 9 — Mobile Navigation

**Build:**
- `MobileNavTrigger.tsx`: the hamburger↔close morphing icon button (CSS-only 3-line transform).
- `MobileNavDrawer.tsx`: full-viewport overlay, body-scroll-lock while open, focus-trap, accordion-expand for the "Product" section (one depth level only), CTA pair stacked full-width at the bottom above safe-area-inset.

**Files:**
```
components/nav/MobileNavTrigger.tsx
components/nav/MobileNavDrawer.tsx
```

**Done when:** On a real mobile viewport (not just resized desktop Chrome — test actual iOS Safari if possible, since safe-area-inset and scroll-lock quirks differ), opening the drawer locks background scroll, traps focus, and closing it restores both correctly. No layout jump when the drawer opens/closes.

---

### Day 10 — Footer

**Build:**
- `Footer.tsx`, `FooterColumn.tsx`, `footer.content.ts` per DESIGN-002 Part 1 structure: 4-column desktop (Product / Company / Resources / Legal), accordion-collapsed on mobile, bottom bar with logo + copyright + social icons.
- Explicitly **no** newsletter capture form here (per DESIGN-002's stated rationale — footer forms convert poorly and dilute the page's single conversion goal).

**Files:**
```
components/footer/Footer.tsx
components/footer/FooterColumn.tsx
components/footer/footer.content.ts
```

**Done when:** Footer renders correctly at all three breakpoints, all links resolve (even if to placeholder routes at this stage), social icon hover states match the `--brand-300` hover spec.

---

## PHASE 4 — Core Landing Sections (Days 11–20)

*Each section day includes: content file, component build, scroll-reveal wiring, and a manual visual check against its DESIGN-001 spec before moving to the next.*

### Day 11 — Hero: Structure & Copy

**Build:**
- `hero.content.ts`: the final headline/subhead/CTA/micro-trust copy from DESIGN-001 Section 2, typed and centralized.
- `Hero.tsx`: two-column desktop / stacked-mobile layout, dark canvas background, eyebrow + headline + subhead + CTA pair + micro-trust line — **without** the animated artifact yet (static placeholder box today; the artifact is complex enough to earn its own day).

**Files:**
```
components/sections/Hero/hero.content.ts
components/sections/Hero/Hero.tsx
```

**Done when:** Hero copy hierarchy, responsive column collapse, and CTA pairing visually match spec; Mesh-Aurora gradient backdrop is implemented and confirmed to sit *behind* the artifact placeholder only, never behind body text.

---

### Day 12 — Hero: The Animated Artifact

**Build:**
- `HeroArtifact.tsx`: the full 8-second looping sequence from DESIGN-001 Section 2 — Card A fade-in → connecting line/label → Card B fade-in with live chip morph (`pending`→`fulfilled`) + ember score-pill micro-animation → hold → crossfade restart.
- Wire `aria-hidden="true"` on the artifact with a preceding visually-hidden text equivalent describing the same event in one sentence.
- Wire reduced-motion fallback: renders directly in its final resolved state (both cards `fulfilled`), no loop.

**Files:**
```
components/sections/Hero/HeroArtifact.tsx
```

**Done when:** The loop times out exactly to spec (2.5s / 3s / 5.5s / 8s beats), the chip color-morph is smooth (not a hard cut), reduced-motion mode is verified via OS setting toggle (not just a code review), and the visually-hidden description is confirmed present via a screen reader spot-check (VoiceOver or NVDA).

---

### Day 13 — Cost Stats Section

**Build:**
- `CostStats.tsx` + `StatCard.tsx`: the 3-column (1-column mobile) stat row from DESIGN-001 Section 3, using `AnimatedNumber` for the count-up, mono typeface for the figures.
- Wire scroll-reveal stagger (headline → cards, 40–60ms per child).

**Files:**
```
components/sections/CostStats/CostStats.tsx
components/sections/CostStats/StatCard.tsx
```

**Done when:** All three stats count up once on first scroll-into-view, correctly formatted (`70%`, `4.5 hrs/wk`, `3×`), never re-trigger on repeated scroll past the section.

---

### Day 14 — Mechanism Section: Timeline Structure

**Build:**
- `mechanism.content.ts`: the three-beat copy (A/B/C) from DESIGN-001 Section 4.
- `Mechanism.tsx`: the vertical timeline shell — center connecting line (desktop) / left-aligned line (mobile), alternating left/right content blocks.
- `MechanismBeat.tsx`: a single beat's layout (visual + copy + annotation).

**Files:**
```
components/sections/Mechanism/mechanism.content.ts
components/sections/Mechanism/Mechanism.tsx
components/sections/Mechanism/MechanismBeat.tsx
```

**Done when:** All three beats render in correct alternating positions desktop, correct single-column order mobile, connecting line renders continuously behind all three beats without gaps.

---

### Day 15 — Mechanism Section: Beat Visuals & Reveal Choreography

**Build:**
- Build the actual transcript-snippet-card visuals for Beat A and Beat B (including the match-line + similarity-score readout between them), and the `CommitmentScore` donut micro-preview + `chip-fulfilled` for Beat C.
- Wire scroll-triggered reveal per beat as the user scrolls the timeline (not all three visible/animated at once on page load).

**Files:** (extends Day 14 components — no new files, this is the "make it real" pass)

**Done when:** Scrolling through the section reveals each beat in sequence as it enters the viewport, each with its own visual (not placeholder boxes), matching DESIGN-001's described beat visuals.

---

### Day 16 — Score Showcase Section

**Build:**
- `ScoreGauge.tsx`: the animated SVG donut gauge — must visually mirror the in-product `CommitmentScore.tsx` component (same stroke treatment, same brand-500 arc color) for cross-surface brand consistency, animating 0→89 on scroll-into-view.
- `ScoreShowcase.tsx`: dark-canvas 2-column section (visual left / copy right on desktop, visual-first stacked mobile), including the three inline mono mini-stats row.

**Files:**
```
components/sections/ScoreShowcase/ScoreGauge.tsx
components/sections/ScoreShowcase/ScoreShowcase.tsx
```

**Done when:** Gauge animates smoothly with eased count-up synced to the arc-fill animation (they must finish together, not the number racing ahead of or lagging behind the visual arc), section correctly alternates the dark-canvas rhythm per DESIGN-001 §4.

---

### Day 17 — Trust Statement Section

**Build:**
- `TrustStatement.tsx`: centered, narrower-max-width section per DESIGN-001 Section 6, including the live side-by-side chip comparison (`chip-attention` vs. a crossed-out gray mock "failure" chip).

**Files:**
```
components/sections/TrustStatement/TrustStatement.tsx
```

**Done when:** The chip comparison visual reads clearly at a glance (the point — "we don't do red/failure framing" — must be legible without reading the caption first), narrower max-width is confirmed to visually differentiate this section's rhythm from its neighbors.

---

### Day 18 — Integrations Section

**Build:**
- `Integrations.tsx` + `IntegrationLogo.tsx`: the 6-logo row (Jira, Linear, Slack, Notion, Google Calendar, Outlook) on the `--paper-sunken` tonal background, grayscale-at-rest / full-color-on-hover.
- Source/prepare the actual SVG logo assets (verify each brand's usage guidelines — most require unmodified logos and minimum clear-space; do not recolor a trademarked logo mark itself, only apply the grayscale filter, which is a standard permitted treatment).

**Files:**
```
components/sections/Integrations/Integrations.tsx
components/sections/Integrations/IntegrationLogo.tsx
public/integrations/*.svg
```

**Done when:** All six logos render at consistent visual weight (no single logo disproportionately larger/smaller due to differing source SVG viewboxes — normalize this manually), hover transition is smooth and consistent across all six.

---

### Day 19 — Pricing Section

**Build:**
- `pricing.content.ts`: plan data (Free/Starter/Growth/Business — name, price, features, highlighted flag) matching the platform's actual plan limits already defined in the product's billing config.
- `PricingCard.tsx`: single card, feature checklist, CTA button (primary for Growth, secondary for others), the "Most teams choose this" tag + elevated shadow + border treatment for the highlighted tier.
- `Pricing.tsx`: the differentiator callout banner ("most tools charge per seat...") + the 4-column grid / mobile snap-carousel + the Monthly/Annual `Toggle`.

**Files:**
```
components/sections/Pricing/pricing.content.ts
components/sections/Pricing/PricingCard.tsx
components/sections/Pricing/Pricing.tsx
```

**Done when:** Toggling Monthly/Annual correctly recalculates and displays all four prices (20% annual discount applied), mobile carousel snaps correctly with the Growth tier centered by default, highlighted-tier visual treatment is unambiguous at a glance.

---

### Day 20 — FAQ + Final CTA Sections

**Build:**
- `faq.content.ts` + `FAQ.tsx`: built on the shared `Accordion` primitive from Day 6 — questions should pre-emptively address objections not fully covered elsewhere (pricing edge cases, data retention, security basics — deep security content lives on its own page, built Day 22).
- `FinalCTA.tsx`: the narrative-bookend section per DESIGN-001 Section 9 — static (non-looping) small version of the resolved PENDING→FULFILLED card pair, closing headline, primary CTA, micro-trust line.

**Files:**
```
components/sections/FAQ/faq.content.ts
components/sections/FAQ/FAQ.tsx
components/sections/FinalCTA/FinalCTA.tsx
app/(marketing)/page.tsx     (NOW assembled: Hero → CostStats → Mechanism → ScoreShowcase →
                              TrustStatement → Integrations → Pricing → FAQ → FinalCTA)
```

**Done when:** The full homepage assembles top-to-bottom for the first time today — this is the milestone day. Full page is scrolled start to finish, checking the dark/light rhythm alternation from DESIGN-001 §4 reads correctly as a whole, not just section-by-section.

---

## PHASE 5 — Secondary Pages (Days 21–24)

### Day 21 — `/pricing` Deep-Dive Page

**Build:**
- Full pricing page reusing `Pricing.tsx` as its centerpiece, plus an expanded feature-comparison table (all plan features side-by-side, not just the summary checklist used on the homepage section) and a dedicated FAQ block specific to billing questions.

**Files:**
```
app/(marketing)/pricing/page.tsx
components/sections/Pricing/FeatureComparisonTable.tsx
```

**Done when:** Comparison table is horizontally scrollable on mobile without breaking layout, every plan's full feature set matches the platform's actual `plans.config.ts` limits exactly (no marketing-copy drift from real product limits).

---

### Day 22 — `/security` Page

**Build:**
- A trust/compliance deep-dive: encryption-at-rest/in-transit summary, RBAC + tenant isolation explanation (plain-language version of the platform's actual 3-layer isolation architecture), SOC 2 roadmap status, data retention by plan.

**Files:**
```
app/(marketing)/security/page.tsx
components/sections/SecurityDetail/*.tsx   (new small section components as needed)
```

**Done when:** Every claim on this page is traceable to something actually true in the platform architecture (this page will be read closely by enterprise/security-conscious buyers — nothing here can be aspirational marketing language that outpaces reality).

---

### Day 23 — `/customers` Index + Case Study Template

**Build:**
- Case-study index page (grid of customer cards) and a single dynamic `[slug]/page.tsx` template — even if only 1–2 real case studies exist at launch, the template must be built to scale to dozens without redesign.

**Files:**
```
app/(marketing)/customers/page.tsx
app/(marketing)/customers/[slug]/page.tsx
content/case-studies.queries.ts
```

**Done when:** Template renders correctly with placeholder content and is verified to handle a case study with a short quote vs. a long-form narrative without breaking layout.

---

### Day 24 — `/compare/[competitor]` Pages

**Build:**
- SEO-targeted comparison pages (`/compare/vs-fireflies`, `/compare/vs-otter`, `/compare/vs-fathom`) — each following one shared template but with per-competitor content, built around the differentiation already established in the competitive teardown (cross-meeting memory, commitment scoring, flat pricing) rather than generic "we're better" claims.
- **Tone discipline:** factual, specific, never disparaging — comparison pages that trash-talk competitors read as insecure and erode trust; comparison pages that plainly state "here's what we do that they don't, here's what they do that we don't" read as confident and credible.

**Files:**
```
app/(marketing)/compare/[competitor]/page.tsx
content/compare.content.ts
```

**Done when:** All three initial comparison pages render correctly from the shared template with distinct, accurate per-competitor content, and each has correct per-page metadata for SEO (Day 28 will do the full SEO pass, but per-page title/description must exist now).

---

## PHASE 6 — Motion, Responsive, Accessibility (Days 25–27)

### Day 25 — Full Responsive Audit

**Build:** No new features — a dedicated audit day. Walk every page at 375px, 768px, 1024px, 1440px, and 1920px. Fix any: overflow, cramped tap targets, orphaned single-word line breaks in headlines, misaligned grid columns.

**Files:** touches whichever component files have issues found during audit (tracked as a punch-list, not pre-specified).

**Done when:** Every page passes a full walkthrough at all five widths with zero visual bugs logged.

---

### Day 26 — Motion Polish Pass

**Build:** No new features — review every scroll-reveal, hover, and the two autoplay-permitted loops (Hero artifact, none other) against DESIGN-001 §4's choreography rules. Confirm stagger timing feels natural (not too slow, not so fast it reads as a flicker), confirm `prefers-reduced-motion` is respected on literally every animated element site-wide, not just the ones built early.

**Files:** touches whichever component files have motion issues found during review.

**Done when:** A full slow scroll through the entire site feels deliberately paced, not chaotic; toggling reduced-motion at the OS level and re-scrolling confirms every transform-based animation correctly degrades to opacity-only or static.

---

### Day 27 — Accessibility Pass

**Build:**
- Run `@axe-core/playwright` against every route, fix all flagged issues.
- Manual keyboard-only pass across the entire site (tab order, focus visibility, dropdown/drawer/accordion keyboard parity — re-verify nothing regressed since Day 8/9's initial build).
- Manual screen-reader spot-check (VoiceOver/NVDA) on Hero, Mechanism, and Pricing specifically — the three sections with the most non-text/animated content.
- Verify heading hierarchy is strictly sequential across every page (one `h1`, sequential `h2`s, no skipped levels).

**Files:**
```
tests/e2e/accessibility.spec.ts   (automated axe-core run wired into CI from here on)
```

**Done when:** Zero critical/serious axe violations across all routes, full site is navigable and comprehensible keyboard-only and with a screen reader.

---

## PHASE 7 — SEO, Performance, Ship (Days 28–30)

### Day 28 — SEO Pass

**Build:**
- Finalize `lib/seo/metadata.ts` usage across every route (unique title/description per page, correct OG image via `app/api/og/route.tsx` per page type).
- `lib/seo/json-ld.ts`: Organization + Product structured data on the homepage, Article structured data on blog/case-study pages.
- Finalize `app/sitemap.ts` to include every real route (marketing pages, compare pages, case studies, blog posts).
- Verify `robots.ts` correctly allows all marketing routes and disallows any `/api/*` routes.

**Files:**
```
lib/seo/metadata.ts       (finalized across all routes)
lib/seo/json-ld.ts
app/sitemap.ts             (finalized)
app/api/og/route.tsx
```

**Done when:** Every route has a unique, correct title/description verified in view-source, structured data validates with zero errors in Google's Rich Results Test, sitemap includes every live route with no 404s.

---

### Day 29 — Performance Pass

**Build:**
- Run Lighthouse on every major page; address any LCP/CLS/INP regressions against the budget defined in DESIGN-001 §6.
- Audit bundle size (`First Load JS < 150KB` target) — verify Framer Motion is tree-shaken correctly, integration logos are inline SVG (not a JS icon library import), mono font is deferred/lazy since it's only needed below the fold.
- Verify image optimization (any raster images use `next/image` with correct `sizes`, no unoptimized large assets slipped in during content days).
- Set up Vercel Analytics / Speed Insights (or equivalent) for ongoing post-launch monitoring.

**Files:** touches `next.config.ts` (image/font config), whichever components are found to be bundle-size or CLS offenders.

**Done when:** Homepage Lighthouse score ≥ 95 across Performance/Accessibility/Best Practices/SEO on both mobile and desktop throttled profiles; LCP < 1.2s and CLS < 0.05 confirmed on the homepage specifically (the highest-traffic, highest-stakes page).

---

### Day 30 — Final QA, Visual Regression Baseline, and Ship

**Build:**
- Full cross-browser manual pass (Chrome, Safari, Firefox, mobile Safari, mobile Chrome).
- Set up visual regression baselines (Percy/Chromatic) against the now-finalized site, so any future PR that visually changes a component gets flagged automatically — the point where this repo transitions from "actively being designed" to "actively being maintained against regression."
- Final content proofread across every page (copy typos, broken links, placeholder text accidentally left in from earlier days — a full site-wide grep for `TODO`/`Lorem`/`placeholder`).
- Production environment variables set, custom domain configured, deploy to production.
- Post-deploy smoke test: every route loads, every form submits, every external link (integration docs, social) resolves correctly.

**Files:**
```
tests/visual/snapshots/*      (baseline captured)
.env.production
vercel.json (or platform-equivalent deploy config)
```

**Done when:** Site is live on the production domain, smoke test passes on the live URL (not just local/preview), visual regression baseline is committed, and the punch-list from Days 25–27 shows zero open items.

---

## Summary — 30-Day Milestone Map

```
Day 3   → Design tokens live in code, verified against spec
Day 6   → Full UI primitive library complete
Day 10  → Navbar + Footer fully functional (desktop + mobile + keyboard)
Day 20  → Complete homepage assembled top-to-bottom for the first time
Day 24  → All secondary pages (pricing, security, customers, compare) live
Day 27  → Zero accessibility violations, full keyboard/screen-reader parity
Day 29  → Performance budget met (Lighthouse ≥ 95, LCP < 1.2s)
Day 30  → Production deploy, visual regression baseline locked in
```

---

*Document: BUILD-PLAN-LANDING-001 | Vocaply Landing Page | Version 1.0*
*Depends on: DESIGN-001 (design system + section specs), DESIGN-002 (file structure + navbar spec)*
