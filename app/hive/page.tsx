import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { HivePricingSection } from "./HivePricingSection";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `${CLIENT.products.hive.title} | ${CLIENT.name}`,
  description: CLIENT.products.hive.description,
  alternates: { canonical: "/hive" },
};

export default function HivePage() {
  const pg = CLIENT.pages.hive;

  return (
    <ProductLandingPage
      productName={CLIENT.products.hive.title}
      price={CLIENT.products.hive.price_basic}
      checkoutHref="#cta"

      headline={<><em>{CLIENT.products.hive.title}</em></>}
      heroSub={CLIENT.products.hive.description}
      stats={[
        { val: "1x",  label: "מפגש בחודש" },
        { val: String(CLIENT.products.hive.price_basic), label: "ש״ח/חודש" },
        { val: "0",   label: "התחייבות" },
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
        { val: CLIENT.social_proof.stat3.number, label: CLIENT.social_proof.stat3.label },
      ]}
      testimonials={pg.testimonials.map(t => ({ text: t.text, author: t.author, role: t.role }))}

      faqs={pg.faqs.map(f => ({ q: f.q, a: f.a }))}

      finalTitle={pg.final_title}
      finalSub="ניתן לביטול בכל עת."

      hideMicroCommitment

      priceSectionSlot={<HivePricingSection />}
    />
  );
}
