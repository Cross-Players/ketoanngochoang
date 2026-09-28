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
import { COMPANY, FAQ_ITEMS, SERVICES } from "@/data/site";
import { PAGE_DESCRIPTION } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const siteUrlString = siteUrl?.toString();
const absolute = (path: string) => (siteUrl ? new URL(path, siteUrl).toString() : undefined);
const organizationId = siteUrlString ? `${siteUrlString}#organization` : undefined;

const businessNode = {
  "@type": "ProfessionalService",
  ...(organizationId ? { "@id": organizationId } : {}),
  name: COMPANY.name,
  alternateName: COMPANY.shortName,
  legalName: COMPANY.name,
  description: PAGE_DESCRIPTION,
  taxID: COMPANY.taxId,
  foundingDate: COMPANY.foundingDate,
  telephone: COMPANY.phoneE164,
  ...(siteUrlString ? { url: siteUrlString } : {}),
  ...(siteUrl
    ? {
        logo: {
          "@type": "ImageObject",
          url: absolute("logo-ngoc-hoang-512.png"),
          width: 512,
          height: 512,
        },
        image: [absolute("og-ngoc-hoang.png"), absolute("logo-hero.webp")],
      }
    : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    addressLocality: COMPANY.ward,
    addressRegion: COMPANY.region,
    addressCountry: "VN",
  },
  areaServed: { "@type": "City", name: COMPANY.region },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: COMPANY.phoneE164,
    contactType: "customer service",
    areaServed: "VN",
    availableLanguage: ["vi"],
  },
  knowsAbout: ["Bảo hiểm xã hội", "Bảo hiểm y tế", "Thành lập doanh nghiệp", "Kế toán thuế"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dịch vụ của Ngọc Hoàng",
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.items.join("; "),
        areaServed: { "@type": "City", name: COMPANY.region },
        ...(organizationId ? { provider: { "@id": organizationId } } : {}),
      },
    })),
  },
};

const websiteNode = siteUrlString
  ? {
      "@type": "WebSite",
      "@id": `${siteUrlString}#website`,
      url: siteUrlString,
      name: COMPANY.shortName,
      alternateName: COMPANY.name,
      inLanguage: "vi-VN",
      publisher: { "@id": organizationId },
    }
  : undefined;

const faqNode = {
  "@type": "FAQPage",
  ...(siteUrlString ? { "@id": `${siteUrlString}#faq`, url: `${siteUrlString}#faq` } : {}),
  inLanguage: "vi-VN",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const businessJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [businessNode, ...(websiteNode ? [websiteNode] : []), faqNode],
})
  .replace(/</g, "\\u003c")
  .replace(/>/g, "\\u003e")
  .replace(/&/g, "\\u0026")
  .replace(/\u2028/g, "\\u2028")
  .replace(/\u2029/g, "\\u2029");

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: businessJsonLd }} />
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
