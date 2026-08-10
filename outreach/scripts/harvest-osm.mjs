#!/usr/bin/env node
/* Lead list from OpenStreetMap. No key, no card, no billing account.

   Overpass is a public endpoint over the map everybody edits. For barbershops
   it holds name, street, phone, and often the website and the Instagram — the
   same columns the Places harvest returns, for nothing.

   What it is NOT: authoritative about the absence of a website. A shop with no
   `website` tag may simply be a shop nobody has finished tagging. So this
   marks such leads `osm_no_website_tag` rather than `no_website`, and they
   land in `new` — a list to check, not a queue to write to. Thirty seconds in
   their Instagram settles it, and that check is free too.

     node outreach/scripts/harvest-osm.mjs
     node outreach/scripts/harvest-osm.mjs --bbox 41.37,2.14,41.42,2.19
     npm run outreach -- import outreach/data/osm-2026-08-10.json
*/

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { DATA_DIR, slugify, today } from "../lib/store.mjs";

/* Public mirrors, tried in order. They are donated capacity — one query per
   run, and we back off rather than hammer. */
const ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.osm.ch/api/interpreter",
];

/* Barcelona city, south-west corner to north-east corner. A bounding box
   rather than an administrative area lookup: one less thing to resolve, and
   it cannot break when someone re-tags a boundary relation. */
const BCN_BBOX = "41.32,2.07,41.47,2.24";

/* `shop=hairdresser` is where barbershops live in OSM; `male=yes` and
   `hairdresser=barber` are how the men's ones are marked when anyone bothered.
   `shop=beauty` catches the ones tagged as salons that also cut men. */
const query = (bbox) => `
[out:json][timeout:90];
(
  node["shop"="hairdresser"](${bbox});
  way["shop"="hairdresser"](${bbox});
  node["shop"="barber"](${bbox});
  way["shop"="barber"](${bbox});
  node["shop"="beauty"]["beauty"~"barber|hairdresser"](${bbox});
);
out center tags;
`;

const IG_HOSTS = ["instagram.com"];
const AGGREGATORS = {
  booking_only: ["booksy.com", "fresha.com", "treatwell", "planity", "uala"],
  linktree: ["linktr.ee", "beacons.ai", "bio.link", "linkin.bio", "milkshake.app", "taplink"],
};

function host(url) {
  try { return new URL(url.startsWith("http") ? url : `https://${url}`).host.toLowerCase(); } catch { return ""; }
}

function handleFrom(url) {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    if (!IG_HOSTS.some((h) => u.host.toLowerCase().includes(h))) return "";
    return u.pathname.split("/").filter(Boolean)[0] ?? "";
  } catch { return ""; }
}

/** One OSM element → one lead. Exported so the shape can be tested offline. */
export function toLead(el) {
  const t = el.tags ?? {};
  const name = t.name ?? t["name:es"] ?? t["name:ca"] ?? "";
  if (!name) return null; // an unnamed shop is not a lead

  const rawSite = t.website ?? t["contact:website"] ?? t.url ?? "";
  const igTag = t["contact:instagram"] ?? t.instagram ?? "";
  const instagram = (handleFrom(igTag) || igTag.replace(/^@/, "") || handleFrom(rawSite) || "").trim();

  const site = handleFrom(rawSite) ? "" : rawSite; // an Instagram URL is not a website
  const signals = [];
  if (!site) signals.push("osm_no_website_tag");
  else {
    const h = host(site);
    let tagged = false;
    for (const [signal, hosts] of Object.entries(AGGREGATORS)) {
      if (hosts.some((x) => h.includes(x))) { signals.push(signal); tagged = true; }
    }
    if (!tagged) signals.push("has_website");
  }

  const street = [t["addr:street"], t["addr:housenumber"]].filter(Boolean).join(" ");
  const address = [street, t["addr:postcode"], t["addr:city"] ?? "Barcelona"].filter(Boolean).join(", ");
  const phone = (t.phone ?? t["contact:phone"] ?? t["contact:mobile"] ?? "").trim();
  const lat = el.lat ?? el.center?.lat;
  const lon = el.lon ?? el.center?.lon;

  return {
    id: slugify(name, t["addr:suburb"] ?? ""),
    name,
    niche: "barbershop",
    district: t["addr:suburb"] ?? t["addr:district"] ?? "",
    address,
    maps: lat && lon
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${street} Barcelona`)}`
      : "",
    osm: `https://www.openstreetmap.org/${el.type}/${el.id}`,
    website: site,
    instagram,
    phone,
    whatsapp: phone.replace(/[^\d+]/g, ""),
    rating: null,
    reviews: null,
    signals,
    status: "new",
    lang: "es",
    notes: t["opening_hours"] ? `OSM: часы ${t["opening_hours"]}` : "",
  };
}

async function ask(bbox) {
  let lastErr;
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "ServiceStudioOutreach/1.0 (+https://www.servicestudiobyruslan.com)",
        },
        body: new URLSearchParams({ data: query(bbox) }),
      });
      if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 160)}`);
      return await res.json();
    } catch (err) {
      lastErr = err;
      console.error(`${new URL(url).host} не ответил: ${err.message}`);
    }
  }
  throw new Error(`Ни одно зеркало Overpass не ответило. Последняя ошибка: ${lastErr?.message}`);
}

/* ------------------------------------------------------------------ main */

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const bbox = args.includes("--bbox") ? args[args.indexOf("--bbox") + 1] : BCN_BBOX;

  console.log(`Спрашиваю OpenStreetMap про парикмахерские в рамке ${bbox}...\n`);
  const data = await ask(bbox);

  const seen = new Map();
  for (const el of data.elements ?? []) {
    const lead = toLead(el);
    if (!lead) continue;
    const key = lead.instagram || `${lead.name.toLowerCase()}|${lead.address.toLowerCase()}`;
    if (!seen.has(key)) seen.set(key, lead);
  }

  const leads = [...seen.values()];
  const noSite = leads.filter((l) => l.signals.includes("osm_no_website_tag")).length;
  const withIg = leads.filter((l) => l.instagram).length;

  mkdirSync(DATA_DIR, { recursive: true });
  const out = resolve(DATA_DIR, `osm-${today()}.json`);
  writeFileSync(out, `${JSON.stringify({ generatedAt: today(), source: "OpenStreetMap / Overpass", bbox, leads }, null, 2)}\n`, "utf8");

  console.log(`Найдено ${leads.length} заведений.
  без тега сайта   ${noSite}   ← кандидаты в первую очередь
  с Instagram      ${withIg}   ← этим можно писать сразу

  ${out}

Дальше:
  npm run outreach -- import ${out.replace(`${process.cwd()}/`, "")}

Важно: «нет тега website» в OSM не значит «нет сайта» — значит, что никто не
дописал тег. Поэтому все приходят со статусом new. Открой профиль, убедись
глазами и переведи в очередь: npm run outreach -- qualify <id>

Данные © участники OpenStreetMap, лицензия ODbL.
`);
}
