#!/usr/bin/env node
/* Pull barbershops out of Google Places, district by district, and write a
   file the tracker can import.

   Why this and not a scraper: Places is the same index the customer searches,
   it says outright whether a business has a website, and using it does not
   put the account that sends the DMs at risk. The "no website" flag is the
   whole product here — it is the difference between two hundred names and
   forty businesses with a reason to answer.

   Needs GOOGLE_PLACES_API_KEY in the environment or in .env.local.

   What this costs. The field mask below asks for websiteUri, phone, rating and
   review count, which puts every request in the Text Search **Enterprise**
   SKU — the dearest tier. That is not an oversight: websiteUri is the "they
   have no website" signal, which is the entire point, and there is no cheaper
   field that carries it.

   The sums, though, are small. 25 districts × 2 phrasings = 50 queries, each
   walking at most 3 pages, so a full sweep of Barcelona is 50–150 billable
   requests. The Enterprise free allowance is 1,000 requests a month per
   billing account. A full sweep is therefore free, and you would need about
   seven of them in one calendar month before Google charged anything at all.

   Two things worth knowing anyway: a query that returns nothing is still
   billed, and attaching a billing account removes the daily cap that was
   protecting you. Set a quota ceiling — see outreach/README.md.

     node outreach/scripts/harvest-places.mjs
     node outreach/scripts/harvest-places.mjs --districts Gràcia,Sants --max-reviews 400
     npm run outreach import outreach/data/harvest-2026-08-10.json
*/

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { DATA_DIR, slugify, today } from "../lib/store.mjs";

const ENDPOINT = "https://places.googleapis.com/v1/places:searchText";

const FIELDS = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.websiteUri",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.rating",
  "places.userRatingCount",
  "places.googleMapsUri",
  "places.businessStatus",
  "nextPageToken",
].join(",");

/* Barcelona by neighbourhood rather than by city. One "barbería en Barcelona"
   query returns the same forty famous shops every time — the ones that already
   have a website and an agency. Asking neighbourhood by neighbourhood is what
   surfaces the shop on Carrer del Torrent de l'Olla with 90 reviews and a
   Linktree. */
const DISTRICTS = [
  "Gràcia", "Vila de Gràcia", "Camp d'en Grassot",
  "Eixample Dreta", "Eixample Esquerra", "Sant Antoni", "Fort Pienc", "Sagrada Família",
  "El Born", "Barri Gòtic", "El Raval", "La Barceloneta",
  "Poble-sec", "Sants", "Hostafrancs", "La Bordeta",
  "Poblenou", "El Clot", "Sant Andreu", "El Guinardó",
  "Les Corts", "Sarrià", "Sant Gervasi", "Nou Barris", "Horta",
];

const QUERIES = ["barbería en", "peluquería de caballeros en"];

const AGGREGATORS = {
  booking_only: ["booksy.com", "fresha.com", "treatwell.es", "planity.com", "uala.it", "wahanda"],
  linktree: ["linktr.ee", "beacons.ai", "bio.link", "linkin.bio", "milkshake.app", "taplink"],
  social_only: ["instagram.com", "facebook.com", "wa.me", "business.site"],
};

/* -------------------------------------------------------------------- env */

function apiKey() {
  if (process.env.GOOGLE_PLACES_API_KEY) return process.env.GOOGLE_PLACES_API_KEY;
  const envFile = resolve(DATA_DIR, "../../.env.local");
  if (existsSync(envFile)) {
    const m = readFileSync(envFile, "utf8").match(/^GOOGLE_PLACES_API_KEY=(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  console.error(`
Нет ключа GOOGLE_PLACES_API_KEY.

  1. console.cloud.google.com → создай проект
  2. включи Places API (New)
  3. APIs & Services → Credentials → Create credentials → API key
  4. добавь в .env.local:  GOOGLE_PLACES_API_KEY=AIza...

Ключ читается только этим скриптом и на сайт не попадает.
`);
  process.exit(1);
}

/* ------------------------------------------------------------------ fetch */

/* The four ways this fails on day one, each with the fix rather than the
   status code. Without this the script grinds through fifty queries printing
   the same JSON blob and hands over an empty file. */
function diagnose(status, body) {
  const text = JSON.stringify(body);
  const reason = body?.error?.details?.[0]?.reason ?? "";

  if (reason === "API_KEY_INVALID" || /API key not valid/i.test(text)) {
    return `Ключ не принят.
  · Проверь, что скопировал его целиком, без пробелов и кавычек.
  · Ключ начинается с AIza и длиной около 39 символов.
  · Если только что создал — Google иногда думает пару минут.`;
  }
  if (reason === "SERVICE_DISABLED" || /has not been used in project|is disabled/i.test(text)) {
    return `Ключ рабочий, но Places API (New) в проекте не включён.
  Google Cloud Console → APIs & Services → Library → «Places API (New)» → Enable.
  Именно New: старый «Places API» — другой продукт, и в новых проектах его
  вообще больше нельзя включить.
  Если только что нажал Enable — подожди пару минут, включение расходится
  по серверам Google не мгновенно, и первые запросы падают с этой же ошибкой.
  В ответе Google обычно есть прямая ссылка на нужную страницу — открой её.`;
  }
  if (/billing/i.test(text)) {
    return `К этому проекту не привязан платёжный аккаунт.
  Google Cloud Console → Billing → Link a billing account.
  Аккаунт должен быть привязан именно к тому проекту, которому принадлежит
  ключ: наличие карты на аккаунте Google само по себе не считается.
  Карта обязательна даже ради бесплатного лимита — без неё API молчит.`;
  }
  if (status === 429 || reason === "RATE_LIMIT_EXCEEDED") {
    return `Упёрлись в квоту. Подожди минуту и запусти снова, либо сузь список
  районов: --districts "Gràcia,Sant Antoni".`;
  }
  if (status === 403) {
    return `Доступ запрещён. Чаще всего это ограничения ключа: если поставил
  «HTTP referrers», сними — для скрипта с ноутбука такой ключ не работает.
  Credentials → твой ключ → Application restrictions → None или IP addresses.`;
  }
  return "";
}

class PlacesError extends Error {
  constructor(status, body) {
    const hint = diagnose(status, body);
    super(hint || `Places ответил ${status}: ${JSON.stringify(body).slice(0, 300)}`);
    this.fatal = Boolean(hint); // a key/billing problem will not fix itself on the next district
    this.status = status;
  }
}

async function searchPage(key, textQuery, pageToken) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": FIELDS,
    },
    /* No page-size parameter on purpose. 20 is both the default and the
       maximum for Text Search, and the field was renamed (maxResultCount →
       pageSize) when pagination arrived — sending neither asks for exactly
       what sending either would get, and cannot break on the rename. */
    body: JSON.stringify({
      textQuery,
      languageCode: "es",
      regionCode: "ES",
      ...(pageToken ? { pageToken } : {}),
    }),
  });
  if (!res.ok) {
    let body;
    try { body = JSON.parse(await res.text()); } catch { body = {}; }
    throw new PlacesError(res.status, body);
  }
  return res.json();
}

/** Everything Places will give for one query, across its pages. */
async function searchAll(key, textQuery) {
  const out = [];
  let token;
  for (let page = 0; page < 3; page++) {
    const data = await searchPage(key, textQuery, token);
    out.push(...(data.places ?? []));
    token = data.nextPageToken;
    if (!token) break;
    await new Promise((r) => setTimeout(r, 1500)); // the token needs a moment to become valid
  }
  return out;
}

/* ----------------------------------------------------------------- shape */

function signalsFor(place) {
  const url = place.websiteUri ?? "";
  if (!url) return ["no_website"];
  const host = safeHost(url);
  for (const [signal, hosts] of Object.entries(AGGREGATORS)) {
    if (hosts.some((h) => host.includes(h))) {
      return signal === "social_only" ? ["no_website", "social_only"] : [signal];
    }
  }
  return ["has_website"]; // audit-sites.mjs decides what is wrong with it
}

function safeHost(url) {
  try { return new URL(url).host.toLowerCase(); } catch { return ""; }
}

/** An instagram.com link in the website field is the handle, handed over free. */
function instagramFrom(url) {
  const host = safeHost(url);
  if (!host.includes("instagram.com")) return "";
  try {
    return new URL(url).pathname.split("/").filter(Boolean)[0] ?? "";
  } catch { return ""; }
}

function toLead(place, district) {
  const website = place.websiteUri ?? "";
  const ig = instagramFrom(website);
  const phone = place.internationalPhoneNumber ?? place.nationalPhoneNumber ?? "";
  return {
    id: slugify(place.displayName?.text ?? "", district),
    name: place.displayName?.text ?? "",
    niche: "barbershop",
    district,
    address: place.formattedAddress ?? "",
    maps: place.googleMapsUri ?? "",
    placeId: place.id,
    website: ig ? "" : website, // an Instagram URL is not a website
    instagram: ig,
    phone,
    whatsapp: phone.replace(/[^\d+]/g, ""),
    rating: place.rating ?? null,
    reviews: place.userRatingCount ?? null,
    signals: signalsFor(place),
    status: "new",
    lang: "es",
  };
}

/* ------------------------------------------------------------------ main */

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const districts = String(flag("districts", DISTRICTS.join(","))).split(",").map((s) => s.trim());
const minReviews = Number(flag("min-reviews", 15));
const maxReviews = Number(flag("max-reviews", 600));
const onlyNoWebsite = args.includes("--only-no-website");

const key = apiKey();
const seen = new Map();
let calls = 0;

for (const district of districts) {
  for (const q of QUERIES) {
    const textQuery = `${q} ${district}, Barcelona`;
    try {
      const places = await searchAll(key, textQuery);
      calls++;
      for (const p of places) {
        if (p.businessStatus && p.businessStatus !== "OPERATIONAL") continue;
        if (seen.has(p.id)) continue;
        const lead = toLead(p, district);
        if ((lead.reviews ?? 0) < minReviews || (lead.reviews ?? 0) > maxReviews) continue;
        if (onlyNoWebsite && !lead.signals.includes("no_website")) continue;
        seen.set(p.id, lead);
      }
      console.log(`${district.padEnd(20)} ${q.padEnd(28)} → ${places.length} найдено, в списке ${seen.size}`);
    } catch (err) {
      if (err.fatal) {
        console.error(`\n${err.message}\n\nНичего не собрано. Почини это и запусти снова.\n`);
        process.exit(1);
      }
      console.error(`${district}: ${err.message}`);
    }
  }
}

const leads = [...seen.values()].sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
const noSite = leads.filter((l) => l.signals.includes("no_website")).length;

mkdirSync(DATA_DIR, { recursive: true });
const out = resolve(DATA_DIR, `harvest-${today()}.json`);
writeFileSync(out, `${JSON.stringify({ generatedAt: today(), districts, leads }, null, 2)}\n`, "utf8");

console.log(`
Готово: ${leads.length} заведений, из них без своего сайта ${noSite} — это первая очередь.
Запросов к Places: ${calls}.

  ${out}

Дальше:
  npm run outreach import ${out.replace(`${process.cwd()}/`, "")}
  npm run outreach:audit      # разобрать тех, у кого сайт всё-таки есть
  npm run outreach today
`);
