/**
 * site-config.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for site-wide URLs, CTAs, and booking links.
 *
 * WHY THIS FILE EXISTS (SEO/Conversion rationale):
 *   - All CTA hrefs should be managed here, not hardcoded across components.
 *   - Centralising booking URLs ensures consistent tracking params & UTMs.
 *   - Makes A/B testing CTA destinations trivial: change one line.
 *
 * BOOKING LINK:
 *   Replace DEMO_BOOKING_URL with your actual Calendly / Cal.com link.
 *   Format: https://cal.com/raptoai/demo  OR  https://calendly.com/rapto/demo
 *
 * UTM CONVENTION:
 *   ?utm_source=site&utm_medium=cta&utm_campaign={location}
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.cloud";

/**
 * SITE_CANONICAL — the canonical URL for the homepage root.
 * Always ends with a trailing slash per the target spec: https://rapto.cloud/
 *
 * Sub-pages build their canonicals as: `${SITE_URL}/${path}`
 * e.g. `${SITE_URL}/pricing` → https://rapto.cloud/pricing
 */
export const SITE_CANONICAL = `${SITE_URL}/`;

/** Primary signup / trial registration flow */
export const REGISTER_URL = "https://app.rapto.cloud/register";

/**
 * Demo booking link.
 * ⚠️  Replace with your real Calendly or Cal.com URL before going live.
 * Do NOT use mailto: — that has ~60-80% higher abandonment than a booking page.
 */
export const DEMO_BOOKING_URL =
  "https://cal.com/raptoai/demo?utm_source=site&utm_medium=cta&utm_campaign=demo";

/** Docs & support */
export const DOCS_URL = "https://docs.rapto.cloud";
export const INTEGRATIONS_DOCS_URL = "https://docs.rapto.cloud/integrations";
export const SUPPORT_EMAIL = "support@rapto.cloud";
export const SALES_EMAIL = "sales@rapto.cloud";

/** Social */
export const TWITTER_URL = "https://twitter.com/raptoai";
export const LINKEDIN_URL = "https://linkedin.com/company/raptoai";
export const GITHUB_URL = "https://github.com/raptoai";

/** Plan-specific registration URLs with pre-selected plan param */
export const PLAN_URLS = {
  free: `${REGISTER_URL}`,
  starter: `${REGISTER_URL}?plan=starter`,
  growth: `${REGISTER_URL}?plan=growth`,
  business: `${REGISTER_URL}?plan=business`,
  enterprise: `mailto:${SALES_EMAIL}?subject=Enterprise%20Plan%20Inquiry%20-%20Rapto`,
} as const;
