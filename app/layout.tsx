import type { Metadata } from "next";
import localFont from "next/font/local";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SmoothScroll } from "@/components/SmoothScroll";
import { COMPANY } from "@/data/site";
import { PAGE_DESCRIPTION, PAGE_TITLE } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "lenis/dist/lenis.css";
import "./globals.css";

const quicksand = localFont({
  src: "../public/assets/6xKtdSZaM9iE8KbpRA_hK1QN-21dc8b9f.woff2",
  variable: "--font-quicksand",
  display: "swap",
  weight: "300 700",
});

const siteUrl = getSiteUrl();
const siteUrlString = siteUrl?.toString();
const pageTitle = PAGE_TITLE;
const pageDescription = PAGE_DESCRIPTION;
const socialImage = siteUrlString ? `${siteUrlString}og-ngoc-hoang.png` : undefined;
const socialImageAlt = "Công ty TNHH Tư vấn & Dịch vụ Ngọc Hoàng – dịch vụ BHXH, BHYT và kế toán thuế tại Đà Nẵng";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: pageTitle,
    template: "%s | Ngọc Hoàng",
  },
  description: pageDescription,
  applicationName: COMPANY.shortName,
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  alternates: siteUrlString ? { canonical: siteUrlString } : undefined,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: COMPANY.name,
    title: pageTitle,
    description: pageDescription,
    ...(siteUrlString
      ? {
          url: siteUrlString,
          images: [{ url: socialImage!, width: 1200, height: 630, alt: socialImageAlt }],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    ...(socialImage ? { images: [{ url: socialImage, alt: socialImageAlt }] } : {}),
  },
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

const MOTION_BOOTSTRAP =
  "try{if(window.matchMedia&&matchMedia('(prefers-reduced-motion: no-preference)').matches&&'IntersectionObserver'in window)document.documentElement.classList.add('m-js')}catch(e){}";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Bật chế độ chuyển động TRƯỚC lần vẽ đầu (tránh nháy); không JS / reduced-motion → không gắn, trang hiện tĩnh. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOTSTRAP }} />
      </head>
      <body className={quicksand.variable}>
        <a className="skip-link" href="#main">Bỏ qua điều hướng</a>
        {children}
        <RevealOnScroll />
        <SmoothScroll />
      </body>
    </html>
  );
}
