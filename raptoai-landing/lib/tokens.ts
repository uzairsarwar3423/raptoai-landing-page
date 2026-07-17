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
