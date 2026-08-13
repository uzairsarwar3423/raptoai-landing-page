'use client';

import Image from 'next/image';

const integrations = [
  {
    name: 'Zoom',
    description: 'Auto-join Zoom calls, transcribe discussions, and extract action items automatically.',
    icon: '/integrations/zoom.svg',
  },
  {
    name: 'Slack',
    description: 'Broadcast meeting summaries, action items, and nudges directly to team channels.',
    icon: '/integrations/slack.svg',
  },
  {
    name: 'Google Meet',
    description: 'Seamless integration with Google Meet for instant automated call capture.',
    icon: '/integrations/google-meet.svg',
  },
  {
    name: 'Notion',
    description: 'Sync meeting decisions, specs, and task lists directly into your Notion workspace.',
    icon: '/integrations/notion.svg',
  },
  {
    name: 'Jira',
    description: 'Log engineering commitments and bug fixes straight to your Jira sprints.',
    icon: '/integrations/jira.svg',
  },
  {
    name: 'Microsoft Teams',
    description: 'Capture Teams calls and keep cross-functional stakeholders seamlessly aligned.',
    icon: '/integrations/teams.svg',
  },
  {
    name: 'Linear',
    description: 'Create Linear issues directly from technical meeting discussions.',
    icon: '/integrations/linear.svg',
  },
  {
    name: 'Outlook Calendar',
    description: 'Sync calendar invites, meeting follow-ups, and email digests automatically.',
    icon: '/integrations/outlook.svg',
  },
  {
    name: 'Google Calendar',
    description: 'Track meeting schedules and trigger automated post-call accountability pipelines.',
    icon: '/integrations/google-calender.svg',
  },
];

export default function Integrations3() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col items-center text-center">
          <h2 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            Smarter tools for better teamwork
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="bg-muted rounded-3xl p-6 shadow-[inset_0_0_2px_2px_rgba(255,255,255,1),inset_0_0_0_1px_rgba(0,0,0,0.2),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] transition dark:shadow-[inset_0_0_2px_2px_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.08),0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.5),0px_2px_4px_0px_rgba(0,0,0,0.4)]"
            >
              <div className="bg-background mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={32}
                  height={32}
                  className="h-7 w-7 object-contain"
                />
              </div>

              <h3 className="text-foreground mb-2 text-lg font-medium">
                {item.name}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center text-center">
          <p className="text-muted-foreground max-w-xl text-sm">
            Explore tools that connect your apps, streamline work, and keep
            teams in sync.
          </p>

          <button className="text-primary mt-4 text-sm font-medium hover:underline">
            See all integrations →
          </button>
        </div>
      </div>
    </section>
  );
}
