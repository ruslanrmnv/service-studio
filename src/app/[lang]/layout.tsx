import type { Metadata } from "next";
import { Golos_Text, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

/* Variable fonts, self-hosted by next/font. Golos covers every text role
   (body 400 → display 800); JetBrains Mono is reserved for system-flavored
   details: small labels, numerals, statuses. Both ship full Cyrillic
   (cyrillic-ext covers Ukrainian і/ї/є/ґ). */
const golos = Golos_Text({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-golos",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-jetbrains-mono",
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
      className={`${golos.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        {children}
      </body>
    </html>
  );
}
