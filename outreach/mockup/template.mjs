/* The mockup itself: one self-contained HTML file per barbershop.

   What decides the design, in order:

   1. The page has one job — get someone into a chair. So the first screen is
      not a slogan, it is the next free slots with a barber's name against each
      one. That is the same move the Strop case is built on, and it is the most
      useful thing this business can put in front of a stranger.
   2. It has to be convincing with no photographs. I cannot pull their
      Instagram pictures, and half of what a barbershop posts is portrait video
      anyway. So the design is typographic: if `gallery` is empty the section
      is not rendered at all, and nothing looks like a hole where an image
      should be.
   3. It has to survive being read on a phone in a shop between two clients.
      Mobile first, one thumb, tap targets that are actually tappable.

   No purple, no gradient headline word, no stat row, no glass cards, no emoji
   in headings — CLAUDE.md, and also none of those things belong to a barber.
*/

import { themeVars } from "./theme.mjs";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const money = (n) => (typeof n === "number" ? `${n} €` : esc(n));

export function renderMockup(cfg, fontCss = "") {
  const {
    name, district = "", since = "", lede = "", address = "", phone = "",
    whatsapp = "", instagram = "", mapUrl = "", theme = "brass",
    hours = [], slots = [], services = [], team = [], gallery = [],
    doorNote = "", pricesAreDraft = false,
  } = cfg;

  const tel = phone.replace(/[^\d+]/g, "");
  const wa = (whatsapp || phone).replace(/[^\d]/g, "");

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(name)}${district ? ` · Barbería en ${esc(district)}` : ""}</title>
<meta name="description" content="${esc(lede || `Barbería en ${district}, Barcelona. Precios, horarios y reserva.`)}">
<meta name="robots" content="noindex, nofollow">
${fontCss ? "" : `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">`}
<style>
${fontCss}
${styles(theme)}
</style>
</head>
<body>

<a class="skip" href="#precios">Saltar a los precios</a>

<header class="bar">
  <div class="bar__in">
    <span class="bar__name">${esc(name)}</span>
    <nav class="bar__nav" aria-label="Secciones">
      <a href="#precios">Precios</a>
      ${team.length ? `<a href="#equipo">Equipo</a>` : ""}
      <a href="#donde">Dónde</a>
    </nav>
    ${tel ? `<a class="bar__call" href="tel:${esc(tel)}">Llamar</a>` : ""}
  </div>
</header>

<main>

  <section class="hero">
    <div class="hero__say">
      ${district || since ? `<p class="eyebrow">${[district && `Barbería en ${esc(district)}`, since && `desde ${esc(since)}`].filter(Boolean).join(" · ")}</p>` : ""}
      <h1>${esc(name)}</h1>
      ${lede ? `<p class="lede">${esc(lede)}</p>` : ""}
      <div class="hero__acts">
        ${wa ? `<a class="btn btn--go" href="https://wa.me/${esc(wa)}">Pedir hora por WhatsApp</a>` : ""}
        ${mapUrl ? `<a class="btn btn--quiet" href="${esc(mapUrl)}">Cómo llegar</a>` : ""}
      </div>
    </div>

    ${slots.length ? `
    <aside class="board" aria-labelledby="board-h">
      <h2 class="board__h" id="board-h">Sillones libres hoy</h2>
      <ul class="board__list">
        ${slots.map((s) => `
        <li class="slot">
          <span class="slot__time">${esc(s.time)}</span>
          <span class="slot__who">${esc(s.barber ?? "")}</span>
          <span class="slot__go" aria-hidden="true">Coger</span>
        </li>`).join("")}
      </ul>
      <p class="board__note">Se actualiza solo. Si no queda hueco, se ve el del día siguiente.</p>
    </aside>` : ""}
  </section>

  <section class="prices" id="precios">
    <div class="sec__head">
      <h2>Precios</h2>
      <p>Cada servicio con lo que dura, para que sepas cuánto vas a estar sentado.</p>
    </div>
    <ul class="list">
      ${services.map((s) => `
      <li class="row">
        <span class="row__name">${esc(s.name)}</span>
        <span class="row__dots" aria-hidden="true"></span>
        ${s.minutes ? `<span class="row__min">${esc(s.minutes)} min</span>` : ""}
        <span class="row__price">${money(s.price)}</span>
      </li>`).join("")}
    </ul>
    ${pricesAreDraft ? `<p class="draft">Estos precios son de ejemplo — dime los tuyos y te los cambio en un momento.</p>` : ""}
  </section>

  ${team.length ? `
  <section class="team" id="equipo">
    <div class="sec__head">
      <h2>Quién te corta</h2>
    </div>
    <ul class="team__list">
      ${team.map((m) => `
      <li class="mate">
        <span class="mate__mark" aria-hidden="true">${esc(initials(m.name))}</span>
        <span class="mate__name">${esc(m.name)}</span>
        ${m.role ? `<span class="mate__role">${esc(m.role)}</span>` : ""}
      </li>`).join("")}
    </ul>
  </section>` : ""}

  ${gallery.length ? `
  <section class="shots">
    <div class="sec__head"><h2>Trabajos</h2></div>
    <ul class="shots__list">
      ${gallery.map((src, i) => `<li><img src="${esc(src)}" alt="Corte hecho en ${esc(name)}, ejemplo ${i + 1}" loading="lazy"></li>`).join("")}
    </ul>
  </section>` : ""}

  <section class="where" id="donde">
    <div class="where__addr">
      <h2>Dónde estamos</h2>
      ${address ? `<p class="where__line">${esc(address)}</p>` : ""}
      ${doorNote ? `<p class="where__door">${esc(doorNote)}</p>` : ""}
      <p class="where__acts">
        ${mapUrl ? `<a class="btn btn--quiet" href="${esc(mapUrl)}">Abrir en el mapa</a>` : ""}
        ${tel ? `<a class="btn btn--quiet" href="tel:${esc(tel)}">${esc(phone)}</a>` : ""}
      </p>
    </div>
    ${hours.length ? `
    <table class="hours">
      <caption>Horario</caption>
      <tbody>
        ${hours.map((h) => `<tr><th scope="row">${esc(h.days)}</th><td>${esc(h.time)}</td></tr>`).join("")}
      </tbody>
    </table>` : ""}
  </section>

</main>

<footer class="foot">
  <p class="foot__name">${esc(name)}</p>
  <p class="foot__links">
    ${instagram ? `<a href="https://instagram.com/${esc(instagram)}">@${esc(instagram)}</a>` : ""}
    ${tel ? `<a href="tel:${esc(tel)}">${esc(phone)}</a>` : ""}
  </p>
  <p class="foot__by">Maqueta hecha por Ruslan · Service Studio, Barcelona</p>
</footer>

</body>
</html>
`;
}

function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] ?? "").join("").toUpperCase();
}

/* ------------------------------------------------------------------ styles */

function styles(theme) {
  return `
:root {
${themeVars(theme)}
    --display: "Bricolage Grotesque", "Trebuchet MS", system-ui, sans-serif;
    --body: "IBM Plex Sans", -apple-system, "Segoe UI", sans-serif;

    /* One ratio, held to everywhere. Headlines take tight leading and negative
       tracking; body copy gets room to breathe. */
    --step-0: 1rem;
    --step-1: 1.15rem;
    --step-2: clamp(1.35rem, 1.1rem + 1.2vw, 1.9rem);
    --step-3: clamp(1.8rem, 1.3rem + 2.4vw, 2.9rem);
    --step-4: clamp(2.6rem, 1.4rem + 6vw, 6rem);

    --gap: clamp(1.25rem, 4vw, 2.5rem);
    --edge: clamp(1.25rem, 5vw, 5rem);
    --rule: 1px solid var(--line);

    /* Content stops at a readable width and the rest becomes margin. Without
       this the price list sat against the left edge of a 1440px screen with
       half the page empty beside it, which reads as unfinished rather than
       as composed. */
    --measure: 76rem;
}

/* Sections that carry their own edge padding are centred including it; the
   children of the plain ones are centred on their own. Either way every left
   edge on the page lines up. */
.hero, .where, .bar__in {
  max-width: calc(var(--measure) + 2 * var(--edge));
  margin-inline: auto;
  width: 100%;
}
.prices > *, .team > *, .shots > *, .foot > * {
  max-width: var(--measure);
  margin-inline: auto;
  width: 100%;
}

*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--body);
  font-size: var(--step-0);
  line-height: 1.6;
  font-synthesis-weight: none;
}
h1, h2 { font-family: var(--display); font-weight: 800; line-height: 0.95; letter-spacing: -0.03em; margin: 0; }
p { margin: 0; }
ul { list-style: none; margin: 0; padding: 0; }
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; }

:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; border-radius: 2px; }

.skip {
  position: absolute; left: -9999px;
  background: var(--accent); color: var(--onAccent);
  padding: 0.75rem 1rem; z-index: 10; text-decoration: none;
}
.skip:focus { left: 0.5rem; top: 0.5rem; }

/* ---------------------------------------------------------------- top bar */
.bar {
  position: sticky; top: 0; z-index: 5;
  padding: 0.85rem var(--edge);
  background: color-mix(in srgb, var(--ink) 92%, transparent);
  border-bottom: var(--rule);
  backdrop-filter: blur(6px);
}
.bar__in { display: flex; align-items: center; gap: 1rem; }
.bar__name { font-family: var(--display); font-weight: 800; letter-spacing: -0.02em; font-size: 1.05rem; }
.bar__nav { display: none; margin-left: auto; gap: 1.5rem; }
.bar__nav a { text-decoration: none; color: var(--mutedSolid); font-size: 0.95rem; }
.bar__nav a:hover { color: var(--paper); }
.bar__call {
  margin-left: auto; text-decoration: none;
  border: 1px solid var(--accent); color: var(--accent);
  padding: 0.5rem 0.9rem; border-radius: 999px; font-size: 0.9rem; font-weight: 500;
  min-height: 44px; display: inline-flex; align-items: center;
}
@media (min-width: 60rem) {
  .bar__nav { display: flex; }
  .bar__call { margin-left: 0; }
}

/* ------------------------------------------------------------------- hero */
.hero {
  display: grid; gap: var(--gap);
  padding: clamp(2.5rem, 8vw, 6rem) var(--edge) clamp(2rem, 6vw, 4.5rem);
  border-bottom: var(--rule);
}
@media (min-width: 62rem) {
  /* Asymmetric on purpose: the name reads first and wide, the board sits
     beside it like a sign on the wall rather than under a centred slogan. */
  .hero { grid-template-columns: minmax(0, 1.25fr) minmax(20rem, 0.85fr); align-items: end; gap: clamp(2rem, 5vw, 5rem); }
}
.eyebrow {
  font-size: 0.82rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 1.25rem; font-weight: 600;
}
h1 { font-size: var(--step-4); text-wrap: balance; }
.lede { font-size: var(--step-2); line-height: 1.35; margin-top: 1.25rem; max-width: 30ch; color: var(--paper); }
.hero__acts { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: clamp(1.75rem, 4vw, 2.5rem); }

.btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 48px; padding: 0.75rem 1.35rem;
  text-decoration: none; font-weight: 600; font-size: 1rem;
  border-radius: 2px; border: 1px solid transparent;
}
.btn--go { background: var(--accent); color: var(--onAccent); }
.btn--go:hover { filter: brightness(1.08); }
.btn--quiet { border-color: var(--line); color: var(--paper); }
.btn--quiet:hover { border-color: var(--accent); color: var(--accent); }

/* --------------------------------------------------------- the slot board */
.board { border: var(--rule); background: var(--surface); padding: clamp(1.25rem, 3vw, 1.75rem); }
.board__h {
  font-size: 0.82rem; font-family: var(--body); font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase; color: var(--mutedSolid);
  margin-bottom: 1rem; letter-spacing: 0.14em;
}
.slot {
  display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 1rem;
  padding: 0.9rem 0; border-top: var(--rule); min-height: 56px;
}
.slot:first-child { border-top: 0; }
.slot__time { font-family: var(--display); font-weight: 800; font-size: 1.5rem; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.slot__who { color: var(--mutedSolid); font-size: 0.95rem; }
.slot__go { color: var(--accent); font-weight: 600; font-size: 0.95rem; }
.board__note { margin-top: 1rem; color: var(--mutedSolid); font-size: 0.85rem; line-height: 1.45; }

/* --------------------------------------------------------------- sections */
.sec__head { margin-bottom: clamp(1.75rem, 4vw, 2.75rem); }
.sec__head h2 { font-size: var(--step-3); }
.sec__head p { color: var(--mutedSolid); margin-top: 0.85rem; max-width: 44ch; }

.prices, .team, .shots, .where { padding: clamp(2.75rem, 7vw, 5.5rem) var(--edge); border-bottom: var(--rule); }

/* A barbershop price list is a real typographic form. Leaders, tabular
   numbers, one line per service — not a grid of cards with drop shadows. */
/* Two columns once there is room, the way a price board on a wall is set —
   and it stops the list from hugging the left edge of a wide screen with
   nothing beside it. */
@media (min-width: 62rem) {
  .list { columns: 2; column-gap: clamp(2.5rem, 5vw, 4.5rem); }
  .row { break-inside: avoid; }
}
.row {
  display: grid; grid-template-columns: auto 1fr auto auto; align-items: baseline; gap: 0.6rem;
  padding: 0.85rem 0; border-bottom: var(--rule);
}
.row__name { font-size: var(--step-1); font-weight: 500; }
.row__dots { border-bottom: 1px dotted color-mix(in srgb, var(--mutedSolid) 60%, transparent); transform: translateY(-0.28em); min-width: 1.5rem; }
.row__min { color: var(--mutedSolid); font-size: 0.85rem; font-variant-numeric: tabular-nums; }
.row__price {
  font-family: var(--display); font-weight: 800; font-size: var(--step-1);
  font-variant-numeric: tabular-nums; letter-spacing: -0.02em; min-width: 3.5rem; text-align: right;
}
@media (max-width: 30rem) {
  /* Two lines rather than four squeezed columns: the name keeps its own line
     and the duration tucks under it, so nothing wraps mid-word.
     Every cell is placed by hand. Hiding the leaders removes a grid item, and
     auto-placement then filled the holes by moving the price ahead of the
     name — the phone was showing "18 € Corte de pelo". */
  .row { grid-template-columns: 1fr auto; row-gap: 0.1rem; }
  .row__dots { display: none; }
  .row__name { grid-column: 1; grid-row: 1; }
  .row__min { grid-column: 1; grid-row: 2; font-size: 0.8rem; }
  .row__price { grid-column: 2; grid-row: 1 / span 2; align-self: center; justify-self: end; }
}
.draft {
  margin-top: 1.5rem; padding: 0.9rem 1.1rem;
  border-left: 3px solid var(--accent); background: var(--surface);
  color: var(--mutedSolid); font-size: 0.92rem; max-width: 46rem;
}

/* ------------------------------------------------------------------- team */
.team__list { display: grid; gap: 1px; background: var(--line); border: var(--rule); }
@media (min-width: 40rem) { .team__list { grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); } }
.mate { background: var(--ink); padding: 1.5rem; display: grid; gap: 0.35rem; }
.mate__mark {
  font-family: var(--display); font-weight: 800; font-size: 1.5rem;
  color: var(--accent); letter-spacing: -0.02em; margin-bottom: 0.5rem;
}
.mate__name { font-size: var(--step-1); font-weight: 600; }
.mate__role { color: var(--mutedSolid); font-size: 0.9rem; }

/* ------------------------------------------------------------------ shots */
.shots__list { display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); }
.shots__list img { aspect-ratio: 4 / 5; object-fit: cover; width: 100%; }

/* ------------------------------------------------------------------ where */
.where { display: grid; gap: var(--gap); }
@media (min-width: 52rem) { .where { grid-template-columns: 1.2fr 0.8fr; gap: clamp(2rem, 5vw, 4rem); } }
.where h2 { font-size: var(--step-3); margin-bottom: 1.25rem; }
.where__line { font-size: var(--step-1); }
.where__door { color: var(--mutedSolid); margin-top: 0.75rem; max-width: 40ch; }
.where__acts { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.75rem; }
.hours { border-collapse: collapse; width: 100%; text-align: left; }
.hours caption {
  text-align: left; font-size: 0.82rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--mutedSolid); padding-bottom: 0.85rem; font-weight: 600;
}
.hours th, .hours td { padding: 0.7rem 0; border-bottom: var(--rule); font-weight: 400; }
.hours td { text-align: right; font-variant-numeric: tabular-nums; }

/* ------------------------------------------------------------------- foot */
.foot { padding: clamp(2.5rem, 6vw, 4rem) var(--edge); display: grid; gap: 0.75rem; }
.foot__name { font-family: var(--display); font-weight: 800; font-size: var(--step-2); letter-spacing: -0.02em; }
.foot__links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.foot__links a { color: var(--mutedSolid); text-decoration: none; }
.foot__links a:hover { color: var(--accent); }
.foot__by { color: var(--mutedSolid); font-size: 0.85rem; margin-top: 1rem; }

/* --------------------------------------------------------------- movement */
/* One thing moves, once, on load: the hero settles. Everything else is still. */
@media (prefers-reduced-motion: no-preference) {
  .hero__say > *, .board { animation: rise 0.7s cubic-bezier(0.2, 0.7, 0.3, 1) both; }
  .hero__say > *:nth-child(2) { animation-delay: 0.06s; }
  .hero__say > *:nth-child(3) { animation-delay: 0.12s; }
  .hero__say > *:nth-child(4) { animation-delay: 0.18s; }
  .board { animation-delay: 0.22s; }
  @keyframes rise { from { opacity: 0; transform: translateY(0.75rem); } to { opacity: 1; transform: none; } }
}
`;
}
