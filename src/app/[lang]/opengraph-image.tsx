import { ImageResponse } from "next/og";

export const alt =
  "Service Studio by Ruslan — automation, bots, forms, and AI helpers for any business task";
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
          background: "#000000",
          padding: "80px",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 30 }}>
          <span
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 12,
              background: "#198CFF",
              marginRight: 18,
            }}
          />
          Service Studio
          <span style={{ color: "rgba(255,255,255,0.5)", marginLeft: 10 }}>
            by Ruslan
          </span>
        </div>

        {/* Middle: headline with a single azure accent word */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 1010,
          }}
        >
          <span style={{ display: "flex" }}>I automate&nbsp;</span>
          <span style={{ display: "flex", color: "#198CFF" }}>anything&nbsp;</span>
          <span style={{ display: "flex" }}>that slows your business down.</span>
        </div>

        {/* Bottom: what + domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
          }}
        >
          <span style={{ display: "flex", color: "rgba(255,255,255,0.62)" }}>
            Bots · forms · AI helpers · integrations
          </span>
          <span style={{ display: "flex", color: "rgba(255,255,255,0.5)" }}>
            servicestudiobyruslan.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
