import { Fragment } from "react";
import Image from "next/image";
import {
  defaultLocale,
  getDictionary,
  getSiteUrl,
  INSTAGRAM_URL,
  isLocale,
  SITE_NAME,
  TELEGRAM_URL,
  WHATSAPP_URL,
  type Dictionary,
  type Locale,
} from "@/i18n/config";
import ContactForm from "@/components/ContactForm";
import FaqList from "@/components/FaqList";
import HeroSketch from "@/components/HeroSketch";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TaskExplorer from "@/components/TaskExplorer";

/* Section header — one display title (+ optional intro), left-aligned. Structure
   comes from tonal bands and spacing, not hairline rules. */
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
      <h2
        id={id}
        className="font-display text-3xl leading-[1.1] text-ink sm:text-4xl"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>
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
      className="mt-[7px] h-3 w-3 shrink-0 text-accent"
    >
      <path d="M3 8.5 6.5 12 13 4.5" />
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
] as const;

const JOB_TITLE_BY_LOCALE: Record<Locale, string> = {
  ru: "Разработчик сайтов для малого бизнеса",
  en: "Website developer for small business",
  uk: "Розробник сайтів для малого бізнесу",
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
};

const LANGUAGE_NAMES = ["Russian", "English", "Ukrainian"];

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
        sameAs: [TELEGRAM_URL, INSTAGRAM_URL],
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
        inLanguage: ["ru", "en", "uk"],
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
  return (
    <section id="cases" aria-labelledby="cases-heading">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <SectionHeader id="cases-heading" title={copy.heading} intro={copy.intro} />
        </Reveal>
        {/* Two cases fill a two-column grid; a third column only once there are 3+. */}
        <div
          className={`mt-12 grid gap-4 md:grid-cols-2${
            copy.items.length > 2 ? " lg:grid-cols-3" : ""
          }`}
        >
          {copy.items.map((c, i) => {
            const body = (
              <>
                {c.image && (
                  <div className="overflow-hidden border-b border-line">
                    <Image
                      src={c.image}
                      alt={c.task}
                      width={1440}
                      height={1000}
                      className="aspect-[3/2] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
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
            const cardClass =
              "flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-2";
            return (
              <Reveal key={i} delay={i * 60}>
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
        <section className="relative flex items-stretch overflow-hidden lg:min-h-[calc(100svh-4.8rem)] lg:items-center">
          <div className="hero-rise relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-y-9 px-6 pb-16 pt-16 sm:pb-14 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:gap-y-10 lg:py-20">
            <div className="hero-first">
            <h1 className="font-display text-[2rem] leading-[1.14] text-ink sm:text-5xl lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:text-[3.25rem]">
              <Accented text={t.hero.title} className="text-accent" />
            </h1>
            <p className="text-lg text-ink lg:col-span-7 lg:col-start-1 lg:row-start-2">
              <Accented text={t.hero.freeEdits} className="text-accent" />
            </p>
            <p className="text-base leading-relaxed text-muted lg:col-span-4 lg:col-start-8 lg:row-start-3">
              {t.hero.subtitle}
            </p>
            {/* The sketch fills the air between the copy and the CTA on
                phones, scaling to whatever height the screen leaves; on lg
                it's the hero's right column (grid ignores DOM order). */}
            <HeroSketch className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1" />
            {/* The one thing to click: pinned to the foot of the first
                screen on phones, under the thumb; an inline pill on the
                grid. */}
            <a
              href="#contact"
              className="btn-lift group flex min-h-14 w-full items-center justify-between gap-4 rounded-[28px] bg-ink px-6 py-4 font-display text-lg leading-snug text-background hover:bg-muted sm:w-auto sm:self-start sm:justify-start sm:rounded-full sm:px-9 sm:text-xl lg:col-span-7 lg:col-start-1 lg:row-start-3 lg:justify-self-start"
            >
              {t.hero.offerCta}
              {/* The accent is tuned against the page background; on the
                  inverted pill it lands at ~2.3:1 and all but disappears,
                  taking the hover nudge with it. The arrow follows the label
                  instead, held back by opacity rather than hue. */}
              <span
                aria-hidden="true"
                className="opacity-70 transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            </div>
          </div>
        </section>

        {/* Interactive value explorer — pick a task, see what I'd build. Its
            own tonal band: it follows the hero, and the run of sections after
            it all sit on the base background. */}
        <section
          aria-labelledby="explorer-heading"
          className="bg-surface"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <Reveal>
              <SectionHeader id="explorer-heading" title={t.explorer.prompt} />
            </Reveal>
            <Reveal className="mt-12" delay={80}>
              <TaskExplorer copy={t.explorer} />
            </Reveal>
          </div>
        </section>

        {/* Services — tonal cards, not ruled rows. */}
        <section id="services" aria-labelledby="services-heading">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <Reveal>
              <SectionHeader
                id="services-heading"
                title={t.services.heading}
                intro={t.services.subheading}
              />
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {t.services.items.map((service, i) => (
                <Reveal key={service.title} delay={i * 60}>
                  <div className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent-line hover:bg-surface-2">
                    <h3 className="font-display text-lg leading-snug text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Selected work — appears once real cases are added to the dictionary. */}
        <CasesSection copy={t.cases} />

        {/* How to start — three entry points as raised cards. */}
        <section id="formats" aria-labelledby="formats-heading" className="bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <Reveal>
              <SectionHeader
                id="formats-heading"
                title={t.formats.heading}
                intro={t.formats.note}
              />
            </Reveal>
            {/* Price is what people scroll here for, so it gets its own line at
                display size instead of trailing the title in body weight. */}
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {t.formats.items.map((format, i) => (
                <Reveal key={format.title} delay={i * 60}>
                  <div className="flex h-full flex-col rounded-2xl border border-line bg-surface-2 p-7">
                    <h3 className="font-display text-lg leading-snug text-ink">
                      {format.title}
                    </h3>
                    <p className="mt-3 font-display text-4xl leading-none text-ink">
                      {format.price}
                    </p>
                    <p className="mt-5 border-t border-line pt-5 text-[15px] leading-relaxed text-muted">
                      {format.description}
                    </p>
                    {/* The checklist is the point of publishing a price at all:
                        it says what the number buys and where it stops. */}
                    <p className="mt-6 text-xs text-faint">
                      {t.formats.includesLabel}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {format.includes.map((line) => (
                        <li
                          key={line}
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
            <Reveal>
              <SectionHeader
                id="process-heading"
                title={t.process.heading}
                intro={t.process.subheading}
              />
            </Reveal>
            <ol className="mt-12 max-w-3xl">
              {t.process.steps.map((step, index) => {
                const last = index === t.process.steps.length - 1;
                return (
                  <Reveal
                    as="li"
                    key={step.title}
                    delay={index * 70}
                    className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7"
                  >
                    <div className="flex flex-col items-center">
                      {/* Medium, not the 400 the rest of the display type
                          uses: a thin dark numeral on mid-tone green is legible
                          by contrast but too spindly to read at a glance. */}
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-medium text-background">
                        {index + 1}
                      </span>
                      {!last && <span aria-hidden="true" className="my-1 w-px flex-1 bg-line-strong" />}
                    </div>
                    <div className={last ? "pb-0" : "pb-9"}>
                      <h3 className="font-display text-lg leading-snug text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted">
                        {step.description}
                      </p>
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
            <Reveal>
              <SectionHeader id="about-heading" title={t.about.heading} />
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
            <Reveal as="div" delay={90} className="self-start">
              <aside className="overflow-hidden rounded-2xl border border-line bg-surface-2">
                {ABOUT_PHOTO && (
                  <Image
                    src={ABOUT_PHOTO}
                    alt={t.about.photoAlt}
                    width={900}
                    height={1125}
                    className="aspect-[4/5] w-full border-b border-line object-cover"
                  />
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
            <Reveal>
              <SectionHeader
                id="faq-heading"
                title={t.faq.heading}
                intro={t.faq.intro}
              />
            </Reveal>
            <Reveal as="div" delay={90}>
              <FaqList items={t.faq.items} />
            </Reveal>
          </div>
        </section>

        {/* Contact — the destination: warm invite, direct links, form in a panel. */}
        <section id="contact" aria-labelledby="contact-heading">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <Reveal>
              <h2
                id="contact-heading"
                className="font-display text-3xl leading-[1.1] text-ink sm:text-4xl"
              >
                {t.contact.heading}
              </h2>
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
