import type { Metadata } from "next";
import { Golos_Text, Montserrat } from "next/font/google";
import { locales, SITE_NAME } from "@/i18n/config";
import "./globals.css";

/* The page for an address this site has never had.
   Until 2026-08-07 the proxy answered every unknown path with a redirect to the
   home page, which is a 200 — so a typo, a dead old link and /blog all looked to
   a crawler like a live page. Unknown paths now 404 honestly, which means this
   page had to become somewhere worth landing rather than Next's bare black
   default.
   It renders its own document: it sits outside [lang], so there is no locale to
   read and no layout above it. That turns the missing locale into the content —
   the one thing a lost visitor can usefully tell us is which language they read,
   and each choice is a link to that home page. */

const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-golos",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

const THEME_INIT = `(function(){try{var t=localStorage.theme;if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export const metadata: Metadata = {
  title: `404 — ${SITE_NAME}`,
  description: "Page not found.",
  robots: { index: false, follow: false },
};

/* The second line says where the link goes, not what went wrong — the heading
   already said that, and repeating it in Russian on the Russian card was the
   one thing on this page that read as filler. */
const DOORS: Record<(typeof locales)[number], { name: string; to: string }> = {
  ru: { name: "Русский", to: "На главную" },
  en: { name: "English", to: "Home page" },
  uk: { name: "Українська", to: "На головну" },
};

export default function GlobalNotFound() {
  return (
    /* lang="ru": the page carries all three, and this is the one most of its
       visitors read. The three links each land on a properly localized page. */
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${golos.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-background text-ink">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <main className="flex flex-1 items-center px-6 py-20">
          <div className="mx-auto w-full max-w-2xl">
            <p
              aria-hidden="true"
              className="font-display text-[clamp(4.5rem,18vw,9rem)] font-semibold leading-[0.85] tracking-tight text-ink"
            >
              404
            </p>
            {/* The one horizontal accent the rest of the site uses under a
                headline, so this page belongs to it rather than to Next. */}
            <span
              aria-hidden="true"
              className="mt-6 block h-1 w-16 rounded-full bg-accent"
            />
            <h1 className="mt-8 font-display text-2xl leading-snug text-ink sm:text-3xl">
              Такой страницы нет
            </h1>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">
              Ссылка устарела или в адресе опечатка. Выберите язык — откроется
              главная.
            </p>
            <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {locales.map((locale) => (
                <li key={locale}>
                  <a
                    href={`/${locale}`}
                    lang={locale}
                    className="group flex min-h-14 items-center justify-between gap-6 rounded-xl border border-line bg-surface-2 px-5 text-left transition hover:border-accent-line sm:w-auto sm:justify-start"
                  >
                    <span className="font-display text-base text-ink">
                      {DOORS[locale].name}
                    </span>
                    <span className="text-[15px] text-muted">
                      {DOORS[locale].to}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-accent transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </body>
    </html>
  );
}
