import { Fragment } from "react";
import { defaultLocale, getDictionary, isLocale, type Locale } from "@/i18n/config";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

/* Blue editorial section label — the page's recurring "voice" (steel blue,
   regular weight), sitting in the left column of each section. A short azure
   rule anchors it and gives the otherwise-empty label column a deliberate mark. */
function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <div className="md:sticky md:top-24">
      <h2 id={id} className="text-2xl leading-snug text-accent">
        {children}
      </h2>
      <span aria-hidden="true" className="mt-4 block h-px w-10 bg-accent-bright" />
    </div>
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
      <SiteHeader locale={locale} copy={t.header} />

      <main className="flex-1">
        {/* Hero — a typographic statement over a faint blueprint field.
            `backtick` segments of the title are the studio's materials, set in
            mono/azure; the flow strip at the foot shows what actually gets built. */}
        <section className="hero-grid relative flex min-h-[92svh] flex-col justify-center overflow-hidden px-6">
          <div className="hero-rise mx-auto w-full max-w-4xl pt-20 text-center">
            <p className="mb-8 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              <span aria-hidden="true" className="node-pulse h-2 w-2 rounded-full bg-accent-bright" />
              {t.hero.availability}
            </p>
            <h1 className="text-4xl leading-[1.12] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              {t.hero.title.split("`").map((segment, index) =>
                index % 2 === 1 ? (
                  <span
                    key={index}
                    className="font-mono text-accent-bright [font-size:0.84em]"
                  >
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
            <div className="mt-10 flex justify-center">
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 text-sm font-medium uppercase tracking-[0.08em] text-background transition hover:bg-muted"
              >
                {t.hero.ctaPrimary}
              </a>
            </div>
          </div>

          {/* Signature: the request → system → notification pipeline, drawn in
              the site's own language. Desktop only; the mobile hero is already
              full without it. */}
          <div
            aria-hidden="true"
            className="hero-rise mx-auto mt-20 hidden w-full max-w-3xl items-center gap-3 sm:flex"
          >
            {t.hero.flow.map((step, index) => {
              const last = index === t.hero.flow.length - 1;
              return (
                <Fragment key={step}>
                  <div className="flex shrink-0 flex-col items-center gap-2.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        last ? "node-pulse bg-accent-bright" : "bg-faint"
                      }`}
                    />
                    <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                      {step}
                    </span>
                  </div>
                  {!last && <span className="mb-6 h-px flex-1 bg-line" />}
                </Fragment>
              );
            })}
          </div>
        </section>

        {/* Working principles — a hairline-ruled strip (text, not fake stats). */}
        <div className="border-y border-line">
          <ul className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {t.trust.map((item, index) => (
              <li
                key={item}
                className={`flex items-center px-6 py-5 font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-muted ${
                  index > 0 ? "border-t border-line sm:border-t-0" : ""
                } ${index % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${
                  index >= 2 ? "sm:border-t sm:border-line lg:border-t-0 lg:border-l" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Services — editorial index: blue label left, ruled rows right. */}
        <section id="services" aria-labelledby="services-heading">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 md:grid-cols-[240px_1fr] md:gap-16">
            <SectionHeading id="services-heading">{t.services.heading}</SectionHeading>
            <div>
              <p className="max-w-2xl leading-relaxed text-muted">
                {t.services.subheading}
              </p>
              <ul className="mt-10">
                {t.services.items.map((service) => (
                  <li
                    key={service.title}
                    className="group grid gap-2 border-t border-line py-6 transition-colors sm:grid-cols-[1fr_1.6fr] sm:gap-8"
                  >
                    <h3 className="text-lg leading-snug text-ink transition-colors group-hover:text-accent">
                      {service.title}
                    </h3>
                    <p className="leading-relaxed text-muted">{service.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How we can start — three parallel entry points, hairline columns. */}
        <section id="formats" aria-labelledby="formats-heading" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 md:grid-cols-[240px_1fr] md:gap-16">
            <SectionHeading id="formats-heading">{t.formats.heading}</SectionHeading>
            <div>
              <p className="max-w-2xl leading-relaxed text-muted">{t.formats.note}</p>
              <div className="mt-10 grid lg:grid-cols-3">
                {t.formats.items.map((format, index) => (
                  <div
                    key={format.title}
                    className={`py-6 lg:py-1 ${
                      index > 0
                        ? "border-t border-line lg:border-t-0 lg:border-l lg:pl-8"
                        : ""
                    } ${index < t.formats.items.length - 1 ? "lg:pr-8" : ""}`}
                  >
                    <h3 className="text-lg leading-snug text-ink">{format.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {format.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
                <span className="text-sm text-faint">{t.formats.ctaText}</span>
                <a
                  href="#contact"
                  className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-6 text-xs font-medium uppercase tracking-[0.08em] text-ink transition hover:border-ink"
                >
                  {t.formats.ctaLink}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Process — the one true sequence on the page, so the only numbers. */}
        <section aria-labelledby="process-heading" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 md:grid-cols-[240px_1fr] md:gap-16">
            <SectionHeading id="process-heading">{t.process.heading}</SectionHeading>
            <div>
              <p className="max-w-2xl leading-relaxed text-muted">
                {t.process.subheading}
              </p>
              <ol className="mt-10 max-w-3xl">
                {t.process.steps.map((step, index) => (
                  <li
                    key={step.title}
                    className={`grid grid-cols-[auto_1fr] gap-x-5 py-6 sm:gap-x-7 ${
                      index > 0 ? "border-t border-line" : ""
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-accent font-mono text-sm text-background"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg leading-snug text-ink">{step.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-heading" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 md:grid-cols-[240px_1fr] md:gap-16">
            <SectionHeading id="about-heading">{t.about.heading}</SectionHeading>
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Contact — the page's destination: big invitation, form on the rule. */}
        <section id="contact" aria-labelledby="contact-heading" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div>
              <h2
                id="contact-heading"
                className="text-3xl leading-[1.15] tracking-[-0.01em] text-ink sm:text-4xl"
              >
                {t.contact.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {t.contact.subheading}
              </p>
              <ul className="mt-10 space-y-4 text-muted">
                {t.contact.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-0.5 font-mono text-accent-bright">
                      {"→"}
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-line pt-12 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0">
              <ContactForm lang={locale} copy={t.contact} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} copy={t.footer} />
    </>
  );
}
