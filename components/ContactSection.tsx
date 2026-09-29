import { ConsultationForm } from "@/components/ConsultationForm";
import { SectionTitle } from "@/components/SectionTitle";

export function ContactSection() {
  return (
    <section className="contact section-space" id="lien-he">
      <div className="container contact-inner">
        <SectionTitle>Tư vấn thành lập doanh nghiệp và kế toán thuế tại Đà Nẵng</SectionTitle>
        <ConsultationForm />
      </div>
    </section>
  );
}
