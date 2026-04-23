import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { SignupForm } from "@/components/landing/SignupForm";
import { TrainingViewCounter } from "@/app/training/watch/TrainingViewCounter";
import { getTrainingViewCount } from "@/lib/training-views";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `${CLIENT.products.training.title} | ${CLIENT.name}`,
  description: CLIENT.products.training.description,
  alternates: { canonical: "/training" },
};

export default async function TrainingPage() {
  const viewCount = await getTrainingViewCount();
  const pg        = CLIENT.pages.training;

  return (
    <ProductLandingPage
      productName={CLIENT.products.training.title}
      price={0}
      checkoutHref="#cta"

      vimeoId={CLIENT.products.training.vimeo_id || undefined}

      headline={<><em>{CLIENT.products.training.title}</em></>}
      heroSub={CLIENT.products.training.description}
      stats={[
        { val: "20", label: "דקות" },
        { val: "0",  label: "עלות" },
        { val: <TrainingViewCounter initialCount={viewCount} />, label: "צפו" },
      ]}

      problemItems={pg.pain_points.map(t => ({ icon: "🔸", text: t }))}
      agitationText={pg.agitation}

      solutionTitle={pg.solution_title}
      solutionItems={pg.steps.map(s => ({ num: s.num, title: s.title, desc: s.desc }))}

      notForItems={[...pg.not_for]}
      forItems={[...pg.for_who]}

      whoName={CLIENT.name}
      whoRole={CLIENT.about.tagline}
      whoText={CLIENT.about.body}

      proofStats={[
        { val: CLIENT.social_proof.stat1.number, label: CLIENT.social_proof.stat1.label },
        { val: CLIENT.social_proof.stat2.number, label: CLIENT.social_proof.stat2.label },
      ]}
      testimonials={pg.testimonials.map(t => ({ text: t.text, author: t.author, role: t.role }))}

      faqs={[
        { q: "האם זה באמת חינם?",        a: "כן. ללא תשלום עכשיו ואחר כך." },
        { q: "כמה זמן ההדרכה?",           a: "20 דקות. בקצב שלך." },
        { q: "מה קורה אחרי ההדרכה?",     a: "ממשיכים לשלב הבא בקצב שלך. אין לחץ." },
      ]}

      finalTitle={pg.final_title}
      finalSub="20 דקות. חינם לגמרי. ללא התחייבות."

      hideMicroCommitment

      priceSectionSlot={
        <section style={{ padding: "48px 20px", maxWidth: 480, margin: "0 auto" }}>
          <div style={{
            background: CLIENT.colors.card, border: `1px solid ${CLIENT.colors.border}`,
            borderRadius: 20, padding: "32px 28px",
          }}>
            <p style={{ fontWeight: 900, fontSize: 20, textAlign: "center", color: CLIENT.colors.fg, margin: "0 0 24px" }}>
              שלח/י לי את ההדרכה
            </p>
            <SignupForm ctaLabel="שלח לי את ההדרכה" />
            <p style={{ textAlign: "center", fontSize: 12, color: CLIENT.colors.fg_muted, marginTop: 14 }}>
              ללא ספאם. ניתן להסרה בכל עת.
            </p>
          </div>
        </section>
      }
    />
  );
}
