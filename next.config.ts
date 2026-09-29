import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { PUBLIC_BASE_PATH } from "./lib/site-paths";

export default function nextConfig(phase: string): NextConfig {
  const config: NextConfig = {
    output: "export",
    basePath: PUBLIC_BASE_PATH,
    // Mỗi route xuất thành thư mục/index.html (vd. /gioi-thieu/) để GitHub Pages phục vụ ổn định.
    trailingSlash: true,
  };

  // Chỉ khi chạy `npm run dev`: mở gốc http://127.0.0.1:4173/ sẽ tự chuyển sang /ngochoangbhxh/
  // thay vì trang 404. Không áp dụng cho `next build` (output: "export" không hỗ trợ redirects),
  // nên bản static export / GitHub Pages không đổi.
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    config.redirects = async () => [
      {
        source: "/",
        destination: `${PUBLIC_BASE_PATH}/`,
        basePath: false,
        permanent: false,
      },
    ];
  }

  return config;
}
