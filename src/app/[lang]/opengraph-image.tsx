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
          background: "#000000",
          padding: "80px",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: wordmark + hairline rule */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", fontSize: 28 }}>
              Service Studio
              <span style={{ color: "rgba(255,255,255,0.5)", marginLeft: 10 }}>
                by Ruslan
              </span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#6390C1",
              }}
            >
              AI · Bots · Forms
            </div>
          </div>
          <div
            style={{
              display: "flex",
              height: 1,
              width: "100%",
              background: "rgba(255,255,255,0.25)",
            }}
          />
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            lineHeight: 1.12,
            letterSpacing: -1.5,
            maxWidth: 1000,
          }}
        >
          I reduce manual work with AI, bots, and forms.
        </div>

        {/* Bottom: hairline rule + domain */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              height: 1,
              width: "100%",
              background: "rgba(255,255,255,0.25)",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.5)" }}>
              servicestudiobyruslan.com
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "#198CFF" }}>
              EN · UK · RU
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
