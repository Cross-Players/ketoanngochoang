import Link from "next/link";
import { Fragment, type CSSProperties } from "react";
import { ABOUT_SLOGAN } from "@/data/about";
import { COMPANY, ROUTES } from "@/data/site";
import { getPublicAssetPath } from "@/lib/site-paths";
import { HeroParallax } from "@/components/HeroParallax";

// "Đà\u00A0Nẵng" dùng khoảng trắng không ngắt để địa danh không bị tách xuống 2 dòng (và giữ chung 1 từ khi tách chữ).
const HERO_TITLE = "Dịch vụ kế toán thuế và thành lập doanh nghiệp tại Đà\u00A0Nẵng – Ngọc Hoàng";

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
          <p className="hero-tagline">{ABOUT_SLOGAN}</p>
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
          {/* Ảnh chân dung (cắt từ ảnh dọc 683×1024 còn 683×640 quanh mặt/thân trên), khung ngang dùng object-fit: cover;
              ảnh LCP của trang chủ → fetchPriority="high", srcSet để điện thoại tải bản nhỏ. */}
          <img
            src={getPublicAssetPath("/hero-photo-480.webp")}
            srcSet={`${getPublicAssetPath("/hero-photo-360.webp")} 360w, ${getPublicAssetPath("/hero-photo-480.webp")} 480w, ${getPublicAssetPath("/hero-photo-683.webp")} 683w`}
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1060px) 45vw, 560px"
            alt="Đại diện Công ty TNHH Tư vấn & Dịch vụ Ngọc Hoàng"
            width="683"
            height="640"
            fetchPriority="high"
          />
          <HeroParallax />
        </div>
      </div>
    </section>
  );
}
