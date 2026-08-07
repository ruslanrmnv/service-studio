"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, type Locale } from "@/i18n/config";

const NATIVE_NAMES: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  uk: "Українська",
};

export default function LanguageSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  function hrefFor(locale: Locale): string {
    const segments = pathname.split("/");
    segments[1] = locale; // replace the locale segment
    const next = segments.join("/");
    return next || `/${locale}`;
  }

  /* Close on outside click and on Escape, like any native menu. */
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        /* The code is on the button, so it has to be in the name as well:
           voice control matches what the user can read ("RU"), and a name of
           just "Язык" leaves the spoken command with nothing to hit. */
        aria-label={`${label}: ${current.toUpperCase()}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 items-center gap-1.5 rounded-full border border-line px-3.5 text-xs font-medium uppercase text-muted transition hover:border-line-strong hover:text-ink"
      >
        {current}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className={`h-1.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label={label}
          className="absolute right-0 top-full z-50 mt-2 min-w-36 overflow-hidden rounded-xl border border-line bg-surface-2 py-1 shadow-lg"
        >
          {locales.map((locale) => {
            const active = locale === current;
            return (
              <Link
                key={locale}
                role="menuitem"
                href={hrefFor(locale)}
                aria-current={active ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex min-h-11 items-center justify-between gap-4 px-4 text-sm transition ${
                  active
                    ? "text-ink"
                    : "text-muted hover:bg-surface-3 hover:text-ink"
                }`}
              >
                {NATIVE_NAMES[locale]}
                {active && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 10"
                    className="h-2.5 w-3 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 5.5L4.2 8.5 11 1.5" />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
