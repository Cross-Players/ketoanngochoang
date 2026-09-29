import type { Metadata } from "next";
import Link from "next/link";
import { BenefitList } from "@/components/BenefitList";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactSection } from "@/components/ContactSection";
import { FaqList } from "@/components/FaqList";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { QuickContact } from "@/components/QuickContact";
import { SectionTitle } from "@/components/SectionTitle";
import { COMPANY, ROUTES, WORKFLOW_STEPS } from "@/data/site";
import { TEAM_NOTE, getServicePage, type ServicePage } from "@/data/services";
import { AREA_SERVED, absoluteUrl, faqPageNode, organizationRef, pageMetadata, routeToPath } from "@/lib/seo";
import { sentenceCase } from "@/lib/text";

const FAQ_ANCHOR = "hoi-dap";

function pagePath(page: ServicePage): string {
  return routeToPath(ROUTES.detail(page.slug));
}

export function serviceMetadata(page: ServicePage): Metadata {
  return pageMetadata({ path: pagePath(page), title: page.metaTitle, description: page.metaDescription });
}

function serviceNode(page: ServicePage) {
  const url = absoluteUrl(pagePath(page));
  return {
    "@type": "Service",
    ...(url ? { "@id": `${url}#service`, url } : {}),
    name: page.h1,
    serviceType: page.name,
    description: page.summary,
    inLanguage: "vi-VN",
    areaServed: AREA_SERVED,
    provider: organizationRef(),
  };
}

export function ServiceDetailPage({ page }: { page: ServicePage }) {
  const related = page.related.map((slug) => getServicePage(slug)).filter((item): item is ServicePage => Boolean(item));

  return (
    <>
      <JsonLd nodes={[serviceNode(page), faqPageNode(page.faq, pagePath(page), FAQ_ANCHOR)]} />
      <Header />
      <main id="main">
        <section className="page-banner svc-banner" aria-labelledby="svc-title">
          <div className="container svc-narrow">
            <Breadcrumbs
              path={pagePath(page)}
              items={[{ label: "Trang chủ", href: ROUTES.home }, { label: "Dịch vụ", href: ROUTES.services }, { label: page.name }]}
            />
            <h1 id="svc-title">{page.h1}</h1>
            <p className="svc-lead">{page.lead}</p>
            <div className="button-row svc-banner-actions">
              <a className="button button-orange" href="#lien-he">Tư vấn ngay</a>
              <a className="button button-outline" href={COMPANY.hotlineHref}>Gọi {COMPANY.hotline}</a>
            </div>
          </div>
        </section>

        <nav className="svc-toc container svc-narrow" aria-label="Nội dung trang">
          <ul>
            {page.sections.map((section) => (
              <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>
            ))}
            <li><a href={`#${page.pricing.id}`}>{page.pricing.title}</a></li>
            <li><a href={`#${FAQ_ANCHOR}`}>Hỏi đáp</a></li>
          </ul>
        </nav>

        <section className="svc-section" aria-labelledby="svc-intro-title">
          <div className="container svc-narrow">
            <SectionTitle id="svc-intro-title">{page.intro.title}</SectionTitle>
            {page.intro.paragraphs.map((text) => <p key={text}>{text}</p>)}
          </div>
        </section>

        {page.sections.map((section) => (
          <section className="svc-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
            <div className="container svc-narrow">
              <SectionTitle id={`${section.id}-title`}>{section.title}</SectionTitle>
              {section.paragraphs?.map((text) => <p key={text}>{text}</p>)}
              {section.items && (
                <ul className="svc-items">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              )}
              {section.links && (
                <p className="svc-links">
                  <span>Xem thêm: </span>
                  {section.links.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 && <span aria-hidden="true"> · </span>}
                      <Link className="text-link" href={link.href}>{link.label}</Link>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </section>
        ))}

        <section className="svc-section" aria-labelledby="svc-audience-title">
          <div className="container svc-narrow">
            <SectionTitle id="svc-audience-title">{page.audience.title}</SectionTitle>
            <ul className="svc-check">
              {page.audience.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="svc-section" id={page.pricing.id} aria-labelledby="svc-pricing-title">
          <div className="container svc-narrow">
            <div className="svc-pricing">
              <h2 id="svc-pricing-title">{page.pricing.title}</h2>
              {page.pricing.paragraphs.map((text) => <p key={text}>{text}</p>)}
              <div className="button-row">
                <a className="button button-orange" href="#lien-he">Nhận báo giá</a>
                <a className="button button-blue" href={COMPANY.zaloHref}>Zalo {COMPANY.phone}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-section" aria-labelledby="svc-process-title">
          <div className="container svc-narrow">
            <SectionTitle id="svc-process-title">Quy trình làm việc</SectionTitle>
            <ol className="svc-steps">
              {WORKFLOW_STEPS.map((step, index) => (
                <li key={step.slug}>
                  <Link href={ROUTES.detail(step.slug)}>
                    <span className="svc-step-no" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{sentenceCase(step.title)}</h3>
                    <p>{step.description}</p>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="svc-section" aria-labelledby="svc-why-title">
          <div className="container svc-narrow">
            <SectionTitle id="svc-why-title">{page.whyTitle}</SectionTitle>
            <p>{TEAM_NOTE}</p>
            <BenefitList className="svc-benefits" />
          </div>
        </section>

        <section className="svc-section" aria-labelledby="svc-prepare-title">
          <div className="container svc-narrow">
            <SectionTitle id="svc-prepare-title">{page.prepare.title}</SectionTitle>
            <ul className="svc-check">
              {page.prepare.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="svc-muted">Hồ sơ cụ thể tùy từng trường hợp; Ngọc Hoàng sẽ gửi danh sách chi tiết sau khi trao đổi với bạn.</p>
          </div>
        </section>

        <section className="svc-section" id={FAQ_ANCHOR} aria-labelledby="svc-faq-title">
          <div className="container svc-narrow">
            <SectionTitle id="svc-faq-title">{page.faqTitle}</SectionTitle>
            <FaqList items={page.faq} />
            <p className="faq-contact">Chưa thấy câu trả lời bạn cần? Gọi <a href={COMPANY.hotlineHref}>{COMPANY.hotline}</a> hoặc <a href="#lien-he">gửi câu hỏi</a> cho Ngọc Hoàng.</p>
          </div>
        </section>

        <section className="svc-section" aria-labelledby="svc-related-title">
          <div className="container svc-narrow">
            <SectionTitle id="svc-related-title">Dịch vụ liên quan</SectionTitle>
            <ul className="svc-related">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={ROUTES.detail(item.slug)}>
                    <h3>{item.name}</h3>
                    <p>{item.summary}</p>
                    <span className="svc-related-more">Xem chi tiết</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
      <QuickContact />
    </>
  );
}
