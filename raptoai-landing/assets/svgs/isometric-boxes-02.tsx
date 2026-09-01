import * as React from "react";

export interface IsometricBoxesProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export default function IsometricBoxes02({
  className = "",
  ...props
}: IsometricBoxesProps) {
  return (
    <svg
      viewBox="0 0 380 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Glow Filters */}
        <filter id="emerald-glow-02" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="node-glow-02" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradients */}
        <linearGradient id="box-top-1" x1="100" y1="90" x2="180" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="box-left-1" x1="60" y1="135" x2="120" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#022c22" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="box-right-1" x1="120" y1="135" x2="180" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#022c22" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="box-top-2" x1="190" y1="40" x2="290" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="box-left-2" x1="140" y1="95" x2="215" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e293b" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="box-right-2" x1="215" y1="95" x2="290" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#047857" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.75" />
        </linearGradient>

        <linearGradient id="box-top-3" x1="260" y1="120" x2="340" y2="165" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="box-left-3" x1="220" y1="165" x2="280" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#022c22" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="box-right-3" x1="280" y1="165" x2="340" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#022c22" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Base Floor Shadows */}
      <ellipse cx="120" cy="225" rx="60" ry="20" fill="#10b981" fillOpacity="0.12" filter="url(#emerald-glow-02)" />
      <ellipse cx="215" cy="205" rx="75" ry="22" fill="#10b981" fillOpacity="0.2" filter="url(#emerald-glow-02)" />
      <ellipse cx="280" cy="245" rx="55" ry="18" fill="#10b981" fillOpacity="0.1" filter="url(#emerald-glow-02)" />

      {/* Interconnecting Isometric Bus Lines */}
      <path
        d="M 120,135 L 215,95 L 280,165"
        stroke="#34d399"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Block 1 (Left, Mid-height) */}
      <g className="transition-transform duration-500 ease-out group-hover:translate-y-[-2px]">
        {/* Left */}
        <polygon points="60,135 120,170 120,215 60,180" fill="url(#box-left-1)" stroke="#10b981" strokeOpacity="0.3" strokeWidth="1" />
        {/* Right */}
        <polygon points="120,170 180,135 180,180 120,215" fill="url(#box-right-1)" stroke="#10b981" strokeOpacity="0.3" strokeWidth="1" />
        {/* Top */}
        <polygon points="120,100 180,135 120,170 60,135" fill="url(#box-top-1)" stroke="#34d399" strokeOpacity="0.6" strokeWidth="1.2" />
        <circle cx="120" cy="135" r="2" fill="#34d399" />
      </g>

      {/* Block 3 (Right, Lower) */}
      <g className="transition-transform duration-500 ease-out group-hover:translate-y-[-2px]">
        {/* Left */}
        <polygon points="220,165 280,200 280,240 220,205" fill="url(#box-left-3)" stroke="#10b981" strokeOpacity="0.3" strokeWidth="1" />
        {/* Right */}
        <polygon points="280,200 340,165 340,205 280,240" fill="url(#box-right-3)" stroke="#10b981" strokeOpacity="0.3" strokeWidth="1" />
        {/* Top */}
        <polygon points="280,130 340,165 280,200 220,165" fill="url(#box-top-3)" stroke="#34d399" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle cx="280" cy="165" r="2" fill="#34d399" />
      </g>

      {/* Block 2 (Center-Right, Tall Flagship Tier) */}
      <g className="transition-transform duration-500 ease-out group-hover:translate-y-[-5px]">
        {/* Left */}
        <polygon points="140,95 215,138 215,195 140,152" fill="url(#box-left-2)" stroke="#34d399" strokeOpacity="0.4" strokeWidth="1.2" />
        {/* Left Grid Lines */}
        <line x1="165" y1="109" x2="165" y2="166" stroke="#34d399" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="190" y1="123" x2="190" y2="180" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1" />

        {/* Right */}
        <polygon points="215,138 290,95 290,152 215,195" fill="url(#box-right-2)" stroke="#34d399" strokeOpacity="0.4" strokeWidth="1.2" />
        {/* Right Grid Lines */}
        <line x1="240" y1="123" x2="240" y2="180" stroke="#10b981" strokeOpacity="0.3" strokeWidth="1" />
        <line x1="265" y1="109" x2="265" y2="166" stroke="#10b981" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3" />

        {/* Top */}
        <polygon points="215,52 290,95 215,138 140,95" fill="url(#box-top-2)" stroke="#34d399" strokeWidth="1.5" />

        {/* Top Concentric Isometric Grid */}
        <polygon points="215,67 265,95 215,123 165,95" stroke="#6ee7b7" strokeOpacity="0.4" strokeWidth="1" fill="none" />

        {/* Pulsing Central Status Orb */}
        <g className="animate-pulse" style={{ animationDuration: "2.5s" }}>
          <circle cx="215" cy="95" r="4.5" fill="#6ee7b7" filter="url(#node-glow-02)" />
          <circle cx="215" cy="95" r="8" stroke="#34d399" strokeOpacity="0.6" strokeWidth="1" fill="none" />
        </g>

        {/* Edge Vertices */}
        <circle cx="215" cy="52" r="2.5" fill="#34d399" />
        <circle cx="290" cy="95" r="2.5" fill="#34d399" />
        <circle cx="215" cy="138" r="2.5" fill="#34d399" />
        <circle cx="140" cy="95" r="2.5" fill="#34d399" />
      </g>
    </svg>
  );
}
