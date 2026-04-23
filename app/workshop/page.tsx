export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { AbandonCheckoutPopup } from "@/components/landing/AbandonCheckoutPopup";
import { CreditBanner } from "@/components/landing/CreditBanner";
import { getUserCredit } from "@/lib/credit";
import { PRODUCT_MAP } from "@/lib/products";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `${CLIENT.products.workshop.title} | ${CLIENT.name}`,
  description: CLIENT.products.workshop.description,
  alternates: { canonical: "/workshop" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

export default async function WorkshopPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email = "" } = await searchParams;
  const price  = String(PRODUCT_MAP.workshop_1080.price);
  const credit = email ? await getUserCredit(email) : 0;
  const pg     = CLIENT.pages.workshop;

  const faqItems = pg.faqs.map(f => ({ question: f.q, answer: f.a }));

  return (
    <>
      <ProductSchema
        type="Course"
        name={CLIENT.products.workshop.title}
        description={CLIENT.products.workshop.description}
        url={`${APP_URL}/workshop`}
        price={CLIENT.products.workshop.price}
        imageUrl={`${APP_URL}${CLIENT.products.workshop.image}`}
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.workshop.title, url: `${APP_URL}/workshop` },
      ]} />
      <AbandonCheckoutPopup product="workshop" />
      <ProductLandingPage
        productName={CLIENT.products.workshop.title}
        price={PRODUCT_MAP.workshop_1080.price}
        checkoutHref="#cta"

        headline={<><em>{CLIENT.products.workshop.title}</em></>}
        heroSub={CLIENT.products.workshop.description}
        stats={[
          { val: "1",   label: "יום" },
          { val: price, label: "₪" },
          { val: CLIENT.social_proof.stat1.number, label: CLIENT.social_proof.stat1.label },
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

        creditNote={credit > 0 ? `יש לך זיכוי של ${credit} ש״ח מרכישות קודמות` : undefined}

        faqSectionTitle="שאלות נפוצות"
        faqs={pg.faqs.map(f => ({ q: f.q, a: f.a }))}

        finalTitle={pg.final_title}
        finalSub={pg.final_sub}

        ctaSlot={
          <CreditBanner credit={credit} listPrice={PRODUCT_MAP.workshop_1080.price} productName={CLIENT.products.workshop.title} dark />
        }
      />
    </>
  );
}
