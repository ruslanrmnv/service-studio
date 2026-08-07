import Image from "next/image";
import { BrowserWindow } from "@/components/Window";

/* The hero's one moment: the offer, performed rather than described. The window
   loads, a mockup is drawn into it from the top down — the free home-page
   sketch the headline promises — and then the sketch lifts and the built site
   is underneath it. A visitor who reads nothing still sees what buying from
   here looks like.

   The screenshot is at full opacity from the first frame with the sketch
   painted opaquely over it, rather than fading in at the end: it is the hero's
   largest element, and an element held at opacity 0 for three seconds is an
   element the browser has not painted.

   Timing lives on --load-s (when the window starts loading); everything else
   is measured from it in globals.css. */

/* The page every small business asks for, in the drawing vocabulary the process
   section uses: a header, a promise, one button, a picture that hasn't been
   taken yet, three blocks under it. Nobody's site in particular — the real ones
   are named and linked in the cases section. */
function Wireframe() {
  const dash = { stroke: "var(--c-line-strong)", strokeDasharray: "5 5" };
  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
    >
      {/* Header */}
      <rect x="20" y="18" width="46" height="9" rx="4.5" fill="var(--c-line-strong)" />
      <rect x="216" y="20" width="26" height="5" rx="2.5" fill="var(--c-line-strong)" opacity="0.7" />
      <rect x="250" y="20" width="26" height="5" rx="2.5" fill="var(--c-line-strong)" opacity="0.7" />
      <rect x="284" y="20" width="20" height="5" rx="2.5" fill="var(--c-line-strong)" opacity="0.7" />

      {/* The promise, two lines, with the mark under it */}
      <rect x="20" y="52" width="168" height="13" rx="6.5" fill="none" {...dash} />
      <rect x="20" y="74" width="120" height="13" rx="6.5" fill="none" {...dash} />
      <path d="M20 100 h58" stroke="var(--c-accent)" strokeWidth="4" strokeLinecap="round" />

      {/* One button */}
      <rect x="20" y="112" width="88" height="24" rx="12" fill="none" stroke="var(--c-accent)" strokeDasharray="5 5" />

      {/* Where the photograph goes, crossed through the way a layout marks a
          picture that hasn't been taken yet. */}
      <rect x="204" y="52" width="96" height="84" rx="5" fill="none" {...dash} />
      <path d="M204 52 L300 136 M300 52 L204 136" stroke="var(--c-line-strong)" strokeWidth="1" opacity="0.45" />

      {/* Three blocks: services, prices, contacts */}
      <rect x="20" y="152" width="88" height="30" rx="5" fill="none" {...dash} />
      <rect x="116" y="152" width="88" height="30" rx="5" fill="none" {...dash} />
      <rect x="212" y="152" width="88" height="30" rx="5" fill="none" {...dash} />
    </svg>
  );
}

export default function HeroMockup({
  src,
  url,
  className = "",
}: {
  src: string;
  url: string;
  className?: string;
}) {
  return (
    <BrowserWindow url={url} className={className}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt=""
          width={1440}
          height={900}
          /* The widths .hero-stack actually reaches: 70% of the column on a
             phone, 58% from sm, and the right six of twelve columns from lg,
             capped by max-w-6xl at 1152. */
          sizes="(min-width: 1152px) 532px, (min-width: 1024px) 48vw, (min-width: 640px) 58vw, 70vw"
          priority
          className="h-full w-full object-cover object-top"
        />
        {/* Opaque, so what is underneath stays a surprise until it lifts. */}
        <div className="sketch-veil absolute inset-0 bg-surface-2">
          <div className="sketch-draw h-full w-full">
            <Wireframe />
          </div>
        </div>
      </div>
    </BrowserWindow>
  );
}
