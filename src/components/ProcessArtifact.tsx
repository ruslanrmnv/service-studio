import { BrowserWindow } from "@/components/Window";

/* One small window per process step, showing the thing that step produces:
   the first message → the wireframe → the same page inked in → the same page
   live and in use. All four are drawn, never screenshotted. There is no real
   client conversation or half-built page to photograph, and the finished
   step deliberately shows a nobody's site rather than one of the demos — the
   cases section is where real work is named and linked, and repeating a
   cover here would only make a generic step look like a specific client.

   Steps 2–4 are the same page three times, so the progression is legible:
   dashed → inked → live. Purely illustrative, so the caller hides the whole
   thing from assistive tech. */

/* Step 1 — the conversation: two incoming messages, one accent reply. */
const CHAT = (
  <svg viewBox="0 0 220 150" className="block h-auto w-full">
    <rect x="14" y="16" width="118" height="36" rx="10" fill="var(--c-surface-3)" />
    <rect x="26" y="27" width="70" height="5" rx="2.5" fill="var(--c-line-strong)" />
    <rect x="26" y="38" width="90" height="5" rx="2.5" fill="var(--c-line-strong)" />
    <rect x="14" y="60" width="86" height="26" rx="10" fill="var(--c-surface-3)" />
    <rect x="26" y="70" width="58" height="5" rx="2.5" fill="var(--c-line-strong)" />
    <rect x="92" y="98" width="114" height="36" rx="10" fill="var(--c-accent)" />
    <rect x="104" y="109" width="66" height="5" rx="2.5" fill="var(--c-background)" opacity="0.85" />
    <rect x="104" y="120" width="88" height="5" rx="2.5" fill="var(--c-background)" opacity="0.85" />
  </svg>
);

/* Step 2 — the mockup: the page as a dashed pencil sketch. Text left, a
   picture beside it, one button, three blocks under — the shape of every
   page in this offer. Steps 3 and 4 keep the exact same coordinates, so the
   column reads as one page being finished rather than three drawings. */
const WIREFRAME = (
  <svg viewBox="0 0 220 150" className="block h-auto w-full">
    <rect x="14" y="12" width="192" height="126" rx="8" fill="none" stroke="var(--c-line-strong)" strokeDasharray="4 4" />
    {/* Logo and menu. Bars, not dots: the window this page sits in already has
        three dots in its title bar, and a second set inside read as a window
        drawn inside a window. */}
    <rect x="26" y="23" width="30" height="6" rx="3" fill="var(--c-line-strong)" />
    <rect x="140" y="23.5" width="18" height="5" rx="2.5" fill="var(--c-line-strong)" opacity="0.7" />
    <rect x="162" y="23.5" width="18" height="5" rx="2.5" fill="var(--c-line-strong)" opacity="0.7" />
    <rect x="184" y="23.5" width="10" height="5" rx="2.5" fill="var(--c-line-strong)" opacity="0.7" />
    <rect x="26" y="44" width="80" height="10" rx="5" fill="none" stroke="var(--c-line-strong)" strokeDasharray="4 4" />
    <rect x="26" y="60" width="58" height="10" rx="5" fill="none" stroke="var(--c-line-strong)" strokeDasharray="4 4" />
    <path d="M26 79 h36" stroke="var(--c-accent)" strokeWidth="3" strokeLinecap="round" />
    <rect x="26" y="88" width="56" height="18" rx="9" fill="none" stroke="var(--c-accent)" strokeDasharray="4 4" />
    {/* Where the photograph goes — crossed through, the way a layout marks a
        picture that hasn't been taken yet. */}
    <rect x="122" y="42" width="72" height="64" rx="4" fill="none" stroke="var(--c-line-strong)" strokeDasharray="4 4" />
    <path d="M122 42 L194 106 M194 42 L122 106" stroke="var(--c-line-strong)" strokeWidth="0.75" opacity="0.5" />
    <rect x="26" y="116" width="52" height="14" rx="4" fill="none" stroke="var(--c-line-strong)" strokeDasharray="4 4" />
    <rect x="84" y="116" width="52" height="14" rx="4" fill="none" stroke="var(--c-line-strong)" strokeDasharray="4 4" />
    <rect x="142" y="116" width="52" height="14" rx="4" fill="none" stroke="var(--c-line-strong)" strokeDasharray="4 4" />
  </svg>
);

/* Step 3 — the build: the same page, inked. What was dashed is filled and the
   button takes the accent, but the picture slot is still an empty plate. */
const BUILD = (
  <svg viewBox="0 0 220 150" className="block h-auto w-full">
    <rect x="14" y="12" width="192" height="126" rx="8" fill="var(--c-surface-3)" />
    <rect x="26" y="23" width="30" height="6" rx="3" fill="var(--c-ink)" opacity="0.7" />
    <rect x="140" y="23.5" width="18" height="5" rx="2.5" fill="var(--c-ink)" opacity="0.4" />
    <rect x="162" y="23.5" width="18" height="5" rx="2.5" fill="var(--c-ink)" opacity="0.4" />
    <rect x="184" y="23.5" width="10" height="5" rx="2.5" fill="var(--c-ink)" opacity="0.4" />
    <rect x="26" y="44" width="80" height="10" rx="5" fill="var(--c-ink)" opacity="0.85" />
    <rect x="26" y="60" width="58" height="10" rx="5" fill="var(--c-ink)" opacity="0.85" />
    <path d="M26 79 h36" stroke="var(--c-accent)" strokeWidth="3" strokeLinecap="round" />
    <rect x="26" y="88" width="56" height="18" rx="9" fill="var(--c-accent)" />
    <rect x="122" y="42" width="72" height="64" rx="4" fill="var(--c-line)" />
    <rect x="26" y="116" width="52" height="14" rx="4" fill="var(--c-surface-2)" />
    <rect x="84" y="116" width="52" height="14" rx="4" fill="var(--c-surface-2)" />
    <rect x="142" y="116" width="52" height="14" rx="4" fill="var(--c-surface-2)" />
  </svg>
);

/* Step 4 — launched: the same page again, with the picture in place and a
   visitor's pointer on the button. Not one of the demos — a page nobody
   owns. Repeating a real cover here would read as "this step is that
   client", and the cases section is where real work belongs. */
const LIVE = (
  <svg viewBox="0 0 220 150" className="block h-auto w-full">
    <rect x="14" y="12" width="192" height="126" rx="8" fill="var(--c-surface-3)" />
    <rect x="26" y="23" width="30" height="6" rx="3" fill="var(--c-ink)" opacity="0.7" />
    <rect x="140" y="23.5" width="18" height="5" rx="2.5" fill="var(--c-ink)" opacity="0.4" />
    <rect x="162" y="23.5" width="18" height="5" rx="2.5" fill="var(--c-ink)" opacity="0.4" />
    <rect x="184" y="23.5" width="10" height="5" rx="2.5" fill="var(--c-ink)" opacity="0.4" />
    <rect x="26" y="44" width="80" height="10" rx="5" fill="var(--c-ink)" opacity="0.85" />
    <rect x="26" y="60" width="58" height="10" rx="5" fill="var(--c-ink)" opacity="0.85" />
    <path d="M26 79 h36" stroke="var(--c-accent)" strokeWidth="3" strokeLinecap="round" />
    <rect x="26" y="88" width="56" height="18" rx="9" fill="var(--c-accent)" />
    {/* The plate now holds a picture. Every shape is drawn inside the frame
        rather than clipped to it: this drawing renders twice on the page (the
        phone copy and the desktop one) and a <clipPath> would put a duplicate
        id in the document. Abstract on purpose — it is a picture, not a
        place. */}
    <rect x="122" y="42" width="72" height="64" rx="4" fill="var(--c-accent-soft)" />
    <circle cx="145" cy="61" r="9" fill="var(--c-accent)" opacity="0.5" />
    <path d="M124 104 L150 72 L176 104 Z" fill="var(--c-accent)" opacity="0.65" />
    <path d="M160 104 L177 84 L192 104 Z" fill="var(--c-accent)" opacity="0.35" />
    <rect x="122" y="42" width="72" height="64" rx="4" fill="none" stroke="var(--c-line)" />
    <rect x="26" y="116" width="52" height="14" rx="4" fill="var(--c-surface-2)" />
    <rect x="84" y="116" width="52" height="14" rx="4" fill="var(--c-surface-2)" />
    <rect x="142" y="116" width="52" height="14" rx="4" fill="var(--c-surface-2)" />
    {/* Someone is on it. The pointer is what separates a built page from a
        launched one — the rest of the drawing is identical. */}
    <path
      d="M66 96 L66 112 L70.5 107.5 L73.5 114 L76.5 112.5 L73.5 106.5 L79 106 Z"
      fill="var(--c-ink)"
      stroke="var(--c-surface-3)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const SKETCHES = [CHAT, WIREFRAME, BUILD, LIVE];

export default function ProcessArtifact({
  step,
  className = "",
}: {
  step: number;
  className?: string;
}) {
  /* Alternating tilt, so the column reads as windows laid on a desk, not as
     a fourth grid. */
  const tilt = step % 2 === 1 ? "-rotate-1" : "rotate-1";
  return (
    <div className={`${tilt} ${className}`}>
      {/* The last window carries the pulsing dot: this one is deployed. */}
      <BrowserWindow live={step === 3}>{SKETCHES[step]}</BrowserWindow>
    </div>
  );
}
