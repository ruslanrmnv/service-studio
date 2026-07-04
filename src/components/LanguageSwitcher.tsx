"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname();

  function hrefFor(locale: Locale): string {
    const segments = pathname.split("/");
    segments[1] = locale; // replace the locale segment
    const next = segments.join("/");
    return next || `/${locale}`;
  }

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-0.5 rounded-full border border-line p-0.5"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            aria-current={active ? "true" : undefined}
            aria-label={
              locale === "ru"
                ? "Русский"
                : locale === "uk"
                  ? "Українська"
                  : "English"
            }
            className={`rounded-full px-2.5 py-1.5 text-xs font-medium uppercase transition ${
              active
                ? "bg-ink text-background"
                : "text-faint hover:text-ink"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
