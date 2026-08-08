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
      {/* py-2.5 below sm, py-4 above. The header is sticky, so on a phone its
          height is subtracted from every screen, not just the first; the row's
          own children are min-h-11 and keep their 44px tap targets whatever
          this padding does. */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6 sm:py-4">
        {/* min-h/min-w-11: on phones the wordmark is hidden and the link
            collapses to the 22px monogram, which is half a tap target. The
            header row is already 44px tall, so this costs no layout. */}
        <a
          href={base}
          className="flex min-h-11 min-w-11 shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-[15px] text-ink"
        >
          <Logo size={22} />
          {/* Below sm the wordmark is gone and the mark itself is aria-hidden,
              which would leave a link with no accessible name at all. Dropped
              rather than hidden from sm up, so the name isn't said twice. */}
          <span className="sr-only sm:hidden">Service Studio</span>
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
            <a href={anchor("formats")} className="transition hover:text-ink">
              {copy.nav.formats}
            </a>
            <a href={anchor("faq")} className="transition hover:text-ink">
              {copy.nav.faq}
            </a>
            {/* Tablets got two links once «Услуги» went with its section;
                the third still waits for desktop, measured against the
                longest locale (Ukrainian). */}
            <a
              href={anchor("about")}
              className="hidden transition hover:text-ink lg:inline"
            >
              {copy.nav.about}
            </a>
          </nav>
          <LanguageSwitcher current={locale} label={copy.language} />
          <ThemeToggle label={copy.theme} />
          {/* Outlined, not filled. The hero's own button says the same thing
              one screen below, and two solid buttons of the same colour on
              one screen split the visitor's attention instead of directing
              it — the filled one belongs to the offer, this one is only the
              way back to it from further down the page.

              The outline is drawn in faint rather than the line-strong the
              price cards use: at this size the border is the only thing that
              says "button", and line-strong lands at 1.8:1 against the header
              — visible on a good screen, gone on a phone in daylight. Faint
              clears 3:1 and still reads as secondary next to a filled pill. */}
          <a
            href={anchor("contact")}
            className="btn-lift inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-faint px-4 text-sm font-medium text-ink hover:border-ink sm:px-5"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
