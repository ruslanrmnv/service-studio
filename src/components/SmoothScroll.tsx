"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Inertial scrolling: the wheel sets a target and the page eases toward it, so
 * a flick arrives as a glide instead of a stack of discrete jumps.
 *
 * Lenis writes the real scroll position every frame (wrapper.scrollTo) rather
 * than transforming a wrapper element, which is why nothing else on the page
 * had to change for it: the sticky header, anchor links and the CSS scroll
 * timelines in globals.css all keep working, they simply ride an eased
 * position now.
 *
 * Wheel only. syncTouch stays off, so phones keep the platform's own momentum
 * — better than anything JS imitates, and it costs no main-thread work on the
 * devices least able to spare it.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;

    function enable() {
      if (lenis) return;
      lenis = new Lenis({
        lerp: 0.1,
        autoRaf: true,
        /* Anchor jumps go through Lenis too, so arriving at a section is eased
           like every other scroll. No offset for the sticky header: Lenis reads
           scroll-padding-top off the scroller and subtracts it itself, so the
           CSS stays the one place the header's height is written down. Passing
           an offset as well lands every anchor a header lower than it should. */
        anchors: true,
      });
    }

    function disable() {
      lenis?.destroy();
      lenis = undefined;
    }

    /* Lenis has its own reduced-motion handling, but it still runs a frame loop
       and swallows wheel events to do nothing with them. Not starting it at all
       is the honest version of "no motion". */
    function sync() {
      if (reduce.matches) disable();
      else enable();
    }

    sync();
    reduce.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      disable();
    };
  }, []);

  return null;
}
