/* The hero's signature moment: a website wireframe draws itself in like a
   pencilled blueprint — the literal promise of the offer ("you'll see the
   design before paying"). Pure SVG + CSS stroke animation: no JS loop, no
   canvas, nothing to stutter on weak hardware.

   The sheet is absolutely positioned inside its box, so the box's height is
   whatever the layout gives it rather than whatever the drawing wants — that
   lets the hero hand the sketch its leftover space on phones. From 640px up
   the box carries the drawing's own 960:620 ratio, so `slice` crops nothing
   and the whole sheet shows; on phones the box is short and wide, and slice
   crops from the bottom instead of shrinking the sheet into a stamp.

   Every element carries pathLength="1" so one dash rule animates them all;
   `--d` staggers the drawing order (frame → chrome → content), then the accent
   fills breathe in last. Reduced motion gets the finished drawing immediately
   (see globals.css). */

const line = "var(--c-line-strong)";
const faint = "var(--c-faint)";
const accent = "var(--c-accent)";

export default function HeroSketch({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={"hero-sketch relative " + className}>
      <svg
        viewBox="0 0 960 620"
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
        strokeWidth="1.5"
      >
        {/* browser frame + chrome */}
        <rect className="sk" pathLength={1} x="8" y="8" width="944" height="604" rx="16" stroke={line} />
        <line className="sk" pathLength={1} x1="8" y1="64" x2="952" y2="64" stroke={line} style={{ ["--d" as string]: "0.5s" }} />
        <circle className="sk" pathLength={1} cx="44" cy="36" r="5" stroke={faint} style={{ ["--d" as string]: "0.7s" }} />
        <circle className="sk" pathLength={1} cx="66" cy="36" r="5" stroke={faint} style={{ ["--d" as string]: "0.8s" }} />
        <circle className="sk" pathLength={1} cx="88" cy="36" r="5" stroke={faint} style={{ ["--d" as string]: "0.9s" }} />
        <rect className="sk" pathLength={1} x="120" y="24" width="300" height="24" rx="12" stroke={faint} style={{ ["--d" as string]: "0.9s" }} />

        {/* page header: logo + nav */}
        <rect className="sk" pathLength={1} x="56" y="100" width="96" height="20" rx="6" stroke={faint} style={{ ["--d" as string]: "1.1s" }} />
        <line className="sk" pathLength={1} x1="668" y1="110" x2="716" y2="110" stroke={faint} style={{ ["--d" as string]: "1.2s" }} />
        <line className="sk" pathLength={1} x1="740" y1="110" x2="796" y2="110" stroke={faint} style={{ ["--d" as string]: "1.28s" }} />
        <line className="sk" pathLength={1} x1="820" y1="110" x2="876" y2="110" stroke={faint} style={{ ["--d" as string]: "1.36s" }} />

        {/* headline bars + CTA */}
        <rect className="sk" pathLength={1} x="56" y="170" width="400" height="22" rx="8" stroke={line} style={{ ["--d" as string]: "1.5s" }} />
        <rect className="sk" pathLength={1} x="56" y="204" width="300" height="22" rx="8" stroke={line} style={{ ["--d" as string]: "1.62s" }} />
        <rect className="sk" pathLength={1} x="56" y="262" width="176" height="44" rx="22" stroke={accent} style={{ ["--d" as string]: "1.8s" }} />
        <rect className="sk-fill" x="56" y="262" width="176" height="44" rx="22" fill="var(--c-accent-soft)" style={{ ["--d" as string]: "2.9s" }} />
        <line className="sk" pathLength={1} x1="92" y1="284" x2="172" y2="284" stroke={accent} style={{ ["--d" as string]: "1.94s" }} />

        {/* image placeholder with diagonals */}
        <rect className="sk" pathLength={1} x="560" y="160" width="344" height="200" rx="10" stroke={line} style={{ ["--d" as string]: "1.6s" }} />
        <line className="sk" pathLength={1} x1="560" y1="160" x2="904" y2="360" stroke={faint} style={{ ["--d" as string]: "1.9s" }} />
        <line className="sk" pathLength={1} x1="904" y1="160" x2="560" y2="360" stroke={faint} style={{ ["--d" as string]: "2s" }} />
        <rect className="sk-fill" x="560" y="160" width="344" height="200" rx="10" fill="var(--c-accent-soft)" style={{ ["--d" as string]: "3.1s" }} />

        {/* cards row — fully inside the sheet */}
        <rect className="sk" pathLength={1} x="56" y="416" width="264" height="148" rx="10" stroke={line} style={{ ["--d" as string]: "2.15s" }} />
        <rect className="sk" pathLength={1} x="348" y="416" width="264" height="148" rx="10" stroke={line} style={{ ["--d" as string]: "2.3s" }} />
        <rect className="sk" pathLength={1} x="640" y="416" width="264" height="148" rx="10" stroke={line} style={{ ["--d" as string]: "2.45s" }} />
        <line className="sk" pathLength={1} x1="84" y1="452" x2="240" y2="452" stroke={faint} style={{ ["--d" as string]: "2.55s" }} />
        <line className="sk" pathLength={1} x1="84" y1="482" x2="292" y2="482" stroke={faint} style={{ ["--d" as string]: "2.62s" }} />
        <line className="sk" pathLength={1} x1="376" y1="452" x2="532" y2="452" stroke={faint} style={{ ["--d" as string]: "2.7s" }} />
        <line className="sk" pathLength={1} x1="376" y1="482" x2="584" y2="482" stroke={faint} style={{ ["--d" as string]: "2.77s" }} />
        <line className="sk" pathLength={1} x1="668" y1="452" x2="824" y2="452" stroke={faint} style={{ ["--d" as string]: "2.85s" }} />
        <line className="sk" pathLength={1} x1="668" y1="482" x2="876" y2="482" stroke={faint} style={{ ["--d" as string]: "2.92s" }} />
      </svg>
    </div>
  );
}
