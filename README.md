# NGỌC HOÀNG — trang tư vấn doanh nghiệp

Trang giới thiệu Công ty TNHH Tư vấn & Dịch vụ Ngọc Hoàng trên Next.js App Router và TypeScript. Các section lớn nằm riêng trong `components/`, dữ liệu nội dung tĩnh có kiểu nằm trong `data/site.ts`, route trang chủ tại `app/page.tsx`, trang Giới thiệu tại `app/gioi-thieu/page.tsx`, các trang chi tiết (6 trang dịch vụ + 4 bước quy trình) dùng chung một route `app/[slug]/page.tsx` (nội dung nguyên văn từ tài liệu Word của khách hàng, lưu trong `data/about.ts`) và giao diện trong `app/globals.css`. Menu Dịch vụ (mega menu) lấy danh sách từ `subServices` của từng mục trong `SERVICES` (`data/site.ts`); ba dòng đầu cũng hiển thị trên thẻ dịch vụ ở trang chủ. Mỗi nhóm có `href` tới trang chi tiết, mỗi mục con liên kết theo `SERVICE_ITEM_LINKS` (thiếu liên kết thì build báo lỗi). Nội dung 6 trang dịch vụ nằm trong `data/services.ts` (một module có kiểu, kèm quy tắc nội dung ở đầu file), hiển thị bằng template `components/ServiceDetailPage.tsx`. Logo hiển thị trên trang là `public/logo-ngoc-hoang-256.png` (bản 512px `public/logo-ngoc-hoang-512.png` dùng cho JSON-LD; vector gốc đã tối ưu vẫn ở `public/logo-ngoc-hoang.svg`); ảnh hero là `public/logo-hero.webp` (bản JPEG `public/logo.jpg` giữ lại làm dự phòng); ảnh chia sẻ mạng xã hội là `public/og-ngoc-hoang.png`. Nội dung FAQ nằm trong `FAQ_ITEMS` của `data/site.ts` (trang dịch vụ: trường `faq` trong `data/services.ts`) và được dùng chung cho phần hiển thị lẫn JSON-LD FAQPage, nên chỉ cần sửa một nơi. Ảnh dịch vụ và font Quicksand còn lại được phục vụ từ `public/assets/`.

Repo công khai: [TienDat11/ngochoangbhxh](https://github.com/TienDat11/ngochoangbhxh). Bản xem trước: [tiendat11.github.io/ngochoangbhxh](https://tiendat11.github.io/ngochoangbhxh/).

## Yêu cầu

- Node.js 20.9 trở lên (khuyến nghị Node.js 24)
- npm 10 trở lên

## Chạy local

```sh
npm install
npm run dev
```

- Mở `http://127.0.0.1:4173/` để chạy bản phát triển bằng Next.js 16 (Turbopack mặc định).
- Để xem bản static export, chạy `npm run build` rồi phục vụ thư mục `out/` bằng một máy chủ tệp tĩnh (không dùng `next start` với `output: "export"`).

## Tài nguyên

Logo Ngọc Hoàng tại `public/logo-ngoc-hoang-256.png`/`-512.png` (vector: `public/logo-ngoc-hoang.svg`) và ảnh hero tại `public/logo-hero.webp`; ảnh dịch vụ và font Quicksand còn lại nằm tại `public/assets/`. `public/google3db2e7de2c792d70.html` là file xác minh quyền sở hữu Google Search Console, không được xoá hay sửa. Site không có backend; biểu mẫu tư vấn gửi tới Google Apps Script (xem bên dưới).

## URL công khai và SEO

GitHub Actions xây dựng bản static export bằng `npm ci` và `npm run build`, sau đó triển khai thư mục `out/` lên GitHub Pages mỗi khi có cập nhật vào nhánh `main` (hoặc chạy thủ công từ tab Actions). Đường dẫn project site được cấu hình là `/ngochoangbhxh/` (bật `trailingSlash`, nên mỗi route xuất thành `thư-mục/index.html`); workflow đặt `NEXT_PUBLIC_SITE_URL` thành `https://tiendat11.github.io/ngochoangbhxh/` khi build. Thay đổi URL công khai cần build lại.
Chỉ chấp nhận URL HTTPS đầy đủ gồm origin và đường dẫn Pages chính xác `/ngochoangbhxh/`, không có query hay fragment. Sau khi triển khai, xác minh canonical và `og:url` trỏ tới trang chủ; ảnh chia sẻ `/ngochoangbhxh/og-ngoc-hoang.png` tải được; sitemap liệt kê trang chủ, 6 trang dịch vụ, `/gioi-thieu/` và 4 trang quy trình (kèm `lastModified` lấy từ `CONTENT_UPDATED_AT` trong `data/site.ts`, cập nhật ngày này khi đổi nội dung); và robots trỏ tới sitemap. Sitemap và robots cần URL công khai hợp lệ trong lúc build.

SEO kỹ thuật không bảo đảm vị trí xếp hạng cụ thể hoặc hạng #1 trên công cụ tìm kiếm.

Cấu hình SEO tập trung tại `lib/seo.ts`: `pageMetadata()` (title theo mẫu "… | Ngọc Hoàng", description, canonical, Open Graph, Twitter cho từng trang) và các hàm dựng JSON-LD (doanh nghiệp `ProfessionalService` + `WebSite` + `FAQPage` ở trang chủ; `Service` + `FAQPage` ở trang dịch vụ; `BreadcrumbList` do `components/Breadcrumbs.tsx` sinh cùng breadcrumb hiển thị). Trang 404 tiếng Việt: `app/not-found.tsx` (xuất `out/404.html`).

### Chuyển sang tên miền riêng (.vn)

Mọi URL tuyệt đối lấy từ `NEXT_PUBLIC_SITE_URL`, nên không phải sửa trang. Khi có tên miền: (1) gắn custom domain vào chính repo GitHub Pages này (không đổi tên repo trước); (2) đặt `PUBLIC_BASE_PATH = ""` trong `lib/site-paths.ts` và `lib/site-url.ts` sẽ chấp nhận URL gốc; (3) đổi 3 đường dẫn `@font-face` `/ngochoangbhxh/assets/…` trong `app/globals.css`; (4) đổi `NEXT_PUBLIC_SITE_URL` trong `.github/workflows/deploy.yml` (và `.env.example`) thành `https://<tên-miền>/`; (5) build lại, kiểm tra canonical, sitemap, robots, ảnh chia sẻ; khai báo tên miền mới trong Google Search Console.

## Biểu mẫu tư vấn → Google Sheet

`components/ConsultationForm.tsx` + `lib/contact-form.ts` gửi `POST application/x-www-form-urlencoded` (các trường `name`, `phone`, `message`, `page`, `website` – bẫy spam) tới URL trong `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` (Google Apps Script Web App; workflow lấy từ repository variable `CONTACT_FORM_ENDPOINT`). Không có biến này thì biểu mẫu chỉ hiện thông báo trình diễn, không gửi dữ liệu. Code Apps Script và hướng dẫn cài đặt: `docs/google-apps-script/`. Xem `.env.example` cho các biến môi trường; không commit file `.env*` thật.

Hai liên hệ nhanh cố định ở góc trái dưới màn hình là Zalo và số hotline 0963 548 333.

