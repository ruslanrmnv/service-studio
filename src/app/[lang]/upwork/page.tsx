import type { Metadata } from "next";
import {
  defaultLocale,
  getSiteUrl,
  isLocale,
  locales,
  SITE_NAME,
  type Locale,
} from "@/i18n/config";

const UPWORK_PROFILE_URL =
  "https://www.upwork.com/freelancers/~01b7dafa0d0f52ee1a";

const proofPoints = [
  ["Built with", "Next.js, React, responsive UI"],
  ["Main flow", "Service selection, time request, owner notification"],
  ["Best fit", "Salons, clinics, schools, auto services, consultants"],
  ["Delivery style", "Working preview first, then launch-ready build"],
] as const;

const deliverables = [
  "A focused booking page for a local service business",
  "A request form that collects name, service, preferred time, and contact details",
  "A simple owner-side request table so new leads do not disappear in chats",
  "Notification logic so the owner knows when a client submits a request",
  "Mobile-first layout for clients booking from a phone",
] as const;

const scenarios = [
  {
    title: "Salon or beauty studio",
    result: "Clients choose a service and request a time without waiting for a reply.",
  },
  {
    title: "Clinic or private specialist",
    result: "The request arrives with the basic details needed before a callback.",
  },
  {
    title: "Auto service or repair shop",
    result: "The owner sees the job type, preferred time, and client contact in one place.",
  },
] as const;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const url = `${getSiteUrl()}/${locale}/upwork`;

  return {
    title: "Booking Website Case Study for Upwork Clients | Ruslan",
    description:
      "A focused Upwork portfolio case: a Next.js booking website and request flow for local service businesses.",
    alternates: {
      canonical: `/${locale}/upwork`,
      languages: {
        ru: "/ru/upwork",
        en: "/en/upwork",
        uk: "/uk/upwork",
        "x-default": "/en/upwork",
      },
    },
    openGraph: {
      title: "Booking Website Case Study | Ruslan",
      description:
        "A Next.js booking website and request flow for local service businesses.",
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "ru" ? "ru_RU" : locale === "uk" ? "uk_UA" : "en_US",
    },
  };
}

function SafeHeader() {
  return (
    <header className="overflow-hidden border-b border-line bg-background/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <p className="min-w-0 truncate font-display text-[15px] text-ink">
          Service&nbsp;Studio
          <span className="hidden text-faint sm:inline"> by Ruslan</span>
        </p>
        <a
          href={UPWORK_PROFILE_URL}
          className="inline-flex min-h-10 items-center rounded-lg bg-ink px-4 text-sm font-medium text-background transition hover:bg-muted"
        >
          <span className="sm:hidden">Upwork</span>
          <span className="hidden sm:inline">Message on Upwork</span>
        </a>
      </div>
    </header>
  );
}

function BookingFlowVisual() {
  return (
    <div className="rounded-lg border border-line bg-surface p-4 sm:p-5">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
        <div className="rounded-lg bg-background p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-faint">Client</p>
          <p className="mt-3 text-sm text-muted">Selects service</p>
          <p className="mt-1 font-display text-lg leading-tight text-ink">
            Haircut consultation
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted">
            <span className="rounded-md bg-surface-2 px-3 py-2">Today</span>
            <span className="rounded-md bg-surface-2 px-3 py-2">16:30</span>
          </div>
        </div>
        <div className="hidden items-center text-faint md:flex">→</div>
        <div className="rounded-lg bg-background p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-faint">System</p>
          <p className="mt-3 text-sm text-muted">Creates request row</p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-b border-line pb-2">
              <span className="text-faint">Name</span>
              <span className="text-ink">Anna</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-line pb-2">
              <span className="text-faint">Service</span>
              <span className="text-ink">Consultation</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-faint">Status</span>
              <span className="text-accent">New</span>
            </div>
          </div>
        </div>
        <div className="hidden items-center text-faint md:flex">→</div>
        <div className="rounded-lg bg-background p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-faint">Owner</p>
          <p className="mt-3 text-sm text-muted">Gets a clear notification</p>
          <div className="mt-4 rounded-lg border border-accent-line bg-accent-soft p-3">
            <p className="text-sm text-ink">New booking request from Anna</p>
            <p className="mt-1 text-xs text-faint">Reply while the lead is still warm.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductPreview() {
  return (
    <div className="upwork-mobile-safe w-full min-w-0 overflow-hidden rounded-lg border border-line bg-surface p-3 shadow-2xl shadow-black/30">
      <div className="flex items-center gap-2 border-b border-line px-2 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 min-w-0 truncate rounded-md bg-background px-3 py-1 text-xs text-faint sm:ml-3">
          booking-preview.local
        </span>
      </div>

      <div className="grid min-w-0 gap-3 pt-3 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="min-w-0 rounded-lg bg-background p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.16em] text-faint">
                Client view
              </p>
              <h2 className="mt-2 font-display text-xl leading-tight text-ink">
                Book a service
              </h2>
            </div>
            <span className="hidden rounded-full bg-accent-soft px-3 py-1 text-xs text-accent sm:inline-flex">
              Mobile ready
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {[
              ["Service", "Haircut consultation"],
              ["Preferred day", "Friday"],
              ["Preferred time", "16:30"],
              ["Client", "Anna"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-line bg-surface-2 p-3">
                <p className="text-xs text-faint">{label}</p>
                <p className="mt-1 text-sm text-ink">{value}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-4 min-h-10 w-full rounded-md bg-ink text-sm font-medium text-background"
          >
            Request appointment
          </button>
        </div>

        <div className="min-w-0 rounded-lg bg-background p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-faint">
            Owner view
          </p>
          <h2 className="mt-2 font-display text-xl leading-tight text-ink">
            New requests
          </h2>

          <div className="mt-5 overflow-hidden rounded-md border border-line">
            <div className="grid grid-cols-[52px_minmax(0,1fr)_52px] bg-surface-2 px-3 py-2 text-xs text-faint sm:grid-cols-[0.8fr_1.2fr_0.9fr]">
              <span>Time</span>
              <span>Request</span>
              <span>Status</span>
            </div>
            <div className="grid grid-cols-[52px_minmax(0,1fr)_52px] items-center border-t border-line px-3 py-3 text-sm sm:grid-cols-[0.8fr_1.2fr_0.9fr]">
              <span className="text-faint">16:30</span>
              <span className="min-w-0 truncate text-ink">Anna - Haircut</span>
              <span className="text-accent">New</span>
            </div>
            <div className="grid grid-cols-[52px_minmax(0,1fr)_52px] items-center border-t border-line px-3 py-3 text-sm sm:grid-cols-[0.8fr_1.2fr_0.9fr]">
              <span className="text-faint">18:00</span>
              <span className="min-w-0 truncate text-muted">Sam - Consultation</span>
              <span className="text-faint">Seen</span>
            </div>
          </div>

          <div className="mt-4 rounded-md border border-accent-line bg-accent-soft p-3">
            <p className="text-sm text-ink">Notification sent to the owner</p>
            <p className="mt-1 text-xs leading-relaxed text-faint">
              The lead is captured with service, time, and contact details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UpworkPage() {
  return (
    <>
      <SafeHeader />

      <main className="flex-1">
        <section className="overflow-hidden px-6 py-16 sm:py-20">
          <div className="mx-auto grid w-full min-w-0 max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div className="upwork-mobile-safe w-full min-w-0">
              <p className="text-sm text-faint">Upwork portfolio case</p>
              <h1 className="mt-5 max-w-4xl font-display text-[2.05rem] leading-[1.08] text-ink sm:text-5xl">
                <span className="block">Booking websites</span>
                <span className="block">for local service</span>
                <span className="block">businesses.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
                I build small, practical websites where clients can choose a
                service, request a time, and send the details without a long
                back-and-forth conversation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={UPWORK_PROFILE_URL}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-ink px-6 text-[15px] font-medium text-background transition hover:bg-muted"
                >
                  Message me on Upwork
                </a>
                <a
                  href="#case-details"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line-strong px-6 text-[15px] text-ink transition hover:border-ink"
                >
                  View case details
                </a>
              </div>
            </div>

            <ProductPreview />
          </div>
        </section>

        <section className="border-y border-line bg-surface" aria-label="Project facts">
          <div className="mx-auto grid max-w-6xl gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map(([label, value]) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-[0.16em] text-faint">{label}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="case-details" className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl leading-[1.1] text-ink sm:text-4xl">
                What the booking flow does
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                This is the core flow I can adapt for a salon, clinic, school,
                repair shop, or any service business that needs fewer missed leads.
              </p>
            </div>
            <div className="mt-10">
              <BookingFlowVisual />
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display text-3xl leading-[1.1] text-ink sm:text-4xl">
                What I can deliver
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                The first version should be narrow enough to launch quickly and
                useful enough to test with real clients.
              </p>
            </div>
            <ul className="grid gap-3">
              {deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-line bg-background px-5 py-4 text-[15px] leading-relaxed text-muted"
                >
                  <span className="text-accent">→</span>{" "}
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl leading-[1.1] text-ink sm:text-4xl">
                Where this fits best
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                I am not trying to sell a large platform first. The strongest
                starting point is one clear request flow that can start bringing
                leads into one place.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {scenarios.map((scenario) => (
                <article
                  key={scenario.title}
                  className="rounded-lg border border-line bg-surface p-6"
                >
                  <h3 className="font-display text-lg leading-snug text-ink">
                    {scenario.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {scenario.result}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm text-faint">For Upwork clients</p>
              <h2 className="mt-3 font-display text-3xl leading-[1.1] text-ink sm:text-4xl">
                Send me your business type and the booking flow you need.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                To keep the process clear, all first messages and project
                discussions should stay on Upwork until a contract is active.
              </p>
            </div>
            <a
              href={UPWORK_PROFILE_URL}
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-ink px-6 text-[15px] font-medium text-background transition hover:bg-muted"
            >
              Message me on Upwork
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{"©"} {new Date().getFullYear()} Service Studio by Ruslan</p>
          <p>Portfolio case page for Upwork clients</p>
        </div>
      </footer>
    </>
  );
}
