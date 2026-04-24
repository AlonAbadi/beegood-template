/**
 * CLIENT CONFIG — the ONLY file that changes per deployment.
 * Fill every field before running the site. All pages, emails,
 * nav, schema, and payments read from here.
 *
 * After filling: run `npx tsc --noEmit` to verify no type errors.
 */

export const CLIENT = {

  // ─── Brand ────────────────────────────────────────────────────────────────
  name:         "שם הלקוח",          // מוצג בניווט, אימיילים, פוטר
  name_en:      "client-slug",        // בשימוש ב-slugs / class names
  legal_name:   "שם הלקוח בע״מ",
  company_id:   "XXXXXXXXX",          // ח.פ / עוסק מורשה
  domain:       "example.com",
  whatsapp:     "972500000000",

  // ─── Meta & SEO ───────────────────────────────────────────────────────────
  meta: {
    title:       "שם הלקוח | תיאור קצר",
    description: "תיאור האתר לגוגל — עד 160 תווים.",
    og_image:    "/og-image.jpg",      // 1200×630 px
  },

  // ─── Design Preset ────────────────────────────────────────────────────────
  // בחר preset שמתאים לאישיות המותג של הלקוח.
  // כל preset מגדיר את כל ה-CSS tokens: צבעים, גרדיאנטים, border-radius.
  //
  //   "dark_gold"   — רקע כהה + זהב.  פרמיום, high-ticket, אוטוריטטיבי.
  //   "warm_earth"  — off-white + טרקוטה.  ווליבאינג, תזונה, יוגה, אורגני.
  //   "cool_slate"  — כהה + כחול-פלדה.  עסקי, מנכ"לים, טכנולוגי, אסטרטגי.
  //   "rose_blush"  — קרם + ורוד עמוק.  קואצ'ינג נשי, ליייפסטייל, ביוטי.
  //
  // לאחר בחירה: הפעל npx tsc --noEmit לאימות.
  design_preset: "dark_gold" as import("@/lib/design-presets").DesignPreset,

  // אופציונלי: דרוס צבע אקסנט בלבד (שאר ה-preset נשמר)
  // color_overrides: { accent: "#FF6B35", accent_light: "#FF8C55", accent_dark: "#CC5528", btn_text: "#FFFFFF" },
  color_overrides: undefined as
    | Partial<Pick<import("@/lib/design-presets").PresetTokens, "accent" | "accent_light" | "accent_dark" | "btn_text">>
    | undefined,

  // ─── Colors ───────────────────────────────────────────────────────────────
  // ערכי ברירת-מחדל תואמים לפרסט dark_gold.
  // generate-client מחליף בלוק זה אוטומטית בהתאם ל-design_preset שנבחר.
  //
  // הבדל מ-design_preset:
  //   • design_preset   → מגדיר CSS variables דרך ThemeProvider (סטיילינג גלובלי).
  //   • colors          → ערכים inline לשימוש ב-JS בתוך קומפוננטות (style={{ ... }}).
  // שניהם חייבים להישאר מסונכרנים — שינוי בpreset = עדכון colors בהתאם.
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

  // ─── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    image:       "/hero.jpg",          // תמונת hero ראשית
    image_alt:   "שם הלקוח",
    headline_a:  "כותרת ראשית — גרסה A",
    headline_b:  "כותרת ראשית — גרסה B",
    desc_a:      "תיאור קצר מתחת לכותרת — גרסה A.",
    desc_b:      "תיאור קצר מתחת לכותרת — גרסה B.",
    cta_a:       "קריאה לפעולה ←",
    cta_b:       "קריאה לפעולה ←",
  },

  // ─── Social proof ─────────────────────────────────────────────────────────
  social_proof: {
    stat1:   { number: "XXX+",  label: "תיאור" },
    stat2:   { number: "X",     label: "תיאור" },
    stat3:   { number: "XX%",   label: "תיאור" },
    tagline: "משפט social proof קצר",
  },

  // ─── Products ─────────────────────────────────────────────────────────────
  // כל מוצר שמופעל ב-modules חייב להיות מוגדר כאן
  products: {
    training: {
      title:       "שם הדרכה חינמית",
      slug:        "/training",
      price:       0,
      description: "תיאור קצר",
      image:       "/training.jpg",
      vimeo_id:    "",               // מזהה סרטון Vimeo (ריק = אין סרטון)
    },
    challenge: {
      title:       "שם האתגר",
      slug:        "/challenge",
      price:       197,
      description: "תיאור קצר",
      image:       "/challenge.jpg",
      vimeo_id:    "",
    },
    workshop: {
      title:       "שם הסדנה",
      slug:        "/workshop",
      price:       1000,
      description: "תיאור קצר",
      image:       "/workshop.jpg",
    },
    course: {
      title:       "שם הקורס",
      slug:        "/course",
      price:       1800,
      description: "תיאור קצר",
      image:       "/course.jpg",
    },
    strategy: {
      title:       "פגישת אסטרטגיה",
      slug:        "/strategy",
      price:       4000,
      description: "תיאור קצר",
      image:       "/strategy.jpg",
      vimeo_id:    "",
    },
    premium: {
      title:       "חבילה פרמיום",
      slug:        "/premium",
      price:       14000,
      description: "תיאור קצר",
      image:       "/premium.jpg",
    },
    partnership: {
      title:       "שותפות",
      slug:        "/partnership",
      price:       10000,
      description: "תיאור קצר",
      image:       "/og-image.jpg",
    },
    hive: {
      title:       "שם הקהילה",
      slug:        "/hive",
      price_basic: 97,
      price_discounted: 49,
      description: "תיאור קצר",
      image:       "/og-image.jpg",
    },
  },

  // ─── About ────────────────────────────────────────────────────────────────
  about: {
    title:   "על שם הלקוח",
    tagline: "כותרת מקצועית קצרה",
    body:    "פסקת אודות — מי הלקוח, ניסיון, גישה.",
    image:   "/about.jpg",
  },

  // ─── Email ────────────────────────────────────────────────────────────────
  email: {
    from_name:  "שם הלקוח",
    from_email: "noreply@example.com",
    signature:  "שם הלקוח · ישראל",
  },

  // ─── Analytics (optional — leave empty to disable) ──────────────────────
  // שדות אלה הם תיעוד בלבד — משתני הסביבה הם המקור האמיתי.
  // הבלוק עוזר לאדמין לדעת אילו מזהים להגדיר ב-Vercel.
  analytics: {
    meta_pixel_id:     "",   // NEXT_PUBLIC_META_PIXEL_ID — copy here for reference
    ga_measurement_id: "",   // NEXT_PUBLIC_GA_MEASUREMENT_ID — copy here for reference
  },

  // ─── Modules — הפעלה/כיבוי פיצ׳רים ──────────────────────────────────────
  modules: {
    quiz:            true,
    hive:            true,
    challenge:       true,
    course:          false,
    workshop:        false,
    strategy:        false,
    premium:         false,
    partnership:     false,
    deals:           false,
    ab_testing:      false,
    video_analytics: false,
  },

  // ─── Pages — תוכן ייחודי לכל עמוד ────────────────────────────────────────
  // generate-client ממלא בלוק זה אוטומטית. אין לערוך ידנית.
  pages: {

    about: {
      section_title: "הגישה שלי",
      principles: [
        { n: "1", q: '"עקרון ראשון?"',   body: "הסבר קצר על העקרון הראשון." },
        { n: "2", q: '"עקרון שני?"',     body: "הסבר קצר על העקרון השני." },
        { n: "3", q: '"עקרון שלישי?"',   body: "הסבר קצר על העקרון השלישי." },
      ],
      quote: "ציטוט שמסכם את הגישה.",
    },

    training: {
      pain_points:    ["בעיה ראשונה", "בעיה שנייה", "בעיה שלישית"],
      agitation:      "משפט אגיטציה — מה גורם לבעיה להיות חמורה יותר?",
      solution_title: "מה לומדים בהדרכה?",
      steps: [
        { num: "1", title: "נושא ראשון",   desc: "הסבר קצר" },
        { num: "2", title: "נושא שני",     desc: "הסבר קצר" },
        { num: "3", title: "נושא שלישי",   desc: "הסבר קצר" },
      ],
      for_who:     ["למי מתאים — מאפיין ראשון", "מאפיין שני"],
      not_for:     ["למי לא מתאים"],
      testimonials: [
        { text: "עדות ראשונה אמיתית.", author: "שם מלא", role: "תפקיד" },
        { text: "עדות שנייה אמיתית.",  author: "שם מלא", role: "תפקיד" },
      ],
      faqs: [
        { q: "האם זה באמת חינם?",    a: "כן. ללא תשלום עכשיו ואחר כך." },
        { q: "כמה זמן ההדרכה?",      a: "20 דקות. בקצב שלך." },
        { q: "מה קורה אחרי ההדרכה?", a: "ממשיכים לשלב הבא בקצב שלך. אין לחץ." },
      ],
      final_title: "כותרת סיום — קריאה לפעולה",
    },

    challenge: {
      pain_points:    ["בעיה ראשונה", "בעיה שנייה", "בעיה שלישית"],
      agitation:      "משפט אגיטציה",
      solution_title: "מה קורה באתגר?",
      solution_desc:  "תיאור קצר של הפתרון",
      steps: [
        { num: "1", title: "שלב ראשון",  desc: "הסבר קצר" },
        { num: "2", title: "שלב שני",    desc: "הסבר קצר" },
        { num: "3", title: "שלב שלישי",  desc: "הסבר קצר" },
      ],
      for_who:     ["למי מתאים"],
      not_for:     ["למי לא מתאים"],
      testimonials: [
        { text: "עדות ראשונה.", author: "שם", role: "תפקיד" },
        { text: "עדות שנייה.",  author: "שם", role: "תפקיד" },
      ],
      faqs: [
        { q: "מה כולל האתגר?",     a: "תשובה אמיתית." },
        { q: "למי מתאים?",         a: "תשובה אמיתית." },
        { q: "כמה זמן ביום?",       a: "תשובה אמיתית." },
        { q: "מה אם לא מתאים לי?", a: "תשובה אמיתית." },
      ],
      quiz: {
        questions: [{ q: "שאלה?", options: ["תשובה א", "תשובה ב", "תשובה ג", "תשובה ד"] }],
        results:   { "תשובה א": "הודעה מותאמת לתשובה א" },
      },
      final_title: "כותרת סיום",
      final_sub:   "תת-כותרת סיום",
    },

    workshop: {
      pain_points:    ["בעיה ראשונה", "בעיה שנייה", "בעיה שלישית"],
      agitation:      "משפט אגיטציה",
      solution_title: "מה לומדים בסדנה?",
      steps: [
        { num: "1", title: "נושא ראשון",  desc: "הסבר קצר" },
        { num: "2", title: "נושא שני",    desc: "הסבר קצר" },
        { num: "3", title: "נושא שלישי",  desc: "הסבר קצר" },
      ],
      for_who:     ["למי מתאים"],
      not_for:     ["למי לא מתאים"],
      testimonials: [
        { text: "עדות ראשונה.", author: "שם", role: "תפקיד" },
        { text: "עדות שנייה.",  author: "שם", role: "תפקיד" },
      ],
      faqs: [
        { q: "מה כולל הסדנה?",        a: "תשובה אמיתית." },
        { q: "למי מתאים?",             a: "תשובה אמיתית." },
        { q: "כמה זמן נמשכת הסדנה?",  a: "תשובה אמיתית." },
        { q: "מה מדיניות ביטול?",      a: "תשובה אמיתית." },
      ],
      final_title: "כותרת סיום",
      final_sub:   "תת-כותרת סיום",
    },

    strategy: {
      pain_points:    ["בעיה ראשונה", "בעיה שנייה", "בעיה שלישית"],
      agitation:      "משפט אגיטציה",
      solution_title: "מה מקבלים בפגישה?",
      steps: [
        { num: "1", title: "נושא ראשון",  desc: "הסבר קצר" },
        { num: "2", title: "נושא שני",    desc: "הסבר קצר" },
        { num: "3", title: "נושא שלישי",  desc: "הסבר קצר" },
      ],
      for_who:     ["למי מתאים"],
      not_for:     ["למי לא מתאים"],
      testimonials: [
        { text: "עדות ראשונה.", author: "שם", role: "תפקיד" },
        { text: "עדות שנייה.",  author: "שם", role: "תפקיד" },
      ],
      faqs: [
        { q: "מה כולל המפגש?",     a: "תשובה אמיתית." },
        { q: "למי זה מתאים?",      a: "תשובה אמיתית." },
        { q: "איך מתקיים המפגש?",  a: "תשובה אמיתית." },
        { q: "מה מדיניות ביטול?",  a: "תשובה אמיתית." },
      ],
      final_title: "כותרת סיום",
      final_sub:   "תת-כותרת סיום",
    },

    hive: {
      pain_points:    ["בעיה ראשונה", "בעיה שנייה", "בעיה שלישית"],
      agitation:      "משפט אגיטציה",
      solution_title: "מה כולל המנוי?",
      steps: [
        { num: "1", title: "רכיב ראשון",  desc: "הסבר קצר" },
        { num: "2", title: "רכיב שני",    desc: "הסבר קצר" },
        { num: "3", title: "רכיב שלישי",  desc: "הסבר קצר" },
      ],
      for_who:     ["למי מתאים"],
      not_for:     ["למי לא מתאים"],
      testimonials: [
        { text: "עדות ראשונה.", author: "שם", role: "תפקיד" },
        { text: "עדות שנייה.",  author: "שם", role: "תפקיד" },
      ],
      faqs: [
        { q: "איך מבטלים את המנוי?",       a: "בכל עת — דרך האזור האישי (/my) או בוואטסאפ. ביטול תוך 14 ימים = החזר מלא." },
        { q: "האם יש התחייבות מינימלית?",   a: "לא. ניתן לביטול בכל עת ללא עלות." },
        { q: "שאלה נוספת?",                 a: "תשובה אמיתית." },
      ],
      final_title: "כותרת סיום",
    },

    course: {
      pain_points:    ["בעיה ראשונה", "בעיה שנייה", "בעיה שלישית"],
      agitation:      "משפט אגיטציה",
      solution_title: "מה לומדים בקורס?",
      steps: [
        { num: "1", title: "מודול ראשון",  desc: "הסבר קצר" },
        { num: "2", title: "מודול שני",    desc: "הסבר קצר" },
        { num: "3", title: "מודול שלישי",  desc: "הסבר קצר" },
      ],
      for_who:     ["למי מתאים"],
      not_for:     ["למי לא מתאים"],
      testimonials: [
        { text: "עדות ראשונה.", author: "שם", role: "תפקיד" },
        { text: "עדות שנייה.",  author: "שם", role: "תפקיד" },
      ],
      faqs: [
        { q: "מה כולל הקורס?",        a: "תשובה אמיתית." },
        { q: "כמה זמן נגיש הקורס?",   a: "תשובה אמיתית." },
        { q: "האם יש תמיכה?",         a: "תשובה אמיתית." },
        { q: "מה מדיניות החזר כספי?", a: "תשובה אמיתית." },
      ],
      final_title: "כותרת סיום",
      final_sub:   "תת-כותרת סיום",
    },

    premium: {
      pain_points:    ["בעיה ראשונה", "בעיה שנייה", "בעיה שלישית"],
      agitation:      "משפט אגיטציה",
      solution_title: "מה כולל המוצר הפרמיום?",
      steps: [
        { num: "1", title: "רכיב ראשון",  desc: "הסבר קצר" },
        { num: "2", title: "רכיב שני",    desc: "הסבר קצר" },
        { num: "3", title: "רכיב שלישי",  desc: "הסבר קצר" },
      ],
      for_who:     ["למי מתאים"],
      not_for:     ["למי לא מתאים"],
      testimonials: [
        { text: "עדות ראשונה.", author: "שם", role: "תפקיד" },
        { text: "עדות שנייה.",  author: "שם", role: "תפקיד" },
      ],
      faqs: [
        { q: "מה כולל המוצר?",     a: "תשובה אמיתית." },
        { q: "למי מתאים?",         a: "תשובה אמיתית." },
        { q: "מה לוח הזמנים?",    a: "תשובה אמיתית." },
        { q: "מה מדיניות ביטול?", a: "תשובה אמיתית." },
      ],
      final_title: "כותרת סיום",
      final_sub:   "תת-כותרת סיום",
    },

    partnership: {
      pain_points:    ["בעיה ראשונה", "בעיה שנייה", "בעיה שלישית"],
      agitation:      "משפט אגיטציה",
      solution_title: "מה כוללת השותפות?",
      steps: [
        { num: "1", title: "שלב ראשון",  desc: "הסבר קצר" },
        { num: "2", title: "שלב שני",    desc: "הסבר קצר" },
        { num: "3", title: "שלב שלישי",  desc: "הסבר קצר" },
      ],
      for_who:     ["למי מתאים"],
      not_for:     ["למי לא מתאים"],
      testimonials: [
        { text: "עדות ראשונה.", author: "שם", role: "תפקיד" },
        { text: "עדות שנייה.",  author: "שם", role: "תפקיד" },
      ],
      faqs: [
        { q: "מה כוללת השותפות?",   a: "תשובה אמיתית." },
        { q: "מה תנאי ההתקשרות?",   a: "תשובה אמיתית." },
        { q: "מה מדדי ההצלחה?",    a: "תשובה אמיתית." },
        { q: "איך מתחילים?",        a: "תשובה אמיתית." },
      ],
      final_title: "כותרת סיום",
      final_sub:   "תת-כותרת סיום",
    },

  },

} as const;

export type ClientConfig = typeof CLIENT;
