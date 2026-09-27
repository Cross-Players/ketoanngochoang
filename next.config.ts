import type { NextConfig } from "next";
import { PUBLIC_BASE_PATH } from "./lib/site-paths";

const nextConfig: NextConfig = {
  output: "export",
  basePath: PUBLIC_BASE_PATH,
  // Mỗi route xuất thành thư mục/index.html (vd. /gioi-thieu/) để GitHub Pages phục vụ ổn định.
  trailingSlash: true,
};

export default nextConfig;
