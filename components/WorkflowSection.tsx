import { getPublicAssetPath } from "@/lib/site-paths";
import { WORKFLOW_STEPS } from "@/data/site";

/** Id của khối form tư vấn (ContactSection); nút "Xem thêm" cuộn mượt tới đây. */
const CONSULTATION_ANCHOR = "#lien-he";

export function WorkflowSection() {
  return (
    <section className="workflow section-space" id="quy-trinh">
      <div className="container">
        <h2 className="section-title">QUY TRÌNH LÀM VIỆC TẠI NGỌC HOÀNG</h2>
        <div className="workflow-grid">
          {WORKFLOW_STEPS.map((step, index) => (
            <a
              className="workflow-card"
              key={step.title}
              href={CONSULTATION_ANCHOR}
              aria-labelledby={`workflow-more-${index} workflow-title-${index}`}
            >
              <span className="workflow-image" aria-hidden="true">
                <span className="workflow-number">{String(index + 1).padStart(2, "0")}</span>
                <img src={getPublicAssetPath(step.image)} alt="" width="299" height="443" loading="lazy" />
              </span>
              <h3 id={`workflow-title-${index}`}>{step.title}</h3>
              <p>{step.description}</p>
              <span className="button workflow-more" id={`workflow-more-${index}`}>Xem thêm</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
