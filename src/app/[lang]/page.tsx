import { Fragment } from "react";
import { defaultLocale, getDictionary, isLocale, type Locale } from "@/i18n/config";
import ContactForm from "@/components/ContactForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SiteFooter from "@/components/SiteFooter";
import WorkflowTabs from "@/components/WorkflowTabs";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
  const base = `/${locale}`;

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href={base} className="text-base font-semibold tracking-tight text-ink">
            Service&nbsp;Studio
            <span className="text-faint"> by Ruslan</span>
          </a>
          <div className="flex items-center gap-3 sm:gap-6">
            <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
              <a href="#services" className="transition hover:text-ink">
                {t.header.nav.services}
              </a>
              <a href="#formats" className="transition hover:text-ink">
                {t.header.nav.formats}
              </a>
              <a href="#about" className="transition hover:text-ink">
                {t.header.nav.about}
              </a>
            </nav>
            <LanguageSwitcher current={locale} label={t.header.language} />
            <a
              href="#contact"
              className="hidden rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-background transition hover:bg-cream-hover sm:inline-flex"
            >
              {t.header.cta}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero — offer leads; subtle workflow visual right (desktop) / after CTA (mobile) */}
        <section className="relative">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:py-28">
            <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
              {/* Offer */}
              <div className="max-w-2xl">
                <h1 className="text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                  {t.hero.title.split(" ").map((word, index, words) => (
                    <Fragment key={`${word}-${index}`}>
                      <span
                        className="hero-word"
                        style={{ animationDelay: `${index * 55}ms` }}
                      >
                        {word}
                      </span>
                      {index < words.length - 1 ? " " : null}
                    </Fragment>
                  ))}
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  {t.hero.subtitle}
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  {t.hero.personalNote}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3.5 text-base font-semibold text-background transition hover:bg-cream-hover"
                  >
                    {t.hero.ctaPrimary}
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center gap-1.5 text-base font-medium text-muted transition hover:text-ink"
                  >
                    {t.hero.ctaSecondary}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              {/* Abstract workflow visual (decorative — the interactive version lives below) */}
              <div aria-hidden="true" className="mt-10 lg:mt-0">
                <ol className="rounded-2xl border border-line bg-surface/30 p-5 transition-colors duration-300 hover:border-line-strong sm:p-6 lg:p-7">
                  {t.hero.flow.map((label, index) => {
                    const last = index === t.hero.flow.length - 1;
                    return (
                      <li key={label} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent-line bg-accent-soft font-mono text-[10px] font-semibold text-accent">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {!last && <span className="my-1 w-px flex-1 bg-line" />}
                        </div>
                        <span
                          className={`text-sm leading-snug text-ink/90 ${
                            last ? "" : "pb-5"
                          }`}
                        >
                          {label}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>

          {/* Trust / value strip — compact centered row, content-width items (no equal columns) */}
          <div className="border-y border-line bg-surface/60">
            <ul className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2.5 lg:gap-x-10">
              {t.trust.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="text-accent">
                    <CheckIcon className="shrink-0" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Services — editorial index (thin rules, no card grid) at every width */}
        <section id="services" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-ink">
                {t.services.heading}
              </h2>
              <p className="mt-3 text-muted">{t.services.subheading}</p>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 sm:gap-x-12 lg:gap-x-20">
              {t.services.items.map((service, index) => (
                <div
                  key={service.title}
                  className="border-t border-line py-6 lg:py-8"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow — interactive "show, not tell" flow (tabs + connected steps) */}
        <section id="workflow" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-ink">
                {t.workflow.heading}
              </h2>
              <p className="mt-3 text-muted">{t.workflow.intro}</p>
            </div>
            <WorkflowTabs tabs={t.workflow.tabs} ariaLabel={t.workflow.heading} />
          </div>
        </section>

        {/* How we can start — calm editorial rows */}
        <section id="formats" className="border-t border-line bg-surface/50">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-ink">
                {t.formats.heading}
              </h2>
              <p className="mt-3 text-muted">{t.formats.note}</p>
            </div>
            {/* Starting options as editorial columns: stacked on mobile, thin vertical rules from md. */}
            <div className="mt-10 grid md:grid-cols-3">
              {t.formats.items.map((format, index) => (
                <div
                  key={format.title}
                  className="border-t border-line py-6 md:border-t-0 md:border-l md:py-0 md:pl-6 md:first:border-l-0 md:first:pl-0 lg:pl-8"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-ink">
                    {format.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:pr-4">
                    {format.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm text-muted">{t.formats.ctaText}</span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-soft px-4 py-2 text-sm font-medium text-ink transition hover:border-line-strong hover:bg-surface"
              >
                {t.formats.ctaLink}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Process — vertical timeline */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-ink">
                {t.process.heading}
              </h2>
              <p className="mt-3 text-muted">{t.process.subheading}</p>
            </div>
            <ol className="mt-10 max-w-3xl">
              {t.process.steps.map((step, index) => {
                const last = index === t.process.steps.length - 1;
                return (
                  <li key={step.title} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent-line bg-accent-soft text-sm font-semibold text-accent">
                        {index + 1}
                      </span>
                      {!last && <span className="my-1 w-px flex-1 bg-line" />}
                    </div>
                    <div className={last ? "" : "pb-8"}>
                      <h3 className="font-semibold text-ink">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-line bg-surface/50">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
              <h2 className="text-2xl font-bold tracking-tight text-ink">
                {t.about.heading}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted">
                {t.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-ink">
                  {t.contact.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {t.contact.subheading}
                </p>
                <ul className="mt-8 space-y-3 text-ink/90">
                  {t.contact.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-0.5 text-accent">
                        {"→"}
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Form sits on the page (no heavy card); thin rule separates it on mobile. */}
              <div className="border-t border-line pt-10 lg:border-t-0 lg:pt-0">
                <ContactForm lang={locale} copy={t.contact} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} copy={t.footer} />
    </>
  );
}
