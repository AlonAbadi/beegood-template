# BeeGood Template — Hebrew Marketing OS

## What this is

A production-ready Next.js template for Hebrew influencer/coach marketing sites.
Fork this repo for each new client — then edit **only `lib/client.ts`**.
Everything else (nav, meta, emails, schema, payments) reads from that single file.

**Template repo:** https://github.com/AlonAbadi/beegood-template
**Based on:** hadar-danan (beegood.online) — the reference deployment

---

## Per-client setup checklist

1. **Fork** this repo on GitHub
2. **Edit `lib/client.ts`** — fill in all fields (name, domain, colors, products, hero, etc.)
3. **Replace public assets** — `/og-image.jpg`, hero images, product card images, logo files
4. **Create Supabase project** — run all migrations in `supabase/migrations/` in order
5. **Set env vars in Vercel** (see section below)
6. **Connect domain** in Vercel
7. **Verify Resend domain** for email sending
8. **Configure Cardcom** with new terminal credentials

---

## lib/client.ts — the only file that changes

```ts
export const CLIENT = {
  name:        "שם הלקוח",          // shown in nav, emails, footer
  name_en:     "client-slug",        // used in class names / slugs
  legal_name:  "שם הלקוח בע״מ",
  company_id:  "XXXXXXXXX",          // ח.פ / עוסק מורשה
  domain:      "example.com",
  whatsapp:    "972XXXXXXXXX",

  meta: { title, description, og_image },
  colors: { bg, bg_dark, card, card_soft, border, accent, accent_light, accent_dark, fg, fg_muted },
  hero: { image, image_alt, headline_a, headline_b, desc_a, desc_b, cta_a, cta_b },
  social_proof: { stat1, stat2, stat3, tagline },
  products: { training, challenge, workshop, course, strategy, premium, partnership, hive },
  about: { title, tagline, body, image },
  email: { from_name, from_email, signature },
  modules: { quiz, hive, challenge, course, workshop, strategy, premium, partnership, deals, ab_testing, video_analytics },
} as const;
```

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (email/password + Google OAuth) |
| Email | Resend (domain-verified, DNS in Vercel) |
| Payments | Cardcom LowProfile API |
| Deployment | Vercel (GitHub auto-deploy on push) |
| External cron | cron-job.org → `/api/cron/jobs` every 5 minutes |

---

## Design system — Santosha palette

All pages use the Santosha dark palette. Colors come from `CLIENT.colors`.

| Token | Default hex | Usage |
|---|---|---|
| `bg` | `#0D1018` | Page background |
| `bg_dark` | `#080C14` | Darkest sections |
| `card` | `#141820` | Card backgrounds |
| `card_soft` | `#1D2430` | Softer card / input backgrounds |
| `border` | `#2C323E` | Borders, dividers |
| `accent` | `#C9964A` | Primary accent, CTAs |
| `accent_light` | `#E8B94A` | High-emphasis highlights |
| `accent_dark` | `#9E7C3A` | Gradient ends |
| `fg` | `#EDE9E1` | Primary text |
| `fg_muted` | `#9E9990` | Secondary / muted text |

**Font:** `Assistant` (Google Fonts) — the only font.

---

## What's NOT in this template (hadar-danan only)

- `/app/atelier` — lead intake form with AI analysis
- `/app/admin/atelier` — atelier admin dashboard
- `/api/admin/atelier/*` — atelier API routes

These live only in the `hadar-danan` repo.

---

## Database migrations

Run in Supabase SQL Editor in order. Next migration: **025**.

| # | File | Contents |
|---|---|---|
| 001 | `schema.sql` | Core tables |
| 002–023 | See hadar-danan reference | All features |
| 024 | `024_deals.sql` | Deals / coupon management |

---

## Environment variables

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend
RESEND_API_KEY=
NEXT_PUBLIC_FROM_EMAIL=          # noreply@<domain>

# Cardcom
CARDCOM_TERMINAL=
CARDCOM_API_NAME=

# App
NEXT_PUBLIC_APP_URL=https://<domain>
NEXT_PUBLIC_PRICE_CHALLENGE=     # from CLIENT.products.challenge.price
NEXT_PUBLIC_PRICE_WORKSHOP=      # from CLIENT.products.workshop.price
NEXT_PUBLIC_PRICE_CALL=          # from CLIENT.products.strategy.price

# Auth / secrets
ADMIN_USERNAME=
ADMIN_PASSWORD=
CRON_SECRET=
MEMBERS_SECRET=

# WhatsApp
WHATSAPP_PHONE=                  # from CLIENT.whatsapp
NEXT_PUBLIC_WHATSAPP_PHONE=      # from CLIENT.whatsapp
```

---

## Deployment

- Push to `main` → Vercel auto-deploys
- Before committing: `npx tsc --noEmit 2>&1 | grep "error TS" | grep -v ".next"`
- External cron: cron-job.org → `GET /api/cron/jobs` every 5 min with `Authorization: Bearer <CRON_SECRET>`

---

## Coding conventions

**Always:**
- Hebrew RTL for all user-facing text
- Import brand strings from `CLIENT` — never hardcode client name, domain, or legal name
- Use `createServerClient()` for all DB access (exception: auth pages use `createBrowserClient()`)
- Log errors to `error_logs` table in every API route catch block

**Never:**
- Hardcode client name, domain, legal name, company ID — use `CLIENT.*`
- Introduce new fonts or color palettes
- Skip TypeScript check before deploying
- Commit `.env.local` or secrets
