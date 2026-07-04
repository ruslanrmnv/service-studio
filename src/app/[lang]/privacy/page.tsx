import type { Metadata } from "next";
import { defaultLocale, getDictionary, isLocale, type Locale } from "@/i18n/config";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

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
      <SiteHeader locale={locale} copy={t.header} onHome={false} />

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

            <h1 className="mt-6 font-display text-3xl leading-[1.1] text-ink sm:text-4xl">
              {t.privacy.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {t.privacy.subtitle}
            </p>

            <div className="mt-12 space-y-10">
              {t.privacy.sections.map((section, index) => (
                <section key={section.heading}>
                  <h2 className="font-display text-xl text-ink">
                    <span className="mr-2 text-base text-accent">{index + 1}.</span>
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
