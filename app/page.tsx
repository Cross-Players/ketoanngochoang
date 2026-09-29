import type { Metadata } from "next";
import { AboutTeaser } from "@/components/AboutTeaser";
import { BenefitsSection } from "@/components/BenefitsSection";
import { CalloutSection } from "@/components/CalloutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NewsSection } from "@/components/NewsSection";
import { PricingSection } from "@/components/PricingSection";
import { QuickContact } from "@/components/QuickContact";
import { ServicesSection } from "@/components/ServicesSection";
import { WorkflowSection } from "@/components/WorkflowSection";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { FAQ_ITEMS, ROUTES } from "@/data/site";
import { SERVICE_PAGES } from "@/data/services";
import {
  AREA_SERVED,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  absoluteUrl,
  faqPageNode,
  organizationId,
  organizationNode,
  pageMetadata,
  routeToPath,
  websiteNode,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "", title: PAGE_TITLE, description: PAGE_DESCRIPTION, absoluteTitle: true });

const providerId = organizationId();

const businessNode = organizationNode({
  knowsAbout: ["Kế toán thuế", "Kế toán doanh nghiệp", "Thành lập doanh nghiệp", "Tính lương"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dịch vụ của Ngọc Hoàng",
    // Mỗi dịch vụ trỏ tới trang chi tiết riêng. Không đưa mục bảo hiểm vào schema.
    itemListElement: SERVICE_PAGES.map((page) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: page.name,
        description: page.summary,
        url: absoluteUrl(routeToPath(ROUTES.detail(page.slug))),
        areaServed: AREA_SERVED,
        ...(providerId ? { provider: { "@id": providerId } } : {}),
      },
    })),
  },
});

export default function HomePage() {
  return (
    <>
      <JsonLd nodes={[businessNode, websiteNode(), faqPageNode(FAQ_ITEMS, "", "faq")]} />
      <Header />
      <main id="main">
        <Hero />
        <ServicesSection />
        <AboutTeaser />
        <CalloutSection />
        <BenefitsSection />
        <PricingSection />
        <WorkflowSection />
        <NewsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <QuickContact />
    </>
  );
}
