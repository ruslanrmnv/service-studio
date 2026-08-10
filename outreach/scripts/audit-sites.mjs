#!/usr/bin/env node
/* Open every lead's website and come back with something true to say about it.

   A cold DM lives or dies on its second sentence. "Hago webs para barberías"
   is an advertisement; "he abierto vuestra web en el móvil y hay que hacer
   zoom para leer los precios" is a fact about them, and it is the reason they
   answer. This script produces those facts in bulk so the individual approach
   the outreach depends on does not cost twenty minutes a lead.

   It also picks up the Instagram handle from the site's own links, which is
   how the leads harvested by phone number end up messageable on the channel
   we actually use.

     node outreach/scripts/audit-sites.mjs            # все, у кого есть сайт
     node outreach/scripts/audit-sites.mjs --id strop-barbershop-gracia
     node outreach/scripts/audit-sites.mjs --recheck  # включая уже проверенных
*/

import { load, save, today } from "../lib/store.mjs";

const TIMEOUT_MS = 15000;
const CONCURRENCY = 6;

const AGGREGATOR_HOSTS = {
  booking_only: ["booksy.com", "fresha.com", "treatwell", "planity", "uala"],
  linktree: ["linktr.ee", "beacons.ai", "bio.link", "linkin.bio", "milkshake.app", "taplink"],
};

/* A price on a barbershop page is a number next to a euro sign, or the words
   the page uses instead of showing one. The second list is what tells apart
   "no prices" from "prices we failed to parse". */
const PRICE_RE = /(\d{1,3}\s?(€|eur\b)|(€|eur)\s?\d{1,3})/i;
const PRICE_WORDS = /(precios?|tarifas?|preus|tarifes)/i;

async function fetchSite(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const started = Date.now();
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        // Identify honestly. This is one person checking a few dozen pages.
        "User-Agent": "Mozilla/5.0 (compatible; ServiceStudioAudit/1.0; +https://www.servicestudiobyruslan.com)",
        "Accept-Language": "es-ES,es;q=0.9,ca;q=0.8",
      },
    });
    const html = await res.text();
    return { ok: res.ok, status: res.status, url: res.url, html, ms: Date.now() - started };
  } catch (err) {
    return { ok: false, status: 0, url, html: "", ms: Date.now() - started, error: err.name === "AbortError" ? "таймаут" : err.message };
  } finally {
    clearTimeout(timer);
  }
}

function instagramFromHtml(html) {
  const m = html.match(/instagram\.com\/([A-Za-z0-9._]{2,30})/);
  const handle = m?.[1] ?? "";
  return ["p", "reel", "explore", "accounts", "stories"].includes(handle) ? "" : handle;
}

function auditOne(lead, r) {
  const signals = new Set(lead.signals.filter((s) => s !== "has_website"));
  const findings = [];

  const host = (() => { try { return new URL(r.url).host.toLowerCase(); } catch { return ""; } })();
  for (const [signal, hosts] of Object.entries(AGGREGATOR_HOSTS)) {
    if (hosts.some((h) => host.includes(h))) {
      signals.add(signal);
      findings.push(signal === "booking_only" ? "своей страницы нет, только сервис бронирования" : "в шапке агрегатор ссылок");
    }
  }

  if (!r.ok) {
    signals.add("broken_site");
    /* Открой глазами прежде, чем писать «vuestra web no abre»: упасть мог
       твой wifi, а не их хостинг, и ошибиться в этом — значит начать
       знакомство с неправды. */
    findings.push(`сайт не открылся (${r.error ?? `код ${r.status}`}) — ПРОВЕРЬ ВРУЧНУЮ перед отправкой`);
    return { signals: [...signals], findings, angle: "broken_site" };
  }

  if (r.url.startsWith("http://")) {
    signals.add("broken_site");
    findings.push("нет HTTPS — браузер показывает «не защищено»");
  }

  const html = r.html;
  if (!/<meta[^>]+name=["']viewport["']/i.test(html)) {
    signals.add("not_mobile");
    findings.push("нет мета-тега viewport — на телефоне страница уезжает");
  }
  if (!PRICE_RE.test(html) && !PRICE_WORDS.test(html)) {
    signals.add("no_prices");
    findings.push("на странице не нашёл ни цен, ни слова «precios»");
  }
  if (r.ms > 6000) {
    signals.add("slow");
    findings.push(`грузится ${(r.ms / 1000).toFixed(1)} с`);
  }
  if (/wix\.com|squarespace|jimdo|webnode|000webhost/i.test(html)) {
    findings.push("собран на конструкторе");
  }
  const copyright = html.match(/©\s*(20\d{2})/);
  if (copyright && Number(copyright[1]) <= new Date().getFullYear() - 3) {
    signals.add("outdated");
    findings.push(`в подвале ${copyright[1]} год`);
  }

  const order = ["broken_site", "booking_only", "linktree", "not_mobile", "no_prices", "outdated"];
  const angle = order.find((a) => signals.has(a)) ?? "";
  if (!signals.size) signals.add("site_is_fine");

  return { signals: [...signals], findings, angle, instagram: instagramFromHtml(html) };
}

/* ------------------------------------------------------------------ main */

const args = process.argv.slice(2);
const only = args.includes("--id") ? args[args.indexOf("--id") + 1] : null;
const recheck = args.includes("--recheck");

const db = load();
const targets = db.leads.filter((l) => {
  if (only) return l.id === only;
  if (!l.website) return false;
  if (!recheck && l.notes.includes("audit:")) return false;
  return ["new", "queued"].includes(l.status);
});

if (!targets.length) {
  console.log("Проверять нечего: у лидов либо нет сайта, либо они уже проверены (--recheck перепроверит).");
  process.exit(0);
}

console.log(`Проверяю сайтов: ${targets.length}\n`);

let cursor = 0;
async function worker() {
  while (cursor < targets.length) {
    const lead = targets[cursor++];
    const r = await fetchSite(lead.website);
    const a = auditOne(lead, r);

    lead.signals = a.signals;
    if (!lead.angle && a.angle) lead.angle = a.angle;
    if (!lead.instagram && a.instagram) lead.instagram = a.instagram;
    if (a.findings.length) {
      lead.notes = `${lead.notes ? `${lead.notes}\n` : ""}${today()} audit: ${a.findings.join("; ")}`;
    }
    lead.updatedAt = today();

    const verdict = a.findings.length ? a.findings.join("; ") : "придраться не к чему — в конец очереди";
    console.log(`${lead.name.padEnd(30).slice(0, 30)} ${verdict}`);
    if (!a.findings.length) lead.priority = 3;
  }
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, targets.length) }, worker));
save(db);

const byAngle = {};
for (const l of targets) byAngle[l.angle || "—"] = (byAngle[l.angle || "—"] ?? 0) + 1;

console.log(`\nГотово. Поводы написать:`);
for (const [k, v] of Object.entries(byAngle).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(14)} ${v}`);
console.log(`
Заметки из аудита — это черновик хука, а не сам хук. Перед отправкой:
  npm run outreach -- hook <id> "he abierto vuestra web en el móvil y ..."
`);
