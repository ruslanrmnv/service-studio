# Service Studio by Ruslan

A one-page, multilingual (RU / EN / UK) portfolio + lead-capture site for AI,
chat, and form automations. Built with **Next.js (App Router)**, **TypeScript**,
and **Tailwind CSS**, in a warm dark style.

- Locales: **RU / EN / UK** (the root `/` redirects by browser language)
- Routes: `/ru`, `/en`, `/uk` and `/ru/privacy`, `/en/privacy`, `/uk/privacy`
- Dark-first, mobile-friendly design
- Contact form that emails submissions via [Resend](https://resend.com)

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in real values
npm run dev
```

Open http://localhost:3000 — you'll be redirected to `/ru`, `/en`, or `/uk`.

> **Never commit `.env.local`.** It holds real secrets and is git-ignored.
> Only `.env.local.example` (placeholders only) is committed.

## Environment variables

See `.env.local.example`. All four are required for the contact form / metadata:

| Variable               | Purpose                                                          |
| ---------------------- | --------------------------------------------------------------- |
| `RESEND_API_KEY`       | Resend API key. **Server-side only**, never exposed to client.  |
| `CONTACT_TO_EMAIL`     | Inbox that receives contact-form submissions.                   |
| `CONTACT_FROM_EMAIL`   | **Verified-domain** sender, e.g. `Service Studio <hello@yourdomain.com>`. |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for canonical / OpenGraph metadata (no trailing slash). |

The contact form fails gracefully: if the email vars are missing, the API
returns a clear `503` and the form shows a friendly "message me directly"
error instead of breaking.

The contact links (Telegram / WhatsApp / Instagram) are configured in one place:
`TELEGRAM_URL`, `WHATSAPP_URL`, `INSTAGRAM_URL` in `src/i18n/config.ts`.

## Contact form

The form submits a `fetch` POST to `src/app/api/contact/route.ts`, which sends
the email using the official **Resend Node.js SDK** (`resend` package,
`await resend.emails.send()`). The API key is read only on the server from
`RESEND_API_KEY` and is never sent to the browser. Email field labels are
localized (RU / EN / UK) to match the submitting locale.

## Email setup (Resend) & deploy to Vercel

1. **Create a Resend API key** — sign up at https://resend.com, then
   https://resend.com/api-keys → *Create API Key*. Copy the `re_...` value.
2. **Verify your sending domain** — in Resend → *Domains*, add and verify your
   domain (add the DNS records it shows), then set `CONTACT_FROM_EMAIL` to an
   address on that verified domain. A verified-domain sender is required for
   reliable production delivery.
3. **Add environment variables on Vercel** — Project → *Settings* →
   *Environment Variables*, add for the Production (and Preview) environment:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (your production URL, e.g. `https://your-domain.com`)
4. **Redeploy** — trigger a new deployment so the variables take effect.
5. **Test the form in production** — submit the contact form and confirm the
   email arrives at `CONTACT_TO_EMAIL`. If the contact method is *Email*,
   replying to that message goes straight to the visitor.

> Add the env vars in Vercel **before** testing the production form — without
> them the API returns the graceful `503` and no email is sent.

## Useful scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
npx tsc --noEmit # type check
```

## Project structure

- `src/app/[lang]/` — localized home + layout (per-locale metadata)
- `src/app/[lang]/privacy/` — localized Privacy Policy pages
- `src/app/api/contact/route.ts` — contact form handler (Resend SDK)
- `src/components/` — `ContactForm`, `LanguageSwitcher`, `SiteFooter`
- `src/i18n/` — locale config + `ru` / `en` / `uk` dictionaries
- `src/proxy.ts` — root locale detection / redirect
