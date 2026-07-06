import type { MetadataRoute } from "next";
import { getSiteUrl, locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: {
        ru: `${base}/ru`,
        en: `${base}/en`,
        uk: `${base}/uk`,
        "x-default": `${base}/en`,
      },
    },
  }));
}
