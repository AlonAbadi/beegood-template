"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { PRESETS, type DesignPreset } from "@/lib/design-presets";

interface BriefResult {
  preset: DesignPreset;
  preset_label: string;
  preset_reason: string;
  color_overrides: null | Record<string, string>;
  brief_md: string;
}

function CopyButton({ text, label = "העתק" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="px-3 py-1.5 rounded-lg text-xs font-bold transition"
      style={{ background: copied ? "#22c55e22" : "var(--card-soft)", color: copied ? "#22c55e" : "var(--gold)", border: "1px solid var(--border)" }}
    >
      {copied ? "✓ הועתק" : label}
    </button>
  );
}

function PresetSwatch({ preset }: { preset: DesignPreset }) {
  const p = PRESETS[preset];
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: p.bg, border: `2px solid ${p.accent}` }}>
      <div className="flex gap-1">
        {[p.bg_dark, p.card, p.accent, p.accent_light, p.fg].map((c, i) => (
          <div key={i} className="w-5 h-5 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div>
        <p className="text-xs font-bold" style={{ color: p.fg }}>{p.label}</p>
        <p className="text-xs" style={{ color: p.fg_muted }}>{p.mood}</p>
      </div>
    </div>
  );
}

export default function IntakePage() {
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [result, setResult]     = useState<BriefResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    setError("");
    setResult(null);

    const form = new FormData(formRef.current);

    const creds = btoa(`${process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? "admin"}:${(document.cookie.match(/admin_pass=([^;]+)/) ?? [])[1] ?? ""}`);

    try {
      const res = await fetch("/api/admin/generate-brief", {
        method: "POST",
        headers: { Authorization: `Basic ${btoa(`${(formRef.current.querySelector("[name=_adminUser]") as HTMLInputElement)?.value}:${(formRef.current.querySelector("[name=_adminPass]") as HTMLInputElement)?.value}`)}` },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "שגיאה");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה לא ידועה");
    } finally {
      setLoading(false);
    }
  }

  const clientTsSnippet = result
    ? `design_preset: "${result.preset}" as import("@/lib/design-presets").DesignPreset,
${result.color_overrides
  ? `color_overrides: ${JSON.stringify(result.color_overrides, null, 2)},`
  : `color_overrides: undefined,`}`
    : "";

  return (
    <div dir="rtl" className="min-h-screen p-6" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">🐝 Atelier — Intake חדש</h1>
            <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>העלה חומרים ← Claude מנתח ← מקבל brief + preset מומלץ</p>
          </div>
          <Link href="/admin" className="text-sm" style={{ color: "var(--fg-muted)" }}>← חזרה לדשבורד</Link>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

          {/* Admin auth (hidden — browser already sent Basic Auth via middleware, but the API needs it separately) */}
          <div className="p-4 rounded-xl space-y-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-bold" style={{ color: "var(--fg-muted)" }}>הרשאת Admin (לקריאת API)</p>
            <div className="flex gap-3">
              <input name="_adminUser" type="text"  placeholder="שם משתמש"  className="flex-1 px-3 py-2 rounded-lg text-sm" style={{ background: "var(--card-soft)", border: "1px solid var(--border)", color: "var(--fg)" }} />
              <input name="_adminPass" type="password" placeholder="סיסמה" className="flex-1 px-3 py-2 rounded-lg text-sm" style={{ background: "var(--card-soft)", border: "1px solid var(--border)", color: "var(--fg)" }} />
            </div>
          </div>

          {/* Basic info */}
          <div className="p-4 rounded-xl space-y-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h2 className="font-bold text-sm">פרטי לקוח</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--fg-muted)" }}>שם הלקוח *</label>
                <input name="client_name" required type="text" placeholder="יעל ינאי" className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: "var(--card-soft)", border: "1px solid var(--border)", color: "var(--fg)" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--fg-muted)" }}>דומיין</label>
                <input name="domain" type="text" placeholder="yaelyinai.com" className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: "var(--card-soft)", border: "1px solid var(--border)", color: "var(--fg)" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--fg-muted)" }}>אתר קיים (URL)</label>
                <input name="existing_url" type="url" placeholder="https://..." className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: "var(--card-soft)", border: "1px solid var(--border)", color: "var(--fg)" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--fg-muted)" }}>3 מילים שמתארות את המותג</label>
                <input name="descriptors" type="text" placeholder="חמה, מקצועית, עצמאית" className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: "var(--card-soft)", border: "1px solid var(--border)", color: "var(--fg)" }} />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="p-4 rounded-xl space-y-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h2 className="font-bold text-sm">תמונות</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--fg-muted)" }}>לוגו (PNG/JPG)</label>
                <input name="logo" type="file" accept="image/*" className="w-full text-sm" style={{ color: "var(--fg-muted)" }} />
              </div>
              {[1, 2, 3].map(i => (
                <div key={i}>
                  <label className="text-xs mb-1 block" style={{ color: "var(--fg-muted)" }}>פורטרט / hero {i}</label>
                  <input name={`photo_${i}`} type="file" accept="image/*" className="w-full text-sm" style={{ color: "var(--fg-muted)" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Bio text */}
          <div className="p-4 rounded-xl space-y-2" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h2 className="font-bold text-sm">טקסט ביו / אודות</h2>
            <p className="text-xs" style={{ color: "var(--fg-muted)" }}>הדבק כאן את הביו של הלקוח, תיאור המוצרים, ועוד כל טקסט רלוונטי</p>
            <textarea
              name="bio_text"
              rows={8}
              placeholder="לדוגמה: יעל ינאי היא מאמנת כושר ותזונה עם 10 שנות ניסיון..."
              className="w-full px-3 py-2 rounded-lg text-sm resize-none"
              style={{ background: "var(--card-soft)", border: "1px solid var(--border)", color: "var(--fg)" }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-black text-lg btn-cta-gold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Claude מנתח את החומרים..." : "✨ צור brief + בחר preset"}
          </button>

          {error && (
            <p className="text-center text-sm" style={{ color: "#ef4444" }}>{error}</p>
          )}
        </form>

        {/* Result */}
        {result && (
          <div className="space-y-6">
            <div className="h-px" style={{ background: "var(--border)" }} />

            {/* Preset recommendation */}
            <div className="p-5 rounded-xl space-y-4" style={{ background: "var(--card)", border: `2px solid var(--gold)` }}>
              <div className="flex items-center justify-between">
                <h2 className="font-black text-lg">🎨 Preset מומלץ</h2>
                <CopyButton text={clientTsSnippet} label="העתק לclient.ts" />
              </div>
              <PresetSwatch preset={result.preset} />
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{result.preset_reason}</p>
              {result.color_overrides && (
                <div className="p-3 rounded-lg" style={{ background: "var(--card-soft)", border: "1px solid var(--border)" }}>
                  <p className="text-xs font-bold mb-2" style={{ color: "var(--fg-muted)" }}>color_overrides מוצעים</p>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(result.color_overrides).map(([k, v]) => (
                      <div key={k} className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                        <div className="w-3 h-3 rounded-full" style={{ background: v }} />
                        <span style={{ color: "var(--fg-muted)" }}>{k}:</span>
                        <span style={{ color: "var(--fg)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <pre className="p-3 rounded-lg text-xs overflow-x-auto" style={{ background: "var(--bg-dark)", color: "var(--gold)", border: "1px solid var(--border)" }}>
                {clientTsSnippet}
              </pre>
            </div>

            {/* Brief */}
            <div className="p-5 rounded-xl space-y-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between">
                <h2 className="font-black text-lg">📋 client-brief.md</h2>
                <CopyButton text={result.brief_md} label="העתק brief" />
              </div>
              <pre
                className="text-xs leading-relaxed overflow-x-auto p-4 rounded-lg"
                style={{ background: "var(--bg-dark)", color: "var(--fg)", border: "1px solid var(--border)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {result.brief_md}
              </pre>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
