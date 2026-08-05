import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* Safari ignores an SVG apple-touch-icon, so the home-screen mark has to be a
   PNG. Full-bleed square: iOS masks it to its own rounded shape, and a tile with
   corners of its own would show through as a second, smaller square. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#12140F",
        }}
      >
        <svg width="118" height="118" viewBox="0 0 64 64" fill="none">
          <path
            d="M20 50 V16 H34 A9 9 0 0 1 34 32 H20"
            stroke="#F2F4ED"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M31 32 C36 40 42 44 46 50"
            stroke="#8AA875"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M46 50 C46 42 48 36 53 31"
            stroke="#8AA875"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
