import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rapto — AI Meeting Accountability";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#07130e",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            filter: "blur(90px)",
          }}
        />

        {/* Top Header Badge & Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "1.5px solid rgba(52, 211, 153, 0.5)",
              color: "#34d399",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            R
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            Rapto
          </div>
          <div
            style={{
              marginLeft: "12px",
              padding: "6px 14px",
              borderRadius: "999px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34d399",
              fontSize: "14px",
              fontFamily: "monospace",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            AI Meeting Accountability
          </div>
        </div>

        {/* Center Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "950px",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            70% of meeting promises are lost.
            <span style={{ color: "#34d399" }}> Rapto ensures yours aren&apos;t.</span>
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            Autonomous commitment extraction, cross-meeting follow-through, and team accountability across Zoom, Meet, and Teams.
          </div>
        </div>

        {/* Bottom Feature Tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "32px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#e2e8f0", fontSize: "16px", fontWeight: 600 }}>
            <span style={{ color: "#34d399" }}>✓</span> Autonomous Follow-Ups
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#e2e8f0", fontSize: "16px", fontWeight: 600 }}>
            <span style={{ color: "#34d399" }}>✓</span> 99.4% Extraction Precision
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#e2e8f0", fontSize: "16px", fontWeight: 600 }}>
            <span style={{ color: "#34d399" }}>✓</span> SOC-2 Type II Certified
          </div>
          <div style={{ marginLeft: "auto", color: "#64748b", fontSize: "16px", fontFamily: "monospace" }}>
            rapto.ai
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
