import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuickContact } from "@/components/QuickContact";
import { SERVICE_PAGES } from "@/data/services";
import { COMPANY, ROUTES } from "@/data/site";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  description: "Trang bạn tìm không tồn tại hoặc đã được chuyển. Xem các dịch vụ của Ngọc Hoàng hoặc gọi 0963 548 333.",
  robots: { index: false, follow: true },
};

/** Trang 404 (static export → out/404.html): giữ header/footer và gợi ý đường đi tiếp. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="page-banner" aria-labelledby="not-found-title">
          <div className="container">
            <p className="not-found-code">Lỗi 404</p>
            <h1 id="not-found-title">Không tìm thấy trang</h1>
          </div>
        </section>
        <section className="section-space">
          <div className="container svc-narrow">
            <p>Trang bạn tìm không tồn tại hoặc đã được chuyển sang địa chỉ khác. Bạn có thể quay về trang chủ hoặc xem các dịch vụ dưới đây.</p>
            <ul className="svc-check">
              {SERVICE_PAGES.map((page) => (
                <li key={page.slug}><Link className="text-link" href={ROUTES.detail(page.slug)}>{page.name}</Link></li>
              ))}
            </ul>
            <div className="button-row not-found-actions">
              <Link className="button button-orange" href={ROUTES.home}>Về trang chủ</Link>
              <a className="button button-blue" href={COMPANY.hotlineHref}>Gọi {COMPANY.hotline}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <QuickContact />
    </>
  );
}
