import Link from "next/link";
import {
  INSTAGRAM_URL,
  locales,
  TELEGRAM_URL,
  WHATSAPP_URL,
  type Dictionary,
  type Locale,
} from "@/i18n/config";

/* Quiet text links, not the pills used beside the form — the footer is where
   people check that a real person stands behind the site, so the direct
   contacts belong here too. */
const DIRECT = [
  { label: "Telegram", href: TELEGRAM_URL },
  { label: "WhatsApp", href: WHATSAPP_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
] as const;

export default function SiteFooter({
  locale,
  copy,
  pathSuffix = "",
}: {
  locale: Locale;
  copy: Dictionary["footer"];
  /** Path after the locale segment, e.g. "" for home or "/privacy". Keeps language links on the same page type. */
  pathSuffix?: string;
}) {
  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="max-w-sm">
            <p className="leading-relaxed text-muted">{copy.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {DIRECT.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 text-muted transition hover:text-ink"
                >
                  {c.label}
                  <span aria-hidden="true" className="text-[10px] text-accent">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-end md:justify-end">
            <p className="font-display text-4xl leading-none text-ink sm:text-5xl">
              Service Studio
              <span className="mt-2 block text-lg font-normal text-faint sm:text-xl">
                by Ruslan
              </span>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            {"©"} {new Date().getFullYear()} {copy.brand}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* Two-letter links are the smallest targets on the site: each gets
                a 44px cell of its own, and the cells sit flush so the row reads
                the same as it did with a gap between bare letters. */}
            <span className="-mx-3 flex items-center">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${pathSuffix}`}
                  aria-current={loc === locale ? "page" : undefined}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center uppercase transition hover:text-ink ${
                    loc === locale ? "text-ink" : ""
                  }`}
                >
                  {loc.toUpperCase()}
                </Link>
              ))}
            </span>
            <Link
              href={`/${locale}/privacy`}
              className="inline-flex min-h-11 items-center transition hover:text-ink"
            >
              {copy.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
