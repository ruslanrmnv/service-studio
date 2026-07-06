import type { Metadata } from "next";
import { Onest, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

/* Variable fonts, self-hosted by next/font. Onest carries body and UI; Unbounded
   is the display face for headings and brand moments, used with restraint. Both
   ship full Cyrillic (Ukrainian і/ї/є/ґ included). */
const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});
import {
  defaultLocale,
  getDictionary,
  getSiteUrl,
  isLocale,
  locales,
  SITE_NAME,
  type Locale,
} from "@/i18n/config";

const SITE_URL = getSiteUrl();

const KEYWORDS_BY_LOCALE: Record<Locale, string[]> = {
  ru: [
    "создание сайтов",
    "сайты для бизнеса",
    "Telegram-боты",
    "AI-автоматизация",
    "автоматизация бизнеса",
    "формы заявок",
  ],
  en: [
    "business websites",
    "service business website",
    "Telegram bots",
    "AI automation",
    "business automation",
    "lead forms",
  ],
  uk: [
    "створення сайтів",
    "сайти для бізнесу",
    "Telegram-боти",
    "ШІ-автоматизація",
    "автоматизація бізнесу",
    "форми заявок",
  ],
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const { metadata } = await getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: metadata.title,
    description: metadata.description,
    applicationName: SITE_NAME,
    keywords: KEYWORDS_BY_LOCALE[locale],
    authors: [{ name: "Ruslan", url: SITE_URL }],
    creator: "Ruslan",
    publisher: SITE_NAME,
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: "/ru",
        en: "/en",
        uk: "/uk",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: `/${locale}`,
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "ru" ? "ru_RU" : locale === "uk" ? "uk_UA" : "en_US",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${onest.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        {children}
      </body>
    </html>
  );
}
