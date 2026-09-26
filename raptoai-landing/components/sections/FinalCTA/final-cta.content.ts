import { REGISTER_URL, DEMO_BOOKING_URL } from "@/lib/site-config";

export const finalCTAContent = {
  headline: "Ready to keep every meeting promise?",
  subhead: "Onboard your entire team in under 5 minutes. Flat team rates, zero per-seat anxiety.",
  primaryCTA: {
    label: "Start your free team trial",
    href: REGISTER_URL,
  },
  secondaryCTA: {
    /**
     * Previously `mailto:demo@rapto.cloud` — replaced with a real booking page.
     * Mailto links have ~60-80% higher abandonment vs an inline booking flow.
     * Update DEMO_BOOKING_URL in lib/site-config.ts with your Calendly/Cal.com link.
     */
    label: "See a live 15-min demo",
    href: DEMO_BOOKING_URL,
  },
  trustLine: "No credit card required · 5 free meetings/mo · Works with Zoom, Meet & Teams",
};

