#!/usr/bin/env node
/* Turn a lead into a mockup of their own homepage.

   The offer on the site is "the front page drawn for free in 24 hours". At one
   reply a week that is a promise you keep by hand; at five replies in a day it
   is a promise you break. This closes that gap: the tracker already knows the
   name, the district, the address and the phone, so the mockup starts filled
   in and what is left is the five minutes of looking at their Instagram that
   nobody else can do for you.

     node outreach/scripts/make-mockup.mjs --lead barberia-bk-sant-antoni
     # правишь outreach/mockups/barberia-bk-sant-antoni.json
     node outreach/scripts/make-mockup.mjs --lead barberia-bk-sant-antoni --shot

   `--shot` снимает две картинки — телефон и десктоп. В Instagram картинку
   открывают чаще, чем ссылку, так что первым делом уходит скриншот, а ссылка
   следом, если попросят.
*/

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { load, findLead, OUTREACH_DIR } from "../lib/store.mjs";
import { renderMockup } from "../mockup/template.mjs";
import { THEMES } from "../mockup/theme.mjs";
import { inlineFontCss } from "./fetch-fonts.mjs";

const MOCKUP_DIR = resolve(OUTREACH_DIR, "mockups");

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(`--${n}`); return i === -1 ? d : args[i + 1]; };
const has = (n) => args.includes(`--${n}`);

/* Draft content. Everything here is plausible for a Barcelona neighbourhood
   barbershop and none of it is true about *this* one, which is why the page
   says so out loud and why the checklist below is printed every single run.
   A mockup that quietly shows invented prices to the owner is worse than no
   mockup: it says I did not look. */
function scaffold(lead) {
  return {
    slug: lead.id,
    name: lead.name,
    district: lead.district,
    since: "",
    lede: "Corte y barba en el barrio, sin prisa y sin sorpresas en el precio.",
    address: lead.address,
    phone: lead.phone,
    whatsapp: lead.whatsapp,
    instagram: lead.instagram,
    mapUrl: lead.maps,
    theme: "brass",
    pricesAreDraft: true,
    slots: [
      { time: "12:30", barber: "" },
      { time: "13:15", barber: "" },
      { time: "17:00", barber: "" },
      { time: "18:45", barber: "" },
    ],
    services: [
      { name: "Corte de pelo", minutes: 30, price: 18 },
      { name: "Corte + barba", minutes: 45, price: 27 },
      { name: "Arreglo de barba", minutes: 20, price: 12 },
      { name: "Afeitado clásico a navaja", minutes: 30, price: 20 },
      { name: "Corte infantil", minutes: 30, price: 15 },
    ],
    team: [],
    gallery: [],
    hours: [
      { days: "Lunes a viernes", time: "10:00 – 20:00" },
      { days: "Sábado", time: "10:00 – 14:00" },
      { days: "Domingo", time: "Cerrado" },
    ],
    doorNote: "",
  };
}

const leadId = flag("lead");
/* `--config` renders a file directly, with no lead behind it. That is how the
   finished example ships: `--config outreach/mockup/demo.json` shows what a
   filled-in mockup looks like, which is a faster brief than any description of
   which fields matter. */
const configFlag = flag("config");

if (!leadId && !configFlag) {
  console.error(`
Укажи лида:   node outreach/scripts/make-mockup.mjs --lead <id>
Или пример:   node outreach/scripts/make-mockup.mjs --config outreach/mockup/demo.json

Темы: ${Object.entries(THEMES).map(([k, v]) => `\n  ${k.padEnd(6)} ${v.label}`).join("")}
`);
  process.exit(1);
}

const db = leadId ? load() : null;
const lead = leadId ? findLead(db, leadId) : null;
if (leadId && !lead) {
  console.error(`Не нашёл лида «${leadId}».`);
  process.exit(1);
}

mkdirSync(MOCKUP_DIR, { recursive: true });
const configPath = configFlag ? resolve(configFlag) : resolve(MOCKUP_DIR, `${lead.id}.json`);

let fresh = false;
if (!existsSync(configPath)) {
  writeFileSync(configPath, `${JSON.stringify(scaffold(lead), null, 2)}\n`, "utf8");
  fresh = true;
}

const cfg = JSON.parse(readFileSync(configPath, "utf8"));
if (has("theme")) cfg.theme = flag("theme");
if (!THEMES[cfg.theme]) {
  console.error(`Тема «${cfg.theme}» не существует. Есть: ${Object.keys(THEMES).join(", ")}`);
  process.exit(1);
}

const outSlug = lead ? lead.id : (cfg.slug || "demo");
const outDir = resolve(MOCKUP_DIR, outSlug);
mkdirSync(outDir, { recursive: true });
const htmlPath = resolve(outDir, "index.html");
/* Fonts inlined when they have been cached, and a Google Fonts link when
   they have not. Either way the page renders; only one of the two survives
   being opened on a train. */
const fontCss = inlineFontCss();
writeFileSync(htmlPath, renderMockup(cfg, fontCss), "utf8");
if (!fontCss) console.log("Шрифты не закэшированы — макет тянет их из интернета.\n  Сделай один раз:  node outreach/scripts/fetch-fonts.mjs\n");

console.log(`
Макет собран:  ${htmlPath}
Данные:        ${configPath}   (тема: ${cfg.theme} — ${THEMES[cfg.theme].label})
`);

if (fresh || cfg.pricesAreDraft) {
  console.log(`Заполни по их Instagram — 5 минут, и всё на странице становится правдой:

  1. services   настоящие цены и длительность (сейчас черновые, страница честно об этом пишет)
  2. team       имена мастеров — их видно в постах и в отметках
  3. slots      имена мастеров рядом со временем
  4. lede       одна строка про них: чем этот барбершоп отличается от соседнего
  5. hours      часы работы — есть в Google Maps
  6. theme      ${Object.keys(THEMES).join(" / ")} — под их картинку в профиле
  7. gallery    пути к фото, если скачал пару кадров; пусто — секция просто не появится

  Потом убери "pricesAreDraft": true — и полоска про примерные цены исчезнет.
`);
}

/* -------------------------------------------------------------- скриншоты */

if (has("shot")) {
  const shots = [
    { name: "phone", size: "390,844" },
    { name: "desktop", size: "1440,900" },
  ];
  for (const s of shots) {
    const out = resolve(outDir, `${outSlug}-${s.name}.png`);
    try {
      execFileSync(
        "npx",
        ["--yes", "playwright", "screenshot", `--viewport-size=${s.size}`, "--full-page",
          "--wait-for-timeout=1200", `file://${htmlPath}`, out],
        { stdio: "pipe" }
      );
      console.log(`Скриншот ${s.name}: ${out}`);
    } catch (err) {
      console.error(`Скриншот ${s.name} не вышел — нужен playwright (npm i -D playwright).\n${String(err.stderr ?? err).slice(0, 200)}`);
      break;
    }
  }
}

console.log(`
Открыть:   open ${htmlPath}
Выложить:  npx vercel deploy ${outDir}   →  ссылка, которую можно дать в переписке

В Instagram сначала уходит скриншот (--shot), ссылка — если попросят: картинку
в директе открывают, ссылку от незнакомого чаще нет.
`);
