# מדריך פריסה — לקוח חדש על BeeGood Template

> כל לקוח חדש הוא **fork** של הטמפלייט הזה.  
> הקובץ היחיד שמשתנה בין לקוח ללקוח הוא `lib/client.ts`.

---

## שלב 1 — Fork ו-Clone

**GitHub (חד פעמי בתחילת כל לקוח):**

1. פתח: https://github.com/AlonAbadi/beegood-template
2. לחץ על **Fork** (למעלה מימין)
3. תן שם לריפו: `שם-הלקוח` (לדוגמה: `neta-tzerner`)
4. לחץ **Create fork**

**במחשב:**
```bash
git clone https://github.com/AlonAbadi/neta-tzerner.git
cd neta-tzerner
npm install
```

---

## שלב 2 — ערוך את lib/client.ts

זה **הקובץ היחיד** שמשנים. פתח אותו ומלא את כל השדות:

```ts
export const CLIENT = {

  // ─── Brand ───────────────────────────────────────────────
  name:          "שם הלקוח",          // מוצג בניווט, אימיילים, פוטר
  name_en:       "client-slug",        // רק אותיות לועזיות וקו מקף
  legal_name:    "שם הלקוח בע״מ",     // שם משפטי מלא
  company_id:    "XXXXXXXXX",          // ח.פ / עוסק מורשה
  domain:        "example.com",        // ללא https://
  whatsapp:      "972XXXXXXXXX",       // כולל קוד מדינה, ללא +

  // ─── Meta & SEO ──────────────────────────────────────────
  meta: {
    title:       "שם | תיאור קצר לגוגל",
    description: "תיאור מלא לגוגל (עד 160 תווים)",
    og_image:    "/og-image.jpg",      // לשים בתיקיית public/
  },

  // ─── Colors ──────────────────────────────────────────────
  // ניתן להשאיר ברירת מחדל (זהב כהה) או להתאים ללקוח
  colors: {
    bg:           "#0D1018",
    bg_dark:      "#080C14",
    card:         "#141820",
    card_soft:    "#1D2430",
    border:       "#2C323E",
    accent:       "#C9964A",
    accent_light: "#E8B94A",
    accent_dark:  "#9E7C3A",
    fg:           "#EDE9E1",
    fg_muted:     "#9E9990",
  },

  // ─── Hero ────────────────────────────────────────────────
  hero: {
    image:       "/hero.jpg",          // תמונה ראשית — לשים בתיקיית public/
    image_alt:   "שם הלקוח",
    headline_a:  "כותרת גרסה A",       // A/B test variant A
    headline_b:  "כותרת גרסה B",       // A/B test variant B
    desc_a:      "תיאור גרסה A",
    desc_b:      "תיאור גרסה B",
    cta_a:       "טקסט כפתור A ←",
    cta_b:       "טקסט כפתור B ←",
  },

  // ─── Social proof ────────────────────────────────────────
  social_proof: {
    stat1: { number: "XXX+", label: "לקוחות" },
    stat2: { number: "X",    label: "שנים"   },
    stat3: { number: "XX%",  label: "ממליצים" },
    tagline: "תיאור קצר מתחת לסטטיסטיקות",
  },

  // ─── Products ────────────────────────────────────────────
  products: {
    training:    { title: "הדרכה חינמית",      slug: "/training",    price: 0,     description: "...", image: "/training.png"    },
    challenge:   { title: "אתגר X ימים",        slug: "/challenge",   price: 197,   description: "...", image: "/challenge.png"   },
    workshop:    { title: "סדנה יום אחד",       slug: "/workshop",    price: 1080,  description: "...", image: "/workshop.png"    },
    course:      { title: "קורס דיגיטלי",       slug: "/course",      price: 1800,  description: "...", image: "/course.png"      },
    strategy:    { title: "פגישת אסטרטגיה",     slug: "/strategy",    price: 4000,  description: "...", image: "/strategy.png"    },
    premium:     { title: "יום צילום פרמיום",   slug: "/premium",     price: 14000, description: "...", image: "/premium.png"     },
    partnership: { title: "שותפות אסטרטגית",   slug: "/partnership", price: 10000, description: "...", image: "/partnership.png" },
    hive:        { title: "הקהילה",             slug: "/hive",        price_basic: 97, price_disc: 29, description: "...", image: "/hive.png" },
  },

  // ─── About ───────────────────────────────────────────────
  about: {
    title:   "על שם הלקוח",
    tagline: "תפקיד / התמחות",
    body:    "פסקת אודות קצרה...",
    image:   "/about.jpg",             // לשים בתיקיית public/
  },

  // ─── Email ───────────────────────────────────────────────
  email: {
    from_name:  "שם הלקוח",
    from_email: "noreply@example.com",
    signature:  "שם הלקוח בע״מ · ישראל",
  },

  // ─── Modules — הפעלה/כיבוי של פיצ'רים ──────────────────
  modules: {
    quiz:            true,
    hive:            true,
    challenge:       true,
    course:          true,
    workshop:        true,
    strategy:        true,
    premium:         true,
    partnership:     true,
    deals:           false,   // קופונים — אפשר להפעיל מאוחר יותר
    ab_testing:      true,
    video_analytics: true,
  },

} as const;
```

---

## שלב 3 — תמונות (public/)

החלף את הקבצים האלה בתיקיית `public/`:

| קובץ | שימוש | גודל מומלץ |
|---|---|---|
| `og-image.jpg` | תמונת Open Graph לשיתוף | 1200×630px |
| `hero.jpg` | תמונת hero בדף הבית | 1200×1600px (פורטרט) |
| `about.jpg` | תמונת אודות בדפי מוצר | 400×400px |
| `beegood_logo.png` | לוגו בניווט desktop | 38×30px |
| `beegoodtxt.png` | לוגו טקסט בניווט mobile | 64×16px |
| `training.png` | תמונת כרטיס הדרכה | 800×420px |
| `challenge.png` | תמונת כרטיס אתגר | 800×420px |
| `workshop.png` | תמונת כרטיס סדנה | 800×420px |
| `course.png` | תמונת כרטיס קורס | 800×420px |
| `strategy.png` | תמונת כרטיס אסטרטגיה | 800×420px |
| `premium.png` | תמונת כרטיס פרמיום | 800×420px |
| `partnership.png` | תמונת כרטיס שותפות | 800×420px |
| `hive.png` | תמונת כרטיס קהילה | 800×420px |

---

## שלב 4 — Supabase (בסיס נתונים)

1. פתח https://supabase.com → **New project**
2. שמור את הפרטים:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

3. לך ל-**SQL Editor** והרץ את הקבצים מתיקיית `supabase/migrations/` **בסדר הזה:**
   ```
   schema.sql
   002_email_sequences.sql
   003_bookings.sql
   004_course.sql
   005_partnership.sql
   006_consent.sql
   007_hive.sql
   008_product_enum.sql
   009_video_analytics.sql
   010_ab_proposals.sql
   011_video_events.sql
   012_quiz_results.sql
   013_crm.sql
   014_auth.sql
   015_hive_content.sql
   016_amount_paid.sql
   017_atelier.sql        (אם יש)
   ...
   024_deals.sql
   ```

4. **Storage bucket** — הרץ בSQL Editor:
   ```sql
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('atelier-uploads', 'atelier-uploads', true);
   ```

---

## שלב 5 — Resend (אימיילים)

1. פתח https://resend.com → **Domains** → **Add domain**
2. הכנס את הדומיין של הלקוח (לדוגמה: `example.com`)
3. Resend ייתן לך רשומות DNS להוסיף — הוסף אותן ב-Vercel DNS (שלב 8)
4. שמור את ה-API key → `RESEND_API_KEY`

---

## שלב 6 — Cardcom (תשלומים)

1. פתח חשבון Cardcom חדש ללקוח
2. קבל:
   - `Terminal Number` → `CARDCOM_TERMINAL`
   - `API Name` → `CARDCOM_API_NAME`
3. הגדר Webhook URL: `https://example.com/api/cardcom/webhook`

---

## שלב 7 — Vercel (פריסה)

1. פתח https://vercel.com → **Add New Project**
2. בחר את ה-GitHub repo של הלקוח
3. לחץ **Deploy** (יכשל כי חסרות env vars — זה בסדר)
4. לך ל-**Settings → Environment Variables** והכנס:

```
NEXT_PUBLIC_SUPABASE_URL         = [מ-Supabase]
NEXT_PUBLIC_SUPABASE_ANON_KEY    = [מ-Supabase]
SUPABASE_SERVICE_ROLE_KEY        = [מ-Supabase]
RESEND_API_KEY                   = [מ-Resend]
NEXT_PUBLIC_FROM_EMAIL           = noreply@example.com
CARDCOM_TERMINAL                 = [מ-Cardcom]
CARDCOM_API_NAME                 = [מ-Cardcom]
NEXT_PUBLIC_APP_URL              = https://example.com
NEXT_PUBLIC_PRICE_CHALLENGE      = 197
NEXT_PUBLIC_PRICE_WORKSHOP       = 1080
NEXT_PUBLIC_PRICE_CALL           = 4000
ADMIN_USERNAME                   = [בחר]
ADMIN_PASSWORD                   = [בחר סיסמה חזקה]
CRON_SECRET                      = [מחרוזת רנדומלית ארוכה]
MEMBERS_SECRET                   = [מחרוזת רנדומלית ארוכה]
WHATSAPP_PHONE                   = 972XXXXXXXXX
NEXT_PUBLIC_WHATSAPP_PHONE       = 972XXXXXXXXX
ANTHROPIC_API_KEY                = [אם צריך atelier]
```

5. לאחר הכנסת המשתנים — לחץ **Redeploy**

---

## שלב 8 — DNS ב-Vercel

בVercel לך ל-**Domains** ← **Add domain** → הכנס את הדומיין של הלקוח.

Vercel יתן לך nameservers או A records — עדכן אותם אצל רשם הדומיין.

**אחרי שה-DNS מתעדכן**, הוסף את רשומות Resend (מ-שלב 5):
- 3 רשומות CNAME לאימות DKIM
- רשומת TXT לSPF: `v=spf1 include:amazonses.com ~all`
- רשומת MX: `feedback-smtp.us-east-1.amazonses.com` (priority 10)
- רשומת TXT לDMARC: `v=DMARC1; p=none; rua=mailto:noreply@example.com`

---

## שלב 9 — Google OAuth (כניסה עם גוגל)

1. פתח https://console.cloud.google.com → **APIs & Services → Credentials**
2. צור **OAuth 2.0 Client ID**
3. Authorized redirect URIs: `https://[supabase-project].supabase.co/auth/v1/callback`
4. הכנס את ה-Client ID + Secret ב-Supabase Dashboard → **Authentication → Providers → Google**

---

## שלב 10 — Cron Job (אימיילים אוטומטיים)

1. פתח https://cron-job.org → **Create cronjob**
2. URL: `https://example.com/api/cron/jobs`
3. כל 5 דקות
4. Headers:
   ```
   Authorization: Bearer [CRON_SECRET]
   ```

---

## שלב 11 — בדיקה לפני Go Live

- [ ] דף הבית נטען ✓
- [ ] ניווט מציג שם לקוח נכון ✓
- [ ] כותרת בדפדפן נכונה ✓
- [ ] הרשמה עובדת (מייל welcome מגיע) ✓
- [ ] תשלום טסט ב-₪1 עובד (`/test`) ✓
- [ ] /admin נגיש (Basic Auth) ✓
- [ ] אין שגיאות TypeScript: `npx tsc --noEmit` ✓

---

## קבצי תוכן שדורשים עריכה ידנית

אלה דפים עם תוכן ספציפי ללקוח שאין ב-`lib/client.ts` — יש לערוך כל אחד:

| דף | קובץ | מה לשנות |
|---|---|---|
| `/about` | `app/about/page.tsx` | תוכן אודות, תמונות |
| `/team` | `app/team/page.tsx` | פרטי צוות |
| `/privacy` | `app/privacy/page.tsx` | שם לקוח, דומיין, תאריך |
| `/terms` | `app/terms/page.tsx` | שם לקוח, דומיין, תאריך |
| `/hive/terms` | `app/hive/terms/page.tsx` | שם לקוח, מחירים |
| `/challenge` | `app/challenge/page.tsx` | תיאור, תאריכים |
| `/workshop` | `app/workshop/page.tsx` | תיאור, תאריכים |
| `/course` | `app/course/page.tsx` | מבנה קורס, מודולים |
| `/strategy` | `app/strategy/page.tsx` | תיאור הפגישה |
| `/premium` | `app/premium/page.tsx` | תיאור היום |
| `/partnership` | `app/partnership/page.tsx` | תיאור השותפות |
| `lib/challenge-config.ts` | — | Vimeo IDs לוידאו הצ'אלנג' |
| `lib/course-config.ts` | — | Vimeo IDs לשיעורי הקורס |

---

## תיקיית הפרויקט הגמור

```
neta-tzerner/
├── lib/
│   └── client.ts        ← הקובץ היחיד שעורכים
├── public/
│   ├── og-image.jpg     ← תמונות מוחלפות
│   ├── hero.jpg
│   └── ...
├── supabase/
│   └── migrations/      ← הורצו כולם ✓
└── ...
```

---

*מסמך זה תואם ל-beegood-template — עדכן בכל שינוי גדול בטמפלייט.*
