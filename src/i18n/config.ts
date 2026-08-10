import type { Dictionary } from "./dictionaries/ru";

export const locales = ["ru", "en", "uk", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type { Dictionary };

/* Derived from `locales` rather than hand-listed. Spanish arrived as a fourth
   language and found the old spelling — three chained comparisons here, three
   more in detectLocale, and a hand-written hreflang map in each of three
   files — every one of which would still typecheck while quietly leaving the
   new language out. Adding a language is now one edit to the array above. */
export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Decide a locale from an Accept-Language header (by preference order).
 * A tag the site doesn't publish falls through to the next preference, and an
 * empty list of matches ends at English.
 */
export function detectLocale(
  acceptLanguage: string | null | undefined
): Locale {
  if (!acceptLanguage) return defaultLocale;

  const prefs = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return {
        tag: tag.toLowerCase().split("-")[0],
        q: q ? Number.parseFloat(q) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of prefs) {
    if (isLocale(tag)) return tag;
  }

  return defaultLocale;
}

/**
 * The hreflang map for one path, built from `locales` so a new language reaches
 * every page's alternates by being added to the array and nowhere else.
 * `origin` is empty for Next metadata (resolved against metadataBase) and an
 * absolute origin for the sitemap, which has no base to resolve against.
 */
export function languageAlternates(path = "", origin = ""): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of locales) {
    map[locale] = `${origin}/${locale}${path}`;
  }
  map["x-default"] = `${origin}/${defaultLocale}${path}`;
  return map;
}

/** BCP 47 tags for Open Graph, which wants ru_RU where the URL says ru. */
export const OG_LOCALE: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
  uk: "uk_UA",
  es: "es_ES",
};

/** Load a typed dictionary. Dynamic import keeps locales split and edge bundle small. */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "ru":
      return (await import("./dictionaries/ru")).ru;
    case "uk":
      return (await import("./dictionaries/uk")).uk;
    case "es":
      return (await import("./dictionaries/es")).es;
    case "en":
      return (await import("./dictionaries/en")).en;
    default:
      return (await import("./dictionaries/en")).en;
  }
}

/**
 * Direct contact links (single source of truth).
 */
export const TELEGRAM_URL = "https://t.me/rslnrr";
export const WHATSAPP_URL = "https://wa.me/994503412715";
export const INSTAGRAM_URL = "https://instagram.com/ruslnrmnv";

export const SITE_NAME = "Service Studio by Ruslan";
export const CANONICAL_HOST = "www.servicestudiobyruslan.com";
export const PRODUCTION_SITE_URL = `https://${CANONICAL_HOST}`;

/**
 * Absolute site origin for metadata, sitemap, and robots.
 * Uses NEXT_PUBLIC_SITE_URL and falls back to the production origin on Vercel
 * production builds, or localhost for local development. The bare production
 * domain is normalized to www so canonical URLs match the host Vercel serves.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  const fallback =
    process.env.VERCEL_ENV === "production"
      ? PRODUCTION_SITE_URL
      : "http://localhost:3000";

  if (raw) {
    try {
      const url = new URL(raw);
      if (url.hostname === "servicestudiobyruslan.com") {
        url.hostname = CANONICAL_HOST;
      }
      return url.origin;
    } catch {
      console.warn(
        `Invalid NEXT_PUBLIC_SITE_URL (${JSON.stringify(
          raw
        )}); falling back to ${fallback}`
      );
    }
  }
  return fallback;
}
