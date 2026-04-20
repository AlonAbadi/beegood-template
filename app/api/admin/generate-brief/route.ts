import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { PRESETS, type DesignPreset } from "@/lib/design-presets";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function isAdminAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization") ?? "";
  if (!auth.startsWith("Basic ")) return false;
  try {
    const [user, pass] = Buffer.from(auth.slice(6), "base64").toString().split(":");
    return user === process.env.ADMIN_USERNAME && pass === process.env.ADMIN_PASSWORD;
  } catch { return false; }
}

async function toBase64(file: File): Promise<{ data: string; media_type: string }> {
  const buf = await file.arrayBuffer();
  return {
    data: Buffer.from(buf).toString("base64"),
    media_type: file.type || "image/jpeg",
  };
}

const BRIEF_TEMPLATE = `
# Client Brief — [שם הלקוח]

## Identity
| Field | Value |
|---|---|
| Name (full) | |
| Legal name | |
| Company ID (ח.פ) | |
| Domain | |
| WhatsApp | 972XXXXXXXXX |

## Hero
| Field | Value |
|---|---|
| Headline A | |
| Headline B | |
| Description A | |
| Description B | |
| CTA A | |
| CTA B | |

## About
| Field | Value |
|---|---|
| Page title | |
| Tagline | |
| Bio (2–4 sentences) | |

## Social proof
| Field | Value |
|---|---|
| Stat 1 number | |
| Stat 1 label | |
| Stat 2 number | |
| Stat 2 label | |
| Stat 3 number | |
| Stat 3 label | |
| Social proof tagline | |

## Meta & SEO
| Field | Value |
|---|---|
| Page title tag | |
| Meta description (up to 160 chars) | |

## Email
| Field | Value |
|---|---|
| From name | |
| From email | noreply@domain.com |
| Signature | |
`.trim();

const PRESET_GUIDE = Object.entries(PRESETS)
  .map(([key, p]) => `  "${key}": ${p.label} — ${p.mood}`)
  .join("\n");

export async function POST(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: "אין הרשאה" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "שגיאה בקריאת הטופס" }, { status: 400 });
  }

  const clientName    = String(form.get("client_name") ?? "");
  const domain        = String(form.get("domain") ?? "");
  const existingUrl   = String(form.get("existing_url") ?? "");
  const bioText       = String(form.get("bio_text") ?? "");
  const descriptors   = String(form.get("descriptors") ?? "");

  // ── Collect images ────────────────────────────────────────────
  type ImageBlock = { type: "image"; source: { type: "base64"; media_type: string; data: string } };
  const imageBlocks: ImageBlock[] = [];

  const logoFile = form.get("logo") as File | null;
  if (logoFile?.size) {
    const b = await toBase64(logoFile);
    imageBlocks.push({ type: "image", source: { type: "base64", ...b } });
  }

  for (let i = 1; i <= 3; i++) {
    const photo = form.get(`photo_${i}`) as File | null;
    if (photo?.size) {
      const b = await toBase64(photo);
      imageBlocks.push({ type: "image", source: { type: "base64", ...b } });
    }
  }

  // ── Build prompt ──────────────────────────────────────────────
  const contextLines = [
    clientName   && `שם הלקוח: ${clientName}`,
    domain       && `דומיין: ${domain}`,
    existingUrl  && `אתר קיים: ${existingUrl}`,
    descriptors  && `3 מילות מפתח שהלקוח בחר: ${descriptors}`,
    bioText      && `טקסט ביו/אודות שסופק:\n${bioText}`,
  ].filter(Boolean).join("\n");

  const systemPrompt = `You are a senior brand strategist and web designer.
You create marketing sites for Israeli coaches and influencers.
You analyze brand materials and output structured JSON — nothing else.
Always respond in Hebrew for all user-facing content fields.`;

  const userPrompt = `
נתוני הלקוח:
${contextLines}

${imageBlocks.length ? `צרפתי ${imageBlocks.length} תמונות (לוגו ו/או פורטרטים). נתח אותן לצבעים, אסתטיקה ואישיות מותג.` : "לא הועלו תמונות — הסתמך על הטקסט בלבד."}

המשימה שלך:
1. בחר את ה-design_preset המתאים ביותר מהאפשרויות:
${PRESET_GUIDE}

2. אם צבע המותג לא מתאים לאף preset, הצע color_overrides (accent בלבד — שאר ה-preset נשמר).

3. מלא את תבנית ה-brief הבאה עם התוכן הנכון ללקוח.
   - כתוב עברית ידידותית ושיווקית
   - אל תמציא נתונים (ח.פ, מחירים וכו') — השאר שדות כאלה ריקים
   - headline_a / headline_b: שני ניסוחים לכותרת hero — ישירים, לא יותר מ-8 מילים כל אחד
   - cta: פעולה ברורה בעברית

תבנית:
${BRIEF_TEMPLATE}

החזר JSON תקני בלבד (ללא markdown blocks) בפורמט:
{
  "preset": "<preset_key>",
  "preset_reason": "<הסבר קצר בעברית למה הpresent הזה מתאים>",
  "color_overrides": null | { "accent": "#hex", "accent_light": "#hex", "accent_dark": "#hex", "btn_text": "#hex" },
  "brief_md": "<תוכן ה-brief המלא כ-markdown string — שמור על newlines כ-\\n>"
}`.trim();

  // ── Call Claude ───────────────────────────────────────────────
  type ContentBlock = ImageBlock | { type: "text"; text: string };
  const content: ContentBlock[] = [
    ...imageBlocks,
    { type: "text", text: userPrompt },
  ];

  try {
    const message = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonStart = raw.indexOf("{");
    const jsonEnd   = raw.lastIndexOf("}");
    const parsed    = JSON.parse(raw.slice(jsonStart, jsonEnd + 1)) as {
      preset: DesignPreset;
      preset_reason: string;
      color_overrides: null | Record<string, string>;
      brief_md: string;
    };

    const presetInfo = PRESETS[parsed.preset];

    return NextResponse.json({
      ok: true,
      preset:          parsed.preset,
      preset_label:    presetInfo?.label ?? parsed.preset,
      preset_reason:   parsed.preset_reason,
      color_overrides: parsed.color_overrides,
      brief_md:        parsed.brief_md,
    });
  } catch (err) {
    console.error("[generate-brief]", err);
    return NextResponse.json({ error: "שגיאה בקריאה ל-Claude API" }, { status: 500 });
  }
}
