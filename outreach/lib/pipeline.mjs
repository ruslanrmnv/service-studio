/* The pipeline: what a status means, when the next touch is due, and when a
   lead has had enough.

   The cadence is deliberately short at the start and long at the end. A
   barbershop owner reads a DM between two clients or not at all; the second
   nudge three days later catches the ones who meant to answer and forgot,
   which in cold outreach is most of the ones who ever answer. */

import { addDays, today, daysBetween } from "./store.mjs";

export const STATUSES = {
  new: "найден, ещё не проверен",
  queued: "проверен, сообщение готово — можно писать",
  written: "написали первое сообщение",
  replied: "ответил",
  mockup: "макет отправлен",
  won: "клиент",
  lost: "не ответил / отказ",
  skip: "не наша ЦА",
};

export const OPEN_STATUSES = ["new", "queued", "written", "replied", "mockup"];
export const ACTIVE_STATUSES = ["written", "replied", "mockup"];

/** Days to wait before the next touch, by how many touches have happened. */
const COLD_CADENCE = [3, 5, 10];
export const MAX_TOUCHES = 4;

/* A lead who answered, or who has the mockup in hand, is warm: waiting five
   days on a warm lead is how a warm lead becomes a cold one. */
const WARM_WAIT = 2;

export function scheduleNext(lead) {
  const last = lead.touches.at(-1)?.date ?? today();

  if (lead.status === "replied" || lead.status === "mockup") {
    return addDays(last, WARM_WAIT);
  }
  if (lead.status !== "written") return "";

  const n = lead.touches.length;
  if (n >= MAX_TOUCHES) return ""; // nothing left to send — `due` will retire it
  return addDays(last, COLD_CADENCE[Math.min(n - 1, COLD_CADENCE.length - 1)]);
}

/** Which touch number the next message would be (1 = first contact). */
export function nextTouchNumber(lead) {
  return Math.min(lead.touches.length + 1, MAX_TOUCHES);
}

/** Leads whose next action is due today or overdue, hottest first. */
export function due(db, on = today()) {
  return db.leads
    .filter((l) => ACTIVE_STATUSES.includes(l.status))
    .filter((l) => l.nextActionAt && l.nextActionAt <= on)
    .filter((l) => l.touches.length < MAX_TOUCHES || l.status !== "written")
    .sort((a, b) => rank(b) - rank(a) || a.nextActionAt.localeCompare(b.nextActionAt));
}

/** Cold leads that ran out of touches and should be closed out. */
export function exhausted(db) {
  return db.leads.filter(
    (l) => l.status === "written" && l.touches.length >= MAX_TOUCHES
  );
}

/** Ready for a first message, best-fit first. */
export function queue(db) {
  return db.leads
    .filter((l) => l.status === "queued")
    .sort((a, b) => rank(b) - rank(a));
}

/* Fit score. Reviews count more than rating: a shop with 180 reviews and 4.5
   has a real stream of customers and something to protect, while 4.9 from 11
   reviews is a shop that opened in March. Anything above ~600 reviews is
   usually a chain with a marketing budget and someone else's contract. */
function rank(lead) {
  let s = 0;
  s += (4 - lead.priority) * 30;
  if (lead.signals.includes("no_website")) s += 25;
  if (lead.signals.includes("booking_only")) s += 20;
  if (lead.signals.includes("linktree")) s += 18;
  if (lead.signals.includes("broken_site")) s += 22;
  if (lead.signals.includes("not_mobile")) s += 15;
  if (lead.signals.includes("no_prices")) s += 12;
  if (lead.instagram) s += 10;
  if (lead.verified) s += 8;

  const r = lead.reviews ?? 0;
  if (r >= 30 && r <= 600) s += 15;
  if (r > 600) s -= 20;
  if ((lead.rating ?? 0) >= 4.4) s += 8;

  return s;
}

export { rank };

export function funnel(db) {
  const counts = Object.fromEntries(Object.keys(STATUSES).map((k) => [k, 0]));
  for (const l of db.leads) counts[l.status] = (counts[l.status] ?? 0) + 1;
  return counts;
}

/** How stale an active lead is, for the board. */
export function daysSinceLastTouch(lead, on = today()) {
  const last = lead.touches.at(-1)?.date;
  return last ? daysBetween(last, on) : null;
}
