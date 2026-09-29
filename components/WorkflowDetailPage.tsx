import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuickContact } from "@/components/QuickContact";
import { COMPANY, ROUTES, WORKFLOW_STEPS, type WorkflowStep } from "@/data/site";
import { getPublicAssetPath } from "@/lib/site-paths";
import { pageMetadata, routeToPath } from "@/lib/seo";
import { sentenceCase } from "@/lib/text";

export function workflowMetadata(step: WorkflowStep): Metadata {
  return pageMetadata({
    path: routeToPath(ROUTES.detail(step.slug)),
    title: `${sentenceCase(step.title)} – Quy trình làm việc`,
    description: step.description,
    type: "article",
  });
}

export function WorkflowDetailPage({ step }: { step: WorkflowStep }) {
  const index = WORKFLOW_STEPS.findIndex((item) => item.slug === step.slug);
  const prev = index > 0 ? WORKFLOW_STEPS[index - 1] : undefined;
  const next = index < WORKFLOW_STEPS.length - 1 ? WORKFLOW_STEPS[index + 1] : undefined;
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <>
      <Header />
      <main id="main" className="workflow-detail">
        <section className="workflow-detail-hero" aria-labelledby="workflow-detail-title">
          <div className="container">
            <Breadcrumbs
              path={routeToPath(ROUTES.detail(step.slug))}
              items={[{ label: "Trang chủ", href: ROUTES.home }, { label: "Quy trình", href: "/#quy-trinh" }, { label: sentenceCase(step.title) }]}
            />
            <p className="workflow-detail-kicker">Bước {stepNumber} / 04</p>
            <h1 id="workflow-detail-title">{step.title}</h1>
          </div>
        </section>

        <section className="container workflow-detail-body" aria-labelledby="workflow-detail-title">
          <figure className="workflow-detail-figure">
            <img src={getPublicAssetPath(step.image)} alt={step.alt} width="299" height="299" />
          </figure>
          <div className="workflow-detail-copy">
            <p className="workflow-detail-lead">{step.description}</p>
            {step.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="button-row">
              <Link className="button button-orange" href={ROUTES.contact}>Gửi yêu cầu tư vấn</Link>
              <a className="button button-blue" href={COMPANY.hotlineHref}>Gọi {COMPANY.hotline}</a>
            </div>

            <nav className="workflow-nav" aria-label="Các bước quy trình khác">
              {prev ? (
                <Link href={ROUTES.detail(prev.slug)}>
                  <span className="wn-label">Bước trước</span>
                  <span className="wn-title">{sentenceCase(prev.title)}</span>
                </Link>
              ) : <span />}
              {next ? (
                <Link className="wn-next" href={ROUTES.detail(next.slug)}>
                  <span className="wn-label">Bước tiếp</span>
                  <span className="wn-title">{sentenceCase(next.title)}</span>
                </Link>
              ) : <span />}
            </nav>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
      <QuickContact />
    </>
  );
}
