import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Dictionary, Locale } from "@/i18n/config";

export default function SiteHeader({
  locale,
  copy,
  demoLabel,
  onHome = true,
}: {
  locale: Locale;
  copy: Dictionary["header"];
  /** Optional "See it work" nav label; shown only when provided (home page). */
  demoLabel?: string;
  /** false on inner pages: anchors then link back to the home page sections. */
  onHome?: boolean;
}) {
  const base = `/${locale}`;
  const anchor = (id: string) => (onHome ? `#${id}` : `${base}#${id}`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <a href={base} className="text-base tracking-tight text-ink">
          Service&nbsp;Studio
          <span className="hidden text-faint sm:inline"> by Ruslan</span>
        </a>
        <div className="flex items-center gap-3 lg:gap-6">
          <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
            {demoLabel && (
              <a href={anchor("demo")} className="transition hover:text-ink">
                {demoLabel}
              </a>
            )}
            <a href={anchor("services")} className="transition hover:text-ink">
              {copy.nav.services}
            </a>
            <a href={anchor("formats")} className="transition hover:text-ink">
              {copy.nav.formats}
            </a>
            <a href={anchor("about")} className="transition hover:text-ink">
              {copy.nav.about}
            </a>
          </nav>
          <LanguageSwitcher current={locale} label={copy.language} />
          <a
            href={anchor("contact")}
            className="hidden min-h-11 items-center rounded-full bg-ink px-5 text-xs font-medium uppercase tracking-[0.08em] text-background transition hover:bg-muted sm:inline-flex"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
