import { Fragment } from "react";
import Image from "next/image";
import {
  defaultLocale,
  getDictionary,
  getSiteUrl,
  INSTAGRAM_URL,
  isLocale,
  LINKEDIN_URL,
  locales,
  SITE_NAME,
  TELEGRAM_URL,
  WHATSAPP_URL,
  type Dictionary,
  type Locale,
} from "@/i18n/config";
import ContactForm from "@/components/ContactForm";
import FaqList from "@/components/FaqList";
import HeroMockup from "@/components/HeroMockup";
import MaskedHeading from "@/components/MaskedHeading";
import PrintedHeading from "@/components/PrintedHeading";
import ProcessArtifact from "@/components/ProcessArtifact";
import Reveal from "@/components/Reveal";
import { PhoneWindow } from "@/components/Window";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

/* Section header — one display title (+ optional intro), left-aligned. Structure
   comes from tonal bands and spacing, not hairline rules.

   It carries its own entrance rather than sitting inside a <Reveal>: the title
   rises out of its slot at full strength, and a block-level fade over the top
   of that would only blur the moment it exists to make. The intro follows a
   beat later, on the ordinary reveal. */
function SectionHeader({
  id,
  title,
  intro,
}: {
  id?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <MaskedHeading
        id={id}
        text={title}
        className="font-display text-3xl leading-[1.1] text-ink sm:text-4xl"
      />
      {intro && (
        <Reveal as="p" delay={180} className="mt-5 text-lg leading-relaxed text-muted">
          {intro}
        </Reveal>
      )}
    </div>
  );
}

/* Marker for the price-card checklists. A drawn tick, not a bullet: the list
   is a promise about where the fixed price stops, and should read as one. */
function CheckMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check-draw mt-[7px] h-3 w-3 shrink-0 text-accent"
    >
      <path d="M3 8.5 6.5 12 13 4.5" pathLength={1} />
    </svg>
  );
}

/* `backtick` segments render in the accent colour — hero headline and promise. */
function Accented({ text, className }: { text: string; className: string }) {
  return (
    <>
      {text.split("`").map((segment, index) =>
        index % 2 === 1 ? (
          <span key={index} className={className}>
            {segment}
          </span>
        ) : (
          <Fragment key={index}>{segment}</Fragment>
        )
      )}
    </>
  );
}

const DIRECT = [
  { label: "Telegram", href: TELEGRAM_URL },
  { label: "WhatsApp", href: WHATSAPP_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
] as const;

const JOB_TITLE_BY_LOCALE: Record<Locale, string> = {
  ru: "Разработчик сайтов для малого бизнеса",
  en: "Website developer for small business",
  uk: "Розробник сайтів для малого бізнесу",
  es: "Desarrollador de webs para pequeños negocios",
};

const SERVICE_TYPES_BY_LOCALE: Record<Locale, string[]> = {
  ru: [
    "сайты для бизнеса",
    "одностраничные сайты",
    "сайты с каталогом",
    "формы заявок и онлайн-запись",
    "домен, хостинг и запуск",
  ],
  en: [
    "business websites",
    "one-page websites",
    "websites with a catalogue",
    "lead forms and online booking",
    "domain, hosting, and launch",
  ],
  uk: [
    "сайти для бізнесу",
    "односторінкові сайти",
    "сайти з каталогом",
    "форми заявок та онлайн-запис",
    "домен, хостинг і запуск",
  ],
  es: [
    "webs para negocios",
    "webs de una página",
    "webs con catálogo",
    "formularios de solicitud y reserva online",
    "dominio, alojamiento y lanzamiento",
  ],
};

/* Languages of the service channel, which is the form and the messengers — all
   of them written. Spanish belongs on that list and would not belong on a
   spoken one; the FAQ answer about remote work draws the same line in prose. */
const LANGUAGE_NAMES = ["Russian", "English", "Ukrainian", "Spanish"];

/* Portrait for the About card. A monochrome variant sits beside it in /public
   as ruslan-portrait-mono.jpg — swap the path to switch. */
const ABOUT_PHOTO: string | null = "/about/ruslan-portrait.jpg";

function SeoJsonLd({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Dictionary;
}) {
  const base = getSiteUrl();
  const url = `${base}/${locale}`;
  const personId = `${base}/#person`;
  const websiteId = `${base}/#website`;
  const serviceId = `${url}#service`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Ruslan",
        url: base,
        jobTitle: JOB_TITLE_BY_LOCALE[locale],
        /* Profiles only. wa.me is a way to open a chat, not a page about the
           person, and search engines treat sameAs as identity evidence. */
        sameAs: [TELEGRAM_URL, INSTAGRAM_URL, LINKEDIN_URL],
        knowsAbout: SERVICE_TYPES_BY_LOCALE[locale],
        homeLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Barcelona",
            addressCountry: "ES",
          },
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: base,
        name: SITE_NAME,
        inLanguage: [...locales],
        publisher: { "@id": personId },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: copy.metadata.title,
        description: copy.metadata.description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        about: { "@id": serviceId },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: locale,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: copy.metadata.ogTitle,
        description: copy.metadata.description,
        serviceType: SERVICE_TYPES_BY_LOCALE[locale],
        areaServed: ["Spain", "Azerbaijan", "Worldwide"],
        provider: { "@id": personId },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: url,
          availableLanguage: LANGUAGE_NAMES,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* Real work / proof. Renders nothing until `cases.items` has real projects —
   add them in the dictionaries (task → what was built → result). */
function CasesSection({ copy }: { copy: Dictionary["cases"] }) {
  if (copy.items.length === 0) return null;
  const thirds = copy.items.length === 3;
  /* An odd number of cards in two columns leaves the last one alone on its
     own row. Rather than accept the orphan, the first card takes the full
     width and the rest pair off under it: five cases read as one wide card
     above two rows of two. Exactly three still take a third column each. */
  const feature = !thirds && copy.items.length % 2 === 1;

  /* How wide a card actually lands, so the browser stops fetching a 1440px
     cover to paint it a third of a screen. Tracks the column count chosen
     below; the phone pinned on the cover is 24% of the same width. The wide
     card splits in two from md, so its picture is 58% of 1104 rather than
     the whole of it. */
  const coverSizes = thirds
    ? "(min-width: 1152px) 357px, (min-width: 1024px) 33vw, (min-width: 768px) 46vw, 100vw"
    : "(min-width: 1152px) 544px, (min-width: 768px) 46vw, 100vw";
  const phoneSizes = thirds
    ? "(min-width: 1152px) 86px, (min-width: 1024px) 8vw, (min-width: 768px) 11vw, 24vw"
    : "(min-width: 1152px) 131px, (min-width: 768px) 11vw, 24vw";
  const featureCoverSizes = "(min-width: 1152px) 640px, (min-width: 768px) 54vw, 100vw";
  const featurePhoneSizes = "(min-width: 1152px) 154px, (min-width: 768px) 13vw, 24vw";
  return (
    /* On the tonal band: it follows the hero directly now, and two sections
       on the same tone read as one endless document. */
    <section id="cases" aria-labelledby="cases-heading" className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeader id="cases-heading" title={copy.heading} intro={copy.intro} />
        {/* Three cases take a third column. Everything else is two across —
            a fourth card in a three-column grid is one orphan on its own
            row, and so is a fifth in two columns, which is what `feature`
            above answers. */}
        <div
          className={`mt-12 grid gap-4 md:grid-cols-2${
            thirds ? " lg:grid-cols-3" : ""
          }`}
        >
          {copy.items.map((c, i) => {
            /* The wide one, when there is one: full width, and from md the
               picture and the words sit side by side instead of stacked —
               at 1104px a 3:2 cover would otherwise be 736px tall and the
               card would swallow the screen. */
            const wide = feature && i === 0;
            const body = (
              <>
                {c.image && (
                  <div
                    className={`relative overflow-hidden border-b border-line ${
                      wide
                        ? "aspect-[3/2] md:aspect-auto md:w-[58%] md:shrink-0 md:border-b-0 md:border-r"
                        : "aspect-[3/2]"
                    }`}
                  >
                    {/* Taller than the frame and started high, so the drift has
                        room to travel without ever showing an edge. */}
                    <div className="media-parallax absolute inset-x-0 top-[-6%] h-[112%]">
                      <Image
                        src={c.image}
                        alt={c.task}
                        width={1440}
                        height={1000}
                        sizes={wide ? featureCoverSizes : coverSizes}
                        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    {/* The same page on a phone, pinned over the cover. It
                        holds still while the desktop drifts behind it — two
                        planes — and answers "will it look right on my phone"
                        without a word of copy.

                        Not on the wide card. The phone is pinned bottom right,
                        which is exactly where the bakery keeps its stock board,
                        so it landed as a second board on top of the first and
                        the corner turned to noise. The wide card's whole job is
                        one clear look at that board. */}
                    {c.phone && !wide && (
                      <PhoneWindow
                        src={c.phone}
                        sizes={wide ? featurePhoneSizes : phoneSizes}
                        size="sm"
                        aspectClass="aspect-[9/16]"
                        className="absolute bottom-3 right-3 w-[24%] shadow-[0_12px_28px_rgba(0,0,0,0.25)]"
                      />
                    )}
                  </div>
                )}
                <div
                  className={`flex flex-1 flex-col p-6${
                    wide ? " md:justify-center md:p-8" : ""
                  }`}
                >
                  <p className="text-xs text-faint">{copy.taskLabel}</p>
                  <p className="mt-1 font-display text-lg leading-snug text-ink">
                    {c.task}
                  </p>
                  <p className="mt-4 text-xs text-faint">{copy.builtLabel}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{c.built}</p>
                  <p className="mt-4 text-xs text-faint">{copy.resultLabel}</p>
                  <p className="mt-1 font-medium leading-relaxed text-accent">{c.result}</p>
                  {/* mt-auto, so the link sits on the card's floor in every
                      column no matter how long the copy above it runs. */}
                  {c.link && copy.openLabel && (
                    <p className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
                      {copy.openLabel}
                      <span
                        aria-hidden="true"
                        className="text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      >
                        ↗
                      </span>
                    </p>
                  )}
                </div>
              </>
            );
            /* min-h on the wide one so its picture keeps a shape of its own:
               side by side, the row's height comes from the words, and a short
               paragraph would otherwise squash the cover into a letterbox. */
            const cardClass = `flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-2${
              wide ? " md:min-h-[21rem] md:flex-row" : ""
            }`;
            return (
              /* media-frame: the card is clipped, so the drift inside it reads
                 its timeline from here, where the page still scrolls. */
              <Reveal
                key={i}
                delay={i * 60}
                className={`media-frame${wide ? " md:col-span-2" : ""}`}
              >
                {c.link ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group ${cardClass} transition-colors hover:border-accent-line`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cardClass}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const t = await getDictionary(locale);

  return (
    <>
      <SeoJsonLd locale={locale} copy={t} />
      <SiteHeader locale={locale} copy={t.header} />

      <main className="flex-1">
        {/* Hero — four things only. On desktop they sit on the page grid,
            headline left and the detail in a side column. On phones the copy
            stacks from the top and the button drops to the foot of the screen,
            where the thumb already rests. */}
        <section className="hero-recede relative flex items-stretch overflow-hidden lg:min-h-[calc(100svh-4.8rem)] lg:items-center">
          <div className="hero-rise relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-y-9 px-6 pb-16 pt-16 sm:pb-14 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:gap-y-10 lg:py-20">
            <div className="hero-first">
            {/* The headline is the whole picture now, so it takes the width the
                wireframe used to occupy and the size that width can carry. The
                accent no longer tints a word — it arrives as the second
                impression and stays as the stroke underneath it. */}
            <PrintedHeading
              as="h1"
              text={t.hero.title}
              style={
                {
                  /* The ink comes up first; the mark goes down once the words
                     are legible, and the light follows it out. */
                  "--mark-d": "1.35s",
                  "--glint-d": "1.6s",
                } as React.CSSProperties
              }
              className="font-display text-[2.1rem] leading-[1.14] text-ink sm:text-[3.25rem] lg:col-span-10 lg:col-start-1 lg:row-start-1 lg:text-[4rem]"
            />
            {/* Everything under the headline, as one cell spanning the whole
                page grid — the promises, the picture and the button together.
                The window is much taller than the words beside it, and as
                separate grid rows its excess was shared out between them and
                opened half a screen of air; inside this cell the rows are
                sized `auto 1fr` (globals.css), so the window's surplus falls
                into one row and the button stays under the line it belongs
                to. DOM order is the phone's order: promise, picture, button
                at the foot of the screen. */}
            <div className="hero-copy lg:col-span-12 lg:col-start-1 lg:row-start-2">
            {/* What the visitor risks, answered before they scroll. A
                paragraph explaining the offer stood here until 2026-08-07:
                the same three facts, in prose, on a screen nobody reads
                prose on. Ticked lines, in the device the price cards already
                use — a tick is the page's mark for "this is included, in
                writing". */}
            <ul className="hero-promises flex flex-col gap-3">
              {t.hero.promises.map((promise) => (
                <li
                  key={promise}
                  className="flex items-start gap-3 text-base leading-snug text-ink sm:text-[17px]"
                >
                  <CheckMark />
                  <span>
                    <Accented text={promise} className="text-accent" />
                  </span>
                </li>
              ))}
            </ul>
            {/* The button and the way to the price, above the picture rather
                than below it.

                Below it until 2026-08-08, on the reasoning that a phone would
                then show the picture and the button together. Measured on a
                real phone, it didn't: at 390×659 — an iPhone 13 in Safari with
                the address bar showing — the button started 8px above the fold
                and 73px of it were cut off. The picture is the tallest and the
                most variable block in the hero (its height is its width times
                10/16, plus the phone hanging off the bottom), so with the
                button underneath, the narrower the screen the further the
                button fell off it. Above the picture, the button's position
                depends only on the headline and three ticked lines, and the
                picture absorbs the difference by being cropped at the fold —
                which is what a fold is for. A cropped picture invites the
                scroll; a cropped button loses the enquiry.

                Filled in the accent, not in ink. The green is the only colour
                the site has, and until now it decorated prose while every
                button was neutral — the most visible colour meant nothing and
                the most important element wore none. Now it means one thing,
                "this is the next step", and a visitor learns that on the
                first screen. Text is the page background: 7.0:1 in the dark
                theme, 5.2:1 in the light one. */}
            <div className="hero-act flex flex-col">
            <a
              href="#contact"
              /* No vertical padding: min-h-14 is the height, and padding on top
                 of it only inflates the button. On a phone the label wraps to
                 two lines — at 18px the longest of the three locales is 366px
                 against a 312px column, so one line is not on offer without
                 giving up the verb, and a button should say what happens rather
                 than name a thing. leading-tight puts those two lines at 45px,
                 which sits inside the 56px tap target with room to spare; at
                 leading-snug plus py-3.5 the same two lines made a 78px slab. */
              className="btn-lift group flex min-h-14 w-full items-center justify-between gap-4 rounded-[28px] bg-accent px-5 font-display text-lg leading-tight text-background hover:bg-accent-strong sm:w-auto sm:self-start sm:justify-start sm:rounded-full sm:px-9 sm:text-xl"
            >
              {t.hero.offerCta}
              {/* Held back by opacity rather than hue: a second colour inside
                  a coloured button would be one accent too many. */}
              <span
                aria-hidden="true"
                className="opacity-70 transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            {/* Below md the header nav is gone, so this is the only way to the
                price without scrolling the whole page. Muted and small: it is
                the second thing to do here, not a competing button — and it
                stays tucked under the button rather than floating away from
                it, so the pair reads as one block and the picture below keeps
                the pixels. min-h-11 is the tap target and is not negotiable;
                the margin above it is. */}
            <a
              href="#formats"
              className="-mb-1.5 mt-2 inline-flex min-h-11 items-center gap-2 self-start text-[15px] text-muted transition hover:text-ink md:hidden"
            >
              {t.hero.pricesLink}
              <span aria-hidden="true">↓</span>
            </a>
            </div>
            {/* The argument, made in pictures: the window loads, the free
                mockup is drawn into it, the mockup lifts and a built site is
                underneath — the offer acted out rather than explained. Last in
                the phone's order, where the fold crops it (see .hero-act
                above); on the grid it moves to the right half, and the
                explicit placements in globals.css mean this move costs the
                desktop layout nothing. Decorative — the cases section is where
                this work is named and linked — hence aria-hidden. */}
            <div
              aria-hidden="true"
              className="hero-stack relative ml-auto w-[70%] pb-5 sm:w-[58%] lg:ml-0 lg:w-auto lg:pb-7"
            >
              {/* The window starts loading as the hero settles. Everything
                  after it — the drawing, the lift — is measured from here. */}
              <div
                className="window-drift"
                style={{ "--load-s": "0.4s" } as React.CSSProperties}
              >
                <HeroMockup
                  src="/cases/strop-barbershop.webp"
                  url="barbershop.servicestudiobyruslan.com"
                  className="rotate-[1.2deg]"
                />
              </div>
              {/* The one soft shadow in the hero: the phone floats over the
                  browser window, and without it they read as one flat card.
                  Pinned right, over the cover's photo half — on the left it
                  sat on the barbershop's own headline and truncated it.

                  Its screen comes on as the mockup lifts: the desk shows a
                  drawing, then both screens show the site. */}
              <div
                className="window-drift window-drift-alt absolute -right-2 bottom-0 w-[30%]"
                style={{ "--load-s": "2.6s" } as React.CSSProperties}
              >
                <PhoneWindow
                  src="/cases/maison-phone.webp"
                  /* Three tenths of .hero-stack — see HeroMockup for the
                     widths that column reaches. */
                  sizes="(min-width: 1152px) 160px, (min-width: 1024px) 15vw, (min-width: 640px) 18vw, 21vw"
                  priority
                  className="rotate-2 shadow-[0_14px_32px_rgba(0,0,0,0.25)]"
                />
              </div>
            </div>
            </div>
            </div>
          </div>
        </section>

        {/* Selected work — the first section after the hero. A task-explorer
            block («Чем я могу вам быть полезен?») stood between them until
            2026-08-07: its five answers restated what the cases show and the
            price checklists itemize, and the page said everything twice. The
            live sites are the answer to "what can you do for me". */}
        <CasesSection copy={t.cases} />

        {/* How to start — three entry points as raised cards. On the band with
            the cases above it: the price cards are surface-2, which is white in
            the light theme and all but invisible on the page tone. */}
        <section id="formats" aria-labelledby="formats-heading" className="bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <SectionHeader
              id="formats-heading"
              title={t.formats.heading}
              intro={t.formats.note}
            />
            {/* Price is what people scroll here for, so it gets its own line at
                display size instead of trailing the title in body weight. */}
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {t.formats.items.map((format, i) => (
                <Reveal key={format.title} delay={i * 60}>
                  <div className="flex h-full flex-col rounded-2xl border border-line bg-surface-2 p-7">
                    <h3 className="font-display text-lg leading-snug text-ink">
                      {format.title}
                    </h3>
                    {/* The number gets the same two-colour pass as the
                        headline — it is the other thing on the page set large
                        enough for the register to read. A wider slip than the
                        headline's: at 36px the proportional one is three
                        pixels, which reads as a blurry render rather than as
                        two passes of ink. */}
                    <PrintedHeading
                      as="p"
                      text={format.price}
                      style={
                        {
                          "--impress-x": "0.14em",
                          "--impress-y": "0.08em",
                          /* The light follows the plate in: the card is
                             revealed on scroll, so the whole pass has to sit
                             inside the couple of seconds it is being read. */
                          "--glint-d": "1.25s",
                        } as React.CSSProperties
                      }
                      className="mt-3 font-display text-4xl leading-none text-ink"
                    />
                    <p className="mt-5 border-t border-line pt-5 text-[15px] leading-relaxed text-muted">
                      {format.description}
                    </p>
                    {/* The checklist is the point of publishing a price at all:
                        it says what the number buys and where it stops. */}
                    <p className="mt-6 text-xs text-faint">
                      {t.formats.includesLabel}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {format.includes.map((line, tick) => (
                        <li
                          key={line}
                          /* --tick-d cascades the tick drawing (.check-draw). */
                          style={{ "--tick-d": `${tick * 70}ms` } as React.CSSProperties}
                          className="flex gap-2.5 text-[15px] leading-relaxed text-muted"
                        >
                          <CheckMark />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    {/* mt-auto pins the term to the card's foot, so the two
                        tiers line up despite different checklist lengths. */}
                    <p className="mt-auto pt-7 text-[15px] text-muted">
                      {t.formats.termLabel} —{" "}
                      <span className="text-ink">{format.term}</span>
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            {/* Sits with the grid, not with the CTA: it answers the price, so
                it gets ink weight against the muted copy inside the cards. */}
            <Reveal className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink">
              {t.formats.mockupFirst}
            </Reveal>
            <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <span className="text-muted">{t.formats.ctaText}</span>
              <a
                href="#contact"
                className="btn-lift inline-flex min-h-11 items-center rounded-full border border-line-strong px-6 text-[15px] text-ink hover:border-ink"
              >
                {t.formats.ctaLink}
              </a>
            </Reveal>
          </div>
        </section>

        {/* Process — the one true sequence, so the one vertical connector. */}
        <section aria-labelledby="process-heading">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <SectionHeader
              id="process-heading"
              title={t.process.heading}
              intro={t.process.subheading}
            />
            {/* Wider than the old text-only 3xl: the fourth column carries a
                small window per step — what that step actually produces (the
                first message → the wireframe → the page inked in → the live
                site). Below lg the window tucks under the step's text. */}
            <ol className="mt-12 max-w-3xl lg:max-w-[64rem]">
              {t.process.steps.map((step, index) => {
                const last = index === t.process.steps.length - 1;
                return (
                  <Reveal
                    as="li"
                    key={step.title}
                    delay={index * 70}
                    className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7 lg:grid-cols-[auto_1fr_15rem] lg:gap-x-9"
                  >
                    <div className="flex flex-col items-center">
                      {/* Medium, not the 400 the rest of the display type
                          uses: a thin dark numeral on mid-tone green is legible
                          by contrast but too spindly to read at a glance. */}
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-medium text-background">
                        {index + 1}
                      </span>
                      {!last && <span aria-hidden="true" className="process-line my-1 w-px flex-1 bg-line-strong" />}
                    </div>
                    <div className={last ? "pb-0" : "pb-9"}>
                      <h3 className="font-display text-lg leading-snug text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted">
                        {step.description}
                      </p>
                      <div aria-hidden="true" className="mt-5 max-w-[230px] lg:hidden">
                        <ProcessArtifact step={index} />
                      </div>
                    </div>
                    <div
                      aria-hidden="true"
                      className={`hidden lg:block lg:self-start ${last ? "" : "lg:pb-9"}`}
                    >
                      <ProcessArtifact step={index} />
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </section>

        {/* About — prose with a human anchor card, no hairlines. */}
        <section id="about" aria-labelledby="about-heading" className="bg-surface">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            {/* The facts sit under the prose, not inside the photo card: they
                read with the text, and the two columns end within a line of
                each other instead of leaving half a screen of dead space. */}
            <div>
              <SectionHeader id="about-heading" title={t.about.heading} />
              <Reveal delay={180}>
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
                  {t.about.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-8 space-y-3 border-t border-line pt-8 text-[15px] leading-relaxed text-muted">
                  {t.about.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {fact}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal as="div" delay={90} className="media-frame self-start">
              <aside className="overflow-hidden rounded-2xl border border-line bg-surface-2">
                {ABOUT_PHOTO && (
                  <div className="relative aspect-[4/5] overflow-hidden border-b border-line">
                    <div className="media-parallax absolute inset-x-0 top-[-6%] h-[112%]">
                      <Image
                        src={ABOUT_PHOTO}
                        alt={t.about.photoAlt}
                        width={900}
                        height={1125}
                        /* The narrow half of the 1.5fr / 1fr about grid. */
                        sizes="(min-width: 1152px) 416px, (min-width: 1024px) 40vw, 100vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="p-8">
                  <p className="font-display text-2xl text-ink">{t.about.name}</p>
                  <p className="mt-1 text-[15px] text-faint">{t.about.location}</p>
                  <p className="mt-5 inline-flex items-center gap-2.5 text-sm text-faint">
                    <span
                      aria-hidden="true"
                      className="node-pulse h-2 w-2 rounded-full bg-accent"
                    />
                    {t.hero.availability}
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </section>

        {/* Common questions — the last objections, answered just before the
            form so nobody has to ask them in a message first. */}
        <section id="faq" aria-labelledby="faq-heading">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <SectionHeader
              id="faq-heading"
              title={t.faq.heading}
              intro={t.faq.intro}
            />
            <Reveal as="div" delay={90}>
              <FaqList items={t.faq.items} />
            </Reveal>
          </div>
        </section>

        {/* Contact — the destination: warm invite, direct links, form in a panel. */}
        <section id="contact" aria-labelledby="contact-heading">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div>
              <MaskedHeading
                id="contact-heading"
                text={t.contact.heading}
                className="font-display text-3xl leading-[1.1] text-ink sm:text-4xl"
              />
              <Reveal delay={180}>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  {t.contact.subheading}
                </p>
                <ul className="mt-8 space-y-3.5 text-muted">
                  {t.contact.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-1 text-accent">
                        →
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {DIRECT.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lift inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-surface px-5 text-sm text-muted hover:border-accent-line hover:text-ink"
                    >
                      {c.label}
                      <span aria-hidden="true" className="text-[10px]">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal as="div" delay={90} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <ContactForm lang={locale} copy={t.contact} />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} copy={t.footer} />
    </>
  );
}
