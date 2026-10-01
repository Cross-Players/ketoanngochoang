import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { PUBLIC_BASE_PATH } from "./lib/site-paths";

export default function nextConfig(phase: string): NextConfig {
  const config: NextConfig = {
    output: "export",
    basePath: PUBLIC_BASE_PATH,
    // Mỗi route xuất thành thư mục/index.html (vd. /gioi-thieu/), canonical và sitemap đều dùng dấu "/" cuối.
    trailingSlash: true,
  };

  // Chỉ khi chạy `npm run dev` và có basePath: mở gốc http://127.0.0.1:4173/ sẽ tự chuyển sang basePath
  // thay vì trang 404. Bỏ qua khi site chạy ở gốc tên miền (basePath rỗng) để tránh vòng chuyển hướng.
  if (phase === PHASE_DEVELOPMENT_SERVER && PUBLIC_BASE_PATH) {
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
