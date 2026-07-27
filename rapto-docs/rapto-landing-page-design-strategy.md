# Rapto — World-Class Landing Page Design Strategy
> Competitive Teardown + Design System + Section Architecture
> Prepared as Principal Designer deliverable | For the standalone `vocaply-landing` repo
> Document: DESIGN-STRATEGY-001 | Version 1.0

---

## 0. How to read this document

This is not a mood board. Every recommendation below follows one rule: **if I can't explain the psychology behind it, it doesn't go on the page.** The document is split into four parts:

1. **Competitive teardown** — what the award-winning SaaS category leaders do right, and what our direct competitors (Otter, Fireflies, Grain, Granola, Fathom) do wrong, specifically.
2. **Positioning lock-in** — the one sentence the entire page must prove, derived from Vocaply's actual differentiation (accountability, not transcription).
3. **Design system** — color, type, spacing, elevation, motion, and a genuinely premium button system, evolving (not replacing) the existing brand palette.
4. **Section-by-section architecture** — replacing generic filler sections with sections that carry commercial weight, each mapped to a psychological principle and a conversion job.

---

## PART 1 — Competitive Teardown

### 1.1 The category leaders (what "world-class" actually means here)

I'm not going to describe these as "clean and modern" — that tells you nothing actionable. Here is what each one does *mechanically* that we should steal the underlying principle from (never the surface look):

**Linear**
- Dark canvas (near-black, not pure black — `#08090A`–`#0C0D0F` range) with **one** saturated accent used with extreme scarcity. The restraint *is* the premium signal — a page that uses 8 colors reads as a startup; a page that uses 1 color with 40 shades of gray reads as a company that has its act together.
- Typography does the hierarchy work, not color. Headlines are set tight (-2% to -4% tracking) at large sizes with a grotesk/sans that has almost no personality — because the *product* is supposed to have the personality, not the marketing site.
- Every section transition is a **hard cut with a subtle vertical rule**, not a soft fade. This signals precision and confidence — a company selling "speed and rigor" cannot have a soft, bouncy landing page. Form matches claim.
- **Principle borrowed:** Restraint reads as competence (this is the **Aesthetic-Usability Effect** combined with a scarcity heuristic on color — the fewer colors used with intent, the more each one is trusted).

**Stripe**
- The gradient mesh (soft, multi-hue, blurred blob gradients behind glass-morphic cards) exists *only* behind data visualizations and code blocks — never behind body copy. Stripe never lets a gradient reduce text contrast below 7:1. This is the tell of a team that treats accessibility as a design constraint, not an afterthought bolted on later.
- Every claim on the Stripe homepage is backed by a live-feeling artifact next to it (a chart, a snippet of real API JSON, a dashboard fragment) — never a stock illustration of "a person pointing at a laptop." This is **social proof through specificity**: abstract claims feel like marketing, concrete artifacts feel like a product you can already picture using.
- Numbers are animated on scroll but only count up **once**, and only when they are load-bearing to the argument (e.g., "$X processed"), never decoratively.
- **Principle borrowed:** Show the artifact, not the metaphor. Every abstract benefit ("save time") must be paired with a literal on-screen object (a commitment card transitioning from PENDING → FULFILLED).

**Notion**
- Uses warmth deliberately: off-white paper background (`#FFFFFF` is almost never used — it's closer to `#FBFBFA`), hand-drawn-adjacent illustration accents, and a serif/humanist pairing in places. This is a conscious counter-positioning against "cold enterprise software" — Notion wants to feel like a notebook, not a database.
- **Principle borrowed:** Paper-tone backgrounds instead of stark white reduce perceived clinical/cold feeling and reduce eye strain (lower luminance contrast against black text = less halation), which matters enormously for a product about meetings and commitments — a domain that is inherently about *people*, not just data.

**Vercel**
- Monospace typography used surgically for anything representing "the system speaking" (build logs, deploy status, code) vs. a humanist sans for anything representing "we speaking to you" (headlines, body). This typographic split is itself an information-architecture signal — the visitor's eye learns within 3 seconds which typeface means "marketing" and which means "real product," which builds trust faster than any headline could.
- **Principle borrowed:** Typeface-as-semantic-signal. We will do the same: a monospace/mono-adjacent treatment for anything that represents *extracted data* (a commitment string, a due date, a confidence score) vs. a warm sans for narrative copy.

**Framer**
- Motion is the entire value proposition made visible — but critically, animations are **physically plausible** (spring physics with real mass/damping, never linear ease or bounce-for-bounce's-sake) and **always respond to scroll position**, never autoplay-and-forget. This makes the animation feel *controlled by the user* rather than performed *at* the user.
- **Principle borrowed:** Scroll-linked motion (not autoplay loops) respects the user's sense of agency (a core tenet of Self-Determination Theory in UX) and dramatically reduces the "flashy but annoying" failure mode most SaaS sites fall into.

**Figma**
- Cursor/multiplayer motifs (colored cursor dots, live collaboration cues) are used as *literal proof* of the product's core promise (real-time collaboration) rather than illustrated abstractly. For Vocaply, the equivalent literal proof is a **live commitment status changing color** or a **score ticking up in real time** — not a generic "teamwork" illustration.

**Arc Browser**
- Personality-forward color (saturated purples/oranges) is allowed *because* the product itself is playful and personal. This is the exception that proves the rule: bold color only works when it's honest about what the product is. A B2B accountability tool copying Arc's palette directly would feel dishonest — we need boldness that reads as *serious*, not *fun*, so our accent intensity will sit between Linear's restraint and Arc's boldness, not at Arc's level.

**Cross-cutting pattern across all seven:** none of them use a stock photo of a person. None of them use a generic "3 simple steps" icon row with identical circle-icon-title-paragraph blocks repeated three times. That pattern is the single biggest tell of a template-generated, non-premium SaaS page — and it is explicitly banned from this project.

---

### 1.2 Direct competitor teardown — Otter.ai, Fireflies.ai, Grain, Granola, Fathom

I need to be blunt here: **none of these five pages are actually design benchmarks.** They are functional, conversion-adequate marketing sites built by growth teams optimizing for paid-ad landing consistency, not by principal designers building a brand moat. That is actually good news for us — it means the *bar to differentiate on craft alone* is lower than it looks, but the *bar to differentiate on positioning* is where the real fight is, because these products all describe themselves almost identically ("AI notetaker," "never take notes again," "meeting summaries in seconds").

**Otter.ai**
- Design pattern: bright gradient-blob hero, product screenshot inside a browser chrome mock, logo wall directly under the fold, then a repetitive feature-icon grid.
- Failure: the page sells *transcription accuracy* as the hero claim — a commodity in 2026 (every tool in the category now claims 90%+ accuracy, per the reviews above). Leading with a commoditized claim is the single biggest strategic weakness in the category. It also means Otter's whole page reads as "a slightly better version of the exact same thing," which trains visitors to comparison-shop on price, not to trust the brand.
- What to take: their real-time collaborative-notes UI mock is a genuinely good "show the artifact" moment — worth emulating the *format* (an interactive-feeling product frame) with our own content (a commitment tracker, not a notepad).

**Fireflies.ai**
- Design pattern: dense, integration-logo-heavy (70+ logos is literally a stated differentiator), CRM-dashboard screenshots, sales-ops-flavored color usage (blues/purples associated with "enterprise software," not warmth).
- Failure: the page is optimized for a sales/RevOps buyer persona and reads coldly transactional — appropriate for their actual ICP (sales teams), but it means visually copying Fireflies would misalign Vocaply with its actual audience (managers and teams who care about *trust and follow-through*, not pipeline reporting).
- What to take: the "integrations as trust signal" pattern (a grid of recognizable tool logos = "this fits into my existing stack, low switching risk") is legitimate and psychologically sound (reduces perceived adoption friction) — we should use it, but smaller and later in the page, not as the hero-adjacent flex it is for Fireflies.

**Grain**
- Design pattern: video-clip-forward, colorful highlight-reel thumbnails, a "moments" visual metaphor (scissors/clip icons), social/shareable framing.
- Failure: Grain's entire visual language is built around *video clips as the product*, which doesn't transfer to Vocaply at all — we're not a highlight-reel product. But it's instructive: Grain's page is actually the most visually distinctive of the five, precisely *because* its hero visual is literally its product's output, not a generic dashboard screenshot. That reinforces the "show the real artifact" principle from Part 1.1.
- What to take: nothing visual. The *lesson* is that distinctiveness comes from visualizing your specific differentiator, not a generic dashboard.

**Granola**
- Design pattern: the calmest and most "designed" of the five — soft off-white background, a minimal note-card visual, understated copy tone ("notes that sound like you"), almost no gradient/blob noise. Closest in spirit to a premium SaaS aesthetic among direct competitors.
- Failure (strategically, not visually): Granola's entire pitch is *absence* — "no bot, invisible, gets out of your way." That's a strong, singular wedge, but it is the opposite of Vocaply's job: Vocaply's value is *presence* — the system actively tracking, alerting, and holding people accountable *after* the meeting ends. If we copy Granola's quiet, ambient tone, we'd be undermining our own core promise (active accountability, not passive capture).
- What to take: the restraint and the paper-tone background are worth adopting as *craft* — but our copy tone must stay assertive and outcome-oriented ("nothing falls through the cracks"), not ambient and quiet like Granola's.

**Fathom**
- Design pattern: friendly, rounded, bright-purple/violet brand color, badge/award-driven social proof (G2 ratings, "#1 rated"), heavy use of star ratings and review counts above the fold.
- Failure: leans hard on third-party validation (G2 badges, review counts) as the primary trust mechanism rather than product-specific proof. This works when you're the clear market leader by review volume (which Fathom currently is, per the search data — 6,000+ G2 reviews) — it does **not** work for a challenger brand like Vocaply with no review history yet. Copying this pattern before we've earned the reviews would expose an empty claim.
- What to take: nothing structurally; a useful negative lesson — **don't lead with social proof we haven't earned yet.** Vocaply's early trust signals need to come from *specificity and mechanism transparency* (showing exactly how cross-meeting resolution works), not borrowed authority.

### 1.3 The single biggest opportunity this teardown reveals

Every one of the five direct competitors' landing pages is built around **the meeting** as the hero moment (a transcript, a summary, a clip). **Not one of them visualizes what happens after the meeting ends.** That gap is exactly Vocaply's product wedge (cross-meeting memory, commitment scoring, accountability over time — see HLD §2 "Why Vocaply Wins"). This means our hero visual should not be a transcript or a summary card — it should be a **commitment's lifecycle across two meetings**, something literally no competitor page shows, because none of their products do it. This single decision is worth more to conversion than any color or font choice in this document.

---

## PART 2 — Positioning Lock-In

Every section on the page must, directly or indirectly, prove this sentence:

> **"Vocaply is the only meeting tool that remembers what was promised — and makes sure it happens."**

Test for every section before it ships: *does this section make that sentence more believable, or is it decorative?* If decorative, cut it. This is why the brief explicitly rejects a generic "3-step how it works" section — a 3-step icon row proves nothing; it's furniture. Every section below is designed to be *evidence*, not furniture.

---

## PART 3 — Design System

### 3.1 Color — evolving the existing palette, not replacing it

The current tokens (from the production architecture doc) are a solid foundation: a brand green anchored at `hsl(149 60% 28%)`. Green is the correct hue psychologically — it is universally coded as "done / good / go / growth," which is precisely the emotional payoff of a fulfilled commitment. **We keep this hue as the core brand identity.** But the current system is too thin to feel premium: one green scale, pure white background, no warmth, no secondary accent for the "achievement" moments. Here is the evolution:

#### Backgrounds — introduce softness
```
--paper:            hsl(60 9% 98%)     /* replaces pure #FFFFFF for large surfaces */
--paper-raised:      hsl(0 0% 100%)     /* true white reserved for cards sitting ON paper */
--canvas-dark:       hsl(160 14% 7%)    /* near-black w/ a whisper of green, for dark sections */
--canvas-dark-raised: hsl(160 12% 10%)
```
**Why:** Pure `#FFFFFF` against pure black text produces the highest possible contrast ratio, which sounds good on paper but in practice causes halation/glare on large text blocks and reads as "cold enterprise dashboard" (see Notion teardown, §1.1). A warm, barely-there paper tone (60° hue = warm neutral, 9% saturation = nearly imperceptible) softens the page exactly enough to feel human without sacrificing the accessibility contrast ratio for body text (still exceeds WCAG AA against near-black ink at 15.5:1).

#### Brand green — extend to a full premium scale
```
--brand-25:  hsl(149 55% 97%)   backgrounds, success-state tints
--brand-50:  hsl(149 60% 93%)   hover backgrounds, badges
--brand-100: hsl(149 58% 85%)   borders on tinted surfaces
--brand-300: hsl(149 45% 55%)   secondary icons, illustration line work
--brand-500: hsl(149 62% 32%)   PRIMARY — buttons, links, active states (slightly brighter than the
                                 original 28% lightness — the old value skewed muddy on dark mode tests)
--brand-600: hsl(149 68% 25%)   hover/pressed states
--brand-700: hsl(149 72% 18%)   text-on-tint, high-contrast accents
--brand-900: hsl(152 45% 8%)    dark-mode surface tint
```

#### The new accent — Ember (achievement / urgency, used with extreme scarcity)
```
--ember-400: hsl(28 92% 62%)    /* warm amber-orange */
--ember-500: hsl(24 90% 54%)
--ember-600: hsl(20 85% 46%)
```
**Why we're adding this:** Green alone can only communicate one emotional register — "calm success." But Vocaply's product has a second, equally important emotional register: **urgency and stakes** (a commitment about to be missed, a streak, a score climbing). Color psychology research on warm hues (amber/orange) consistently links them to attention-capture and energy without the alarm-connotation of red — which matters because a "missed commitment" alert should feel like *a nudge*, not a scary system error. Ember is used in exactly three places on the entire site: the countdown/urgency micro-copy in the hero proof visual, one hero-adjacent stat, and hover glow on the primary CTA (see §3.4). Nowhere else. Scarcity of a second color is what keeps it feeling premium instead of "two brand colors fighting."

**Alternative considered and rejected:** Using red for "missed" states site-wide. Red is the obvious/expected choice, but it primes anxiety, which is the wrong emotion to sell a B2B accountability tool with — nobody buys a tool that makes their team feel policed. Ember reframes "missed" as "needs attention" rather than "failure," which is a more sellable emotional frame and matches the actual in-product design language already defined (commitment states use amber/red distinctly in the LLD, so this is consistent, not invented).

#### Ink (text) scale — warm-neutral, not pure black
```
--ink-900: hsl(160 10% 12%)   primary text (never pure #000 — pure black on paper-tone bg
                              creates harsher contrast than intended)
--ink-700: hsl(160 6% 30%)    secondary text
--ink-500: hsl(160 4% 48%)    tertiary / meta text (timestamps, labels)
--ink-300: hsl(160 4% 72%)    disabled / placeholder
```

#### Gradients — used as *materials*, never as backgrounds behind text
Two gradient "materials," each with a specific job:

1. **Mesh-Aurora** (hero backdrop only): a slow, blurred multi-stop mesh moving between `brand-50 → brand-100 → paper`, opacity capped at 35%, always positioned *behind* a card/artifact, never behind body copy. Purpose: depth and premium atmosphere without sacrificing the "restraint reads as competence" principle from the Linear teardown — this is the *one* place we allow visual richness, because it frames the single most important artifact on the page (the hero proof visual).
2. **CTA-Glow** (buttons only): a tight radial gradient from `brand-500 → brand-600`, with an ember-tinted outer glow (`box-shadow` using `--ember-500` at 18% opacity) on hover only. This is the "premium button" treatment requested — detailed fully in §3.4.

**Rule that must never be broken:** no gradient may sit directly behind paragraph text. This single rule is what separates a page that "looks expensive" from one that "looks like a Canva template" — nearly every mediocre SaaS page breaks this rule at least once.

### 3.2 Typography

```
Display / Headlines:  "Aeonik" or "General Sans" (geometric-humanist sans, has real personality
                       without being a novelty font) — weight 500–600, tracking -2%
Body:                  "Inter" or "Inter Variable" — weight 400–450, tracking 0, 1.6 line-height
Data / Extracted content: "Berkeley Mono" or "JetBrains Mono" — used ONLY for anything that
                       represents literal extracted data (a due date string, a confidence score,
                       a commitment ID) — never for narrative copy
```

**Why this pairing over the obvious "Inter + Inter Bold everywhere":** Using a distinct display face for headlines (rather than just bolding the body font) is what gives Stripe, Linear, and Vercel their "someone designed this" feel — it's the typographic equivalent of the restraint principle: two typefaces used with clear jobs beats one typeface used everywhere, because it gives the eye a second signal for hierarchy beyond size alone.

**Scale (8px-grid-locked, fluid via `clamp()`):**
```
Display XL:  clamp(2.75rem, 5vw, 4.5rem)   / -2% tracking / 1.05 line-height   → hero headline only
Display L:   clamp(2.25rem, 3.5vw, 3.25rem) / -1.5% / 1.1                     → section headlines
Display M:   1.75rem / -1% / 1.2                                              → card/subsection titles
Body L:      1.125rem / 0 / 1.6                                               → hero subhead, lead paragraphs
Body:        1rem / 0 / 1.6                                                    → standard copy
Body S:      0.875rem / 0 / 1.5                                                → captions, meta
Mono S:      0.8125rem / 0 / 1.4  (JetBrains Mono)                             → extracted-data chips
```

### 3.3 Spacing & Grid

Strict 8px base unit, with a **12-column grid on desktop (max-width 1280px), 4-column on mobile (375px baseline).** Section vertical rhythm uses a fixed set of "beats" so the page has a predictable pulse rather than arbitrary padding per section:

```
Section padding (desktop): 160px top/bottom for "major" sections, 96px for "supporting" sections
Section padding (mobile):  80px / 56px
Card internal padding:     32px (desktop), 24px (mobile) — always a multiple of 8
Gap between related elements: 16px | Gap between unrelated groups: 48px+
```
**Why a fixed rhythm matters:** Inconsistent section spacing is one of the most common tells of a page assembled from disconnected templates. A fixed beat pattern (160 / 96 / 160 / 96...) creates a subconscious sense of intentional pacing, similar to how consistent measure length in music creates a feeling of composition rather than noise.

### 3.4 The Button System (premium-level, as requested)

This deserves its own section because a single sloppy button undermines every other design decision on the page — it's the one element every visitor physically touches.

**Primary CTA — "Start tracking commitments" (or equivalent)**
- Shape: `radius: 10px` (not fully pill, not sharp — a soft-rounded rectangle reads as more serious/enterprise than a full pill, which skews consumer-app; not sharp-cornered, which skews cold/legacy-enterprise). This mid-point radius is a deliberate choice matching Vocaply's position between "friendly team tool" and "serious accountability system."
- Fill: solid `--brand-500`, **not** a gradient fill at rest — gradients-at-rest on buttons are the #1 tell of a template. The gradient only appears as a *reactive* state.
- Text: white, `Body` weight 600, with **8px of horizontal breathing room beyond what looks "enough"** — cramped button text is a top-3 CRO killer because it subconsciously reads as low-confidence design.
- **Rest state:** flat fill, `box-shadow: 0 1px 2px rgba(0,0,0,0.06)` (barely-there, just enough to lift it off the page).
- **Hover state (150ms ease-out):** background shifts to `--brand-600`; a soft ember-tinted glow blooms outward (`box-shadow: 0 8px 24px -4px hsl(24 90% 54% / 0.25)`); button lifts `translateY(-1px)`. The glow is the "premium" signal — it implies warmth/energy without changing the button's core identity color.
- **Active/pressed state:** `translateY(0)`, shadow compresses to near-zero, background darkens one more step — this micro-compression on click is what makes a button feel *physically pressable* rather than just clickable; it's a tactile-feedback illusion borrowed from real hardware button design.
- **Focus-visible state (keyboard nav):** a 2px `--brand-700` outline offset by 2px — never removed, always present for accessibility, styled to match brand rather than the browser default blue.
- **Loading state:** label crossfades to a minimal 3-dot pulse (not a spinner — spinners imply "this might take a while," a dot pulse implies "this is nearly instant," which matters when the actual action is fast, e.g., form submission).

**Secondary CTA — "Watch how resolution works" (or equivalent)**
- Ghost/outline treatment: 1.5px `--ink-900` border at 12% opacity, transparent fill, `--ink-900` text.
- Hover: border darkens to full opacity, background tints to `--brand-25` — never inverts to a solid fill (that would compete with the primary button for visual weight, breaking hierarchy).

**Why two distinct button styles matter psychologically:** this is the **Von Restorff effect** (isolation effect) applied deliberately — if both buttons look equally weighted, the visitor's attention splits and conversion on the primary action drops. A clearly dominant primary + a clearly subordinate secondary directs 100% of visitors toward *a* decision, and the majority toward the *preferred* decision.

**Alternative considered and rejected:** A gradient-filled button at rest (common in the "AI SaaS" genre right now — purple-to-blue gradient buttons are everywhere in 2025–2026 AI tooling). Rejected because (a) it's already a visual cliché specifically in the AI-tool space, which undermines the "not generic" mandate, and (b) gradient-at-rest buttons often fail contrast-ratio checks at the edges of the gradient, an accessibility risk a flat fill avoids entirely.

### 3.5 Elevation & Materials

Three elevation tiers only (more than three and hierarchy becomes noise):
```
tier-1 (resting cards):    box-shadow: 0 1px 3px rgba(16,24,18,0.06), 0 1px 2px rgba(16,24,18,0.04)
tier-2 (hover / active):   box-shadow: 0 4px 16px rgba(16,24,18,0.08), 0 2px 4px rgba(16,24,18,0.04)
tier-3 (modals/popovers):  box-shadow: 0 16px 48px rgba(16,24,18,0.16), 0 4px 12px rgba(16,24,18,0.08)
```
Shadows use the ink hue (not pure black) at low opacity — a shadow tinted toward the brand's neutral hue reads as more integrated/native than a generic gray shadow, a subtle detail most templates get wrong.

### 3.6 Motion Principles

- **Scroll-linked reveal, never autoplay-loop.** Elements enter at 90% viewport threshold with an 8–12px upward translate + opacity fade, spring-based (`stiffness: 220, damping: 26` — a snappy but not bouncy spring), 1 element group at a time, staggered 40–60ms per child. This is the Framer-derived principle from §1.1: motion tied to user scroll = user agency preserved.
- **The hero proof visual animates its state transition on a loop, but slowly** (a commitment card visibly moving from "Meeting A: PENDING" to "Meeting B: FULFILLED ✓" over an 8-second cycle) — this is the one exception to "no autoplay," because it *is* the product demonstration, not decoration. Distinguish decoration (banned as autoplay) from demonstration (permitted as autoplay).
- **Respect `prefers-reduced-motion` absolutely** — all transforms fall back to opacity-only fades, no exceptions. This is both an accessibility requirement (WCAG 2.3.3) and, pragmatically, a chunk of the exact anxious/detail-oriented professional audience this product targets (managers, ops leads) browse with reduced motion enabled more often than average.

---

## PART 4 — Section-by-Section Architecture

Every section below replaces a "generic" equivalent with a version that does actual persuasive work. I've marked what it *replaces* so it's clear we are deliberately rejecting the generic default.

### Section 1 — Hero
**Replaces:** generic "Meet [Product] — AI meeting notes" hero with a stock dashboard screenshot.

**What ships instead:** A headline that names the *cost of the problem*, not the category of the product — e.g., **"70% of meeting promises are never kept. Vocaply makes sure yours are."** (the 70% stat is already sourced in the HLD's problem statement, §1 — using a real, cited industry figure as the *first thing visitors read* is far stronger than a feature claim, because it's a claim about *their* pain, not our product).

The hero visual (right side, or full-width beneath the fold-line) is **not a transcript.** It is the single most important artifact on the entire page: a live, looping two-card visual showing:
- Card A: "Monday standup — Ahmed: *'I'll finish the login feature by Thursday'*" tagged `PENDING`.
- An animated arrow/timeline connecting to Card B: "Thursday standup — Ahmed: *'Finished the login feature'*" — Card A's tag animates from `PENDING` to `FULFILLED ✓` in brand green, with a small `+4 score` ember-tinted micro-animation.

**Psychology:** this is a direct application of the "show the artifact, not the metaphor" principle from the Stripe teardown, combined with the market-gap finding in §1.3 — no competitor shows this exact moment because no competitor's product does this. It is simultaneously the hero visual *and* the strongest proof of differentiation on the page, in the first 3 seconds.

**CTA pairing:** Primary — "Start your free team trial." Secondary (ghost) — "See a real commitment get resolved" (scrolls to Section 3, not a generic demo modal — keeps momentum on-page rather than routing to a separate video experience, reducing drop-off).

---

### Section 2 — The Cost Section (replaces a logo wall)
**Replaces:** premature social-proof logo wall (rejected per §1.2's Fathom lesson — we haven't earned third-party badges yet, and a thin/fake-looking logo row this early actively damages trust more than an absent one).

**What ships instead:** three data-forward stat cards, each pairing a **specific, cited number** with a one-line translation into a manager's real week, using the exact figures already established in the product's own HLD document (industry data section):
- "70%" — of meeting action items are never completed on time.
- "4.5 hrs/week" — average manager time lost to manual follow-up chasing.
- "3×" — higher commitment fulfillment on teams with structured accountability.

Each card uses the **mono typeface** for the number (per §3.2's rule: numbers = data = mono) and the sans for the translation line — a small typographic detail that makes the numbers feel *measured* rather than *marketing-copy-invented*.

**Psychology:** this is loss-aversion framing (Kahneman/Tversky) — leading with cost-of-inaction is measurably more persuasive than leading with benefit-of-action for a B2B tool solving an existing, felt pain (as opposed to creating a new desire), because the buyer is already living the problem; we're naming it precisely, which builds immediate credibility ("this company understands my exact week").

---

### Section 3 — "How Resolution Actually Works" (replaces generic 3-step "how it works")
**Replaces:** the explicitly banned 3-icon "Step 1 / Step 2 / Step 3" row.

**What ships instead:** a single, larger interactive/scrollytelling module — one continuous horizontal (desktop) or vertical (mobile) timeline that visualizes the **actual cross-meeting resolution pipeline** from the LLD (§6/§7): transcript → extraction → similarity match against historical commitments → resolution detection → score update — but translated into plain, confident language, with a real (anonymized) example running through it as the user scrolls:

1. *"Monday: Ahmed says 'I'll finish the login feature by Thursday.'"* → tagged, dated, owned automatically.
2. *"Thursday: Ahmed says 'Finished the login feature.'"* → Vocaply recognizes this refers back to Monday's promise (not a new commitment) — small annotation: *"matched using language understanding, not just keywords."*
3. *"Ahmed's score updates. His manager never had to ask."*

This is one scroll-linked module, not three static icon cards — the mechanism *is* the story, told once, well, with motion reinforcing cause-and-effect rather than three interchangeable icons implying "it's simple" (a claim visitors have learned to distrust, because every SaaS page claims simplicity).

**Psychology:** this directly satisfies the **mechanism transparency** principle noted as the correct trust-building lever in §1.2 (the Fathom lesson — since we can't yet lean on borrowed authority/reviews, we lean on showing *how* it works, which is a more durable trust signal for a technical buyer persona like engineering managers, who are inherently skeptical of "AI magic" claims and respond better to visible mechanism).

---

### Section 4 — The Score (a section with no direct competitor equivalent)
**What ships:** a dedicated section built entirely around the Commitment Score concept (0–100, per the LLD's scoring algorithm) — presented as a large, animated SVG donut gauge (matching the actual in-product `CommitmentScore.tsx` component design already specified in the codebase) climbing from 62 → 89 on scroll, with the recency-weighting and on-time-bonus logic translated into human copy: *"Recent behavior counts more than old mistakes. A bad month doesn't define you — and a bad week doesn't average out into a shrug, either."*

**Psychology:** this section exists because *scoring/gamification of accountability* is Vocaply's most emotionally novel mechanic and has zero equivalent on any competitor page — dedicating a full section to it (rather than burying it as a feature-grid bullet) signals "this is a pillar, not a checkbox," which shapes how prospects mentally categorize the whole product (as an accountability system, not a notetaker with extra features).

---

### Section 5 — Built For Managers, Not Against Employees (trust/tone section)
**What ships:** this section exists specifically to defuse the one predictable objection this product invites: *"does this feel like surveillance?"* Direct, confident copy addressing it head-on rather than hoping nobody thinks it — e.g., *"Vocaply never grades a bad day. It surfaces patterns, not moments."* — paired with a visual of the actual **Ember vs Red** color decision from §3.1 in action (a "needs attention" chip, not a "failure" chip), which is a live demonstration of the earlier design decision doing real persuasive work, not just aesthetic work.

**Psychology:** pre-emptively naming and defusing an objection before a skeptical visitor forms it themselves is a classic high-trust persuasion technique (inoculation theory) — it also differentiates tone sharply from the sales-ops coldness identified in the Fireflies teardown (§1.2), reinforcing that Vocaply is built for team health, not surveillance.

---

### Section 6 — Integration proof (the one place a logo row is earned)
**What ships:** *now* the integration logos appear (Jira, Linear, Slack, Notion, Google Calendar) — smaller, quieter, in a single row with a one-line frame: *"Fits into how your team already works — no new tool to check."* This is deliberately placed **after** the mechanism and trust sections, not before, per the Fathom/Fireflies lessons in §1.2.

---

### Section 7 — Pricing (flat-team-pricing as a stated differentiator)
**What ships:** pricing cards using the existing flat per-team model (already defined in the HLD's billing architecture) with an explicit, called-out annotation contrasting it against the category norm: *"Most tools charge per seat — which quietly punishes you for growing your team. Vocaply doesn't."* This turns a business-model detail into a persuasive argument, not just a price table.

**Psychology:** per-seat anxiety is a real, documented friction point in team-tool purchasing (the person deciding to buy often isn't the person who'll pay for expansion later, creating internal budget conflict) — naming this directly reframes price as a *removed obstacle* rather than a *number to negotiate*.

---

### Section 8 — Final CTA
**What ships:** a return to the exact hero visual motif (the PENDING → FULFILLED card animation) at a smaller scale, directly above the final CTA button, with copy that closes the loop opened in Section 1: *"Your team already keeps most of its promises. Let's make sure it's all of them."* Repetition of the hero's visual motif at the close creates narrative bookending — a well-documented technique for improving message recall and perceived coherence of a page (the visitor's mental model of "what this company does" is reinforced twice, at open and close, rather than diluted across eight different visual metaphors).

---

## PART 5 — Non-negotiable Accessibility & Performance Bar

- All text maintains **minimum 4.5:1 contrast** (body) / **3:1** (large display text), verified against the new paper/ink tokens above — already confirmed in §3.1's token design, not left to chance at build time.
- All interactive elements have a visible focus state matching the brand (§3.4), never the default browser outline and never `outline: none` without a replacement.
- Motion respects `prefers-reduced-motion` site-wide, no exceptions (§3.6).
- Hero visual and score-gauge animations are decorative/`aria-hidden` with an equivalent static text description available to screen readers — the *argument* of the section must never depend on a sighted user seeing an animation to understand the claim.
- Largest Contentful Paint target **< 1.2s**, achieved by keeping the hero artifact as an SVG/CSS animation (not a video or large raster asset) — consistent with the platform-wide Core Web Vitals targets already defined for the product.

---

## Summary — What Changes From the Current Brand System

| Element | Before | After | Why |
|---|---|---|---|
| Background | Pure white | Warm paper tone (`hsl(60 9% 98%)`) | Softness, reduced clinical feel, still WCAG-safe |
| Brand color | Single green scale | Extended 8-step green scale + new Ember accent | Room for both "calm success" and "urgency/achievement" registers |
| Gradients | None defined | Mesh-Aurora (hero only) + CTA-Glow (button hover only) | Premium depth without violating text-contrast rules |
| Buttons | Undefined at premium level | Full multi-state system with physical-feel micro-interactions | The single most-touched element on the page |
| Hero visual | (not yet built) | Live commitment lifecycle animation, not a transcript | Only visual on the market showing Vocaply's actual differentiator |
| "How it works" | Generic 3-step icon row (explicitly rejected) | One scrollytelling resolution-mechanism module | Mechanism transparency > generic simplicity claims |
| Social proof | Logo wall pattern (industry default) | Moved later, paired with earned mechanism trust first | Avoids the "unearned authority" trap competitors fall into |

---

*Document: DESIGN-STRATEGY-001 | Vocaply Landing Page | Version 1.0*
*Next step: translate Part 3 (Design System) into actual design tokens (`tailwind.config.ts` / CSS variables) and Part 4 into component-level specs for the `vocaply-landing` repo.*
