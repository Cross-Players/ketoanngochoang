import { BenefitList } from "@/components/BenefitList";
import { SectionTitle } from "@/components/SectionTitle";

export function BenefitsSection() {
  return (
    <section className="benefits section-space">
      <div className="container benefits-layout">
        <div className="benefit-content">
          <SectionTitle>Vì sao chọn Ngọc Hoàng cho kế toán thuế và pháp lý doanh nghiệp?</SectionTitle>
          <BenefitList />
        </div>
      </div>
    </section>
  );
}
