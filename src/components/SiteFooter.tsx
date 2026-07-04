import Link from "next/link";
import {
  INSTAGRAM_URL,
  locales,
  TELEGRAM_URL,
  WHATSAPP_URL,
  type Dictionary,
  type Locale,
} from "@/i18n/config";

const SOCIALS = [
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
            <p className="mt-8 text-sm text-faint">{copy.contact}</p>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-5 text-sm text-muted transition hover:border-accent-line hover:text-ink"
                  >
                    {social.label}
                    <span aria-hidden="true" className="text-[10px]">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
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
            <span className="flex items-center gap-3">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${pathSuffix}`}
                  aria-current={loc === locale ? "page" : undefined}
                  className={`inline-flex min-h-8 items-center uppercase transition hover:text-ink ${
                    loc === locale ? "text-ink" : ""
                  }`}
                >
                  {loc.toUpperCase()}
                </Link>
              ))}
            </span>
            <Link
              href={`/${locale}/privacy`}
              className="inline-flex min-h-8 items-center transition hover:text-ink"
            >
              {copy.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
