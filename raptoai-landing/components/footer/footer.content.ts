export const footerColumns = [
  {
    header: "Product",
    links: [
      { label: "Features", href: "/#why-rapto" },
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
      { label: "Help Center", href: "https://help.rapto.ai" },
      { label: "API Docs", href: "https://docs.rapto.ai" },
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
      { label: "Sub-processors", href: "/security#sub-processors" },
    ],
  },
] as const;

export const statusPageUrl = "https://status.rapto.ai";
