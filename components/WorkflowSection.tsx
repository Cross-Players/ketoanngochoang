import Link from "next/link";
import { getPublicAssetPath } from "@/lib/site-paths";
import { ROUTES, WORKFLOW_STEPS } from "@/data/site";
import { SectionTitle } from "@/components/SectionTitle";

export function WorkflowSection() {
  return (
    <section className="workflow section-space" id="quy-trinh">
      <div className="container">
        <SectionTitle>QUY TRÌNH LÀM VIỆC TẠI NGỌC HOÀNG</SectionTitle>
        <div className="workflow-grid">
          {WORKFLOW_STEPS.map((step, index) => (
            <Link
              className="workflow-card"
              key={step.slug}
              href={ROUTES.detail(step.slug)}
              aria-labelledby={`workflow-more-${index} workflow-title-${index}`}
            >
              <span className="workflow-image" aria-hidden="true">
                <span className="workflow-number">{String(index + 1).padStart(2, "0")}</span>
                <img src={getPublicAssetPath(step.image)} alt="" width="299" height="299" loading="lazy" />
              </span>
              <h3 id={`workflow-title-${index}`}>{step.title}</h3>
              <p>{step.description}</p>
              <span className="button workflow-more" id={`workflow-more-${index}`}>Xem thêm</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
