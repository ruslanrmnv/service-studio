import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { locales } from "@/i18n/config";

/* Without this the card is rendered on demand, and the first messenger to
   unfurl a link pays for a cold start before it gets a preview — some give up
   first. Three params, one image each, built with the site. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const alt =
  "Service Studio by Ruslan — websites for small business: a free home-page mockup in a day, the site in a week";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The card carries the dark theme's values, since a share image can't follow the
   viewer's colour scheme and dark is the brand's primary look. */
const BACKGROUND = "#12140F";
const INK = "#F2F4ED";
const ACCENT = "#8AA875";

// Single brand image for all locales (English brand text), so params are ignored.
export default async function OpengraphImage() {
  /* next/og ships one face (Geist Regular) and would otherwise set the card in
     it, which is not the site's voice. Read at build time — the route is
     prerendered, so this never runs on a request. Latin subset only: it covers
     the English card exactly, and would have to be swapped for a Cyrillic cut
     if this text is ever localised. */
  const montserrat = await readFile(
    join(process.cwd(), "assets", "Montserrat-Regular.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BACKGROUND,
          padding: "80px",
          color: INK,
          fontFamily: "Montserrat",
        }}
      >
        {/* Top: the same monogram the header shows, then the wordmark */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 30 }}>
          <svg width="34" height="34" viewBox="0 0 64 64" fill="none" style={{ marginRight: 16 }}>
            <path
              d="M20 50 V16 H34 A9 9 0 0 1 34 32 H20"
              stroke={INK}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31 32 C36 40 42 44 46 50"
              stroke={ACCENT}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M46 50 C46 42 48 36 53 31"
              stroke={ACCENT}
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.65"
            />
          </svg>
          Service Studio
          <span style={{ color: "rgba(255,255,255,0.5)", marginLeft: 10 }}>
            by Ruslan
          </span>
        </div>

        {/* Middle: the hero's own headline, word for word, split into the two
            lines it should break on rather than left to wrap. Tracking matches
            the site's .font-display (-0.015em, which is -1.1px at 76). */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 70,
            lineHeight: 1.12,
            letterSpacing: -1.05,
          }}
        >
          <div>A website for your business.</div>
          {/* The accent word has to be its own flex item to take its own colour,
              and Satori trims whitespace at an item's edges — a written space or
              &nbsp; between them silently disappears. `gap` is the space instead:
              Montserrat's is 0.262em (18.3px at 70), less the letter-spacing that
              doesn't apply between items. */}
          <div style={{ display: "flex", gap: 17 }}>
            <span>See the</span>
            <span style={{ color: ACCENT }}>design</span>
            <span>before you pay.</span>
          </div>
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
            Mockup free in a day · site in a week
          </span>
          <span style={{ display: "flex", color: "rgba(255,255,255,0.5)" }}>
            servicestudiobyruslan.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: montserrat, style: "normal", weight: 400 },
      ],
    }
  );
}
