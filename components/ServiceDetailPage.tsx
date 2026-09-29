import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuickContact } from "@/components/QuickContact";
import { BENEFITS, COMPANY, ROUTES, WORKFLOW_STEPS } from "@/data/site";
import { SERVICE_PAGES, TEAM_NOTE, type ServicePage } from "@/data/services";
import { getPublicAssetPath } from "@/lib/site-paths";
import { pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export function serviceMetadata(page: ServicePage): Metadata {
  return pageMetadata({ path: `${page.slug}/`, title: page.metaTitle, description: page.metaDescription });
}

function titleCase(text: string) {
  return text.charAt(0) + text.slice(1).toLocaleLowerCase("vi");
}

function jsonLd(page: ServicePage): string {
  const siteUrl = getSiteUrl();
  const base = siteUrl?.toString();
  const pageUrl = siteUrl ? new URL(`${page.slug}/`, siteUrl).toString() : undefined;
  const provider = {
    "@type": "ProfessionalService",
    ...(base ? { "@id": `${base}#organization`, url: base } : {}),
    name: COMPANY.name,
    telephone: COMPANY.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.street,
      addressLocality: COMPANY.ward,
      addressRegion: COMPANY.region,
      addressCountry: "VN",
    },
  };
  const graph = [
    {
      "@type": "Service",
      ...(pageUrl ? { "@id": `${pageUrl}#service`, url: pageUrl } : {}),
      name: page.h1,
      serviceType: page.name,
      description: page.summary,
      inLanguage: "vi-VN",
      areaServed: { "@type": "City", name: COMPANY.region },
      provider,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", ...(base ? { item: base } : {}) },
        { "@type": "ListItem", position: 2, name: page.name, ...(pageUrl ? { item: pageUrl } : {}) },
      ],
    },
    {
      "@type": "FAQPage",
      ...(pageUrl ? { "@id": `${pageUrl}#hoi-dap`, url: `${pageUrl}#hoi-dap` } : {}),
      inLanguage: "vi-VN",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

const TICK = "/assets/tick-1-300x300-c2a0320a.png";

export function ServiceDetailPage({ page }: { page: ServicePage }) {
  const related = page.related
    .map((slug) => SERVICE_PAGES.find((item) => item.slug === slug))
    .filter((item): item is ServicePage => Boolean(item));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(page) }} />
      <Header />
      <main id="main" className="svc-page">
        <section className="page-banner svc-banner" aria-labelledby="svc-title">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href={ROUTES.home}>Trang chủ</Link>
              <span aria-hidden="true">/</span>
              <Link href={ROUTES.services}>Dịch vụ</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.name}</span>
            </nav>
            <h1 id="svc-title">{page.h1}</h1>
            <p className="svc-lead">{page.lead}</p>
            <div className="button-row svc-banner-actions">
              <a className="button button-orange" href="#lien-he">Tư vấn ngay</a>
              <a className="button button-outline" href={COMPANY.hotlineHref}>Gọi {COMPANY.hotline}</a>
            </div>
          </div>
        </section>

        <nav className="svc-toc container" aria-label="Nội dung trang">
          <ul>
            {page.sections.map((section) => (
              <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>
            ))}
            <li><a href={`#${page.pricing.id}`}>{page.pricing.title}</a></li>
            <li><a href="#hoi-dap">Hỏi đáp</a></li>
          </ul>
        </nav>

        <section className="svc-section svc-intro" aria-labelledby="svc-intro-title">
          <div className="container svc-narrow">
            <h2 className="svc-h2" id="svc-intro-title">{page.intro.title}</h2>
            {page.intro.paragraphs.map((text) => <p key={text}>{text}</p>)}
          </div>
        </section>

        {page.sections.map((section) => (
          <section className="svc-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
            <div className="container svc-narrow">
              <h2 className="svc-h2" id={`${section.id}-title`}>{section.title}</h2>
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
            <h2 className="svc-h2" id="svc-audience-title">{page.audience.title}</h2>
            <ul className="svc-check">
              {page.audience.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="svc-section" id={page.pricing.id} aria-labelledby="svc-pricing-title">
          <div className="container svc-narrow">
            <div className="svc-pricing">
              <h2 className="svc-h2" id="svc-pricing-title">{page.pricing.title}</h2>
              {page.pricing.paragraphs.map((text) => <p key={text}>{text}</p>)}
              <div className="button-row">
                <a className="button button-orange" href="#lien-he">Nhận báo giá</a>
                <a className="button button-blue" href={COMPANY.zaloHref}>Zalo {COMPANY.phone}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-section" aria-labelledby="svc-process-title">
          <div className="container">
            <h2 className="svc-h2 svc-h2-center" id="svc-process-title">Quy trình làm việc</h2>
            <ol className="svc-steps">
              {WORKFLOW_STEPS.map((step, index) => (
                <li key={step.slug}>
                  <Link href={ROUTES.workflow(step.slug)}>
                    <span className="svc-step-no" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{titleCase(step.title)}</h3>
                    <p>{step.description}</p>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="svc-section" aria-labelledby="svc-why-title">
          <div className="container svc-narrow">
            <h2 className="svc-h2" id="svc-why-title">{page.whyTitle}</h2>
            <p>{TEAM_NOTE}</p>
            <ul className="benefit-list svc-benefits">
              {BENEFITS.map((benefit) => (
                <li key={benefit.title}>
                  <img src={getPublicAssetPath(TICK)} alt="" width="36" height="36" loading="lazy" />
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="svc-section" aria-labelledby="svc-prepare-title">
          <div className="container svc-narrow">
            <h2 className="svc-h2" id="svc-prepare-title">{page.prepare.title}</h2>
            <ul className="svc-check">
              {page.prepare.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="svc-muted">Hồ sơ cụ thể tùy từng trường hợp; Ngọc Hoàng sẽ gửi danh sách chi tiết sau khi trao đổi với bạn.</p>
          </div>
        </section>

        <section className="svc-section" id="hoi-dap" aria-labelledby="svc-faq-title">
          <div className="container">
            <h2 className="svc-h2 svc-h2-center" id="svc-faq-title">{page.faqTitle}</h2>
            <div className="faq-list">
              {page.faq.map((item) => (
                <details key={item.question}>
                  <summary><h3>{item.question}</h3></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
            <p className="faq-contact">Chưa thấy câu trả lời bạn cần? Gọi <a href={COMPANY.hotlineHref}>{COMPANY.hotline}</a> hoặc <a href="#lien-he">gửi câu hỏi</a> cho Ngọc Hoàng.</p>
          </div>
        </section>

        <section className="svc-section" aria-labelledby="svc-related-title">
          <div className="container">
            <h2 className="svc-h2 svc-h2-center" id="svc-related-title">Dịch vụ liên quan</h2>
            <ul className="svc-related">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}/`}>
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
