# NGỌC HOÀNG — trang tư vấn doanh nghiệp

Trang giới thiệu Công ty TNHH Tư vấn & Dịch vụ Ngọc Hoàng trên Next.js App Router và TypeScript. Các section lớn nằm riêng trong `components/`, dữ liệu nội dung tĩnh có kiểu nằm trong `data/site.ts`, route trang chủ tại `app/page.tsx`, trang Giới thiệu tại `app/gioi-thieu/page.tsx` (nội dung nguyên văn từ tài liệu Word của khách hàng, lưu trong `data/about.ts`) và giao diện trong `app/globals.css`. Menu Dịch vụ (mega menu) lấy danh sách từ `subServices` của từng mục trong `SERVICES` (`data/site.ts`); ba dòng đầu cũng hiển thị trên thẻ dịch vụ ở trang chủ. Logo hiển thị trên trang là `public/logo-ngoc-hoang-256.png` (bản 512px `public/logo-ngoc-hoang-512.png` dùng cho JSON-LD; vector gốc đã tối ưu vẫn ở `public/logo-ngoc-hoang.svg`); ảnh hero là `public/logo-hero.webp` (bản JPEG `public/logo.jpg` giữ lại làm dự phòng); ảnh chia sẻ mạng xã hội là `public/og-ngoc-hoang.png`. Nội dung FAQ nằm trong `FAQ_ITEMS` của `data/site.ts` và được dùng chung cho phần hiển thị lẫn JSON-LD FAQPage, nên chỉ cần sửa một nơi. Ảnh dịch vụ và font Quicksand còn lại được phục vụ từ `public/assets/`.

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

Logo Ngọc Hoàng tại `public/logo-ngoc-hoang-256.png`/`-512.png` (vector: `public/logo-ngoc-hoang.svg`) và ảnh hero tại `public/logo-hero.webp`; ảnh dịch vụ và font Quicksand còn lại nằm tại `public/assets/`. Bản demo không cấu hình dịch vụ backend hoặc API ngoài.

## URL công khai và SEO

GitHub Actions xây dựng bản static export bằng `npm ci` và `npm run build`, sau đó triển khai thư mục `out/` lên GitHub Pages mỗi khi có cập nhật vào nhánh `main` (hoặc chạy thủ công từ tab Actions). Đường dẫn project site được cấu hình là `/ngochoangbhxh/` (bật `trailingSlash`, nên mỗi route xuất thành `thư-mục/index.html`); workflow đặt `NEXT_PUBLIC_SITE_URL` thành `https://tiendat11.github.io/ngochoangbhxh/` khi build. Thay đổi URL công khai cần build lại.
Chỉ chấp nhận URL HTTPS đầy đủ gồm origin và đường dẫn Pages chính xác `/ngochoangbhxh/`, không có query hay fragment. Sau khi triển khai, xác minh canonical và `og:url` trỏ tới trang chủ; ảnh chia sẻ `/ngochoangbhxh/og-ngoc-hoang.png` tải được; sitemap liệt kê trang chủ và `/gioi-thieu/` (kèm `lastModified` lấy từ `CONTENT_UPDATED_AT` trong `data/site.ts`, cập nhật ngày này khi đổi nội dung); và robots trỏ tới sitemap. Sitemap và robots cần URL công khai hợp lệ trong lúc build.

SEO kỹ thuật không bảo đảm vị trí xếp hạng cụ thể hoặc hạng #1 trên công cụ tìm kiếm.

Hai liên hệ nhanh cố định ở góc trái dưới màn hình là Zalo và số hotline 0963 548 333. Biểu mẫu tư vấn chỉ hiển thị xác nhận trên trình duyệt; không gửi hoặc lưu thông tin.

