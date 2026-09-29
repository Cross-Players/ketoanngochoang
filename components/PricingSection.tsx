import { SectionTitle } from "@/components/SectionTitle";


export function PricingSection() {
  return (
    <section className="pricing section-space" id="bang-gia">
      <div className="container">
        <SectionTitle>Báo giá dịch vụ kế toán, thành lập doanh nghiệp và tính lương</SectionTitle>
        <p className="section-intro">Ngọc Hoàng cung cấp dịch vụ pháp lý doanh nghiệp, thuế, kế toán, nhân sự và giải pháp hỗ trợ doanh nghiệp tại Đà Nẵng. Liên hệ để được tư vấn phạm vi công việc và báo giá phù hợp với nhu cầu thực tế.</p>
        <a className="button button-blue" href="#lien-he">Liên hệ tư vấn</a>
      </div>
    </section>
  );
}
