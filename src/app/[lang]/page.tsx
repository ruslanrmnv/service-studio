import { Fragment } from "react";
import {
  defaultLocale,
  getDictionary,
  INSTAGRAM_URL,
  isLocale,
  TELEGRAM_URL,
  WHATSAPP_URL,
  type Dictionary,
  type Locale,
} from "@/i18n/config";
import ContactForm from "@/components/ContactForm";
import LiveDemo from "@/components/LiveDemo";
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

const DIRECT = [
  { label: "Telegram", href: TELEGRAM_URL },
  { label: "WhatsApp", href: WHATSAPP_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
] as const;

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
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((c, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="h-full rounded-2xl border border-line bg-surface-2 p-6">
                <p className="text-xs text-faint">{copy.taskLabel}</p>
                <p className="mt-1 font-display text-lg leading-snug text-ink">
                  {c.task}
                </p>
                <p className="mt-4 text-xs text-faint">{copy.builtLabel}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{c.built}</p>
                <p className="mt-4 text-xs text-faint">{copy.resultLabel}</p>
                <p className="mt-1 font-medium leading-relaxed text-accent">{c.result}</p>
              </div>
            </Reveal>
          ))}
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
      <SiteHeader locale={locale} copy={t.header} demoLabel={t.demo.heading} />

      <main className="flex-1">
        {/* Hero — display statement over a soft central lift (no grid, no glow ring). */}
        <section className="hero-glow relative flex min-h-[82svh] flex-col justify-center overflow-hidden px-6">
          <div className="hero-rise mx-auto w-full max-w-4xl py-20 text-center">
            <p className="mb-7 inline-flex items-center gap-2.5 text-sm text-faint">
              <span
                aria-hidden="true"
                className="node-pulse h-2 w-2 rounded-full bg-accent"
              />
              {t.hero.availability}
            </p>
            <h1 className="font-display text-[2rem] leading-[1.14] text-ink sm:text-5xl lg:text-6xl">
              {t.hero.title.split("`").map((segment, index) =>
                index % 2 === 1 ? (
                  <span key={index} className="text-accent">
                    {segment}
                  </span>
                ) : (
                  <Fragment key={index}>{segment}</Fragment>
                )
              )}
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 text-[15px] font-medium text-background transition hover:bg-muted"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#demo"
                className="inline-flex min-h-11 items-center gap-2 text-[15px] text-muted transition hover:text-ink"
              >
                {t.demo.heading}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* Interactive value explorer — pick a task, see what I'd build. */}
        <section aria-label={t.explorer.prompt} className="px-6 pb-16 pt-2 sm:pb-20">
          <Reveal className="mx-auto w-full max-w-4xl">
            <TaskExplorer copy={t.explorer} />
          </Reveal>
        </section>

        {/* Live demo — the centerpiece. Sits on a raised tonal band. */}
        <section id="demo" aria-labelledby="demo-heading" className="bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <Reveal>
              <SectionHeader id="demo-heading" title={t.demo.heading} intro={t.demo.intro} />
            </Reveal>
            <Reveal className="mt-12" delay={80}>
              <LiveDemo copy={t.demo} />
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
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {t.formats.items.map((format, i) => (
                <Reveal key={format.title} delay={i * 60}>
                  <div className="h-full rounded-2xl border border-line bg-surface-2 p-7">
                    <h3 className="font-display text-lg leading-snug text-ink">
                      {format.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {format.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <span className="text-muted">{t.formats.ctaText}</span>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-6 text-[15px] text-ink transition hover:border-ink"
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
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm text-background">
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
            <Reveal>
              <SectionHeader id="about-heading" title={t.about.heading} />
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
                {t.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal as="div" delay={90} className="self-start">
              <aside className="rounded-2xl border border-line bg-surface-2 p-8">
                <p className="font-display text-2xl text-ink">Ruslan</p>
                <p className="mt-2 leading-relaxed text-muted">{t.footer.tagline}</p>
                <p className="mt-6 inline-flex items-center gap-2.5 text-sm text-faint">
                  <span
                    aria-hidden="true"
                    className="node-pulse h-2 w-2 rounded-full bg-accent"
                  />
                  {t.hero.availability}
                </p>
              </aside>
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
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-surface px-5 text-sm text-muted transition hover:border-accent-line hover:text-ink"
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
