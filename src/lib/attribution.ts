/**
 * Where a visit came from, captured once and kept for the tab.
 *
 * A campaign link lands on one page and the request is sent from another — or
 * from the same page after a client-side navigation, which drops the query
 * string. Reading `location.search` at submit time would credit half of a
 * mailout to nobody, so this records the first URL of the session instead and
 * hands it back when the form is sent.
 */

const KEY = "ssbr:campaign";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** Some networks send a click id and no utm_* at all. The id itself is noise;
    that it is present names the network, which is the part worth keeping. */
const CLICK_IDS = ["gclid", "fbclid", "ttclid", "msclkid"] as const;

/** Per-value cap, so one long utm_content can't push the rest out of the line. */
const MAX_VALUE = 80;

/** Whole-line cap. Stays under the analytics property limit, and an email row
    stops being readable well before this anyway. */
const MAX_LENGTH = 200;

function session(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    // Storage can be blocked outright (embedded webviews, hardened privacy
    // settings). Knowing the campaign is not worth an exception on page load.
    return null;
  }
}

/** A readable one-liner for this URL, or "" when it says nothing. */
function describe(url: URL, referrer: string): string {
  const parts: string[] = [];

  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key)?.trim();
    // `utm_` off the front: five rows all starting the same way are five rows
    // you have to read past to find the one word that differs.
    if (value) parts.push(`${key.slice(4)}=${value.slice(0, MAX_VALUE)}`);
  }

  for (const key of CLICK_IDS) {
    if (url.searchParams.has(key)) parts.push(key);
  }

  // Only worth asking when the link carried no campaign of its own.
  if (parts.length === 0 && referrer) {
    try {
      const from = new URL(referrer);
      // An internal referrer is just the previous page of this same visit.
      if (from.host && from.host !== url.host) {
        parts.push(`referrer: ${from.host.slice(0, MAX_VALUE)}`);
      }
    } catch {
      /* A referrer that won't parse as a URL tells us nothing. */
    }
  }

  return parts.join(" · ").slice(0, MAX_LENGTH);
}

/**
 * Record where this visit started. Safe to call on every page: it writes only
 * when the tab holds nothing yet, so a second page can't overwrite the landing
 * page's campaign with its own empty query string. A direct visit stores "",
 * which counts as answered — the first page decides, including when it has
 * nothing to say.
 */
export function captureAttribution(): void {
  const store = session();
  if (!store || store.getItem(KEY) !== null) return;

  try {
    store.setItem(KEY, describe(new URL(window.location.href), document.referrer));
  } catch {
    /* Quota, or a storage that only pretends to be writable. Nothing to do. */
  }
}

/** What was captured for this tab, or "" for a direct visit. */
export function readAttribution(): string {
  try {
    return session()?.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}
