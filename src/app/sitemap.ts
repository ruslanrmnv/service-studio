import type { MetadataRoute } from "next";
import { defaultLocale, getSiteUrl, locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const languagesFor = (path: string) => ({
    ru: `${base}/ru${path}`,
    en: `${base}/en${path}`,
    uk: `${base}/uk${path}`,
    "x-default": `${base}/en${path}`,
  });

  const localized = (path: string, priority: number) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: languagesFor(path) },
    }));

  return [
    ...localized("", 1),
    ...localized("/privacy", 0.3),
    /* English only, and deliberately: the Upwork case is written in English and
       the other two locales carry the same text, so they are canonicalized to
       this one and left out of here rather than offered as translations. */
    {
      url: `${base}/${defaultLocale}/upwork`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];
}
