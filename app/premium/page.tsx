import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { PRODUCT_MAP } from "@/lib/products";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `${CLIENT.products.premium.title} | ${CLIENT.name}`,
  description: CLIENT.products.premium.description,
  alternates: { canonical: "/premium" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

export default function PremiumPage() {
  const pg    = CLIENT.pages.premium;
  const price = PRODUCT_MAP.premium_14000.price;

  const faqItems = pg.faqs.map(f => ({ question: f.q, answer: f.a }));

  return (
    <>
      <ProductSchema
        type="Service"
        name={CLIENT.products.premium.title}
        description={CLIENT.products.premium.description}
        url={`${APP_URL}/premium`}
        price={price}
        imageUrl={`${APP_URL}${CLIENT.products.premium.image}`}
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.premium.title, url: `${APP_URL}/premium` },
      ]} />
      <ProductLandingPage
        productName={CLIENT.products.premium.title}
        price={price}
        checkoutHref="#cta"

        headline={<><em>{CLIENT.products.premium.title}</em></>}
        heroSub={CLIENT.products.premium.description}
        stats={[
          { val: String(price),                          label: "₪" },
          { val: CLIENT.social_proof.stat1.number,       label: CLIENT.social_proof.stat1.label },
          { val: CLIENT.social_proof.stat2.number,       label: CLIENT.social_proof.stat2.label },
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
