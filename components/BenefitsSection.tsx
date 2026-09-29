import { getPublicAssetPath } from "@/lib/site-paths";
import { BENEFITS } from "@/data/site";

export function BenefitsSection() {
  return (
    <section className="benefits section-space">
      <div className="container benefits-layout">
        <div className="benefit-content">
          <h2>Vì sao chọn Ngọc Hoàng cho dịch vụ kế toán?</h2>
          <ul className="benefit-list">
            {BENEFITS.map((benefit) => (
              <li key={benefit.title}>
                <img src={getPublicAssetPath("/assets/tick-1-300x300-c2a0320a.png")} alt="" width="40" height="40" loading="lazy" />
                <div><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
