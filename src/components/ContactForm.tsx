"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale } from "@/i18n/config";

type ContactCopy = Dictionary["contact"];
type Status = "idle" | "loading" | "success" | "error";

const METHODS = ["whatsapp", "telegram", "instagram", "email"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Max lengths mirror the API route limits.
const MAX = {
  name: 100,
  businessType: 100,
  contactValue: 150,
  automate: 2000,
} as const;

export default function ContactForm({
  lang,
  copy,
}: {
  lang: Locale;
  copy: ContactCopy;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries()
    ) as Record<string, string>;

    // Client-side validation (businessType is optional).
    const required = ["name", "contactMethod", "contactValue", "automate"];
    if (required.some((field) => !data[field]?.trim())) {
      setStatus("error");
      setErrorMessage(copy.validation.required);
      return;
    }
    if (data.contactMethod === "email" && !EMAIL_RE.test(data.contactValue.trim())) {
      setStatus("error");
      setErrorMessage(copy.validation.email);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale: lang }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.error || copy.error.generic);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : copy.error.generic);
    }
  }

  if (status === "success") {
    return (
      <div
        aria-live="polite"
        className="rounded-2xl border border-accent-line bg-accent-soft p-8 text-center"
      >
        <h3 className="font-display text-xl text-ink">
          {copy.success.title}
        </h3>
        <p className="mt-2 text-muted">{copy.success.text}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-accent transition hover:text-ink"
        >
          {copy.success.again}
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-ink placeholder:text-faint outline-none transition focus:border-accent-line focus:ring-2 focus:ring-accent-soft";
  const labelClass = "mb-1.5 block text-sm text-muted";
  const req = <span className="text-faint">*</span>;
  const opt = <span className="text-faint">({copy.form.optional})</span>;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot: hidden from real users; bots that fill it are ignored server-side. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="companyUrl">Company URL</label>
        <input
          id="companyUrl"
          name="companyUrl"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {copy.form.name} {req}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={MAX.name}
            autoComplete="name"
            placeholder={copy.form.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="businessType" className={labelClass}>
            {copy.form.businessType} {opt}
          </label>
          <input
            id="businessType"
            name="businessType"
            type="text"
            maxLength={MAX.businessType}
            placeholder={copy.form.businessTypePlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contactMethod" className={labelClass}>
            {copy.form.contactMethod} {req}
          </label>
          {/* The native control keeps its OS dropdown, but the closed state is
              ours — an unstyled select renders as a grey system box in the
              middle of the panel. */}
          <div className="relative">
            <select
              id="contactMethod"
              name="contactMethod"
              required
              defaultValue=""
              className={`${inputClass} cursor-pointer appearance-none pr-11`}
            >
              <option value="" disabled>
                {copy.form.contactMethodPlaceholder}
              </option>
              {METHODS.map((method) => (
                <option key={method} value={method}>
                  {copy.form.methods[method]}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 10 6"
              className="pointer-events-none absolute right-4 top-1/2 h-1.5 w-2.5 -translate-y-1/2 text-faint"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M1 1l4 4 4-4" />
            </svg>
          </div>
        </div>
        <div>
          <label htmlFor="contactValue" className={labelClass}>
            {copy.form.contactValue} {req}
          </label>
          <input
            id="contactValue"
            name="contactValue"
            type="text"
            required
            maxLength={MAX.contactValue}
            placeholder={copy.form.contactValuePlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      {/* One free-text field, not two: a separate optional "message" box next to
          this one just asked for the same thing twice. */}
      <div>
        <label htmlFor="automate" className={labelClass}>
          {copy.form.automate} {req}
        </label>
        <textarea
          id="automate"
          name="automate"
          required
          rows={4}
          maxLength={MAX.automate}
          placeholder={copy.form.automatePlaceholder}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div aria-live="assertive">
        {status === "error" && (
          <p className="rounded-xl border border-danger-line bg-danger-soft px-4 py-3 text-sm text-danger">
            {errorMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-lift inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-7 text-[15px] font-medium text-background hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? copy.form.submitting : copy.form.submit}
      </button>

      <p className="text-[13px] leading-relaxed text-faint">
        {copy.form.privacyNote}{" "}
        <Link
          href={`/${lang}/privacy`}
          className="underline underline-offset-2 transition hover:text-ink"
        >
          {copy.form.privacyLink}
        </Link>
      </p>
    </form>
  );
}
