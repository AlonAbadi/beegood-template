import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { PRODUCT_MAP } from "@/lib/products";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `${CLIENT.products.course.title} | ${CLIENT.name}`,
  description: CLIENT.products.course.description,
  alternates: { canonical: "/course" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

export default function CoursePage() {
  const pg    = CLIENT.pages.course;
  const price = PRODUCT_MAP.course_1800.price;

  const faqItems = pg.faqs.map(f => ({ question: f.q, answer: f.a }));

  return (
    <>
      <ProductSchema
        type="Course"
        name={CLIENT.products.course.title}
        description={CLIENT.products.course.description}
        url={`${APP_URL}/course`}
        price={price}
        imageUrl={`${APP_URL}${CLIENT.products.course.image}`}
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.course.title, url: `${APP_URL}/course` },
      ]} />
      <ProductLandingPage
        productName={CLIENT.products.course.title}
        price={price}
        checkoutHref="#cta"

        headline={<><em>{CLIENT.products.course.title}</em></>}
        heroSub={CLIENT.products.course.description}
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
          { val: CLIENT.social_proof.stat3.number, label: CLIENT.social_proof.stat3.label },
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
