import type { Dictionary } from "./dictionaries/ru";

export const locales = ["ru", "en", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type { Dictionary };

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "ru" || value === "en" || value === "uk";
}

/**
 * Decide a locale from an Accept-Language header (by preference order).
 * Ukrainian -> "uk", Russian -> "ru", everything else -> "en".
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
    if (tag === "uk") return "uk";
    if (tag === "ru") return "ru";
    if (tag === "en") return "en";
  }

  return defaultLocale;
}

/** Load a typed dictionary. Dynamic import keeps locales split and edge bundle small. */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "ru":
      return (await import("./dictionaries/ru")).ru;
    case "uk":
      return (await import("./dictionaries/uk")).uk;
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
