import type { Metadata } from "next";
import { Golos_Text, Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import "../globals.css";

/* Self-hosted by next/font. Both faces carry Latin and Cyrillic in one file, so
   a Russian sentence with "Telegram" in it is set from a single family — no
   per-glyph substitution, no visible seam. Golos Text (body) is drawn Cyrillic-
   first, which is the right priority for a RU/UK-led site; its humanist
   proportions also give Montserrat's geometry something to sit against. Both
   are variable fonts: one file each covers every weight the site uses. */
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

/* Runs before first paint: applies the stored theme (or the system preference)
   to <html>, so a light-theme visitor never sees a dark flash. */
const THEME_INIT = `(function(){try{var t=localStorage.theme;if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;
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
    "сайт под ключ",
    "сайт для салона красоты",
    "сайт для гостевого дома",
    "формы заявок",
  ],
  en: [
    "business websites",
    "service business website",
    "small business website",
    "website for a beauty salon",
    "website for a guest house",
    "lead forms",
  ],
  uk: [
    "створення сайтів",
    "сайти для бізнесу",
    "сайт під ключ",
    "сайт для салону краси",
    "сайт для гостьового будинку",
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
    /* Without this, X/Twitter falls back to a small thumbnail even though the
       opengraph-image route provides a large one. */
    twitter: {
      card: "summary_large_image",
      title: metadata.ogTitle,
      description: metadata.ogDescription,
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
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${golos.variable} ${montserrat.variable} h-full antialiased`}
    >
      {/* min-h-dvh, not min-h-full: Lenis sets html { height: auto }, and a
          percentage min-height resolves to nothing against an auto parent,
          which would drop the footer off the bottom of a short page. */}
      <body className="min-h-dvh flex flex-col bg-background text-ink">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
