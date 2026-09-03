// mechanism.content.ts — 4 steps, image-based visuals

export interface MechanismStep {
  id: string;
  number: string;
  title: string;
  description: string;       // short one-liner shown on the step card
  imageSrc: string;          // /mechanism/step-XX-xxx.png
  imageAlt: string;
}

export const mechanismSteps: MechanismStep[] = [
  {
    id: "meetings",
    number: "01",
    title: "Record any meeting",
    description:
      "Bot-less or bot — Rapto captures every word automatically the moment your call ends.",
    imageSrc: "/mechanism/step-02-meetings.png",
    imageAlt: "Rapto meetings list — all recorded and processed meetings",
  },
  {
    id: "summary",
    number: "02",
    title: "Instant AI summary",
    description:
      "A crisp summary, key decisions, and next steps — generated in under a second.",
    imageSrc: "/mechanism/step-05-meeting-detail.png",
    imageAlt: "Rapto meeting detail — AI summary, transcript, commitments, action items",
  },
  {
    id: "commitments",
    number: "03",
    title: "Every promise tracked",
    description:
      "Commitments are extracted automatically — each one linked to the person who made it.",
    imageSrc: "/mechanism/step-03-commitments.png",
    imageAlt: "Rapto commitments page — every promise tracked with status and confidence",
  },
  {
    id: "accountability",
    number: "04",
    title: "Full team accountability",
    description:
      "Action items assigned, scores tracked, the whole team visible at a glance.",
    imageSrc: "/mechanism/step-01-dashboard.png",
    imageAlt: "Rapto dashboard — team pulse, commitments score, action items overview",
  },
];
