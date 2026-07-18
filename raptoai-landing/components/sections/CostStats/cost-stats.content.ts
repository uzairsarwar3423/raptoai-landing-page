export interface StatCardData {
  id: string;
  value: number;
  format: (v: number) => string;
  label: string;
  visual: "ring" | "clock" | "bars";
}

export const costStats: StatCardData[] = [
  {
    id: "missed-rate",
    value: 70,
    format: (v) => `${Math.round(v)}%`,
    label: "of meeting action items are never completed on time.",
    visual: "ring",
  },
  {
    id: "hours-lost",
    value: 4.5,
    format: (v) => `${v.toFixed(1)} hrs/wk`,
    label: "lost per manager chasing status updates that should be automatic.",
    visual: "clock",
  },
  {
    id: "fulfillment-lift",
    value: 3,
    format: (v) => `${v.toFixed(1)}×`.replace(".0×", "×"),
    label: "higher commitment fulfillment on teams with structured accountability.",
    visual: "bars",
  },
];
