"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/* The split has to land before the browser paints, or the unsplit heading
   flashes for a frame. useLayoutEffect warns during the server pass, so the
   plain effect stands in there — it never runs anyway. */
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Reads the visual lines back out of a laid-out text node. Walks it a character
 * at a time and watches the client rect drop: a character sitting lower than
 * the one before it is the first character of a new line. This is the only way
 * to know where the browser broke the text — the break depends on the font, the
 * container width and the locale, none of which are known at build time.
 */
function measureLines(host: HTMLElement): string[] {
  const node = host.firstChild;
  if (!node || node.nodeType !== Node.TEXT_NODE) return [];
  const text = node.textContent ?? "";
  const range = document.createRange();
  const lines: string[] = [];
  let line = "";
  let top: number | null = null;

  for (let i = 0; i < text.length; i += 1) {
    range.setStart(node, i);
    range.setEnd(node, i + 1);
    /* A character that wraps reports two rects — the tail of the old line and
       the head of the new one. The last is the one it actually occupies. */
    const rects = range.getClientRects();
    const rect = rects[rects.length - 1];
    if (rect) {
      const y = Math.round(rect.top);
      if (top === null) {
        top = y;
      } else if (y - top > 2) {
        lines.push(line);
        line = "";
        top = y;
      }
    }
    line += text[i];
  }
  if (line) lines.push(line);

  return lines.map((l) => l.trim()).filter(Boolean);
}

/**
 * A section heading whose lines rise out of a slot as the section arrives.
 *
 * The heading ships from the server as ordinary text and stays that way if this
 * never runs — the masking is added on top of working markup, so there is no
 * path where a heading ends up invisible because a script didn't load.
 */
export default function MaskedHeading({
  id,
  text,
  className = "",
  as: Tag = "h2",
}: {
  id?: string;
  text: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useBeforePaint(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let width = 0;

    function build() {
      if (!el) return;
      el.textContent = text; // back to one text node, so it can be measured
      const lines = measureLines(el);
      if (lines.length === 0) return;

      el.textContent = "";
      lines.forEach((line, i) => {
        const slot = document.createElement("span");
        slot.className = "mask-line";
        slot.style.setProperty("--line-d", `${i * 90}ms`);
        const inner = document.createElement("span");
        inner.className = "mask-line-inner";
        inner.textContent = line;
        slot.appendChild(inner);
        el.appendChild(slot);
      });
    }

    build();

    /* Deferred by a tick so the masked state gets a paint of its own: adding
       the class in the same frame as the split gives the lines no starting
       position to move from, and they arrive already up. */
    const armed = setTimeout(() => el.classList.add("is-visible"), 0);

    /* Same guard as <Reveal>: the unbounded top margin means anything that ends
       up above the viewport counts as intersecting, so a fast flick or a reload
       part-way down the page can't strand a heading in its slot. */
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "100000px 0px -6% 0px" }
    );
    io.observe(el);

    function rebuild() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(build);
    }

    /* Only width matters. Observing the heading itself (not its parent) keeps
       this off a feedback loop — splitting changes the heading's height, and
       height is exactly what this ignores. */
    const ro = new ResizeObserver((entries) => {
      const next = Math.round(entries[0].contentRect.width);
      if (next === width) return;
      width = next;
      rebuild();
    });
    ro.observe(el);

    /* Fonts load with display: swap, so the first measurement can be of the
       fallback face and break in the wrong places. */
    document.fonts?.ready.then(rebuild);

    return () => {
      clearTimeout(armed);
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
    };
  }, [text]);

  return (
    /* The accessible name is pinned to the original string: the split turns each
       line into a block, and the name should not depend on where the text
       happened to wrap. */
    <Tag id={id} ref={ref} aria-label={text} className={`masked-heading ${className}`}>
      {text}
    </Tag>
  );
}
