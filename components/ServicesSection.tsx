import Link from "next/link";
import { getPublicAssetPath } from "@/lib/site-paths";
import { ROUTES, SERVICES } from "@/data/site";
import { SectionTitle } from "@/components/SectionTitle";

/** Số dòng mô tả ngắn hiển thị trên mỗi thẻ dịch vụ (danh sách đầy đủ nằm trong menu Dịch vụ). */
const CARD_LINES = 3;

export function ServicesSection() {
  return (
    <section className="services section-space" id="dich-vu" aria-labelledby="services-title">
      <div className="container">
        <SectionTitle id="services-title">DỊCH VỤ KẾ TOÁN THUẾ, PHÁP LÝ DOANH NGHIỆP VÀ TIỀN LƯƠNG TẠI ĐÀ NẴNG</SectionTitle>
        <div className="service-grid">
          {SERVICES.map((service) => (
            <article className="service-card" key={service.slug} id={service.slug}>
              <div className="service-card-head">
                <span className="service-icon">
                  <img src={getPublicAssetPath(service.image)} width="64" height="64" alt={service.alt} loading="lazy" />
                </span>
                <h3><Link href={service.href}>{service.title}</Link></h3>
              </div>
              <ul className="service-points">
                {service.subServices.slice(0, CARD_LINES).map((item) => <li key={item}>{item}</li>)}
                {/* "…" chỉ hiện khi nhóm còn mục khác (xem đủ trong menu Dịch vụ và trang chi tiết). */}
                {service.subServices.length > CARD_LINES && <li className="service-points-more" aria-hidden="true">…</li>}
              </ul>
              <p className="service-more">
                <Link href={service.href} aria-label={`Xem thêm dịch vụ ${service.title.toLocaleLowerCase("vi")}`}>Xem thêm dịch vụ</Link>
              </p>
            </article>
          ))}
        </div>
        <div className="services-more">
          <Link className="button button-blue" href={ROUTES.contact}>Nhận tư vấn dịch vụ</Link>
        </div>
      </div>
    </section>
  );
}
