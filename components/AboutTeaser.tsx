import Link from "next/link";
import { ABOUT_MOTTO, ABOUT_SLOGAN } from "@/data/about";
import { COMPANY, ROUTES } from "@/data/site";
import { getPublicAssetPath } from "@/lib/site-paths";

/** Đoạn giới thiệu ngắn trên trang chủ; nội dung đầy đủ nằm ở trang /gioi-thieu/. */
export function AboutTeaser() {
  return (
    <section className="about-teaser section-space" aria-labelledby="about-teaser-title">
      <div className="container about-teaser-inner">
        <img className="about-teaser-mark" src={getPublicAssetPath("/logo-ngoc-hoang-256.png")} alt="" width="256" height="256" loading="lazy" />
        <div>
          <h2 id="about-teaser-title">Về {COMPANY.name}</h2>
          <p className="about-teaser-slogan">“{ABOUT_SLOGAN}”</p>
          <p>{ABOUT_MOTTO.join(" ")}</p>
          <Link className="text-link" href={ROUTES.about}>Xem giới thiệu Ngọc Hoàng →</Link>
        </div>
      </div>
    </section>
  );
}
