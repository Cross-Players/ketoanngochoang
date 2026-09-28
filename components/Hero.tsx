import Link from "next/link";
import { COMPANY, ROUTES } from "@/data/site";
import { getPublicAssetPath } from "@/lib/site-paths";
import { HeroParallax } from "@/components/HeroParallax";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 id="hero-title">Dịch vụ BHXH và kế toán tại Đà Nẵng – Ngọc Hoàng</h1>
          <p className="hero-tagline">Điểm tựa cho khởi đầu – Hài hòa cùng thịnh vượng</p>
          <div className="hero-actions">
            <Link className="button button-orange hero-cta" href={ROUTES.contact}>Tư vấn ngay</Link>
            <a className="hero-phone" href={COMPANY.hotlineHref}>
              <span className="hero-phone-icon" aria-hidden="true">
                <img src={getPublicAssetPath("/phone-icon.svg")} alt="" width="22" height="22" />
              </span>
              <span><small>Hotline hỗ trợ</small><strong>{COMPANY.hotline}</strong></span>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={getPublicAssetPath("/logo-hero.webp")}
            alt="Biểu trưng Công ty TNHH Tư vấn & Dịch vụ Ngọc Hoàng – Tận tâm, chuyên nghiệp, hiệu quả"
            width="1408"
            height="768"
            fetchPriority="high"
          />
          <HeroParallax />
        </div>
      </div>
    </section>
  );
}
