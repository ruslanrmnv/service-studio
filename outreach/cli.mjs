#!/usr/bin/env node
/* The outreach tracker.
   Run `npm run outreach` for the list of commands, or `npm run outreach today`
   for the only one that matters most mornings. */

import { execFileSync } from "node:child_process";
import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  load, save, today, addDays, slugify, uniqueId, findLead, loadJson, OUTREACH_DIR,
} from "./lib/store.mjs";
import {
  STATUSES, OPEN_STATUSES, MAX_TOUCHES, due, exhausted, queue, funnel,
  scheduleNext, nextTouchNumber, daysSinceLastTouch, rank,
} from "./lib/pipeline.mjs";
import { compose, guessAngle, slotsLeft, trackedUrl } from "./lib/messages.mjs";
import { ANGLES, REPLIES, PRICE, DISCOUNT_PRICE } from "./templates/es.mjs";

/* ------------------------------------------------------------------ args -- */

const argv = process.argv.slice(2);
const cmd = argv[0] ?? "help";
const positional = argv.slice(1).filter((a) => !a.startsWith("--"));
const flags = {};
for (let i = 1; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  const [k, inline] = argv[i].slice(2).split("=");
  const next = argv[i + 1];
  flags[k] = inline ?? (next && !next.startsWith("--") ? next : true);
}

/* ---------------------------------------------------------------- output -- */

const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  b: (s) => `\x1b[1m${s}\x1b[0m`,
  ok: (s) => `\x1b[32m${s}\x1b[0m`,
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  hot: (s) => `\x1b[31m${s}\x1b[0m`,
};
const say = (...a) => console.log(...a);

/* Every hint printed below uses this form on purpose. `npm run outreach today`
   works, but `npm run outreach qualify x --hook "..."` does not: npm keeps
   anything starting with `--` for itself and the flag never reaches the
   script. The `--` separator is what hands the rest over. The README shows the
   shell alias that makes this shorter for daily use. */
const CMD = "npm run outreach --";
const HARVEST = "npm run outreach:osm  (бесплатно, без ключей)";

function lineFor(l) {
  const stale = daysSinceLastTouch(l);
  const bits = [
    c.b(l.name.padEnd(28).slice(0, 28)),
    (l.district || "—").padEnd(14).slice(0, 14),
    l.instagram ? `@${l.instagram}`.padEnd(22).slice(0, 22) : "".padEnd(22),
    l.status.padEnd(8),
    `${l.touches.length}/${MAX_TOUCHES}`,
    stale === null ? "     " : c.dim(`${stale}д`.padStart(4)),
    c.dim(l.id),
  ];
  return bits.join(" ");
}

function requireLead(db, needle) {
  const lead = findLead(db, needle);
  if (!lead) {
    say(c.warn(`Не нашёл лида «${needle}». Посмотри: ${CMD} list`));
    process.exit(1);
  }
  return lead;
}

function touchLead(lead) {
  lead.updatedAt = today();
}

/* Pull the machine-readable bits out of a hand-typed line, then treat whatever
   is left as the name and the district. Order-independent on purpose: the line
   is typed one-handed with the other hand scrolling Instagram, and demanding a
   column order is how a free lead source becomes a chore nobody does. */
function parseLine(line, defaultDistrict = "") {
  let rest = line;

  const urls = [...rest.matchAll(/(?:https?:\/\/)?(?:www\.)?([a-z0-9-]+\.[a-z]{2,}(?:\.[a-z]{2,})?)(\/[^\s|,;—–]*)?/gi)]
    .map((m) => m[0])
    .filter((u) => !/^\d+[.,]\d+$/.test(u));
  for (const u of urls) rest = rest.replace(u, " ");

  const igUrl = urls.find((u) => /instagram\.com/i.test(u));
  const website = urls.find((u) => !/instagram\.com/i.test(u)) ?? "";

  const at = rest.match(/@([A-Za-z0-9._]{2,30})/);
  if (at) rest = rest.replace(at[0], " ");

  const phoneMatch = rest.match(/\+?\d[\d\s().-]{7,}\d/);
  const phone = phoneMatch ? phoneMatch[0].trim() : "";
  if (phoneMatch) rest = rest.replace(phoneMatch[0], " ");

  const instagram = (at?.[1] ?? igUrl?.split("instagram.com/")[1]?.split(/[/?]/)[0] ?? "").replace(/^@/, "");

  const parts = rest
    .split(/[|—–,;]+/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  /* A line that opens with the handle has no shop name in it — what follows is
     the district. Without this "@fadeshopbcn — Gràcia" filed Gràcia as the
     name of a barbershop. */
  const handleFirst =
    Boolean(instagram) &&
    /^\s*(@[A-Za-z0-9._]+|(https?:\/\/)?(www\.)?instagram\.com\/)/i.test(line);

  return {
    name: (handleFirst ? instagram : parts[0]) ?? "",
    district: (handleFirst ? parts[0] : parts[1]) ?? defaultDistrict,
    instagram,
    website: website ? (website.startsWith("http") ? website : `https://${website}`) : "",
    phone,
    whatsapp: phone.replace(/[^\d+]/g, ""),
    email: "",
    address: "",
    lang: "es",
    notes: "",
  };
}

/* -------------------------------------------------------------- commands -- */

const commands = {
  help() {
    say(`
${c.b("Аутрич-трекер")} — ниша, список, статусы, follow-up и тексты сообщений.

  ${c.b("today")}                     что делать сегодня: очередь + просроченные follow-up
  ${c.b("list")} [--status s] [--district d] [--angle a] [--limit n]
  ${c.b("show")} <id>                 всё про одного лида
  ${c.b("stats")}                     воронка и скидочные места

  ${c.b("paste")} <file.txt>         залить список, скопированный руками из Instagram или Maps
  ${c.b("add")} --name "X" [--district] [--instagram] [--phone] [--website] [--signals a,b]
  ${c.b("import")} <file.json>        залить лидов из outreach:osm / outreach:harvest (дедуп)
  ${c.b("seed")}                      залить стартовый список кандидатов по Барселоне

  ${c.b("qualify")} <id> [--angle a] [--hook "..."] [--priority 1..3]   → статус queued
  ${c.b("hook")} <id> "наблюдение по-испански"
  ${c.b("msg")} <id> [--touch N] [--channel instagram|whatsapp|email] [--copy]
  ${c.b("touch")} <id> [--channel c] [--note "..."]    записать отправку, назначить следующий шаг
  ${c.b("status")} <id> <${Object.keys(STATUSES).join("|")}> [--note "..."] [--in N]
  ${c.b("note")} <id> "текст"

  ${c.b("board")}                     выгрузить доску в outreach/BOARD.md
  ${c.b("replies")}                   что отвечать на типовые ответы
  ${c.b("angles")}                    список поводов написать

Статусы: ${Object.entries(STATUSES).map(([k, v]) => `${c.b(k)} — ${v}`).join("; ")}
`);
  },

  today() {
    const db = load();
    const d = due(db);
    const q = queue(db).slice(0, Number(flags.limit ?? 15));
    const dead = exhausted(db);

    say(`\n${c.b(`Сегодня, ${today()}`)}  ${c.dim(`· ниша: ${db.niche} · город: ${db.city}`)}\n`);

    if (d.length) {
      say(c.hot(`Follow-up — ${d.length}`));
      for (const l of d) {
        const n = nextTouchNumber(l);
        say(`  ${lineFor(l)}  ${c.dim(`→ касание ${n}: ${CMD} msg ${l.id}`)}`);
      }
      say("");
    }

    if (q.length) {
      say(c.b(`Первое касание — готовы ${queue(db).length}, показываю ${q.length}`));
      for (const l of q) say(`  ${lineFor(l)}`);
      say(c.dim(`\n  Текст:  ${CMD} msg <id>`));
      say(c.dim(`  Отправил: ${CMD} touch <id>`));
      say("");
    }

    const unqualified = db.leads.filter((l) => l.status === "new").length;
    if (unqualified) {
      say(c.warn(`Не проверено: ${unqualified}. Проверь Instagram и сайт, потом: ${CMD} qualify <id>`));
    }
    if (dead.length) {
      say(c.dim(`Отработали все ${MAX_TOUCHES} касания и молчат: ${dead.length} → ${CMD} status <id> lost`));
    }
    if (!d.length && !q.length && !unqualified) {
      say(c.dim(`Пусто. Собери лидов: ${HARVEST}`));
    }

    const left = slotsLeft(db);
    say(c.dim(`\nСкидочных мест (${DISCOUNT_PRICE} вместо ${PRICE}): ${left} из ${db.discountSlotsTotal}`));
  },

  list() {
    const db = load();
    let leads = db.leads;
    if (flags.status) leads = leads.filter((l) => l.status === flags.status);
    else leads = leads.filter((l) => OPEN_STATUSES.includes(l.status) || flags.all);
    if (flags.district) leads = leads.filter((l) => l.district.toLowerCase().includes(String(flags.district).toLowerCase()));
    if (flags.angle) leads = leads.filter((l) => (l.angle || guessAngle(l)) === flags.angle);
    leads = leads.sort((a, b) => rank(b) - rank(a)).slice(0, Number(flags.limit ?? 60));

    say("");
    for (const l of leads) say(lineFor(l));
    say(c.dim(`\n${leads.length} шт.`));
  },

  show() {
    const db = load();
    const l = requireLead(db, positional[0]);
    say(`
${c.b(l.name)}  ${c.dim(l.id)}
  район       ${l.district || "—"}
  адрес       ${l.address || "—"}
  instagram   ${l.instagram ? `@${l.instagram}  https://instagram.com/${l.instagram}` : "—"}
  телефон     ${l.phone || "—"}${l.whatsapp ? `   whatsapp: ${l.whatsapp}` : ""}
  почта       ${l.email || "—"}
  сайт        ${l.website || c.ok("нет — это и есть повод")}
  карты       ${l.maps || "—"}
  рейтинг     ${l.rating ?? "—"} (${l.reviews ?? "—"} отзывов)
  сигналы     ${l.signals.join(", ") || "—"}
  повод       ${l.angle || guessAngle(l)} ${l.hook ? "" : c.warn("(хук не написан — сообщение будет шаблонным)")}
  хук         ${l.hook || "—"}
  статус      ${l.status}   приоритет ${l.priority}   касаний ${l.touches.length}/${MAX_TOUCHES}
  следующий   ${l.nextActionAt || "—"}
  ссылка      ${trackedUrl({ lead: l, db, channel: l.channel })}
  заметки     ${l.notes || "—"}

${l.touches.map((t) => `  · ${t.date}  ${t.channel.padEnd(9)} касание ${t.n}${t.note ? ` — ${t.note}` : ""}`).join("\n") || c.dim("  касаний ещё не было")}
`);
  },

  stats() {
    const db = load();
    const f = funnel(db);
    say(`\n${c.b("Воронка")}\n`);
    for (const [k, label] of Object.entries(STATUSES)) {
      say(`  ${k.padEnd(8)} ${String(f[k] ?? 0).padStart(4)}   ${c.dim(label)}`);
    }
    const written = db.leads.filter((l) => l.touches.length > 0).length;
    const replied = db.leads.filter((l) => ["replied", "mockup", "won"].includes(l.status)).length;
    say(`\n  всего лидов ${db.leads.length} · написали ${written} · ответили ${replied}` +
      (written ? ` · отклик ${Math.round((replied / written) * 100)}%` : ""));
    say(c.dim(`  скидочных мест свободно: ${slotsLeft(db)} из ${db.discountSlotsTotal}\n`));
  },

  add() {
    const db = load();
    if (!flags.name) return say(c.warn('Нужно --name "Название"'));
    const id = uniqueId(db, slugify(flags.name, flags.district));
    const lead = {
      id,
      name: String(flags.name),
      district: flags.district ? String(flags.district) : "",
      instagram: flags.instagram ? String(flags.instagram).replace(/^@/, "") : "",
      phone: flags.phone ? String(flags.phone) : "",
      website: flags.website ? String(flags.website) : "",
      email: flags.email ? String(flags.email) : "",
      address: flags.address ? String(flags.address) : "",
      signals: flags.signals ? String(flags.signals).split(",") : [],
      status: "new",
      createdAt: today(),
      updatedAt: today(),
      touches: [],
    };
    db.leads.push(lead);
    save(db);
    say(c.ok(`Добавил ${lead.name} → ${id}`));
  },

  import() {
    const db = load();
    const file = positional[0];
    if (!file) return say(c.warn(`Укажи файл: ${CMD} import <file.json>`));
    const incoming = loadJson(file);
    const rows = Array.isArray(incoming) ? incoming : incoming.leads ?? [];

    let added = 0, skipped = 0;
    for (const raw of rows) {
      const ig = (raw.instagram ?? "").replace(/^@/, "").toLowerCase();
      const dupe = db.leads.find(
        (l) =>
          (ig && l.instagram.toLowerCase() === ig) ||
          (raw.maps && l.maps === raw.maps) ||
          (l.name.toLowerCase() === String(raw.name ?? "").toLowerCase() && l.district === (raw.district ?? ""))
      );
      if (dupe) { skipped++; continue; }
      const id = uniqueId(db, raw.id || slugify(raw.name, raw.district));
      /* A lead with no maps link is a lead you have to google before you can
         check it. One search URL turns qualifying into a single click. */
      const maps = raw.maps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${raw.name} ${raw.district ?? ""} Barcelona`)}`;
      db.leads.push({ ...raw, id, maps, instagram: ig, status: raw.status ?? "new", touches: [], createdAt: today(), updatedAt: today() });
      added++;
    }
    save(db);
    say(c.ok(`Добавлено ${added}, пропущено дублей ${skipped}. Всего ${db.leads.length}.`));
  },

  /* Instagram has no list to download, and the useful judgement — is this
     account alive, is it a chain, who answers the messages — happens while
     looking at the profile anyway. So the cheapest source of leads is a person
     with the app open and a text file, and this parses whatever shape that
     file ends up in: a handle, a link, a phone, a name, in any order.

       Barbería BK, Sant Antoni @barberiabk_bcn
       @fadeshopbcn — Gràcia — linktr.ee/fadeshop
       Minore Barber | Eixample | minorebarber.com | +34 930 11 22 33
  */
  paste() {
    const db = load();
    const file = positional[0];
    if (!file) {
      return say(c.warn(`Укажи файл: ${CMD} paste leads.txt [--district Gràcia] [--dry]

Одна строка — один барбершоп. Порядок любой, разделители любые:
  Barbería BK, Sant Antoni @barberiabk_bcn
  @fadeshopbcn — Gràcia — linktr.ee/fadeshop
  Minore Barber | Eixample | minorebarber.com | +34 930 11 22 33

Строки, начинающиеся с #, пропускаются.`));
    }

    const lines = readFileSync(resolve(file), "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));

    const parsed = lines.map((line) => parseLine(line, flags.district ? String(flags.district) : ""));

    say("");
    for (const p of parsed) {
      say(`${c.b((p.name || "???").padEnd(26).slice(0, 26))} ${(p.district || "—").padEnd(14).slice(0, 14)} ${(p.instagram ? `@${p.instagram}` : "—").padEnd(20).slice(0, 20)} ${p.website || c.ok("сайта нет")}`);
    }

    const noName = parsed.filter((p) => !p.name).length;
    if (noName) say(c.warn(`\nБез названия: ${noName} — проверь эти строки.`));

    if (flags.dry) return say(c.dim(`\nСтрок: ${parsed.length}. Это предпросмотр — запусти без --dry, чтобы залить.`));

    let added = 0, skipped = 0;
    for (const p of parsed) {
      if (!p.name && !p.instagram) { skipped++; continue; }
      const ig = p.instagram.toLowerCase();
      if (ig && db.leads.some((l) => l.instagram.toLowerCase() === ig)) { skipped++; continue; }
      if (!ig && db.leads.some((l) => l.name.toLowerCase() === p.name.toLowerCase())) { skipped++; continue; }

      const id = uniqueId(db, slugify(p.name || p.instagram, p.district));
      db.leads.push({
        ...p,
        id,
        niche: db.niche,
        maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.name} ${p.district} Barcelona`)}`,
        signals: p.website ? ["has_website"] : ["no_website"],
        status: "new",
        touches: [],
        createdAt: today(),
        updatedAt: today(),
      });
      added++;
    }
    save(db);
    say(c.ok(`\nДобавлено ${added}, пропущено ${skipped}. Всего ${db.leads.length}.`));
    say(c.dim(`Дальше: ${CMD} qualify <id> --hook "..."`));
  },

  seed() {
    const path = resolve(OUTREACH_DIR, "data/seed-barcelona.json");
    positional[0] = path;
    commands.import();
    say(c.dim(`Это кандидаты из открытых подборок — телефоны и Instagram не проверены.\nПроверь каждого и переведи в queued: ${CMD} qualify <id>`));
  },

  qualify() {
    const db = load();
    const l = requireLead(db, positional[0]);
    if (flags.angle) l.angle = String(flags.angle);
    if (flags.hook) l.hook = String(flags.hook);
    if (flags.priority) l.priority = Number(flags.priority);
    if (flags.instagram) l.instagram = String(flags.instagram).replace(/^@/, "");
    if (flags.channel) l.channel = String(flags.channel);
    l.angle ||= guessAngle(l);
    l.verified = true;
    /* Qualifying is for leads that have not been written to yet. Re-running it
       on someone mid-conversation used to send them back to the front of the
       queue and offer to write them a first message they already got. */
    if (["new", "queued"].includes(l.status)) l.status = "queued";
    touchLead(l);
    save(db);
    say(c.ok(`${l.name} → ${l.status}, повод: ${l.angle}`));
    if (!l.hook) say(c.warn(`Хука нет. Напиши свой: ${CMD} hook ${l.id} "..."`));
  },

  hook() {
    const db = load();
    const l = requireLead(db, positional[0]);
    const text = positional.slice(1).join(" ");
    if (!text) return say(c.warn("Нужен текст наблюдения по-испански."));
    l.hook = text;
    touchLead(l);
    save(db);
    say(c.ok(`Хук записан для ${l.name}.`));
  },

  msg() {
    const db = load();
    const l = requireLead(db, positional[0]);
    const m = compose(db, l, {
      touch: flags.touch ? Number(flags.touch) : undefined,
      channel: flags.channel ? String(flags.channel) : undefined,
    });

    say(`\n${c.dim(`${l.name} · ${m.channel} · касание ${m.touch} · повод ${m.angle}`)}`);
    if (l.instagram && m.channel === "instagram") say(c.dim(`https://instagram.com/${l.instagram}`));
    if (m.subject) say(`\n${c.b("Тема:")} ${m.subject}`);
    say(`\n${"─".repeat(64)}\n${m.text}\n${"─".repeat(64)}\n`);
    for (const w of m.warnings) say(c.warn(`! ${w}`));
    say(c.dim(`Отправил → ${CMD} touch ${l.id}`));

    if (flags.copy) {
      for (const [bin, args] of [["pbcopy", []], ["xclip", ["-selection", "clipboard"]], ["wl-copy", []]]) {
        try { execFileSync(bin, args, { input: m.text }); say(c.ok("Скопировано в буфер.")); break; } catch { /* следующий */ }
      }
    }
  },

  touch() {
    const db = load();
    const l = requireLead(db, positional[0]);
    if (l.touches.length >= MAX_TOUCHES) {
      return say(c.warn(`Уже ${MAX_TOUCHES} касания. Закрывай: ${CMD} status ${l.id} lost`));
    }
    const n = l.touches.length + 1;
    l.touches.push({
      n,
      date: today(),
      channel: flags.channel ? String(flags.channel) : l.channel,
      note: flags.note ? String(flags.note) : "",
    });
    if (n === 3) l.discountOffered = true;
    if (["new", "queued"].includes(l.status)) l.status = "written";
    l.nextActionAt = scheduleNext(l);
    touchLead(l);
    save(db);
    say(c.ok(`${l.name}: касание ${n} записано.`) +
      (l.nextActionAt ? ` Следующее — ${l.nextActionAt}.` : " Касания кончились."));
  },

  status() {
    const db = load();
    const l = requireLead(db, positional[0]);
    const next = positional[1];
    if (!STATUSES[next]) return say(c.warn(`Статус должен быть один из: ${Object.keys(STATUSES).join(", ")}`));
    l.status = next;
    if (flags.note) l.notes = `${l.notes ? `${l.notes}\n` : ""}${today()}: ${flags.note}`;
    if (next === "won") {
      l.dealDiscounted = !flags["full-price"];
      l.dealPrice = flags.price ? Number(flags.price) : l.dealDiscounted ? 300 : 450;
    }
    l.nextActionAt = flags.in ? addDays(today(), Number(flags.in)) : scheduleNext(l);
    touchLead(l);
    save(db);
    say(c.ok(`${l.name} → ${next}`) + (l.nextActionAt ? ` · вернуться ${l.nextActionAt}` : ""));
    if (next === "won") {
      say(c.ok(`Сделка на ${l.dealPrice} €${l.dealDiscounted ? " (скидочное место)" : " (полная цена)"}. Мест осталось: ${slotsLeft(db)}`));
      if (l.dealDiscounted) say(c.warn("Не забудь: отзыв и разрешение поставить сайт в кейсы — это условие скидки. Договорись об этом до запуска, а не после."));
    }
  },

  note() {
    const db = load();
    const l = requireLead(db, positional[0]);
    const text = positional.slice(1).join(" ");
    l.notes = `${l.notes ? `${l.notes}\n` : ""}${today()}: ${text}`;
    touchLead(l);
    save(db);
    say(c.ok("Записал."));
  },

  board() {
    const db = load();
    const groups = Object.keys(STATUSES);
    const out = [
      `# Доска аутрича — ${db.city}, ${db.niche}`,
      "",
      `Обновлено ${today()}. Скидочных мест: ${slotsLeft(db)} из ${db.discountSlotsTotal}.`,
      "",
    ];
    for (const g of groups) {
      const rows = db.leads.filter((l) => l.status === g).sort((a, b) => rank(b) - rank(a));
      if (!rows.length) continue;
      out.push(`## ${g} — ${STATUSES[g]} (${rows.length})`, "");
      out.push("| Барбершоп | Район | Instagram | Повод | Касаний | Следующий шаг |");
      out.push("| --- | --- | --- | --- | --- | --- |");
      for (const l of rows) {
        out.push(`| ${l.name} | ${l.district || "—"} | ${l.instagram ? `@${l.instagram}` : "—"} | ${l.angle || guessAngle(l)} | ${l.touches.length}/${MAX_TOUCHES} | ${l.nextActionAt || "—"} |`);
      }
      out.push("");
    }
    const path = resolve(OUTREACH_DIR, "BOARD.md");
    writeFileSync(path, `${out.join("\n")}\n`, "utf8");
    say(c.ok(`Доска записана: ${path}`));
  },

  replies() {
    say("");
    for (const r of REPLIES) {
      say(`${c.b(r.q)}`);
      say(`${r.a.split("\n").map((s) => `  ${s}`).join("\n")}`);
      say(c.dim(`  → ${r.note}\n`));
    }
  },

  angles() {
    say("");
    for (const [k, v] of Object.entries(ANGLES)) {
      say(`${c.b(k.padEnd(14))} ${v.label}`);
      say(c.dim(`               «${v.hook}»\n`));
    }
  },
};

const run = commands[cmd] ?? commands.help;
run();
