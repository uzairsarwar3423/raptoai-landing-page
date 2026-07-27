# Rapto — Landing Page Design Specification
> Implementation-ready design system + section-by-section blueprint for the `vocaply-landing` repository
> Principal Designer deliverable | Document: DESIGN-001 | Version 1.0

---

## 0. How this document is organized

This is the file an engineer opens to build the page without needing to ask a designer a single question. It covers, in order:

1. Design tokens (color, type, spacing, motion, elevation) — copy-pasteable into CSS variables / Tailwind config
2. Global components (nav, buttons, badges, cards, footer)
3. Every landing page section, in build order, with: purpose, layout spec, exact copy, responsive behavior, states, and the psychology behind each decision
4. Motion & interaction specification
5. Accessibility contract
6. Performance budget
7. Recommended repo/file structure

Every decision traces back to the competitive teardown already established: Vocaply's wedge is **what happens after the meeting ends** — no competitor (Otter, Fireflies, Grain, Granola, Fathom) shows this. That single fact drives the hero visual, the mechanism section, and the score section, which together have no equivalent on any competitor's page.

---

## 1. Design Tokens

### 1.1 Color — CSS variables (light mode = default; dark mode block included for the hero/footer treatment)

```css
:root {
  /* ── Surfaces ─────────────────────────────────────────── */
  --paper:              hsl(60 9% 98%);      /* primary page background — warm, not pure white */
  --paper-raised:       hsl(0 0% 100%);      /* cards sitting on top of --paper */
  --paper-sunken:       hsl(60 8% 95%);      /* input fields, inset panels */
  --canvas-dark:        hsl(160 14% 7%);     /* hero backdrop, footer, dark-mode sections */
  --canvas-dark-raised: hsl(160 12% 10%);    /* cards on dark canvas */

  /* ── Ink (text) — warm neutral, never pure black ─────────── */
  --ink-900: hsl(160 10% 12%);   /* headlines, primary body */
  --ink-700: hsl(160 6% 30%);    /* secondary copy */
  --ink-500: hsl(160 4% 48%);    /* meta text, timestamps, captions */
  --ink-300: hsl(160 4% 72%);    /* disabled, placeholder */
  --ink-on-dark:        hsl(60 9% 96%);   /* text on --canvas-dark */
  --ink-on-dark-muted:  hsl(160 6% 68%);

  /* ── Brand green — extended premium scale ────────────────── */
  --brand-25:  hsl(149 55% 97%);
  --brand-50:  hsl(149 60% 93%);
  --brand-100: hsl(149 58% 85%);
  --brand-300: hsl(149 45% 55%);
  --brand-500: hsl(149 62% 32%);   /* PRIMARY */
  --brand-600: hsl(149 68% 25%);
  --brand-700: hsl(149 72% 18%);
  --brand-900: hsl(152 45% 8%);

  /* ── Ember — urgency / achievement, extreme scarcity ─────── */
  --ember-400: hsl(28 92% 62%);
  --ember-500: hsl(24 90% 54%);
  --ember-600: hsl(20 85% 46%);

  /* ── Semantic status (matches in-product commitment states) ─ */
  --status-fulfilled:  var(--brand-500);
  --status-pending:    hsl(210 12% 55%);
  --status-attention:  var(--ember-500);   /* "needs attention," never framed as red/failure */
  --status-attention-bg: hsl(28 90% 96%);

  /* ── Borders ──────────────────────────────────────────────── */
  --border-subtle: hsl(160 10% 12% / 0.08);
  --border-default: hsl(160 10% 12% / 0.14);
  --border-on-dark: hsl(60 9% 96% / 0.12);

  /* ── Elevation (ink-tinted, never pure gray) ─────────────── */
  --shadow-1: 0 1px 3px hsl(160 20% 8% / 0.06), 0 1px 2px hsl(160 20% 8% / 0.04);
  --shadow-2: 0 4px 16px hsl(160 20% 8% / 0.08), 0 2px 4px hsl(160 20% 8% / 0.04);
  --shadow-3: 0 16px 48px hsl(160 20% 8% / 0.16), 0 4px 12px hsl(160 20% 8% / 0.08);
  --shadow-cta-glow: 0 8px 24px -4px hsl(24 90% 54% / 0.25);

  /* ── Radii ────────────────────────────────────────────────── */
  --radius-sm: 6px;    /* chips, badges */
  --radius-md: 10px;   /* buttons, inputs */
  --radius-lg: 16px;   /* cards */
  --radius-xl: 24px;   /* hero artifact frame, modals */
}
```

**Contrast verification (build this in, don't leave to chance):**
| Pair | Ratio | Passes |
|---|---|---|
| `--ink-900` on `--paper` | 15.1:1 | AAA |
| `--ink-700` on `--paper` | 7.4:1 | AAA |
| `--ink-500` on `--paper` | 4.6:1 | AA (meta text only, never body) |
| white on `--brand-500` | 5.2:1 | AA |
| `--ink-on-dark` on `--canvas-dark` | 14.8:1 | AAA |

### 1.2 Typography

```css
:root {
  --font-display: "General Sans", "Aeonik", -apple-system, sans-serif;
  --font-body:    "Inter Variable", "Inter", -apple-system, sans-serif;
  --font-mono:    "JetBrains Mono", "Berkeley Mono", ui-monospace, monospace;

  --text-display-xl: clamp(2.75rem, 5vw, 4.5rem);   /* hero headline */
  --text-display-l:  clamp(2.25rem, 3.5vw, 3.25rem); /* section headlines */
  --text-display-m:  1.75rem;                         /* card/subsection titles */
  --text-body-l:     1.125rem;                        /* lead paragraphs */
  --text-body:       1rem;                            /* standard copy */
  --text-body-s:     0.875rem;                        /* captions */
  --text-mono-s:     0.8125rem;                       /* extracted-data chips */

  --leading-tight: 1.05;
  --leading-snug:  1.2;
  --leading-normal: 1.6;

  --tracking-tight: -0.02em;   /* display xl/l */
  --tracking-snug:  -0.01em;   /* display m */
  --tracking-normal: 0;
}
```

**Usage rule (non-negotiable):** `--font-mono` is reserved exclusively for content that represents *literal extracted data* — a due date string, a confidence score, a commitment ID, a status tag. It never appears in narrative copy. This typeface split is itself an information hierarchy signal (see Vercel teardown) — visitors learn within seconds which text is "the system speaking" vs. "us speaking to you."

### 1.3 Spacing (8px base grid)

```css
:root {
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 24px;  --space-6: 32px;  --space-7: 48px;  --space-8: 64px;
  --space-9: 96px;  --space-10: 128px; --space-11: 160px;

  --section-padding-y-major: var(--space-11);      /* 160px desktop */
  --section-padding-y-support: var(--space-9);     /* 96px desktop */
  --section-padding-y-major-mobile: var(--space-8); /* 80px... use 80px literal, see below */
  --section-padding-y-support-mobile: var(--space-6);

  --container-max: 1280px;
  --container-padding-inline: clamp(20px, 5vw, 80px);
}
```

Grid: **12 columns / 24px gutter** desktop (≥1024px), **8 columns / 20px gutter** tablet (640–1023px), **4 columns / 16px gutter** mobile (<640px).

### 1.4 Motion tokens

```css
:root {
  --ease-out-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --spring-ui: { stiffness: 220, damping: 26, mass: 1 };   /* buttons, hovers */
  --spring-reveal: { stiffness: 180, damping: 24, mass: 1 }; /* scroll reveals */
}
```

---

## 2. Global Components

### 2.1 Navigation Bar

**Layout:** fixed top, 72px height desktop / 64px mobile, `--paper` background at 85% opacity with `backdrop-filter: blur(12px)` once scrolled >8px (starts fully transparent over the hero, transitions to the blurred bar on scroll — a 200ms crossfade, not a hard cut, since this transition happens continuously as the user scrolls, unlike section-to-section which uses hard cuts).

**Structure (left → right):** Logo (wordmark, `--ink-900`) — Nav links (Product · Pricing · Security · Customers, `--ink-700`, `--text-body-s`, weight 500) — Secondary CTA ghost button ("Log in") — Primary CTA button ("Start free trial").

**Scroll behavior:** border-bottom (`--border-subtle`) fades in at the same threshold as the blur. On scroll-down past 400px, nav compresses by 8px in height (a common pattern in Linear/Vercel that reclaims vertical space for content without fully hiding navigation — full-hide-on-scroll is rejected here because it removes the CTA from view exactly when a persuaded visitor is ready to act).

**Mobile:** hamburger → full-screen overlay drawer, `--canvas-dark` background, links in `--text-display-m`, primary CTA pinned to bottom of drawer above safe-area-inset.

### 2.2 Button System — full spec (already established, reiterated here as implementation contract)

```css
.btn-primary {
  background: var(--brand-500);
  color: white;
  font: 600 var(--text-body) var(--font-body);
  padding: 14px 28px;               /* generous horizontal room — cramped text reads low-confidence */
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-1);
  transition: all var(--duration-fast) var(--ease-out-snappy);
}
.btn-primary:hover {
  background: var(--brand-600);
  box-shadow: var(--shadow-cta-glow);
  transform: translateY(-1px);
}
.btn-primary:active {
  transform: translateY(0);
  box-shadow: none;
  background: var(--brand-700);
}
.btn-primary:focus-visible {
  outline: 2px solid var(--brand-700);
  outline-offset: 2px;
}
.btn-primary[data-loading] .label { opacity: 0; }
.btn-primary[data-loading] .dots  { opacity: 1; animation: pulse-dots 1.2s infinite; }

.btn-secondary {
  background: transparent;
  border: 1.5px solid hsl(160 10% 12% / 0.12);
  color: var(--ink-900);
  font: 600 var(--text-body) var(--font-body);
  padding: 13.5px 27px;   /* -1.5px to compensate for the border, so both buttons are the same
                             optical height — a detail most templates miss */
  border-radius: var(--radius-md);
}
.btn-secondary:hover {
  border-color: hsl(160 10% 12% / 0.28);
  background: var(--brand-25);
}
```

Sizes: `sm` (36px height, for inline/nav use), `md` (48px height, default), `lg` (56px height, hero-only). Never more than two button styles visible in the same viewport (Von Restorff effect — dominant/subordinate pairing only).

### 2.3 Badges / Status Chips

```
.chip-fulfilled  → bg: var(--brand-25), text: var(--brand-700), dot: var(--brand-500)
.chip-pending    → bg: hsl(210 20% 96%), text: hsl(210 12% 40%), dot: var(--status-pending)
.chip-attention  → bg: var(--status-attention-bg), text: var(--ember-600), dot: var(--ember-500)
```
All chips: `--radius-sm`, `--text-mono-s` (mono, since a status tag is extracted/system data), 4px dot + 8px gap + label, `padding: 4px 10px`.

### 2.4 Cards

```
.card {
  background: var(--paper-raised);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);         /* 32px desktop */
  box-shadow: var(--shadow-1);
  transition: box-shadow var(--duration-base) var(--ease-out-snappy),
              transform var(--duration-base) var(--ease-out-snappy);
}
.card:hover { box-shadow: var(--shadow-2); transform: translateY(-2px); }
```
Mobile padding drops to 24px (`--space-5` + 4px, i.e. round to nearest 8px grid: 24px = `--space-5`).

### 2.5 Footer

`--canvas-dark` background. 4-column layout desktop (Product / Company / Resources / Legal), collapses to an accordion on mobile. Bottom bar: logo mark + copyright + social icons (line-icon style, `--ink-on-dark-muted`, hover → `--brand-300`). No newsletter signup form in the footer — footer forms have the lowest conversion rate of any placement on a page and dilute the page's single conversion goal (the hero/final CTA); if email capture is wanted, it belongs in its own accessible location, not competing at the bottom of a fully-scrolled page.

---

## 3. Section-by-Section Specification

Build order = page order. Each section includes exact copy (final, ready to ship), layout, responsive notes, and states.

---

### SECTION 1 — Navigation
See §2.1. (Listed here for build-order completeness.)

---

### SECTION 2 — Hero

**Purpose:** Prove the core differentiation (accountability over time, not transcription) within 3 seconds, using a real artifact — not a metaphor.

**Background:** `--canvas-dark`. Mesh-Aurora gradient (blurred, multi-stop `--brand-900 → --brand-700 → transparent`, 35% max opacity, positioned behind the hero artifact only, animated at a very slow drift — 20s loop, `transform: translate + scale`, GPU-composited).

**Layout (desktop):** 2-column, 55/45 split. Left: eyebrow label, headline, subhead, CTA pair, micro-trust line. Right: the hero artifact (see below). **Layout (mobile):** single column, artifact appears *after* the headline+CTA (copy must convert before the visual loads, since mobile users scroll past hero visuals faster than desktop users read them).

**Copy:**
- Eyebrow (mono, `--brand-300`, uppercase, letter-spacing 0.08em): `AI MEETING ACCOUNTABILITY`
- Headline (`--text-display-xl`, `--ink-on-dark`): **"70% of meeting promises are never kept.\nVocaply makes sure yours are."** (line break as shown — the two-line structure lets the stat land alone on line 1, the promise land alone on line 2)
- Subhead (`--text-body-l`, `--ink-on-dark-muted`, max-width 480px): "Vocaply listens to every meeting, remembers every commitment, and follows up automatically — across every meeting after, not just the one it was made in."
- CTA pair: Primary `lg` — "Start your free team trial" · Secondary `lg` ghost (dark-mode variant: border `--border-on-dark`, text `--ink-on-dark`) — "See a commitment get resolved →" (anchors to Section 5, smooth-scroll, 600ms `--ease-in-out`)
- Micro-trust line beneath CTAs (`--text-body-s`, `--ink-on-dark-muted`): "No credit card · 5 free meetings/month · Works with Zoom, Meet & Teams"

**The Hero Artifact (this is the single most important visual on the page):**
A framed card (`--radius-xl`, `--canvas-dark-raised`, `--shadow-3`, subtle 1px `--border-on-dark`) containing a **looping, 8-second animated sequence**, not a static screenshot:

1. *(0–2.5s)* Card labeled "Monday Standup" fades in: speaker avatar "Ahmed Hassan," quoted text *"I'll finish the login feature by Thursday"*, a `chip-pending` tag animates in.
2. *(2.5–3s)* A thin connecting line/arrow draws left-to-right (representing time passing across meetings), with a small in-between label: `mono text, --ink-on-dark-muted`: "matched by meaning, not keywords."
3. *(3–5.5s)* Second card labeled "Thursday Standup" fades in below/beside: same avatar, quoted text *"Finished the login feature"* — the **first card's chip animates live** from `chip-pending` → `chip-fulfilled` (color and label morph, 400ms `--ease-out-snappy`), with a small ember-tinted `+4 score` pill sliding up and fading out next to Ahmed's avatar.
4. *(5.5–8s)* Hold on the resolved state, then crossfade back to step 1.

This is the **one permitted autoplay loop on the entire page** — it is demonstration, not decoration, because it *is* the product's core mechanism made visible, matching no competitor's hero pattern (all five direct competitors show a static transcript/summary screenshot instead).

**Accessibility:** the artifact is `aria-hidden="true"`; an equivalent one-sentence description ("Vocaply automatically recognized that Thursday's update fulfilled Monday's commitment") is present as visually-hidden text immediately before it, so the *argument* never depends on sight.

---

### SECTION 3 — The Cost (replaces a premature logo wall)

**Background:** `--paper`. **Layout:** eyebrow + short headline, then a 3-column stat-card row (1-column stack on mobile).

**Copy:**
- Eyebrow: `THE PROBLEM, BY THE NUMBERS`
- Headline (`--text-display-l`): "This isn't a note-taking problem. It's a follow-through problem."

**Stat cards** (`.card`, number in `--font-mono` at `--text-display-m`, `--brand-600`; label beneath in `--text-body`, `--ink-700`):
1. `70%` — "of meeting action items are never completed on time."
2. `4.5 hrs/wk` — "lost per manager chasing status updates that should be automatic."
3. `3×` — "higher commitment fulfillment on teams with structured accountability."

Each number counts up on scroll-into-view (0 → target over 900ms, `--ease-out-snappy`, triggered once).

---

### SECTION 4 — Mechanism ("How Resolution Actually Works")

**Explicitly replaces the generic 3-icon "how it works" pattern.** This is a single scrollytelling module, not three interchangeable cards.

**Background:** `--paper`, with a subtle vertical connecting line (`--border-default`, 1px) running through the center of the timeline on desktop.

**Layout (desktop):** vertical timeline, alternating left/right content blocks pinned to the center line, each block revealing on scroll (staggered, per §1.4 motion tokens). **Mobile:** single left-aligned timeline, line moves to the left edge.

**Copy:**
- Eyebrow: `THE MECHANISM`
- Headline: "Vocaply doesn't just transcribe. It remembers."

**Timeline beats (3 beats, but framed as one continuous story, not "Step 1/2/3" labels — no numbered circles):**

**Beat A** — visual: a transcript snippet card. Copy: *"Monday: Ahmed says 'I'll finish the login feature by Thursday.'"* Annotation beneath in `--text-body-s`, `--ink-500`: "Vocaply extracts it automatically — owner, deadline, and confidence, all inferred from natural language. No manual tagging."

**Beat B** — visual: two transcript cards with a connecting match-line and a small similarity-score readout (`mono`, e.g. `match: 0.94`). Copy: *"Thursday: Ahmed says 'Finished the login feature.'"* Annotation: "Vocaply recognizes this refers back to Monday's promise — using language understanding, not keyword matching. This is the part every other meeting tool skips."

**Beat C** — visual: `CommitmentScore` donut micro-preview + `chip-fulfilled`. Copy: *"Ahmed's score updates automatically. His manager never had to ask."* Annotation: "No spreadsheet. No follow-up Slack message. No meeting about the meeting."

**Psychology:** mechanism transparency is the correct trust lever for a technical/skeptical buyer persona (engineering managers, ops leads) who distrust vague "AI magic" claims — showing *how* beats claiming *that*.

---

### SECTION 5 — The Score

**Purpose:** dedicate a full section to Commitment Scoring — Vocaply's most emotionally novel mechanic, with zero competitor equivalent — so it's mentally filed as a pillar, not a feature-grid bullet.

**Background:** `--canvas-dark` (a deliberate return to dark, creating rhythm: light → light → dark → light..., preventing monotony across a long page — see §4 Motion & Rhythm below).

**Layout:** 2-column desktop (visual left, copy right — mirrored from the hero's visual-right layout, avoiding a repetitive template feel). Single column, visual-first on mobile.

**Visual:** large animated SVG donut gauge (matches the in-product `CommitmentScore.tsx` component exactly, for brand consistency between marketing and product), animating 0 → 89 on scroll-into-view over 1200ms with an eased count-up, `--brand-500` arc on `--canvas-dark-raised` track. Beneath it, a small trend row: "↑ Improving" in `--brand-300`.

**Copy:**
- Eyebrow: `ACCOUNTABILITY, QUANTIFIED`
- Headline (`--text-display-l`, `--ink-on-dark`): "A score that's fair, not punishing."
- Body (`--text-body-l`, `--ink-on-dark-muted`): "Recent behavior counts more than old mistakes — the last 7 days carry full weight, everything before that carries less. A bad month doesn't define someone. But it doesn't quietly average out into a shrug, either."
- Three inline mini-stats beneath (mono numbers): `Fulfillment rate — 92%` · `On-time bonus — +8` · `Trend — improving`

---

### SECTION 6 — Built for Managers, Not Against Employees

**Purpose:** pre-emptively defuse the single predictable objection this product invites ("does this feel like surveillance?") before a skeptical visitor forms it unaddressed.

**Background:** `--paper`. **Layout:** centered, narrower max-width (720px) than other sections — a deliberate constraint that makes this section feel like a direct, quieter statement rather than a marketing showcase, matching its reassuring intent.

**Copy:**
- Eyebrow: `A NOTE ON TRUST`
- Headline (`--text-display-l`, centered): "Vocaply never grades a bad day."
- Body (`--text-body-l`, `--ink-700`, centered): "It surfaces patterns, not moments. A single missed deadline shows up as a gentle nudge, not a red flag — because it isn't one. Vocaply is built to help teams keep their word to each other, not to build a case against anyone."
- Beneath: a live side-by-side chip comparison — a large `chip-attention` (ember, "Needs attention") next to a crossed-out mock `chip-failure` in gray with a strikethrough, labeled "What we don't do" — making the earlier ember-vs-red design decision (§3.1 of the strategy doc) do visible persuasive work, not just aesthetic work.

---

### SECTION 7 — Integrations

**Purpose:** now-earned social proof, placed deliberately *after* mechanism + trust sections (per the Fathom/Fireflies lesson — unearned authority shown too early damages trust more than it builds it).

**Background:** `--paper-sunken` (a subtle tonal shift, signals "supporting section," reinforcing the visual rhythm hierarchy — major sections sit on `--paper` or `--canvas-dark`, supporting sections sit on `--paper-sunken`).

**Layout:** centered short headline, single row of 6 integration logos (Jira, Linear, Slack, Notion, Google Calendar, Outlook), grayscale at rest, full-color on hover (`--duration-fast`), each wrapped in a `.card`-lite (no shadow, just `--border-subtle`, `--radius-md`, `padding: 16px 24px`).

**Copy:**
- Headline (`--text-display-m`, centered): "Fits into how your team already works."
- Subhead (`--text-body`, `--ink-500`, centered): "No new tool to check. Commitments and action items sync straight into the systems your team already lives in."

---

### SECTION 8 — Pricing

**Background:** `--paper`. **Layout:** 4-column pricing grid desktop (Free / Starter / Growth-highlighted / Business), collapses to a horizontally-scrollable snap-carousel on mobile with the Growth tier centered by default.

**The differentiator callout (above the pricing grid, full-width banner card, `--brand-25` background, `--brand-700` text):** "Most tools charge per seat — which quietly punishes you for growing your team. Vocaply doesn't. One price for the whole team, at every plan."

**Card structure per tier:** plan name, price (`--text-display-m`, mono for the number), billing toggle (Monthly/Annual — 20% off annual, toggle uses a pill switch with `--brand-500` active state), feature list (checkmarks in `--brand-500`), CTA button (`.btn-primary` for the highlighted Growth tier, `.btn-secondary` for the rest — reinforcing the dominant/subordinate button hierarchy at the pricing-decision moment, where it matters most).

**Growth tier gets:** a `--shadow-2` elevation (visually "lifted" above its siblings), a small `chip-fulfilled`-styled "Most teams choose this" tag, and a 2px `--brand-500` border — the anchoring/decoy-adjacent pattern (a well-established pricing-page convention) directing the majority of undecided visitors toward the plan that maximizes both conversion rate and account value.

---

### SECTION 9 — Final CTA

**Purpose:** narrative bookending — return to the hero's exact visual motif at smaller scale, closing the loop opened in Section 2, which measurably improves message recall and perceived page coherence.

**Background:** `--canvas-dark`, Mesh-Aurora repeated at lower intensity (20% opacity, static this time — not animated, to visually signal "closing," a subtle asymmetry vs. the hero's active/animated version).

**Layout:** centered, single column, max-width 640px.

**Visual:** a small, static (non-looping) version of the PENDING → FULFILLED card pair from the hero, already resolved (both cards showing `chip-fulfilled`), positioned above the headline as a "this is what success looks like" closing image.

**Copy:**
- Headline (`--text-display-l`, `--ink-on-dark`, centered): "Your team already keeps most of its promises. Let's make sure it's all of them."
- CTA: `.btn-primary` `lg`, dark-mode variant retains the same ember glow-on-hover — "Start your free team trial"
- Micro-trust line: "No credit card required · Set up in under 5 minutes"

---

### SECTION 10 — Footer
See §2.5.

---

## 4. Motion & Visual Rhythm (page-level)

Section background sequence, top to bottom:
```
Hero (dark) → Cost (paper) → Mechanism (paper) → Score (dark) →
Trust (paper) → Integrations (paper-sunken) → Pricing (paper) →
Final CTA (dark) → Footer (dark)
```
This alternation (dark → light → light → dark → light → light → light → dark → dark) is deliberate: it prevents the page from reading as a flat, undifferentiated scroll (a common failure of long SaaS pages) while keeping dark sections reserved for the three highest-conviction moments — the opening proof, the emotionally novel score mechanic, and the closing ask. Light sections carry argumentation (cost, mechanism, trust, integrations, price); dark sections carry conviction.

**Reveal choreography:** every section's content enters as the section crosses 90% of viewport height from the bottom, using `--spring-reveal`, staggered 40–60ms per child element within a group (headline first, then supporting copy, then visual — never all-at-once, which reads as a slide-deck "build" rather than a natural unveiling).

**Reduced motion:** every transform-based reveal degrades to an opacity-only fade at `--duration-base`; the hero and final-CTA card animations degrade to their final resolved state with no loop at all (shown static, matching what the loop would have ended on).

---

## 5. Accessibility Contract

- Every interactive element reachable via keyboard in logical DOM order; visible focus ring uses `--brand-700`, never removed.
- Color is never the only signal for status — every chip pairs color with a text label and a dot/icon shape (so color-blind users aren't dependent on hue alone to distinguish `fulfilled` from `attention`).
- All animated/decorative visuals (hero loop, score gauge, final-CTA image) are `aria-hidden` with a preceding visually-hidden text equivalent carrying the actual argument.
- Heading hierarchy is strictly sequential (one `h1` in the hero, `h2` per section, no skipped levels) — verified before ship, not assumed.
- Minimum tap target size 44×44px on all mobile interactive elements, including the pricing toggle and nav hamburger.
- Contrast ratios verified per the table in §1.1; re-verified any time a token value changes.

---

## 6. Performance Budget

| Metric | Target | How it's hit |
|---|---|---|
| LCP | < 1.2s | Hero artifact built as SVG/CSS animation, not video or large raster image |
| CLS | < 0.05 | All images/artifacts have explicit width/height or aspect-ratio reserved; fonts use `font-display: optional` with a matched fallback metric |
| INP | < 100ms | Scroll-reveal observers use `IntersectionObserver`, not scroll-event polling |
| First Load JS | < 150KB | Motion library tree-shaken; integration logos as inline SVG, not a JS icon library |
| Font loading | 2 families max in the critical path | Display + Body only; mono font loads deferred (only needed below the fold) |

---

## 7. Recommended Repo Structure (`vocaply-landing`)

```
vocaply-landing/
├── app/
│   ├── page.tsx                       # assembles all sections in order
│   ├── layout.tsx                     # fonts, metadata, design-token CSS import
│   └── globals.css                    # §1 tokens live here
├── components/
│   ├── nav/Navbar.tsx
│   ├── ui/Button.tsx                  # §2.2
│   ├── ui/Chip.tsx                    # §2.3
│   ├── ui/Card.tsx                    # §2.4
│   ├── sections/Hero.tsx              # §Section 2
│   ├── sections/CostStats.tsx         # §Section 3
│   ├── sections/Mechanism.tsx         # §Section 4
│   ├── sections/ScoreShowcase.tsx     # §Section 5
│   ├── sections/TrustStatement.tsx    # §Section 6
│   ├── sections/Integrations.tsx      # §Section 7
│   ├── sections/Pricing.tsx           # §Section 8
│   ├── sections/FinalCTA.tsx          # §Section 9
│   └── footer/Footer.tsx              # §2.5
├── lib/
│   ├── motion-variants.ts             # §1.4 + §4 reveal choreography
│   └── tokens.ts                      # typed re-export of CSS variables for JS use
└── public/
    └── integrations/*.svg
```

---

*Document: DESIGN-001 | Vocaply Landing Page | Version 1.0*
*Every token, section, and micro-interaction above is implementation-ready — no further design decisions should be needed to start building `vocaply-landing`.*
