"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Records where the visit came from, once, on the first page of the tab.
 *
 * It sits in the layout rather than inside the form because the two are often
 * not the same page: a campaign link points at the case page or lands on the
 * bare domain and is redirected, and by the time the visitor reaches the form
 * the query string that named the campaign is gone.
 */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
