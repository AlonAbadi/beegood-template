import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

export const metadata: Metadata = {
  title: `${CLIENT.about.title} | ${CLIENT.name}`,
  description: CLIENT.about.body.slice(0, 160),
  alternates: { canonical: "/about" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": CLIENT.name,
  "url": APP_URL,
  "jobTitle": CLIENT.about.tagline,
  "description": CLIENT.about.body,
  "sameAs": [],
  "worksFor": { "@type": "Organization", "name": CLIENT.legal_name, "url": APP_URL },
};

const BG   = CLIENT.colors.bg;
const FG   = CLIENT.colors.fg;
const ACC  = CLIENT.colors.accent;
const BDR  = CLIENT.colors.border;
const CARD = CLIENT.colors.card;
const MUT  = CLIENT.colors.fg_muted;

export default function AboutPage() {
  return (
    <div dir="rtl" className="font-assistant" style={{ background: BG, color: FG, minHeight: "100vh", paddingTop: 80 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.about.title, url: `${APP_URL}/about` },
      ]} />

      {/* Hero */}
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px 32px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.2, color: FG }}>
          {CLIENT.about.title}
        </h1>
        <p style={{ fontSize: 18, color: ACC, fontWeight: 600, marginTop: 8 }}>
          {CLIENT.about.tagline}
        </p>
        <p style={{ fontSize: 16, color: MUT, lineHeight: 1.7, marginTop: 16 }}>
          {CLIENT.about.body}
        </p>
      </section>

      {/* Stats */}
      <section style={{ background: CARD, borderTop: `1px solid ${BDR}`, borderBottom: `1px solid ${BDR}`, padding: "32px 20px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
          {[CLIENT.social_proof.stat1, CLIENT.social_proof.stat2, CLIENT.social_proof.stat3].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: ACC }}>{s.number}</div>
              <div style={{ fontSize: 13, color: MUT, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>
          {CLIENT.pages.about.section_title}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {CLIENT.pages.about.principles.map((p) => (
            <div key={p.n} style={{ background: CARD, border: `1px solid ${BDR}`, borderRadius: 12, padding: 20 }}>
              <p style={{ fontSize: 13, color: ACC, fontWeight: 700, marginBottom: 8 }}>עקרון {p.n}</p>
              <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{p.q}</p>
              <p style={{ fontSize: 14, color: MUT, lineHeight: 1.7 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sign-off */}
      <section style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px 64px", textAlign: "center" }}>
        <p style={{ fontSize: 18, fontStyle: "italic", color: MUT, lineHeight: 1.7 }}>
          &ldquo;{CLIENT.pages.about.quote}&rdquo;
        </p>
        <p style={{ marginTop: 16, fontWeight: 700, color: FG }}>— {CLIENT.name}</p>
      </section>
    </div>
  );
}
