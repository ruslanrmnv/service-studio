import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import type { Dictionary, Locale } from "@/i18n/config";

export default function SiteHeader({
  locale,
  copy,
  onHome = true,
}: {
  locale: Locale;
  copy: Dictionary["header"];
  /** false on inner pages: anchors then link back to the home page sections. */
  onHome?: boolean;
}) {
  const base = `/${locale}`;
  const anchor = (id: string) => (onHome ? `#${id}` : `${base}#${id}`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-6">
        {/* min-h/min-w-11: on phones the wordmark is hidden and the link
            collapses to the 22px monogram, which is half a tap target. The
            header row is already 44px tall, so this costs no layout. */}
        <a
          href={base}
          className="flex min-h-11 min-w-11 shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-[15px] text-ink"
        >
          <Logo size={22} />
          {/* Phones get the monogram alone — the width goes to the CTA, and
              "by Ruslan" waits until the nav has room to sit beside it. */}
          <span className="hidden sm:inline">
            Service&nbsp;Studio
            <span className="hidden text-faint lg:inline"> by Ruslan</span>
          </span>
        </a>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-6">
          {/* Tablets have the room for the section links; phones don't, and on a
              single-page site the always-visible CTA covers them there. */}
          <nav className="hidden items-center gap-5 whitespace-nowrap text-sm text-muted md:flex lg:gap-6">
            <a href={anchor("services")} className="transition hover:text-ink">
              {copy.nav.services}
            </a>
            <a href={anchor("formats")} className="transition hover:text-ink">
              {copy.nav.formats}
            </a>
            <a href={anchor("faq")} className="transition hover:text-ink">
              {copy.nav.faq}
            </a>
            {/* Three links is what a tablet fits once the longest locale
                (Ukrainian) is measured; the fourth waits for desktop. */}
            <a
              href={anchor("about")}
              className="hidden transition hover:text-ink lg:inline"
            >
              {copy.nav.about}
            </a>
          </nav>
          <LanguageSwitcher current={locale} label={copy.language} />
          <ThemeToggle label={copy.theme} />
          <a
            href={anchor("contact")}
            className="btn-lift inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-ink px-4 text-sm font-medium text-background hover:bg-muted sm:px-5"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
