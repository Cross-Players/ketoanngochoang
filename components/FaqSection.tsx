import { FaqList } from "@/components/FaqList";
import { COMPANY, FAQ_ITEMS } from "@/data/site";

export function FaqSection() {
  return (
    <section className="faq section-space" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <h2 className="section-title" id="faq-title"><span className="section-title-text">CÂU HỎI THƯỜNG GẶP VỀ KẾ TOÁN THUẾ VÀ THÀNH LẬP DOANH NGHIỆP TẠI ĐÀ NẴNG</span></h2>
        <FaqList items={FAQ_ITEMS} openFirst />
        <p className="faq-contact">Chưa thấy câu hỏi của bạn? Gọi hoặc nhắn Zalo <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>.</p>
      </div>
    </section>
  );
}
