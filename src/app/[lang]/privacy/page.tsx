import type { Metadata } from "next";
import { defaultLocale, getDictionary, isLocale, type Locale } from "@/i18n/config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SiteFooter from "@/components/SiteFooter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const t = await getDictionary(locale);
  const title = `${t.privacy.title} — ${t.footer.brand}`;
  return {
    title,
    description: t.privacy.subtitle,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        ru: "/ru/privacy",
        en: "/en/privacy",
        uk: "/uk/privacy",
        "x-default": "/en/privacy",
      },
    },
    openGraph: {
      title,
      description: t.privacy.subtitle,
      type: "website",
      locale: locale === "ru" ? "ru_RU" : locale === "uk" ? "uk_UA" : "en_US",
    },
  };
}

export default async function PrivacyPage({
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
              <a href={`${base}#services`} className="transition hover:text-ink">
                {t.header.nav.services}
              </a>
              <a href={`${base}#formats`} className="transition hover:text-ink">
                {t.header.nav.formats}
              </a>
              <a href={`${base}#about`} className="transition hover:text-ink">
                {t.header.nav.about}
              </a>
            </nav>
            <LanguageSwitcher current={locale} label={t.header.language} />
            <a
              href={`${base}#contact`}
              className="hidden rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-background transition hover:bg-cream-hover sm:inline-flex"
            >
              {t.header.cta}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section>
          <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
            <a
              href={base}
              className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
            >
              <span aria-hidden="true">←</span>
              {t.privacy.back}
            </a>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {t.privacy.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {t.privacy.subtitle}
            </p>

            <div className="mt-12 space-y-10">
              {t.privacy.sections.map((section, index) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-semibold text-ink">
                    <span className="mr-2 text-accent">{index + 1}.</span>
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-3 leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.items.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-3 text-muted">
                          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} copy={t.footer} pathSuffix="/privacy" />
    </>
  );
}
