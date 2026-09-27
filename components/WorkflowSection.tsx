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
          {WORKFLOW_STEPS.map((step, index) => {
            const stepNumber = String(index + 1).padStart(2, "0");
            return (
              <article key={step.title}>
                <img src={getPublicAssetPath(step.image)} alt={step.alt} width="299" height="443" loading="lazy" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <a
                  className="button workflow-more"
                  href={CONSULTATION_ANCHOR}
                  aria-label={`Xem thêm bước ${stepNumber}: ${step.title.toLocaleLowerCase("vi")} – gửi yêu cầu tư vấn`}
                >
                  Xem thêm
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
