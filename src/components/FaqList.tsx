import type { Dictionary } from "@/i18n/config";

/**
 * Common questions as native <details> disclosures: keyboard-operable and
 * open-on-find in the browser without a line of JavaScript, and readable by
 * search engines whether open or closed.
 *
 * Hairline rows rather than cards — the page already has four card grids, and
 * a list of questions reads faster as a list.
 */
export default function FaqList({ items }: { items: Dictionary["faq"]["items"] }) {
  return (
    <ul className="border-t border-line">
      {items.map((item) => (
        <li key={item.q} className="border-b border-line">
          <details className="group">
            <summary className="faq-summary flex cursor-pointer items-start justify-between gap-6 py-5 font-display text-lg leading-snug text-ink transition hover:text-accent">
              {item.q}
              <span
                aria-hidden="true"
                className="mt-2 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
              >
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M7 1v12M1 7h12" />
                </svg>
              </span>
            </summary>
            <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
