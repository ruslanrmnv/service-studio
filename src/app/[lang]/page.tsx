import { defaultLocale, getDictionary, isLocale, type Locale } from "@/i18n/config";
import ContactForm from "@/components/ContactForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SiteFooter from "@/components/SiteFooter";

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
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_78%_0%,rgba(214,168,90,0.10),transparent_70%)]" />
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Text */}
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  {t.hero.brand}
                </p>
                <h1 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                  {t.hero.title}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                  {t.hero.subtitle}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3.5 text-base font-semibold text-background transition hover:bg-cream-hover"
                  >
                    {t.hero.ctaPrimary}
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-xl border border-line bg-surface-soft px-6 py-3.5 text-base font-semibold text-ink transition hover:border-line-strong hover:bg-surface"
                  >
                    {t.hero.ctaSecondary}
                  </a>
                </div>
              </div>

              {/* "What I can build" studio note */}
              <div className="relative lg:pl-4">
                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-accent-soft opacity-70 blur-2xl" />
                <div className="rounded-2xl border border-line bg-surface shadow-xl">
                  <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-xs font-medium uppercase tracking-wider text-muted">
                      {t.hero.preview.caption}
                    </span>
                  </div>
                  <ul className="space-y-3.5 p-5">
                    {t.hero.preview.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent-line bg-accent-soft text-accent">
                          <CheckIcon />
                        </span>
                        <span className="text-sm leading-relaxed text-ink/90">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Trust / value strip */}
          <div className="border-y border-line bg-surface/60">
            <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {t.trust.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 py-4 text-sm text-muted sm:px-6 sm:first:pl-0 lg:first:pl-0"
                >
                  <span className="text-accent">
                    <CheckIcon className="shrink-0" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services — unified editorial block (not floating cards) */}
        <section id="services" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-ink">
                {t.services.heading}
              </h2>
              <p className="mt-3 text-muted">{t.services.subheading}</p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {t.services.items.map((service, index) => (
                <div
                  key={service.title}
                  className="bg-background p-6 transition hover:bg-surface"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-semibold text-ink">{service.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work formats — horizontal rows */}
        <section id="formats" className="border-t border-line bg-surface/50">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-ink">
                {t.formats.heading}
              </h2>
              <p className="mt-3 text-muted">{t.formats.note}</p>
            </div>
            <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-surface">
              {t.formats.items.map((format, index) => (
                <div
                  key={format.title}
                  className="flex flex-col gap-2 p-6 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <div className="flex items-center gap-3 sm:w-72 sm:shrink-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-line bg-accent-soft text-xs font-semibold text-accent">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-ink">{format.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
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
              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
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
