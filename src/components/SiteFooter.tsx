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
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-2 md:gap-0">
          <div className="max-w-sm md:pr-12">
            <p className="text-sm leading-relaxed text-muted">{copy.tagline}</p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
              {copy.contact}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-5 text-xs font-medium uppercase tracking-[0.08em] text-muted transition hover:border-line-strong hover:text-ink"
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
          <div className="flex items-center border-t border-line pt-10 md:justify-end md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <p className="text-3xl leading-tight tracking-[-0.01em] text-ink sm:text-4xl">
              Service Studio
              <span className="block text-lg text-faint sm:text-xl">by Ruslan</span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-faint sm:flex-row sm:items-center sm:justify-between">
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
                  className={`inline-flex min-h-8 items-center transition hover:text-ink ${
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
