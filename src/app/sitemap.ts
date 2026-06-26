import type { MetadataRoute } from "next";
import { getSiteUrl, locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const home = locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  const privacy = locales.map((locale) => ({
    url: `${base}/${locale}/privacy`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...home, ...privacy];
}
