import Link from "next/link";
import {
  INSTAGRAM_URL,
  locales,
  TELEGRAM_URL,
  WHATSAPP_URL,
  type Dictionary,
  type Locale,
} from "@/i18n/config";

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
    <footer className="border-t border-line bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-semibold text-ink">{copy.brand}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {copy.tagline}
            </p>
          </div>
          <div className="flex flex-col gap-4 text-sm sm:items-end">
            <div className="flex flex-col gap-2.5 sm:items-end">
              <p className="text-sm font-medium text-muted">{copy.contact}</p>
              <div className="flex items-center gap-2">
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-soft text-muted transition hover:border-line-strong hover:text-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M21.94 4.94a1.2 1.2 0 0 0-1.62-1.13L3.36 10.5c-.9.36-.88 1.65.03 1.97l4.3 1.5 1.66 5.02c.2.62 1 .78 1.45.3l2.4-2.55 4.2 3.1c.55.4 1.33.1 1.47-.56l3.07-14.34ZM9.5 13.9l8.1-5.1-6.6 6.2c-.2.2-.33.46-.36.74l-.2 2-.94-3.84Z" />
                  </svg>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-soft text-muted transition hover:border-line-strong hover:text-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.06 1.6 5.82L2 22l4.41-1.69a9.86 9.86 0 0 0 5.63 1.74h.01c5.46 0 9.91-4.45 9.91-9.91C21.97 6.45 17.5 2 12.04 2Zm5.8 14.13c-.24.68-1.42 1.32-1.95 1.36-.5.05-1.13.27-3.8-.8-3.2-1.26-5.24-4.55-5.4-4.76-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.64-.4.85-.4.21 0 .43 0 .61.01.2.01.46-.07.72.55.27.64.92 2.21 1 2.37.08.16.13.35.02.56-.1.21-.16.34-.32.53-.16.19-.34.42-.48.56-.16.16-.33.34-.14.66.19.32.85 1.4 1.83 2.27 1.26 1.12 2.32 1.47 2.64 1.63.32.16.51.13.7-.08.19-.21.81-.94 1.03-1.27.21-.32.43-.27.72-.16.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.13.08.74-.16 1.42Z" />
                  </svg>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-soft text-muted transition hover:border-line-strong hover:text-ink"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 text-faint">
              {locales.map((loc, index) => (
                <span key={loc} className="flex items-center gap-3">
                  {index > 0 && <span aria-hidden="true">·</span>}
                  <Link
                    href={`/${loc}${pathSuffix}`}
                    aria-current={loc === locale ? "page" : undefined}
                    className={`transition hover:text-ink ${
                      loc === locale ? "text-ink" : ""
                    }`}
                  >
                    {loc.toUpperCase()}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            {"©"} {new Date().getFullYear()} {copy.brand}
          </p>
          <Link
            href={`/${locale}/privacy`}
            className="transition hover:text-ink"
          >
            {copy.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
