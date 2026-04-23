import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { PRODUCT_MAP } from "@/lib/products";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `${CLIENT.products.strategy.title} | ${CLIENT.name}`,
  description: CLIENT.products.strategy.description,
  alternates: { canonical: "/strategy" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

export default async function StrategyPage() {
  const price = String(PRODUCT_MAP.strategy_4000.price);
  const pg    = CLIENT.pages.strategy;

  const faqItems = pg.faqs.map(f => ({ question: f.q, answer: f.a }));

  return (
    <>
      <ProductSchema
        type="Service"
        name={CLIENT.products.strategy.title}
        description={CLIENT.products.strategy.description}
        url={`${APP_URL}/strategy`}
        price={CLIENT.products.strategy.price}
        imageUrl={`${APP_URL}${CLIENT.products.strategy.image}`}
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.strategy.title, url: `${APP_URL}/strategy` },
      ]} />
      <ProductLandingPage
        productName={CLIENT.products.strategy.title}
        price={PRODUCT_MAP.strategy_4000.price}
        checkoutHref="#cta"

        headline={<><em>{CLIENT.products.strategy.title}</em></>}
        heroSub={CLIENT.products.strategy.description}
        stats={[
          { val: "90", label: "דקות" },
          { val: price, label: "₪" },
          { val: "100%", label: "ערבות" },
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

        faqSectionTitle="שאלות נפוצות"
        faqs={pg.faqs.map(f => ({ q: f.q, a: f.a }))}

        finalTitle={pg.final_title}
        finalSub={pg.final_sub}
      />
    </>
  );
}
