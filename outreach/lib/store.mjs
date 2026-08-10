/* Reading and writing the lead file.
   The store is a single JSON file rather than a database on purpose: the whole
   point is that one person can open it, eyeball it, fix a typo in a phone
   number, and hand it to the next tool. It is git-ignored — see outreach/README.md. */

import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const OUTREACH_DIR = resolve(HERE, "..");
export const DATA_DIR = resolve(OUTREACH_DIR, "data");
export const LEADS_PATH = resolve(DATA_DIR, "leads.json");

export const SCHEMA_VERSION = 1;

/** A lead as it exists once every optional field has a value we can rely on. */
function normalizeLead(raw) {
  return {
    id: raw.id,
    name: raw.name,
    niche: raw.niche ?? "barbershop",
    district: raw.district ?? "",
    address: raw.address ?? "",
    maps: raw.maps ?? "",
    instagram: raw.instagram ?? "", // handle without the @
    followers: raw.followers ?? null,
    phone: raw.phone ?? "",
    whatsapp: raw.whatsapp ?? "",
    email: raw.email ?? "",
    website: raw.website ?? "",
    rating: raw.rating ?? null,
    reviews: raw.reviews ?? null,
    owner: raw.owner ?? "", // first name of whoever answers, if we know it
    lang: raw.lang ?? "es",
    verified: raw.verified ?? false,
    signals: raw.signals ?? [],
    angle: raw.angle ?? "", // which template the first message uses
    hook: raw.hook ?? "", // the one true observation, in Spanish, in their message
    status: raw.status ?? "new",
    priority: raw.priority ?? 2, // 1 hot, 2 normal, 3 later
    channel: raw.channel ?? "instagram",
    touches: raw.touches ?? [],
    nextActionAt: raw.nextActionAt ?? "",
    discountOffered: raw.discountOffered ?? false, // мы озвучили скидку
    dealDiscounted: raw.dealDiscounted ?? false, // сделка закрыта по 300 — занимает место
    dealPrice: raw.dealPrice ?? null,
    notes: raw.notes ?? "",
    createdAt: raw.createdAt ?? today(),
    updatedAt: raw.updatedAt ?? today(),
  };
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(isoDate, days) {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(fromIso, toIso) {
  const a = new Date(`${fromIso}T12:00:00Z`).getTime();
  const b = new Date(`${toIso}T12:00:00Z`).getTime();
  return Math.round((b - a) / 86400000);
}

export function emptyDb() {
  return {
    version: SCHEMA_VERSION,
    city: "Barcelona",
    niche: "barbershop",
    campaign: "barbers-bcn",
    /* How many of the discounted slots are still open. The message templates
       read this, so the "quedan 2" in a DM is never a number I made up. */
    discountSlotsTotal: 3,
    leads: [],
  };
}

export function load() {
  if (!existsSync(LEADS_PATH)) return emptyDb();
  const db = JSON.parse(readFileSync(LEADS_PATH, "utf8"));
  db.leads = (db.leads ?? []).map(normalizeLead);
  return { ...emptyDb(), ...db };
}

export function save(db) {
  mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${LEADS_PATH}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(db, null, 2)}\n`, "utf8");
  renameSync(tmp, LEADS_PATH); // never leave a half-written lead file behind
}

export function loadJson(path) {
  return JSON.parse(readFileSync(resolve(path), "utf8"));
}

/** A stable, readable id: "strop-barbershop-gracia". */
export function slugify(...parts) {
  return parts
    .filter(Boolean)
    .join("-")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export function uniqueId(db, base) {
  let id = base || "lead";
  let n = 2;
  while (db.leads.some((l) => l.id === id)) id = `${base}-${n++}`;
  return id;
}

export function findLead(db, needle) {
  const key = String(needle).toLowerCase();
  return (
    db.leads.find((l) => l.id === key) ??
    db.leads.find((l) => l.instagram.toLowerCase() === key.replace(/^@/, "")) ??
    db.leads.find((l) => l.name.toLowerCase().includes(key))
  );
}

export { normalizeLead };
