"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals its children with a rise-in when they scroll into view. Motion lives
 * in CSS (.reveal / .is-visible); under prefers-reduced-motion the CSS shows
 * content immediately, so this just adds the class once and never hides content.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in ms. */
  delay?: number;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Deterministic fast-path: if it's already on screen at mount, reveal it
    // now rather than waiting on the observer (guards against ever getting
    // stuck at opacity 0 for above-the-fold content).
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (el.getBoundingClientRect().top < window.innerHeight) {
      timers.push(setTimeout(() => setVisible(true), 0));
    }

    /* The huge top margin extends the observer's root upwards without limit, so
       anything that ends up above the viewport counts as intersecting. Without
       it, a fast flick or a reload part-way down the page can carry an element
       past the viewport between two observer samples — no intersection change
       is ever reported and the content stays at opacity 0 for good. The bottom
       margin keeps the original timing: reveal 6% before the lower edge. */
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "100000px 0px -6% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
