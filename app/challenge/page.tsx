export const dynamic = "force-dynamic";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { ChallengeCTA } from "./ChallengeCTA";
import { ChallengeGreeting } from "./ChallengeGreeting";
import { NextChallengeBadge } from "./NextChallengeBadge";
import { AbandonCheckoutPopup } from "@/components/landing/AbandonCheckoutPopup";
import { CreditBanner } from "@/components/landing/CreditBanner";
import { getUserCredit } from "@/lib/credit";
import { PRODUCT_MAP } from "@/lib/products";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

export const metadata = {
  title: `${CLIENT.products.challenge.title} | ${CLIENT.name}`,
  description: CLIENT.products.challenge.description,
  alternates: { canonical: "/challenge" },
};

export default async function ChallengePage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email = "" } = await searchParams;
  const price         = String(PRODUCT_MAP.challenge_197.price);
  const whatsappPhone = process.env.WHATSAPP_PHONE ?? CLIENT.whatsapp;
  const credit        = email ? await getUserCredit(email) : 0;
  const APP_URL       = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;
  const pg            = CLIENT.pages.challenge;

  const faqItems = pg.faqs.map(f => ({ question: f.q, answer: f.a }));

  return (
    <>
      <ProductSchema
        type="Course"
        name={CLIENT.products.challenge.title}
        description={CLIENT.products.challenge.description}
        url={`${APP_URL}/challenge`}
        price={CLIENT.products.challenge.price}
        imageUrl={`${APP_URL}${CLIENT.products.challenge.image}`}
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.challenge.title, url: `${APP_URL}/challenge` },
      ]} />
      <AbandonCheckoutPopup product="challenge" />
      <ProductLandingPage
        productName={CLIENT.products.challenge.title}
        price={PRODUCT_MAP.challenge_197.price}
        checkoutHref="#cta"

        headline={<><em>{CLIENT.products.challenge.title}</em></>}
        heroSub={CLIENT.products.challenge.description}
        stats={[
          { val: "7",   label: "ימי אתגר" },
          { val: CLIENT.social_proof.stat1.number, label: CLIENT.social_proof.stat1.label },
          { val: CLIENT.social_proof.stat2.number, label: CLIENT.social_proof.stat2.label },
          { val: "48h", label: "ערבות החזר" },
        ]}
        heroExtra={<><ChallengeGreeting /><NextChallengeBadge /></>}

        problemItems={pg.pain_points.map(t => ({ icon: "🔸", text: t }))}
        agitationText={pg.agitation}

        solutionTitle={pg.solution_title}
        solutionDesc={pg.solution_desc}
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
          { val: "4.9", label: "דירוג ממוצע" },
        ]}
        testimonials={pg.testimonials.map(t => ({ text: t.text, author: t.author, role: t.role }))}

        questions={pg.quiz.questions.map(q => ({ q: q.q, options: [...q.options] }))}
        resultMessages={{ ...pg.quiz.results }}

        creditNote={credit > 0 ? `יש לך זיכוי של ${credit} ש״ח מרכישות קודמות` : undefined}

        faqSectionTitle="שאלות נפוצות"
        faqs={pg.faqs.map(f => ({ q: f.q, a: f.a }))}

        finalTitle={pg.final_title}
        finalSub={pg.final_sub}
        whatsappNumber={whatsappPhone}

        ctaSlot={
          <>
            <CreditBanner credit={credit} listPrice={PRODUCT_MAP.challenge_197.price} productName={CLIENT.products.challenge.title} dark />
            <ChallengeCTA price={price} whatsappPhone={whatsappPhone} credit={credit} />
          </>
        }
      />
    </>
  );
}
