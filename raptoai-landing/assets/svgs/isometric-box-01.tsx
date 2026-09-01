import * as React from "react";

export interface IsometricBoxProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export default function IsometricBox01({
  className = "",
  ...props
}: IsometricBoxProps) {
  return (
    <svg
      viewBox="0 0 280 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Glow Filters */}
        <filter id="emerald-glow-01" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="core-glow-01" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradients */}
        <linearGradient id="top-face-grad-01" x1="140" y1="40" x2="220" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#059669" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.08" />
        </linearGradient>

        <linearGradient id="left-face-grad-01" x1="60" y1="95" x2="140" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#022c22" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="right-face-grad-01" x1="140" y1="95" x2="220" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#022c22" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.75" />
        </linearGradient>

        <linearGradient id="line-accent-01" x1="60" y1="95" x2="220" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Ambient shadow / base glow */}
      <ellipse cx="140" cy="205" rx="80" ry="24" fill="#10b981" fillOpacity="0.15" filter="url(#emerald-glow-01)" />

      {/* Main Isometric Cube Base */}
      <g className="transition-transform duration-500 ease-out group-hover:translate-y-[-4px]">
        {/* Left Face */}
        <polygon
          points="60,95 140,140 140,195 60,150"
          fill="url(#left-face-grad-01)"
          stroke="#10b981"
          strokeOpacity="0.3"
          strokeWidth="1.2"
        />

        {/* Left Face Internal Circuit Grid Lines */}
        <line x1="80" y1="106" x2="80" y2="161" stroke="#34d399" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="100" y1="117" x2="100" y2="172" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1" />
        <line x1="120" y1="128" x2="120" y2="183" stroke="#34d399" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />

        {/* Right Face */}
        <polygon
          points="140,140 220,95 220,150 140,195"
          fill="url(#right-face-grad-01)"
          stroke="#10b981"
          strokeOpacity="0.35"
          strokeWidth="1.2"
        />

        {/* Right Face Internal Lines */}
        <line x1="160" y1="128" x2="160" y2="183" stroke="#10b981" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="180" y1="117" x2="180" y2="172" stroke="#10b981" strokeOpacity="0.35" strokeWidth="1" />
        <line x1="200" y1="106" x2="200" y2="161" stroke="#10b981" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />

        {/* Top Face */}
        <polygon
          points="140,50 220,95 140,140 60,95"
          fill="url(#top-face-grad-01)"
          stroke="url(#line-accent-01)"
          strokeWidth="1.5"
        />

        {/* Top Face Isometric Grid Pattern */}
        <path
          d="M 100,72.5 L 180,117.5 M 140,50 L 140,140 M 180,72.5 L 100,117.5"
          stroke="#34d399"
          strokeOpacity="0.3"
          strokeWidth="1"
        />

        {/* Floating Holographic Core Node on Top */}
        <g className="animate-pulse" style={{ animationDuration: "3s" }}>
          {/* Core diamond */}
          <polygon
            points="140,80 155,88.5 140,97 125,88.5"
            fill="#34d399"
            fillOpacity="0.6"
            stroke="#6ee7b7"
            strokeWidth="1.5"
            filter="url(#core-glow-01)"
          />
          {/* Vertical energy beam */}
          <line x1="140" y1="88.5" x2="140" y2="35" stroke="#34d399" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="140" cy="35" r="3" fill="#6ee7b7" filter="url(#core-glow-01)" />
        </g>

        {/* Corner Node Dots */}
        <circle cx="140" cy="50" r="2.5" fill="#34d399" />
        <circle cx="220" cy="95" r="2.5" fill="#34d399" />
        <circle cx="140" cy="140" r="2.5" fill="#34d399" />
        <circle cx="60" cy="95" r="2.5" fill="#34d399" />
        <circle cx="140" cy="195" r="2.5" fill="#10b981" />
      </g>
    </svg>
  );
}
