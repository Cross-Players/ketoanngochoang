import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuickContact } from "@/components/QuickContact";
import {
  ABOUT_BENEFITS,
  ABOUT_BENEFITS_LEAD,
  ABOUT_CLOSING,
  ABOUT_CONTACT_HEADING,
  ABOUT_CONTACT_OFFICE,
  ABOUT_DOC_HEADING,
  ABOUT_HOTLINE_PARAGRAPH,
  ABOUT_INTRO,
  ABOUT_MOTTO,
  ABOUT_QUALITY_LIST,
  ABOUT_SLOGAN,
  ABOUT_TAX_HEADING,
  ABOUT_TAX_PARAGRAPHS,
  ABOUT_WHY_HEADING,
  ABOUT_WHY_LIST,
  type RichText,
} from "@/data/about";
import { COMPANY, ROUTES } from "@/data/site";
import { getPublicAssetPath } from "@/lib/site-paths";
import { pageMetadata } from "@/lib/seo";

const title = "Giới thiệu Công ty TNHH Tư vấn & Dịch vụ Ngọc Hoàng";
const description =
  "Giới thiệu Công ty TNHH Tư vấn & Dịch vụ Ngọc Hoàng tại Đà Nẵng – Điểm tựa cho khởi đầu, Hài hòa cùng thịnh vượng. Dịch vụ thuế, kế toán và thành lập doanh nghiệp.";

export const metadata: Metadata = pageMetadata({ path: "gioi-thieu/", title, description });

function Rich({ text }: { text: RichText }) {
  return (
    <>
      {text.map((part, index) =>
        typeof part === "string" ? <span key={index}>{part}</span> : <strong key={index}>{part.b}</strong>,
      )}
    </>
  );
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main" className="about-page">
        <section className="page-banner" aria-labelledby="about-title">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href={ROUTES.home}>Trang chủ</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Giới thiệu</span>
            </nav>
            <h1 id="about-title">Giới thiệu</h1>
          </div>
        </section>

        <section className="about-quote">
          <div className="container">
            <blockquote>
              <p className="about-quote-slogan">“{ABOUT_SLOGAN}”</p>
              <p className="about-quote-motto">{ABOUT_MOTTO[0]}{" "}<br />{ABOUT_MOTTO[1]}</p>
            </blockquote>
          </div>
        </section>

        <section className="about-intro section-space" aria-labelledby="about-heading">
          <div className="container about-intro-grid">
            <div className="about-intro-text">
              <p className="about-eyebrow" aria-hidden="true">{COMPANY.name}</p>
              <h2 id="about-heading">GIỚI THIỆU VỀ NGỌC HOÀNG</h2>
              <p className="sr-only">{ABOUT_DOC_HEADING}</p>
              <p><Rich text={ABOUT_INTRO} /></p>
            </div>
            <figure className="about-intro-image">
              <img src={getPublicAssetPath("/logo-hero.webp")} alt="Biểu trưng Công ty TNHH Tư vấn & Dịch vụ Ngọc Hoàng – Tận tâm, chuyên nghiệp, hiệu quả" width="1408" height="768" />
            </figure>
          </div>
        </section>

        <article className="about-body">
          <div className="container about-body-inner">
            <h2>{ABOUT_TAX_HEADING}</h2>
            {ABOUT_TAX_PARAGRAPHS.map((paragraph, index) => <p key={index}><Rich text={paragraph} /></p>)}

            <h2>{ABOUT_WHY_HEADING}</h2>
            <ul className="about-list">
              {ABOUT_WHY_LIST.map((item) => <li key={item}>{item}</li>)}
              <li>
                {ABOUT_BENEFITS_LEAD}
                {/* 4 quyền lợi được làm nổi bật: in đậm toàn đoạn, cụm dẫn trước dấu ":" tô xanh, icon check, nền nhạt.
                    Câu chữ giữ nguyên văn bản Word (chỉ tách phần trước/sau dấu ":" để tô màu). */}
                <ul className="about-benefits">
                  {ABOUT_BENEFITS.map((item) => {
                    const colon = item.indexOf(":");
                    return (
                      <li key={item}>
                        {colon > 0 ? (
                          <>
                            <span className="about-benefits-lead">{item.slice(0, colon + 1)}</span>
                            {item.slice(colon + 1)}
                          </>
                        ) : item}
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
            <ul className="about-list about-list-check">
              {ABOUT_QUALITY_LIST.map((item) => <li key={item}>{item}</li>)}
            </ul>

            {ABOUT_CLOSING.map((paragraph, index) => <p key={index}><Rich text={paragraph} /></p>)}
            <p className="about-hotline">
              <Rich text={ABOUT_HOTLINE_PARAGRAPH.before} />
              <a href={COMPANY.hotlineHref}><strong>{COMPANY.hotline}</strong></a>
              {ABOUT_HOTLINE_PARAGRAPH.after}
            </p>

            <aside className="about-contact" aria-labelledby="about-contact-title">
              <h2 id="about-contact-title">{ABOUT_CONTACT_HEADING}</h2>
              <p>{ABOUT_CONTACT_OFFICE} | Tel: <a href={COMPANY.phoneHref}>{COMPANY.phone}</a></p>
              <div className="button-row about-contact-actions">
                <Link className="button button-orange" href="#lien-he">Tư vấn ngay</Link>
                <a className="button button-blue" href={COMPANY.hotlineHref}>Gọi {COMPANY.hotline}</a>
              </div>
            </aside>
          </div>
        </article>
        <ContactSection />
      </main>
      <Footer />
      <QuickContact />
    </>
  );
}
