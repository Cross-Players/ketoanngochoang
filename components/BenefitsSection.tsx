import { BenefitList } from "@/components/BenefitList";

export function BenefitsSection() {
  return (
    <section className="benefits section-space">
      <div className="container benefits-layout">
        <div className="benefit-content">
          <h2>Vì sao chọn Ngọc Hoàng cho kế toán thuế và pháp lý doanh nghiệp?</h2>
          <BenefitList />
        </div>
      </div>
    </section>
  );
}
