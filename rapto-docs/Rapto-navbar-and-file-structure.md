# Rapto Landing Page — File Structure & Premium Navbar Build Plan
> Full scalable repo architecture + competitive navbar teardown + implementation-ready navbar spec
> Document: DESIGN-002 | Version 1.0

---

## PART 1 — Full Scalable File Structure (`vocaply-landing`)

This is a standalone repo, deliberately separate from the product monorepo (`vocaply/`) — it has its own release cycle (marketing ships daily, product ships on sprint cadence), its own performance budget (must be near-static, CDN-cacheable, no auth dependency), and its own ownership (growth/design-led, not feature-team-led). The structure below follows the same feature-isolation philosophy already established for the product app, adapted for a content-heavy, animation-heavy marketing site rather than a data-heavy dashboard.

```
vocaply-landing/                                   ← standalone repo, own deploy pipeline (Vercel)
│
├── app/                                            ← Next.js 14 App Router — routing shell ONLY
│   │                                                  Rule: no business/content logic in app/,
│   │                                                  every page.tsx just assembles section components
│   │
│   ├── (marketing)/
│   │   ├── layout.tsx                              ← MarketingNav + MarketingFooter wrapper
│   │   ├── page.tsx                                 ← Home — assembles all landing sections in order
│   │   ├── pricing/
│   │   │   └── page.tsx                             ← Deep-dive pricing page (hero page has a summary)
│   │   ├── security/
│   │   │   └── page.tsx                             ← Trust/compliance deep-dive (SOC2, encryption, etc.)
│   │   ├── customers/
│   │   │   ├── page.tsx                             ← Case studies index
│   │   │   └── [slug]/page.tsx                      ← Individual case study
│   │   ├── compare/
│   │   │   └── [competitor]/page.tsx                ← /compare/vs-fireflies, /compare/vs-otter (SEO)
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── changelog/
│   │       └── page.tsx
│   │
│   ├── legal/
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── dpa/page.tsx                             ← Data Processing Agreement (enterprise buyers ask)
│   │
│   ├── api/
│   │   ├── waitlist/route.ts                        ← Form submission handler (if pre-launch gating used)
│   │   ├── og/route.tsx                             ← Dynamic OG image generation per page
│   │   └── revalidate/route.ts                      ← On-demand ISR revalidation webhook (CMS-triggered)
│   │
│   ├── layout.tsx                                   ← Root: fonts, metadata defaults, design-token import
│   ├── globals.css                                  ← Design tokens (from DESIGN-001 §1) + Tailwind base
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
│
├── components/
│   │
│   ├── nav/                                         ← Full detail in PART 3 of this document
│   │   ├── Navbar.tsx                                ← Composition root, handles scroll-state logic
│   │   ├── NavLogo.tsx
│   │   ├── NavLinks.tsx                              ← Desktop link row
│   │   ├── NavLink.tsx                               ← Single link, incl. dropdown trigger variant
│   │   ├── NavDropdown/
│   │   │   ├── NavDropdown.tsx                       ← "Product" mega-menu container
│   │   │   ├── NavDropdownPanel.tsx                  ← The floating panel itself
│   │   │   └── NavDropdownItem.tsx                   ← Icon + title + description row inside panel
│   │   ├── NavCTAGroup.tsx                           ← "Log in" + "Start free trial" pairing
│   │   ├── MobileNavTrigger.tsx                      ← Hamburger / close morphing icon button
│   │   ├── MobileNavDrawer.tsx                       ← Full-screen mobile overlay
│   │   ├── useScrollState.ts                         ← Hook: transparent → blurred → compressed states
│   │   └── nav.content.ts                            ← All nav copy/links as typed data (see PART 3.6)
│   │
│   ├── footer/
│   │   ├── Footer.tsx
│   │   ├── FooterColumn.tsx
│   │   └── footer.content.ts
│   │
│   ├── ui/                                           ← Primitive, content-agnostic building blocks
│   │   ├── Button.tsx
│   │   ├── Chip.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx                             ← Max-width + responsive inline padding wrapper
│   │   ├── SectionHeading.tsx                        ← Eyebrow + headline + subhead, reused every section
│   │   ├── AnimatedNumber.tsx                        ← Scroll-triggered count-up (used in stat sections)
│   │   ├── Accordion.tsx                             ← FAQ, mobile footer
│   │   ├── Tooltip.tsx
│   │   └── Toggle.tsx                                ← Pricing Monthly/Annual switch
│   │
│   ├── sections/                                     ← One folder per landing-page section — matches
│   │   │                                                DESIGN-001 PART 3 section numbering exactly
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroArtifact.tsx                      ← The looping PENDING→FULFILLED animation
│   │   │   └── hero.content.ts
│   │   ├── CostStats/
│   │   │   ├── CostStats.tsx
│   │   │   └── StatCard.tsx
│   │   ├── Mechanism/
│   │   │   ├── Mechanism.tsx
│   │   │   ├── MechanismBeat.tsx                     ← One timeline beat (A/B/C)
│   │   │   └── mechanism.content.ts
│   │   ├── ScoreShowcase/
│   │   │   ├── ScoreShowcase.tsx
│   │   │   └── ScoreGauge.tsx                        ← SVG donut, mirrors in-product CommitmentScore.tsx
│   │   ├── TrustStatement/
│   │   │   └── TrustStatement.tsx
│   │   ├── Integrations/
│   │   │   ├── Integrations.tsx
│   │   │   └── IntegrationLogo.tsx
│   │   ├── Pricing/
│   │   │   ├── Pricing.tsx
│   │   │   ├── PricingCard.tsx
│   │   │   └── pricing.content.ts
│   │   ├── FAQ/
│   │   │   ├── FAQ.tsx
│   │   │   └── faq.content.ts
│   │   └── FinalCTA/
│   │       └── FinalCTA.tsx
│   │
│   └── providers/
│       ├── MotionProvider.tsx                        ← Framer Motion config, respects prefers-reduced-motion
│       └── AnalyticsProvider.tsx                      ← PostHog/GA init, cookie-consent gated
│
│
├── lib/
│   ├── motion/
│   │   ├── variants.ts                               ← Reveal/stagger variants (DESIGN-001 §4)
│   │   └── springs.ts                                 ← Typed spring configs
│   ├── tokens.ts                                      ← JS-side re-export of CSS variables (for canvas/SVG use)
│   ├── seo/
│   │   ├── metadata.ts                                ← Per-page metadata builder
│   │   └── json-ld.ts                                 ← Organization/Product structured data
│   └── utils/
│       ├── cn.ts
│       └── clamp-fluid-type.ts
│
│
├── content/                                           ← Optional: if a headless CMS (Sanity/Contentful) is
│   │                                                     used for blog/changelog, its typed query layer lives
│   │                                                     here — kept separate from static `.content.ts` files
│   │                                                     above, which stay hard-coded since hero/pricing copy
│   │                                                     is high-stakes and shouldn't be editable by non-design
│   ├── blog.queries.ts
│   └── case-studies.queries.ts
│
│
├── public/
│   ├── fonts/                                          ← Self-hosted General Sans, Inter, JetBrains Mono
│   ├── integrations/*.svg                              ← Jira, Linear, Slack, Notion, Calendar, Outlook
│   ├── og/default-og.png
│   └── favicon.ico
│
│
├── tests/
│   ├── e2e/
│   │   ├── navbar.spec.ts                              ← Scroll states, mobile drawer, keyboard nav
│   │   ├── pricing-toggle.spec.ts
│   │   └── accessibility.spec.ts                       ← axe-core automated pass on every route
│   └── visual/
│       └── snapshots/                                  ← Percy/Chromatic visual regression baselines
│
├── next.config.ts
├── tailwind.config.ts                                  ← Imports design tokens from app/globals.css source
├── tsconfig.json
├── playwright.config.ts
└── package.json
```

**Why a standalone repo, structurally, matters (not just "because the brief said so"):** the marketing site has zero dependency on auth, billing, or the WebSocket layer — bundling it into the product monorepo would mean every landing-page deploy risks pulling in unrelated build steps and every product deploy risks an unrelated marketing regression. Isolating it also lets this repo optimize *only* for what it needs: near-100 Lighthouse scores, ISR/static generation, and a CDN-first delivery model — constraints the actual dashboard app doesn't share.

---

## PART 2 — Competitive Navbar Teardown

I'm breaking this into the same two tiers as the earlier competitive analysis: category-leading SaaS (the craft benchmark) and direct competitors (the positioning benchmark).

### 2.1 Category leaders

**Linear**
- Fixed, fully transparent over the hero, gains a **1px hairline border only** (no blur, no background fill) on scroll — the most restrained possible scroll-state, matching Linear's whole "precision over decoration" identity.
- Logo + 4 links + one single CTA ("Log in") — no second CTA in the nav at all, because Linear's primary conversion action is "start using the product," which happens *inside* the login flow, not via a separate signup button competing for space.
- No dropdowns in the primary nav — anything that would be a dropdown (Product, Method, Customers) is instead its own top-level link to a dedicated page. **Lesson:** dropdown-free navs read as more confident when the underlying IA is simple enough to support it, but this only works with 4–5 top-level items; more than that and a dropdown-free nav becomes cluttered.

**Stripe**
- The opposite extreme: a full mega-menu system under "Products," "Solutions," "Developers," "Resources" — each opening a large panel with icon + title + one-line description per item, grouped into 2–3 columns. This works for Stripe because their actual product surface area is enormous (dozens of products); it would be **over-engineering for Vocaply**, which has one product.
- Stripe's CTA pairing is "Contact sales" (ghost) + "Sign in" (ghost) + a *separate*, visually distinct "Start now" — three items, but only one is a filled button. This confirms the dominant/subordinate button principle holds even at three items: visual weight, not item count, controls what a user's eye commits to.

**Notion**
- A soft, almost playful nav: rounded pill-shaped active-state background behind the hovered link (not just a color change), which matches Notion's overall "warm, not clinical" brand identity established in the earlier teardown.
- Notably keeps "Download" as a distinct nav-level CTA alongside "Get Notion free," because their product has a native-app dimension most competitors don't — not directly relevant to Vocaply, but the underlying principle (a nav CTA should map to the actual distinct paths a visitor can take) is directly relevant: Vocaply's nav should not invent a second CTA that doesn't correspond to a real distinct action.

**Vercel**
- Nav background shifts from transparent to a near-black **blurred glass** panel on scroll — the exact `backdrop-filter: blur()` treatment already specified in DESIGN-001 §2.1 for Vocaply. Vercel's version additionally adds a very subtle top-edge gradient line (1px, brand-colored, barely visible) that "switches on" at the same scroll threshold — a nice, cheap-to-build detail that reinforces brand presence without adding visual noise.
- Search (Cmd+K trigger) lives directly in the nav bar as a persistent, subtly-bordered input-look button — relevant for Vocaply's *product* app (which already has a command palette per the architecture docs) but **not appropriate for the marketing nav**, which has no searchable corpus large enough to justify it. Including a fake search box in a marketing nav is a common over-borrowed pattern worth explicitly avoiding.

**Framer**
- The most animation-forward nav of the set: link underlines are animated with a spring-based sliding indicator (not a static underline that snaps), and the mobile menu transitions with a scale+blur combination rather than a simple slide. This is the highest-craft version of "meaningful motion" in a nav specifically — worth adopting the *sliding indicator* detail for Vocaply's desktop nav (§3.3 below) since it's a low-cost, high-perceived-craft signature detail.

**Figma**
- A persistent, high-contrast single CTA ("Get started for free") that never changes label or style across the entire scroll — while everything else in the nav (background, blur, link visibility) shifts, the CTA is the one constant anchor. This is a deliberate CRO decision: the conversion action should be the most *stable*, most *predictable* element on the page, precisely because everything around it is allowed to change.

**Arc Browser**
- Uses a bold, colored pill-shaped CTA that stands in sharp contrast to an otherwise minimal nav — appropriate for Arc's playful brand, and confirms that *contrast*, not just color choice, is what makes a nav CTA register. Vocaply's ember-glow-on-hover button (already specified) achieves the same contrast principle through motion/glow rather than a loud rest-state color, which is the more appropriate register for a serious accountability product (per the earlier "Ember with extreme scarcity" decision).

### 2.2 Direct competitors

**Otter.ai** — standard SaaS nav: logo, 5 links including a "Solutions" dropdown (segmented by role: Sales, Education, Business, Media), "Log in" ghost + "Try Otter free" filled CTA. Functionally fine, visually undifferentiated — the dropdown items are plain text lists with no icons or descriptions, which is a missed craft opportunity (a flat text-list dropdown reads as "afterthought," an icon+description panel reads as "designed").

**Fireflies.ai** — nav is noticeably denser: a "Products," "Integrations," "Solutions," "Resources," "Pricing" five-item row plus CTA pair — reflecting their broader, more enterprise-sales-oriented surface area (matches the cold, RevOps-flavored positioning already noted in the earlier teardown). For Vocaply, replicating this density would misrepresent a focused, single-product accountability tool as a sprawling enterprise suite — **a simpler nav is itself a positioning statement.**

**Grain** — minimal nav, logo + 3 links + single CTA, no dropdowns at all — closest in spirit to the Linear-style restraint among direct competitors, and the most premium-feeling of the five as a result. Confirms restraint reads as premium even within this specific product category, not just among the elite tier.

**Granola** — nav almost disappears into the page (very light, low-contrast, minimal chrome) — consistent with their overall "quiet, ambient, gets-out-of-your-way" brand voice already identified. Not the right register for Vocaply (which needs to project active, confident accountability, not ambient quietness), but worth noting as a well-executed match between nav restraint and brand voice — the lesson is *consistency*, not the specific low-contrast execution.

**Fathom** — nav includes a small G2-rating badge/star-icon inline, next to the CTA — reinforcing the "borrowed authority" pattern already flagged as premature for Vocaply. **Explicitly not adopting this** until Vocaply has earned equivalent review volume.

### 2.3 What this teardown locks in for Vocaply's navbar

1. **No mega-menu.** Vocaply has one product; a Stripe-style multi-column mega-menu would be a category-mismatch signal (over-claiming product breadth we don't have). A single lightweight dropdown under "Product" (4–5 items, icon + one-line description each, Otter's *structure* done at Notion's *craft* level) is the right size.
2. **One filled CTA, one ghost CTA, never three.** Matches Figma's "stable anchor" principle and the Von Restorff dominant/subordinate pairing already established for buttons generally.
3. **Transparent-over-hero → blurred-glass-on-scroll**, matching Vercel's exact pattern, already specified in DESIGN-001.
4. **A spring-based sliding underline indicator** on desktop nav links (Framer-derived detail) — a small, cheap, high-perceived-craft signature.
5. **No search box, no rating badge** in the marketing nav — both are over-borrowed patterns that don't fit Vocaply's actual current surface area or trust stage.

---

## PART 3 — Premium Navbar: Full Build Specification

### 3.1 Structure (desktop, ≥1024px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo]      Product ▾    Pricing    Security    Customers      Log in   [Start free trial]  │
└──────────────────────────────────────────────────────────────────────────┘
   72px height · Container max-width 1280px · inline padding clamp(20px, 5vw, 80px)
```

- **Logo** (leftmost): wordmark only (no icon-mark + wordmark lockup in the nav — the icon-mark alone is reserved for the favicon/social/product-app sidebar; the nav uses the full wordmark for maximum brand-name legibility to a first-time visitor, who may not yet recognize an icon-mark).
- **Primary links** (center-left cluster, NOT centered in the full bar — center-aligning nav links in a bar that also has a logo and CTA group creates uneven optical spacing; links sit left-of-center, closer to the logo): `Product` (dropdown trigger), `Pricing`, `Security`, `Customers`.
- **Utility group** (rightmost): `Log in` (text link, no border, `--ink-700`) + `Start free trial` (`.btn-primary`, `sm` size in the nav specifically — full `md`/`lg` size would visually overpower the bar).

### 3.2 The "Product" Dropdown

Single-column-per-concern panel (not a wide mega-menu), 320px wide, floats 8px below the trigger, `--radius-lg`, `--shadow-3`, `--paper-raised` background, appears on hover (desktop) with a **120ms open delay** (prevents accidental trigger on fast mouse-pass-through — a common annoyance in unthrottled dropdown implementations) and closes on a **300ms delay after mouse-leave** (forgiving enough that moving the mouse diagonally toward the panel doesn't accidentally close it — the classic "safe triangle" interaction pattern used by every well-built dropdown, absent from most template navs).

**Panel contents (4 items, icon + title + one-line description each, matching the Notion-level craft benchmark rather than Otter's flat-text-list):**
1. Icon: commitment-checkmark glyph — **"Commitment Tracking"** — "Every promise, automatically extracted and followed up."
2. Icon: timeline/link glyph — **"Cross-Meeting Memory"** — "Resolves what was said last week against what's said today."
3. Icon: gauge glyph — **"Commitment Scoring"** — "A fair, recency-weighted accountability score per person."
4. Icon: puzzle/plug glyph — **"Integrations"** — "Syncs into Jira, Linear, Slack, and Notion automatically."

Bottom of panel: a thin divider, then a single quiet link — "See the full product tour →" (routes to a dedicated `/product` page, keeping the dropdown itself lightweight).

**Keyboard behavior:** dropdown trigger is a real `<button aria-expanded aria-haspopup="menu">`; opens on `Enter`/`Space`/`ArrowDown`; items are arrow-key navigable; `Escape` closes and returns focus to the trigger — a fully-supported pattern, not a hover-only affordance, since hover has no keyboard equivalent by default.

### 3.3 The Sliding Underline Indicator (Framer-derived signature detail)

A single absolutely-positioned `div` (2px height, `--brand-500`, `--radius-sm` on both ends) sits beneath the link row. On hover of any top-level link, it animates (`--spring-ui`) to that link's `x` position and `width` — sliding *from* wherever it last was, not fading in fresh each time, which is what creates the "liquid, alive" feeling rather than a static hover underline. On mouse-leave of the whole nav, it slides back to sit beneath the currently-active route (not disappearing) — so there's always a stable resting position reflecting "where you are," and a temporary sliding position reflecting "what you're about to click."

### 3.4 Scroll State Machine

Three distinct states, driven by a single `useScrollState` hook (`components/nav/useScrollState.ts`) reading scroll position via a passive, throttled listener (or `IntersectionObserver` against a 1px sentinel element at the top of the page — the more performant option, avoiding scroll-event overhead entirely):

| State | Trigger | Visual |
|---|---|---|
| **Transparent** | scrollY = 0 (resting on hero) | No background, no border, no shadow — nav reads as part of the dark hero canvas |
| **Blurred** | scrollY > 8px | `background: hsl(60 9% 98% / 0.85)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid var(--border-subtle)` fades in over 200ms |
| **Compressed** | scrollY > 400px **and** scroll direction = down | Height eases from 72px → 64px over 200ms (`--ease-in-out`) — reclaims vertical space for content without fully hiding the nav (full-hide-on-scroll is explicitly rejected, since it removes the CTA from view exactly when a persuaded visitor is ready to act) |

Scrolling back up at any point immediately returns to the **Blurred** (72px) state within one frame-batch — no lag on re-reveal, since a user scrolling up is actively looking for navigation, and any delay there reads as unresponsive.

**Logo/link color also swaps** at the Transparent→Blurred transition: `--ink-on-dark` (light text, for legibility over the dark hero) → `--ink-900` (dark text, for legibility over the now-light blurred bar) — a detail frequently missed in template navbars, resulting in invisible or low-contrast nav text the moment the background changes.

### 3.5 Mobile Nav (<1024px)

- Bar collapses to: Logo (left) + single `MobileNavTrigger` hamburger icon (right) — the "Log in"/"Start free trial" CTAs move *inside* the drawer rather than staying in the collapsed bar (cramming a CTA button next to a hamburger on a 375px viewport creates a cramped, low-confidence tap target — better to give the drawer room to present the CTA properly).
- **`MobileNavTrigger`** morphs between hamburger (☰) and close (✕) via a CSS-only 3-line-to-X transform (each line rotates/translates independently, 200ms `--ease-out-snappy`) — never an abrupt icon swap, which reads as unpolished.
- **`MobileNavDrawer`**: full-viewport overlay, `--canvas-dark` background, slides/fades in (200ms), body-scroll-locked while open (`overflow: hidden` on `<body>`, restored on close — a frequently-missed detail that lets the page scroll *behind* an open drawer on mobile if omitted).
- Drawer content: links stacked at `--text-display-m` size (large, thumb-friendly, 56px min tap height each), the "Product" item expands as an inline accordion (not a nested drawer — one level of navigation depth max on mobile, per mobile IA best practice), then a divider, then the CTA pair **stacked full-width, primary on top** pinned near the bottom of the drawer above `env(safe-area-inset-bottom)`.
- Focus is trapped within the open drawer (`Tab`/`Shift+Tab` cycle only through drawer content), and `Escape` closes it and returns focus to the trigger button — matching the same accessibility rigor as the desktop dropdown.

### 3.6 Content Contract (`nav.content.ts`)

Keeping nav copy and links in one typed file (rather than hard-coded JSX strings scattered across `NavLinks.tsx`, `MobileNavDrawer.tsx`, etc.) means the desktop and mobile nav can never silently drift out of sync — a real, common bug in navbars built without this discipline:

```ts
export const navLinks = [
  { label: "Product", type: "dropdown", items: productDropdownItems },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
  { label: "Customers", href: "/customers" },
] as const

export const navCTA = {
  secondary: { label: "Log in", href: "https://app.vocaply.com/login" },
  primary:   { label: "Start free trial", href: "https://app.vocaply.com/register" },
} as const
```

### 3.7 Why this navbar beats every page it was benchmarked against

- It's simpler than Stripe/Fireflies (appropriate to Vocaply's single-product surface area — simplicity here is a positioning signal, not a limitation).
- It's more crafted than Otter/Fireflies/Fathom (icon+description dropdown panel, sliding indicator, proper scroll-state color swap, safe-triangle dropdown timing — details all five direct competitors skip).
- It matches the restraint of Linear/Grain while still using one signature motion detail (the sliding underline) borrowed deliberately from Framer — giving it a memorable, ownable micro-interaction rather than being restraint for its own sake.
- Every element traces to a stated principle: dominant/subordinate CTA pairing (Von Restorff), stable CTA anchor through scroll-state changes (Figma-derived), safe-triangle dropdown timing (reduces accidental-close frustration, a usability heuristic), keyboard/focus-trap parity with mouse interaction (WCAG 2.1.1 + 2.4.3).

---

*Document: DESIGN-002 | Vocaply Landing Page | Version 1.0*
*Covers: full repo file structure + navbar competitive teardown + implementation-ready navbar specification.*
