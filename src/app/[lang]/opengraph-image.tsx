import { ImageResponse } from "next/og";

export const alt =
  "Service Studio by Ruslan — AI automations, Telegram bots, forms, and working systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Single brand image for all locales (English brand text), so params are ignored.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#100E0A",
          padding: "80px",
          color: "#F5F0E8",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: monogram + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 20,
              background: "#1A1710",
              border: "2px solid rgba(214,168,90,0.5)",
              color: "#D6A85A",
              fontSize: 50,
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#D6A85A",
            }}
          >
            Service Studio
          </div>
        </div>

        {/* Middle: headline + subline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Service Studio by Ruslan
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 36,
              color: "#B8AD9B",
              maxWidth: 940,
              lineHeight: 1.3,
            }}
          >
            AI automations, Telegram bots, forms, and working systems
          </div>
        </div>

        {/* Bottom: domain + accent rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#D6A85A" }}>
            servicestudiobyruslan.com
          </div>
          <div
            style={{
              display: "flex",
              width: 140,
              height: 6,
              borderRadius: 3,
              background: "#D6A85A",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
