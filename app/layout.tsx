import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SmoothScroll } from "@/components/SmoothScroll";
import { COMPANY } from "@/data/site";
import { PAGE_DESCRIPTION, PAGE_TITLE, TITLE_TEMPLATE } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "lenis/dist/lenis.css";
import "./globals.css";

/**
 * Giá trị mặc định toàn site. Canonical, Open Graph và Twitter của từng trang do chính trang khai báo qua
 * pageMetadata() (lib/seo.ts) – layout không đặt canonical để trang nào quên khai báo cũng không trỏ nhầm về trang chủ.
 */
export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: PAGE_TITLE, template: TITLE_TEMPLATE },
  description: PAGE_DESCRIPTION,
  applicationName: COMPANY.shortName,
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main">Bỏ qua điều hướng</a>
        {children}
        <RevealOnScroll />
        <SmoothScroll />
      </body>
    </html>
  );
}
