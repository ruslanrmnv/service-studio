import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getDictionary, isLocale, type Locale } from "@/i18n/config";

export const runtime = "nodejs";

const CONTACT_METHODS = ["whatsapp", "telegram", "instagram", "email"] as const;
type ContactMethod = (typeof CONTACT_METHODS)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field -> max length, used for validation and as the canonical field list.
const MAX_LENGTHS = {
  name: 100,
  businessType: 100,
  contactValue: 150,
  automate: 500,
  message: 2000,
} as const;

const METHOD_LABEL: Record<ContactMethod, string> = {
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  instagram: "Instagram",
  email: "Email",
};

function isContactMethod(value: unknown): value is ContactMethod {
  return (
    typeof value === "string" &&
    (CONTACT_METHODS as readonly string[]).includes(value)
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Keep the email subject on one safe, readable line (strip CR/LF/control chars). */
function sanitizeSubject(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim();
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Silently accept & drop
  // so bots get a success response and don't retry or learn the check exists.
  if (typeof body.companyUrl === "string" && body.companyUrl.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Validate locale: ru or en (fall back to en).
  const locale: Locale = isLocale(body.locale as string) ? (body.locale as Locale) : "en";
  const t = await getDictionary(locale);

  // Normalize string fields.
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data = {
    name: str(body.name),
    businessType: str(body.businessType),
    contactValue: str(body.contactValue),
    automate: str(body.automate),
    message: str(body.message),
  };
  const contactMethod = body.contactMethod;

  // Required fields (businessType is optional).
  if (
    !data.name ||
    !data.contactValue ||
    !data.automate ||
    !isContactMethod(contactMethod)
  ) {
    return NextResponse.json(
      { error: t.contact.validation.required },
      { status: 400 }
    );
  }

  // Max length limits.
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    if (data[field as keyof typeof data].length > max) {
      return NextResponse.json(
        { error: t.contact.validation.required },
        { status: 400 }
      );
    }
  }

  // Email format only matters when the chosen method is email.
  if (contactMethod === "email" && !EMAIL_RE.test(data.contactValue)) {
    return NextResponse.json(
      { error: t.contact.validation.email },
      { status: 400 }
    );
  }

  // Fail gracefully if email provider is not configured.
  // RESEND_API_KEY is read server-side only and never sent to the client.
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "Contact form: missing email configuration (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL)."
    );
    return NextResponse.json(
      { error: t.contact.error.unavailable },
      { status: 503 }
    );
  }

  // Meta info for the email (not user-controlled form fields).
  const source = (
    str(body.source) ||
    request.headers.get("referer") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    ""
  ).slice(0, 300);
  const timestamp = new Date().toISOString();

  const labelsByLocale: Record<Locale, Record<string, string>> = {
    ru: {
      name: "Имя",
      businessType: "Сфера / задача",
      method: "Способ связи",
      contactValue: "Контакт",
      automate: "Что автоматизировать",
      message: "Сообщение",
      locale: "Язык",
      source: "Страница",
      time: "Время",
      heading: "Новая заявка с сайта Service Studio",
    },
    uk: {
      name: "Ім’я",
      businessType: "Сфера / задача",
      method: "Спосіб зв’язку",
      contactValue: "Контакт",
      automate: "Що потрібно автоматизувати",
      message: "Повідомлення",
      locale: "Мова",
      source: "Сторінка",
      time: "Час відправлення",
      heading: "Нова заявка з сайту Service Studio",
    },
    en: {
      name: "Name",
      businessType: "Area / task",
      method: "Contact method",
      contactValue: "Contact",
      automate: "What to automate",
      message: "Message",
      locale: "Locale",
      source: "Page",
      time: "Time",
      heading: "New request from the Service Studio site",
    },
  };
  const labels = labelsByLocale[locale];

  const fields: Array<[string, string]> = [[labels.name, data.name]];
  if (data.businessType) fields.push([labels.businessType, data.businessType]);
  fields.push(
    [labels.method, METHOD_LABEL[contactMethod]],
    [labels.contactValue, data.contactValue],
    [labels.automate, data.automate]
  );
  if (data.message) fields.push([labels.message, data.message]);
  // Meta rows.
  fields.push([labels.locale, locale]);
  if (source) fields.push([labels.source, source]);
  fields.push([labels.time, timestamp]);

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#0f172a;vertical-align:top">${escapeHtml(
          label
        )}</td><td style="padding:6px 12px;color:#334155">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px"><h2 style="color:#0f172a">${labels.heading}</h2><table style="border-collapse:collapse;width:100%">${rows}</table></div>`;
  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");

  // Use the user's email as replyTo only when the method is email and it's valid.
  const replyTo =
    contactMethod === "email" && EMAIL_RE.test(data.contactValue)
      ? data.contactValue
      : undefined;

  const subject = sanitizeSubject(
    data.businessType
      ? `${labels.heading}: ${data.name} (${data.businessType})`
      : `${labels.heading}: ${data.name}`
  );

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo,
      subject,
      html,
      text,
    });

    if (error) {
      // Log server-side only; never leak provider details to the client.
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: t.contact.error.generic },
        { status: 502 }
      );
    }

    // Keep the success response generic — don't expose the provider message id.
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: t.contact.error.generic },
      { status: 500 }
    );
  }
}
