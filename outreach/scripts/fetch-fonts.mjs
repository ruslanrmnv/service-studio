#!/usr/bin/env node
/* Cache the two webfonts locally so a mockup can carry them inside itself.

   A mockup gets opened on a phone in a shop with bad wifi, forwarded as a
   file, and looked at three days later. A page that waits on fonts.gstatic.com
   for its display face is a page that sometimes arrives in Arial, and the type
   is doing most of the work in this design.

   Both faces are SIL Open Font License, which allows redistribution — the
   licence text travels with them.

     node outreach/scripts/fetch-fonts.mjs
*/

import { writeFileSync, mkdirSync, existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { OUTREACH_DIR } from "../lib/store.mjs";

export const FONT_DIR = resolve(OUTREACH_DIR, "mockup/fonts");

/* Only the weights the design uses. Every extra weight is another 20 KB in
   every mockup for a style nothing on the page asks for. */
const FACES = [
  { family: "Bricolage Grotesque", weight: 800, css: "Bricolage+Grotesque:opsz,wght@12..96,800" },
  { family: "IBM Plex Sans", weight: 400, css: "IBM+Plex+Sans:wght@400" },
  { family: "IBM Plex Sans", weight: 500, css: "IBM+Plex+Sans:wght@500" },
  { family: "IBM Plex Sans", weight: 600, css: "IBM+Plex+Sans:wght@600" },
];

// Without a modern UA, Google serves the ttf fallback stylesheet instead of woff2.
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

const fileFor = (family, weight) =>
  `${family.toLowerCase().replace(/\s+/g, "-")}-${weight}.woff2`;

/** The `latin` subset only: Spanish and Catalan both live in it. */
function latinSrc(css) {
  const blocks = css.split("/*").map((b) => `/*${b}`);
  const latin = blocks.find((b) => b.trimStart().startsWith("/* latin */"));
  return (latin ?? css).match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)?.[1];
}

export async function fetchFonts() {
  mkdirSync(FONT_DIR, { recursive: true });
  for (const face of FACES) {
    const out = resolve(FONT_DIR, fileFor(face.family, face.weight));
    if (existsSync(out)) {
      console.log(`уже есть  ${fileFor(face.family, face.weight)}`);
      continue;
    }
    const cssRes = await fetch(`https://fonts.googleapis.com/css2?family=${face.css}&display=swap`, {
      headers: { "User-Agent": UA },
    });
    if (!cssRes.ok) throw new Error(`css ${cssRes.status} для ${face.family}`);
    const url = latinSrc(await cssRes.text());
    if (!url) throw new Error(`не нашёл latin-подмножество для ${face.family} ${face.weight}`);

    const fontRes = await fetch(url);
    if (!fontRes.ok) throw new Error(`шрифт ${fontRes.status} для ${face.family}`);
    const buf = Buffer.from(await fontRes.arrayBuffer());
    writeFileSync(out, buf);
    console.log(`скачал    ${fileFor(face.family, face.weight)}  ${(buf.length / 1024).toFixed(1)} КБ`);
  }
}

/**
 * @font-face rules with the fonts inlined as data URIs, or "" if nothing is
 * cached — in which case the template keeps the Google Fonts link and the page
 * still renders correctly on any machine with a connection.
 */
export function inlineFontCss() {
  if (!existsSync(FONT_DIR)) return "";
  const files = readdirSync(FONT_DIR).filter((f) => f.endsWith(".woff2"));
  if (!files.length) return "";

  return FACES.map((face) => {
    const file = fileFor(face.family, face.weight);
    if (!files.includes(file)) return "";
    const b64 = readFileSync(resolve(FONT_DIR, file)).toString("base64");
    return `@font-face {
  font-family: "${face.family}";
  font-style: normal;
  font-weight: ${face.weight};
  font-display: swap;
  src: url(data:font/woff2;base64,${b64}) format("woff2");
}`;
  }).filter(Boolean).join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await fetchFonts();
  const total = readdirSync(FONT_DIR)
    .filter((f) => f.endsWith(".woff2"))
    .reduce((n, f) => n + readFileSync(resolve(FONT_DIR, f)).length, 0);
  console.log(`
Готово. ${(total / 1024).toFixed(0)} КБ на макет — столько весит одна фотография
из инстаграма, зато страница открывается одинаково у всех и без интернета.

Лицензия обоих шрифтов — SIL Open Font License, распространять можно.
`);
}
