import type { Metadata } from "next";
import { COMPANY, type FaqItem } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Cấu hình SEO tập trung. Mọi URL tuyệt đối (canonical, og:url, JSON-LD) dựng từ NEXT_PUBLIC_SITE_URL
 * (lib/site-url.ts), nên khi chuyển sang tên miền .vn chỉ cần đổi cấu hình, không sửa trang.
 */
export const TITLE_TEMPLATE = `%s | ${COMPANY.shortName}`;
export const PAGE_TITLE = "Kế toán thuế, thành lập doanh nghiệp Đà Nẵng | Ngọc Hoàng";
export const PAGE_DESCRIPTION =
  "Ngọc Hoàng (Đà Nẵng): kế toán thuế trọn gói, thành lập & thay đổi doanh nghiệp, tính lương cho doanh nghiệp nhỏ. Báo giá trước khi làm. Gọi 0963 548 333.";

const SOCIAL_IMAGE = {
  path: "og-ngoc-hoang.png",
  width: 1200,
  height: 630,
  alt: "Công ty TNHH Tư vấn & Dịch vụ Ngọc Hoàng – kế toán thuế và thành lập doanh nghiệp tại Đà Nẵng",
} as const;

/** `path` tương đối, không có "/" đầu (vd. "gioi-thieu/"); "" là trang chủ. Không có URL công khai → undefined. */
export function absoluteUrl(path = ""): string | undefined {
  const siteUrl = getSiteUrl();
  return siteUrl ? new URL(path, siteUrl).toString() : undefined;
}

/** Đổi route nội bộ ("/", "/gioi-thieu/", "/#dich-vu") thành đường dẫn tương đối cho absoluteUrl. */
export function routeToPath(route: string): string {
  return route.replace(/^\//, "");
}

interface PageMetadataInput {
  /** Đường dẫn tương đối không có "/" đầu; "" là trang chủ. */
  path: string;
  /** Title ngắn – layout tự thêm " | Ngọc Hoàng" (trừ khi `absoluteTitle`). */
  title: string;
  description: string;
  type?: "website" | "article";
  /** Dùng nguyên văn `title` (trang chủ đã có thương hiệu trong title). */
  absoluteTitle?: boolean;
}

/** Metadata riêng cho từng trang: title, description, canonical, Open Graph, Twitter. */
export function pageMetadata({ path, title, description, type = "website", absoluteTitle = false }: PageMetadataInput): Metadata {
  const pageUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(SOCIAL_IMAGE.path);
  const fullTitle = absoluteTitle ? title : TITLE_TEMPLATE.replace("%s", title);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: pageUrl ? { canonical: pageUrl } : undefined,
    openGraph: {
      type,
      locale: "vi_VN",
      siteName: COMPANY.name,
      title: fullTitle,
      description,
      ...(pageUrl && imageUrl
        ? { url: pageUrl, images: [{ url: imageUrl, width: SOCIAL_IMAGE.width, height: SOCIAL_IMAGE.height, alt: SOCIAL_IMAGE.alt }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(imageUrl ? { images: [{ url: imageUrl, alt: SOCIAL_IMAGE.alt }] } : {}),
    },
  };
}

/* ---------- JSON-LD (schema.org) ---------- */

export type JsonLdNode = Record<string, unknown>;

/** JSON.stringify an toàn để nhúng vào <script> (theo hướng dẫn JSON-LD của Next.js). */
export function serializeJsonLd(nodes: readonly JsonLdNode[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes })
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: COMPANY.street,
  addressLocality: COMPANY.ward,
  addressRegion: COMPANY.region,
  addressCountry: "VN",
} as const;

export const AREA_SERVED = { "@type": "City", name: COMPANY.region } as const;

export function organizationId(): string | undefined {
  const home = absoluteUrl();
  return home ? `${home}#organization` : undefined;
}

/** Tham chiếu ngắn tới doanh nghiệp (đầy đủ ở trang chủ) – dùng làm `provider` của Service. */
export function organizationRef(): JsonLdNode {
  const id = organizationId();
  return {
    "@type": "ProfessionalService",
    ...(id ? { "@id": id, url: absoluteUrl() } : {}),
    name: COMPANY.name,
    telephone: COMPANY.phoneE164,
    address: postalAddress,
  };
}

/** Nút doanh nghiệp đầy đủ (ProfessionalService là một LocalBusiness/Organization) cho trang chủ. */
export function organizationNode(extra: JsonLdNode): JsonLdNode {
  const home = absoluteUrl();
  return {
    ...organizationRef(),
    alternateName: COMPANY.shortName,
    legalName: COMPANY.name,
    description: PAGE_DESCRIPTION,
    taxID: COMPANY.taxId,
    foundingDate: COMPANY.foundingDate,
    ...(home
      ? {
          logo: { "@type": "ImageObject", url: absoluteUrl("logo-ngoc-hoang-512.png"), width: 512, height: 512 },
          image: [absoluteUrl(SOCIAL_IMAGE.path), absoluteUrl("logo-hero.webp")],
        }
      : {}),
    areaServed: AREA_SERVED,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY.phoneE164,
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: ["vi"],
    },
    ...extra,
  };
}

export function websiteNode(): JsonLdNode | undefined {
  const home = absoluteUrl();
  if (!home) return undefined;
  return {
    "@type": "WebSite",
    "@id": `${home}#website`,
    url: home,
    name: COMPANY.shortName,
    alternateName: COMPANY.name,
    inLanguage: "vi-VN",
    publisher: { "@id": organizationId() },
  };
}

export interface BreadcrumbItem {
  label: string;
  /** Route nội bộ; bỏ trống ở mục cuối (trang hiện tại) – khi đó dùng `currentPath`. */
  href?: string;
}

export function breadcrumbNode(items: readonly BreadcrumbItem[], currentPath: string): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const url = absoluteUrl(item.href ? routeToPath(item.href) : currentPath);
      return { "@type": "ListItem", position: index + 1, name: item.label, ...(url ? { item: url } : {}) };
    }),
  };
}

/** FAQPage cho khối hỏi đáp; `anchor` là id của khối trên trang. */
export function faqPageNode(items: readonly FaqItem[], path: string, anchor: string): JsonLdNode {
  const url = absoluteUrl(`${path}#${anchor}`);
  return {
    "@type": "FAQPage",
    ...(url ? { "@id": url, url } : {}),
    inLanguage: "vi-VN",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
