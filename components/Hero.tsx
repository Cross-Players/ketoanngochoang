import Link from "next/link";
import { Fragment, type CSSProperties } from "react";
import { COMPANY, ROUTES } from "@/data/site";
import { getPublicAssetPath } from "@/lib/site-paths";
import { HeroParallax } from "@/components/HeroParallax";

const HERO_TITLE = "Dịch vụ kế toán tại Đà Nẵng – Ngọc Hoàng";

/**
 * Tiêu đề hero tách theo từ để "nổi" lên lần lượt sau mặt nạ (CSS, xem globals.css – Hero intro).
 * Chữ giữ nguyên trong DOM (các từ cách nhau bằng khoảng trắng thật) → SEO, đọc màn hình, xuống dòng như cũ.
 * Không JS vẫn chạy (CSS thuần) và kết thúc ở trạng thái hiển thị; reduced-motion: hiện ngay.
 */
function HeroTitle() {
  const words = HERO_TITLE.split(" ");
  return (
    <h1 id="hero-title">
      {words.map((word, index) => (
        <Fragment key={index}>
          {index > 0 ? " " : null}
          <span className="hero-word">
            <span className="hero-word-inner" style={{ "--i": index } as CSSProperties}>{word}</span>
          </span>
        </Fragment>
      ))}
    </h1>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-content">
          <HeroTitle />
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
