import type { Metadata } from "next";
import { COMPANY } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

export const PAGE_TITLE = "Kế toán thuế, thành lập doanh nghiệp Đà Nẵng | Ngọc Hoàng";
export const PAGE_DESCRIPTION =
  "Ngọc Hoàng (Đà Nẵng): kế toán thuế trọn gói, thành lập & thay đổi doanh nghiệp, tính lương cho doanh nghiệp nhỏ. Báo giá trước khi làm. Gọi 0963 548 333.";

/**
 * Metadata riêng cho từng trang con: title (layout tự thêm " | Ngọc Hoàng"), description, canonical, Open Graph và
 * Twitter. Mọi URL tuyệt đối lấy từ NEXT_PUBLIC_SITE_URL (lib/site-url.ts) nên khi đổi tên miền chỉ cần đổi cấu hình.
 * `path` là đường dẫn tương đối không có "/" đầu, vd. "dich-vu-ke-toan-da-nang/".
 */
export function pageMetadata({
  path,
  title,
  description,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  const siteUrl = getSiteUrl();
  const pageUrl = siteUrl ? new URL(path, siteUrl).toString() : undefined;
  const image = siteUrl ? new URL("og-ngoc-hoang.png", siteUrl).toString() : undefined;
  const fullTitle = `${title} | ${COMPANY.shortName}`;
  return {
    title,
    description,
    alternates: pageUrl ? { canonical: pageUrl } : undefined,
    openGraph: {
      type,
      locale: "vi_VN",
      siteName: COMPANY.name,
      title: fullTitle,
      description,
      ...(pageUrl && image ? { url: pageUrl, images: [{ url: image, width: 1200, height: 630, alt: COMPANY.name }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [{ url: image, alt: COMPANY.name }] } : {}),
    },
  };
}
