"use client";

import { Fragment, useEffect, useLayoutEffect, useRef } from "react";

/* The glint has to be in place before the browser paints, or it arrives a
   frame late over words that are already showing. useLayoutEffect warns during
   the server pass, so the plain effect stands in there — it never runs anyway. */
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

/* The marker stroke. Uncovered by a mask sweeping left to right, never an
   outline drawing itself: a wipe reads as ink going down, a self-drawing path
   reads as a diagram being generated. Two passes, the second lighter, because
   one clean sweep is not what a marker leaves behind. */
function MarkerStroke() {
  return (
    <svg
      aria-hidden="true"
      className="mark-stroke"
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
    >
      <path className="s1" d="M3 8.5 C 48 3.5, 105 11, 197 5.5" />
      <path className="s2" d="M12 11 C 70 7.5, 128 12.5, 186 9" />
    </svg>
  );
}

/**
 * A heading that comes up slowly, the way a print comes up in the tray, with a
 * band of light crossing the finished words once — fresh ink's sheen.
 *
 * The glint is added to the DOM here rather than rendered, so the markup that
 * ships from the server carries the words exactly once: a heading that
 * contains its own text twice is a duplicated h1 to anything reading the page,
 * and the whole thing is decoration a crawler should never meet. If this never
 * runs, the heading is ordinary text and nothing is missing.
 *
 * `backtick` segments get the marker stroke — the dictionaries already use that
 * to mark the operative word.
 */
export default function PrintedHeading({
  id,
  text,
  className = "",
  as: Tag = "h2",
  style,
}: {
  id?: string;
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  /** Carries --mark-d / --glint-d for a section's own timing. */
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const plain = text.replace(/`/g, "");

  useBeforePaint(() => {
    const el = ref.current;
    if (!el || el.querySelector(".impress-glint")) return;

    /* Text only — the stroke is drawn once, by the ink. */
    const layer = document.createElement("span");
    layer.className = "impress-glint";
    layer.setAttribute("aria-hidden", "true");
    layer.textContent = plain;
    el.insertBefore(layer, el.firstChild);

    return () => layer.remove();
  }, [plain]);

  const segments = text.split("`");

  return (
    <Tag
      id={id}
      ref={ref as never}
      className={`impress ${className}`}
      style={style}
    >
      {/* The ink layer is wrapped so it can carry its own slow develop and a
          stacking order the positioned glint layer is measured against. */}
      <span className="impress-ink">
        {segments.map((segment, index) =>
          index % 2 === 1 ? (
            <span key={index} className="mark">
              {segment}
              <MarkerStroke />
            </span>
          ) : (
            <Fragment key={index}>{segment}</Fragment>
          )
        )}
      </span>
    </Tag>
  );
}
