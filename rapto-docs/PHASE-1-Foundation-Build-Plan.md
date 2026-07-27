# Rapto Landing Page — PHASE 1: Foundation & Tooling
> Detailed day-by-day execution plan (Days 1–3)
> Builds on DESIGN-001 (design system), DESIGN-002 (file structure/navbar), BUILD-PLAN-LANDING-001
> Document: BUILD-PLAN-PHASE1-001 | Version 1.0

---

## 0. Why Phase 1 matters more than it looks

Every later phase inherits whatever gets decided here. A wrong font-loading strategy on Day 2 shows up as CLS regressions on Day 29. A missing path alias on Day 1 means 200+ import statements get rewritten later. Phase 1 has zero visible UI — that's expected. The deliverable is a **frictionless, zero-ambiguity foundation** that every subsequent component, section, and animation can be built on without re-litigating tooling decisions.

**One addition to the original plan:** since GSAP (ScrollTrigger specifically) is being added alongside Framer Motion for premium scroll-linked and shader/canvas-driven motion, Day 1 also scaffolds GSAP's dependency and licensing setup, and Day 3 reserves token exports in a format GSAP/canvas code can consume directly (plain JS objects, not just CSS vars) — because GSAP timelines and any WebGL/shader work read colors as JS values, not computed styles.

**Division of motion labor (decided now, so nobody re-argues it in Phase 4):**
- **Framer Motion** → component-level reveals, hover/tap micro-interactions, layout animations, the Hero card chip-morph, hamburger↔close icon, drawer transitions. Anything React-state-driven.
- **GSAP + ScrollTrigger** → scroll-scrubbed, timeline-precise sequences: the Mechanism scrollytelling module, the Score gauge arc-sync, any pinned/sticky section, and any shader/canvas background (Mesh-Aurora, if built as canvas rather than CSS gradient for higher fidelity).
- **Rule:** never both libraries driving the same element's transform in the same frame — pick one owner per animated property, always.

---

## PHASE 1 — Foundation & Tooling (Days 1–3)

```
Day 1 → Repo, tooling, dependencies, scaffolding
Day 2 → Fonts, metadata, root layout, SEO skeleton
Day 3 → Design tokens (CSS + Tailwind + JS) fully wired and visually verified
```

---

## DAY 1 — Repo Init & Project Scaffolding

### Goal
A clean, strict, lint-passing Next.js 14 App Router project with every core dependency installed and every path alias working — nothing visual yet.

### Step-by-step

**1. Initialize the repo**
```bash
npx create-next-app@14 vocaply-landing \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias "@/*" \
  --eslint

cd vocaply-landing
git init
git add -A && git commit -m "chore: initial scaffold"
```
Use `--src-dir=false` deliberately — the file structure in DESIGN-002 puts `app/`, `components/`, `lib/` at repo root, not nested under `src/`. Keeping them at root matches the already-approved structure exactly; introducing `src/` now would mean rewriting every import path in DESIGN-002's plan.

**2. Enforce TypeScript strict mode**
Edit `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/content/*": ["content/*"]
    }
  }
}
```
`noUncheckedIndexedAccess` is worth the friction now — it catches the exact class of bug that shows up later when mapping over `pricing.content.ts` arrays (`plans[i]` returning possibly-undefined) before it ships, not after.

**3. Install core dependencies**
```bash
# Animation (both libraries, division of labor per §0 above)
npm install framer-motion gsap

# Styling utilities
npm install clsx tailwind-merge

# Testing / a11y
npm install -D playwright @axe-core/playwright @playwright/test

# Fonts already ship with next/font — no extra package needed
```
Note on GSAP: the free "Club GSAP" plugins (ScrollTrigger, ScrollSmoother-lite equivalents) are sufficient for everything scoped in DESIGN-001 — no paid plugin bundle needed unless a future SplitText-heavy headline animation is requested. Flag this explicitly rather than silently installing a paid plugin path later.

**4. Config files**

`next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add CMS/image-host domains here once content/ layer is wired (Phase 5)
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
};

export default nextConfig;
```

`.eslintrc.js` — extend Next's default config, add `eslint-plugin-jsx-a11y` rules as errors (not warnings) from day one, since Phase 6's accessibility pass should be confirming zero issues, not discovering hundreds:
```js
module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "error",
  },
};
```

`.gitignore` — confirm it includes `.next/`, `node_modules/`, `.env*.local`, `/tests/visual/snapshots/__diff_output__/`.

`.env.example`:
```
NEXT_PUBLIC_APP_URL=https://app.vocaply.com
NEXT_PUBLIC_SITE_URL=https://vocaply.com
POSTHOG_API_KEY=
POSTHOG_HOST=
```

**5. Placeholder files**

`app/layout.tsx` (bare shell, no fonts/providers yet — those are Day 2):
```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`app/page.tsx`:
```tsx
export default function Home() {
  return <main>Hello Vocaply</main>;
}
```

### Files touched today
```
next.config.ts
tsconfig.json
package.json
.eslintrc.js
.gitignore
.env.example
app/layout.tsx
app/page.tsx
```

### Definition of Done — Day 1
- [ ] `npm run dev` starts clean on `localhost:3000`, renders "Hello Vocaply"
- [ ] `npx tsc --noEmit` → zero errors
- [ ] `npm run lint` → zero errors, zero warnings
- [ ] `@/components/...`, `@/lib/...` path aliases resolve (test with one throwaway import)
- [ ] `git log` shows one clean initial commit
- [ ] `gsap` and `framer-motion` both importable with zero console errors on a throwaway test render

---

## DAY 2 — Fonts, Metadata, Root Layout

### Goal
Zero-layout-shift, self-hosted type system live in the root layout, plus a working SEO metadata skeleton future pages can extend.

### Step-by-step

**1. Acquire and self-host fonts**
- **General Sans** (display) — download the variable/static `.woff2` files (Fontshare, free license) into `public/fonts/general-sans/`.
- **Inter Variable** (body) — download from rsms.me/inter or use `next/font/google` as a fallback *only if* self-hosting is deprioritized; the design system calls for self-hosting for performance control, so prefer local `.woff2`.
- **JetBrains Mono** (data/mono) — download `.woff2` from the JetBrains Mono GitHub releases into `public/fonts/jetbrains-mono/`.

Directory:
```
public/fonts/
├── general-sans/
│   ├── GeneralSans-Medium.woff2
│   └── GeneralSans-Semibold.woff2
├── inter/
│   └── InterVariable.woff2
└── jetbrains-mono/
    └── JetBrainsMono-Regular.woff2
```

**2. Register fonts via `next/font/local`**

`lib/fonts.ts`:
```ts
import localFont from "next/font/local";

export const generalSans = localFont({
  src: [
    { path: "../public/fonts/general-sans/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/general-sans/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-display",
  display: "optional", // per DESIGN-001 performance budget — zero CLS over perceived speed
});

export const interVariable = localFont({
  src: "../public/fonts/inter/InterVariable.woff2",
  variable: "--font-body",
  display: "optional",
});

export const jetbrainsMono = localFont({
  src: "../public/fonts/jetbrains-mono/JetBrainsMono-Regular.woff2",
  variable: "--font-mono",
  display: "optional", // deferred visually too — see next.config below, this loads below the fold
});
```
**Why `display: "optional"` and not `swap`:** `swap` guarantees a visible font-swap flash (a small layout/visual shift as fallback text re-renders in the real font). `optional` tells the browser "use the real font only if it's already cached/fast; otherwise stay on the fallback for this page load" — this is the correct choice against a **CLS = 0** target, matching DESIGN-001 §6's performance budget exactly. The trade-off (first-time visitors sometimes see the fallback font) is worth it for a marketing page where LCP/CLS scores affect both Lighthouse and actual conversion.

**3. Root layout with fonts + metadata**

`app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { generalSans, interVariable, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://vocaply.com"),
  title: {
    default: "Vocaply — Meeting accountability, not just meeting notes",
    template: "%s | Vocaply",
  },
  description:
    "Vocaply remembers every commitment made in a meeting and follows up automatically — across every meeting after, not just the one it was made in.",
  openGraph: {
    type: "website",
    siteName: "Vocaply",
    images: ["/og/default-og.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${generalSans.variable} ${interVariable.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

**4. Per-page metadata builder (used by every route from Phase 4 onward)**

`lib/seo/metadata.ts`:
```ts
import type { Metadata } from "next";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

export function buildMetadata({ title, description, path, ogImage }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
```

**5. Robots + sitemap stub**

`app/robots.ts`:
```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
```

`app/sitemap.ts` (stub — full route list added Phase 7 Day 28):
```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vocaply.com";
  return [{ url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
```

### Files touched today
```
public/fonts/**/*.woff2
lib/fonts.ts
app/layout.tsx        (finalized)
lib/seo/metadata.ts
app/robots.ts
app/sitemap.ts
```

### Definition of Done — Day 2
- [ ] Lighthouse CLS = **0** on the placeholder homepage (verified in DevTools, not assumed)
- [ ] View-source shows correct `<title>`, meta description, OG tags
- [ ] All three `--font-*` CSS variables present on `<html>` (inspect element to confirm)
- [ ] Network tab confirms only 2 font families load in the critical path (display + body); mono is present in the DOM/CSS but not eagerly requested until something actually uses `font-mono` — acceptable to defer full verification of "true lazy-load" to Day 29's performance pass, but confirm it's not blocking here
- [ ] `/robots.txt` and `/sitemap.xml` both resolve locally

---

## DAY 3 — Design Tokens Into Code

### Goal
Every token from DESIGN-001 §1.1–§1.4 exists in three synchronized forms — CSS custom properties, Tailwind theme extensions, and typed JS objects — with zero hard-coded hex values permitted in any component file from this point forward. This is also the day GSAP/canvas-facing token exports get added.

### Step-by-step

**1. CSS custom properties**

`app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Surfaces */
  --paper: 60 9% 98%;
  --paper-raised: 0 0% 100%;
  --paper-sunken: 60 8% 95%;
  --canvas-dark: 160 14% 7%;
  --canvas-dark-raised: 160 12% 10%;

  /* Ink */
  --ink-900: 160 10% 12%;
  --ink-700: 160 6% 30%;
  --ink-500: 160 4% 48%;
  --ink-300: 160 4% 72%;
  --ink-on-dark: 60 9% 96%;
  --ink-on-dark-muted: 160 6% 68%;

  /* Brand green */
  --brand-25: 149 55% 97%;
  --brand-50: 149 60% 93%;
  --brand-100: 149 58% 85%;
  --brand-300: 149 45% 55%;
  --brand-500: 149 62% 32%;
  --brand-600: 149 68% 25%;
  --brand-700: 149 72% 18%;
  --brand-900: 152 45% 8%;

  /* Ember */
  --ember-400: 28 92% 62%;
  --ember-500: 24 90% 54%;
  --ember-600: 20 85% 46%;

  /* Semantic status */
  --status-fulfilled: var(--brand-500);
  --status-pending: 210 12% 55%;
  --status-attention: var(--ember-500);
  --status-attention-bg: 28 90% 96%;

  /* Borders */
  --border-subtle: 160 10% 12%;
  --border-default: 160 10% 12%;
  --border-on-dark: 60 9% 96%;

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}

/* Elevation as raw box-shadow strings (kept outside :root color vars — Tailwind theme
   consumes these directly as static utility values, see tailwind.config.ts) */
.shadow-tier-1 { box-shadow: 0 1px 3px hsl(160 20% 8% / 0.06), 0 1px 2px hsl(160 20% 8% / 0.04); }
.shadow-tier-2 { box-shadow: 0 4px 16px hsl(160 20% 8% / 0.08), 0 2px 4px hsl(160 20% 8% / 0.04); }
.shadow-tier-3 { box-shadow: 0 16px 48px hsl(160 20% 8% / 0.16), 0 4px 12px hsl(160 20% 8% / 0.08); }
.shadow-cta-glow { box-shadow: 0 8px 24px -4px hsl(24 90% 54% / 0.25); }
```
**Note on HSL storage format:** colors are stored as *raw H S L triplets without the `hsl()` wrapper* (e.g. `149 62% 32%`, not `hsl(149 62% 32%)`). This is the standard shadcn/Tailwind pattern — it lets Tailwind apply opacity modifiers (`bg-brand-500/50`) by wrapping the variable in `hsl(var(--brand-500) / <alpha>)` inside the Tailwind config, which raw pre-wrapped `hsl()` strings can't support. Worth getting right now since retrofitting opacity-modifier support later means touching every token.

**2. Tailwind config wiring**

`tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

const withOpacity = (variable: string) => `hsl(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: withOpacity("--paper"),
        "paper-raised": withOpacity("--paper-raised"),
        "paper-sunken": withOpacity("--paper-sunken"),
        "canvas-dark": withOpacity("--canvas-dark"),
        "canvas-dark-raised": withOpacity("--canvas-dark-raised"),
        ink: {
          900: withOpacity("--ink-900"),
          700: withOpacity("--ink-700"),
          500: withOpacity("--ink-500"),
          300: withOpacity("--ink-300"),
        },
        "ink-on-dark": withOpacity("--ink-on-dark"),
        "ink-on-dark-muted": withOpacity("--ink-on-dark-muted"),
        brand: {
          25: withOpacity("--brand-25"),
          50: withOpacity("--brand-50"),
          100: withOpacity("--brand-100"),
          300: withOpacity("--brand-300"),
          500: withOpacity("--brand-500"),
          600: withOpacity("--brand-600"),
          700: withOpacity("--brand-700"),
          900: withOpacity("--brand-900"),
        },
        ember: {
          400: withOpacity("--ember-400"),
          500: withOpacity("--ember-500"),
          600: withOpacity("--ember-600"),
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        "display-xl": "clamp(2.75rem, 5vw, 4.5rem)",
        "display-l": "clamp(2.25rem, 3.5vw, 3.25rem)",
        "display-m": "1.75rem",
        "body-l": "1.125rem",
        "body-s": "0.875rem",
        "mono-s": "0.8125rem",
      },
    },
  },
  plugins: [],
};

export default config;
```
Verify utilities compile: `bg-brand-500`, `text-ink-700`, `bg-canvas-dark`, `rounded-lg`, `font-display` should all now work with zero hard-coded hex anywhere.

**3. JS-side typed token export (for SVG/Canvas/GSAP)**

This is the piece that matters most for the GSAP/shader work mentioned in the brief — GSAP tweens and any `<canvas>`/WebGL Mesh-Aurora background need actual resolved color values, not CSS variable references (a `getComputedStyle` read works but is slower and fragile inside animation loops; better to have a single source-of-truth JS object).

`lib/tokens.ts`:
```ts
// Mirrors app/globals.css exactly — update both files together, never one without the other.
// Used anywhere a token is needed outside CSS: <canvas> gradients, SVG stroke props,
// GSAP tween targets (e.g. animating an SVG arc's stroke color), dynamic inline styles.

export const tokens = {
  color: {
    paper: "hsl(60 9% 98%)",
    paperRaised: "hsl(0 0% 100%)",
    paperSunken: "hsl(60 8% 95%)",
    canvasDark: "hsl(160 14% 7%)",
    canvasDarkRaised: "hsl(160 12% 10%)",

    ink900: "hsl(160 10% 12%)",
    ink700: "hsl(160 6% 30%)",
    ink500: "hsl(160 4% 48%)",
    ink300: "hsl(160 4% 72%)",
    inkOnDark: "hsl(60 9% 96%)",
    inkOnDarkMuted: "hsl(160 6% 68%)",

    brand25: "hsl(149 55% 97%)",
    brand50: "hsl(149 60% 93%)",
    brand100: "hsl(149 58% 85%)",
    brand300: "hsl(149 45% 55%)",
    brand500: "hsl(149 62% 32%)",
    brand600: "hsl(149 68% 25%)",
    brand700: "hsl(149 72% 18%)",
    brand900: "hsl(152 45% 8%)",

    ember400: "hsl(28 92% 62%)",
    ember500: "hsl(24 90% 54%)",
    ember600: "hsl(20 85% 46%)",
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
  },
  motion: {
    easeOutSnappy: [0.16, 1, 0.3, 1] as const, // cubic-bezier, usable directly in GSAP/Framer
    easeInOut: [0.65, 0, 0.35, 1] as const,
    durationFast: 0.15,
    durationBase: 0.25,
    durationSlow: 0.4,
    springUI: { stiffness: 220, damping: 26, mass: 1 },
    springReveal: { stiffness: 180, damping: 24, mass: 1 },
  },
} as const;

export type Tokens = typeof tokens;
```
**Why duplicate values across `globals.css` and `tokens.ts` instead of one generating the other:** a build-time codegen step (CSS → JS or vice versa) is more "correct" in principle but adds a build dependency for a 60-line file that changes rarely. Manual sync with a loud comment at the top of both files is the pragmatic choice for a file this small — revisit only if token count grows significantly (e.g. past 100+ values or multiple themes).

**4. Throwaway verification page**

`app/dev-tokens/page.tsx` (delete before Phase 4, never ships):
```tsx
import { tokens } from "@/lib/tokens";

export default function TokenTestPage() {
  const swatches = Object.entries(tokens.color);
  return (
    <div className="p-10 bg-paper min-h-screen">
      <h1 className="font-display text-display-l text-ink-900 mb-8">Token Verification</h1>
      <div className="grid grid-cols-4 gap-4 mb-12">
        {swatches.map(([name, value]) => (
          <div key={name} className="rounded-lg overflow-hidden border border-ink-900/10">
            <div className="h-20" style={{ background: value }} />
            <p className="font-mono text-mono-s p-2 text-ink-700">{name}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mb-12">
        <div className="shadow-tier-1 p-6 bg-paper-raised rounded-lg">Tier 1</div>
        <div className="shadow-tier-2 p-6 bg-paper-raised rounded-lg">Tier 2</div>
        <div className="shadow-tier-3 p-6 bg-paper-raised rounded-lg">Tier 3</div>
      </div>
      <p className="font-display text-display-xl text-ink-900">Display XL / General Sans</p>
      <p className="font-body text-body-l text-ink-700">Body L / Inter Variable</p>
      <p className="font-mono text-mono-s text-ink-500">Mono S / JetBrains Mono — commitment_id_4f21a</p>
    </div>
  );
}
```

### Files touched today
```
app/globals.css       (full token block)
tailwind.config.ts    (extended theme mapped to CSS vars)
lib/tokens.ts
app/dev-tokens/page.tsx   (throwaway — delete before Phase 4)
```

### Definition of Done — Day 3
- [ ] `/dev-tokens` renders every color swatch, all three shadow tiers, both type families at every defined size — visually diffed against DESIGN-001 §1.1–1.2 side by side
- [ ] `bg-brand-500/50` (opacity modifier) renders correctly — confirms the HSL-triplet wiring works, not just the base colors
- [ ] `tokens.color.brand500` in `lib/tokens.ts` matches `--brand-500` in `globals.css` exactly (manual diff, both files open side by side)
- [ ] Zero hex codes (`#...`) present anywhere in `app/`, `components/`, or `lib/` — confirm with a repo-wide grep: `grep -rn "#[0-9a-fA-F]\{3,6\}" app/ components/ lib/` returns nothing
- [ ] Contrast ratios from DESIGN-001's table spot-checked with a contrast checker tool against the actual rendered swatches, not just trusted from the source doc

---

## Phase 1 Exit Checklist (before starting Phase 2, Day 4)

- [ ] `npm run build` completes with zero errors
- [ ] `npx tsc --noEmit` — zero errors
- [ ] `npm run lint` — zero errors/warnings
- [ ] Lighthouse on `/` (placeholder): CLS = 0, no font-related layout shift
- [ ] All tokens verified visually against DESIGN-001 and deleted the throwaway `/dev-tokens` route (or scheduled its deletion for start of Day 4)
- [ ] `gsap` and `framer-motion` both confirmed importable and tree-shakeable (no bundle-size surprise — spot check with `next build` output stats)
- [ ] Git history is clean: one commit per day minimum, meaningful messages, no `WIP` commits left on `main`

---

*Document: BUILD-PLAN-PHASE1-001 | Vocaply Landing Page | Version 1.0*
*Next: PHASE 2 — Design Tokens & UI Primitives (Days 4–6), per BUILD-PLAN-LANDING-001*
