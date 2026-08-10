/* Composing one lead's next message.

   The link this builds carries the lead id in `utm_content`, which the site
   already reads and prints in the request email (see README, "Campaign
   attribution"). So when a request lands, the email says which barbershop
   out of two hundred it came from, and the tracker can be closed without
   guessing. That is the whole reason the link is built here and not typed. */

import { PRICE, DISCOUNT_PRICE, CASE_URL, ANGLES, channels } from "../templates/es.mjs";
import { nextTouchNumber } from "./pipeline.mjs";

const SITE = "https://www.servicestudiobyruslan.com";

const MEDIUM = { instagram: "dm", whatsapp: "dm", email: "email" };

export function trackedUrl({ lead, db, channel, path = "/es" }) {
  const u = new URL(path, SITE);
  u.searchParams.set("utm_source", channel);
  u.searchParams.set("utm_medium", MEDIUM[channel] ?? "dm");
  u.searchParams.set("utm_campaign", db.campaign);
  u.searchParams.set("utm_content", lead.id);
  return u.toString();
}

/* How many discounted slots are still open.
   A slot is spent by a deal that closed at the reduced price, not by a message
   that mentioned it. Most of these close when they ask what it costs and hear
   300 — touch 3 never happens, and counting offers instead of deals would
   leave "quedan dos" in the templates forever. */
export function slotsLeft(db) {
  const won = db.leads.filter((l) => l.status === "won" && l.dealDiscounted).length;
  return Math.max(0, (db.discountSlotsTotal ?? 3) - won);
}

function slotsLine(db) {
  const n = slotsLeft(db);
  if (n >= 3) return "Están los tres libres.";
  if (n === 2) return "Quedan dos.";
  if (n === 1) return "Queda uno.";
  return "";
}

/**
 * Build the message for a lead's next (or a specific) touch.
 * Returns { touch, channel, subject, text, url, warnings }.
 */
export function compose(db, lead, { touch, channel } = {}) {
  const ch = channel ?? lead.channel ?? "instagram";
  const n = touch ?? nextTouchNumber(lead);
  const warnings = [];

  const bank = channels[ch];
  if (!bank) throw new Error(`Неизвестный канал: ${ch}`);
  const make = bank[n];
  if (!make) throw new Error(`Нет шаблона для касания ${n} в канале ${ch}`);

  const angle = lead.angle || guessAngle(lead);
  const hook = lead.hook || ANGLES[angle]?.hook || ANGLES.no_website.hook;

  if (!lead.hook) {
    warnings.push(
      `Хук взят из шаблона «${ANGLES[angle]?.label ?? angle}». Замени на конкретное наблюдение: outreach hook ${lead.id} "..."`
    );
  }
  if (n === 3 && slotsLeft(db) === 0) {
    warnings.push("Скидочные места закончились — не отправляй это касание, скидку предлагать больше нечем.");
  }

  const ctx = {
    name: lead.name,
    owner: lead.owner,
    hook,
    price: PRICE,
    discountPrice: DISCOUNT_PRICE,
    caseUrl: CASE_URL,
    siteUrl: trackedUrl({ lead, db, channel: ch }),
    slotsLine: slotsLine(db),
  };

  const out = make(ctx);
  const result = typeof out === "string" ? { text: out } : { text: out.body, subject: out.subject };

  return { touch: n, channel: ch, url: ctx.siteUrl, warnings, angle, ...result };
}

/** A first guess at the angle from the signals the harvest and audit left. */
export function guessAngle(lead) {
  const s = lead.signals ?? [];
  for (const a of ["broken_site", "booking_only", "linktree", "not_mobile", "no_prices", "outdated"]) {
    if (s.includes(a)) return a;
  }
  return lead.website ? "no_prices" : "no_website";
}

export { PRICE, DISCOUNT_PRICE, CASE_URL, ANGLES };
