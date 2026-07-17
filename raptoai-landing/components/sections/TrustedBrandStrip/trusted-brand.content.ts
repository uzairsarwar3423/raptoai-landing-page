export interface IntegrationLogo {
  name: string;
  slug: string;
  svgPath: string;
}

export const trustedBrandLogos: IntegrationLogo[] = [
  { name: "Zoom",             slug: "zoom",             svgPath: "/integrations/zoom.svg" },
  { name: "Google Meet",      slug: "google-meet",      svgPath: "/integrations/google-meet.svg" },
  { name: "Microsoft Teams",  slug: "teams",            svgPath: "/integrations/teams.svg" },
  { name: "Slack",            slug: "slack",            svgPath: "/integrations/slack.svg" },
  { name: "Jira",             slug: "jira",             svgPath: "/integrations/jira.svg" },
  { name: "Linear",           slug: "linear",           svgPath: "/integrations/linear.svg" },
  { name: "Notion",           slug: "notion",           svgPath: "/integrations/notion.svg" },
  { name: "Google Calendar",  slug: "google-calendar",  svgPath: "/integrations/google-calender.svg" },
  { name: "Outlook Calendar", slug: "outlook",          svgPath: "/integrations/outlook.svg" },
];
