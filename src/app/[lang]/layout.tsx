import type { Metadata } from "next";
import { Golos_Text, Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AttributionCapture from "@/components/AttributionCapture";
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
  languageAlternates,
  locales,
  OG_LOCALE,
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
  es: [
    "diseño de páginas web",
    "web para pequeños negocios",
    "página web para autónomos",
    "web para salón de belleza",
    "web para casa de huéspedes",
    "formularios de solicitud",
  ],
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/* The locales in `locales` exist and no more. Without this, [lang] matches any first
   segment, so /blog rendered the home page under lang="blog" and Next cached
   the result at that address — a second home page for every word anyone
   mistypes. The layout's notFound() below is the belt to this brace: it fires
   for a request that reaches the layout, this stops the request reaching it. */
export const dynamicParams = false;

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
      languages: languageAlternates(),
    },
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: `/${locale}`,
      siteName: SITE_NAME,
      type: "website",
      locale: OG_LOCALE[locale],
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
        <AttributionCapture />
        {children}
        {/* Both are cookieless and store no identifier, so the site needs no
            consent banner to run them — which matters, selling from Spain.
            Analytics answers whether anyone reaches the form; Speed Insights
            reports the field numbers from real phones instead of the lab. Data
            only flows once each is switched on for the project in Vercel. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
