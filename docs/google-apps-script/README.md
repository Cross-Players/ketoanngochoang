# Biểu mẫu tư vấn → Google Sheet

Website là bản static export (GitHub Pages) nên không có máy chủ riêng. Biểu mẫu "Gửi yêu cầu tư vấn"
gửi thẳng từ trình duyệt tới một Google Apps Script Web App; script ghi mỗi yêu cầu thành một dòng trong Google Sheet.

## Dữ liệu gửi đi

`POST` dạng `application/x-www-form-urlencoded` với các trường:

| Trường | Nội dung |
|---|---|
| `name` | Tên khách hàng |
| `phone` | Số điện thoại hoặc Zalo |
| `message` | Nội dung cần tư vấn |
| `page` | URL trang khách gửi biểu mẫu |
| `website` | Bẫy spam (ô ẩn) – người thật luôn để trống; có giá trị thì script bỏ qua |

Sheet `LienHe` (script tự tạo nếu chưa có) gồm các cột: **Thời gian | Họ tên | SĐT/Zalo | Nội dung | Trang**.

## Cài đặt (một lần)

1. Tạo một Google Sheet mới (ví dụ "Ngọc Hoàng – Yêu cầu tư vấn").
2. Trong Sheet: **Tiện ích mở rộng → Apps Script**. Xóa code mẫu, dán toàn bộ nội dung `contact-form.gs`, bấm Lưu.
3. **Triển khai → Tùy chọn triển khai mới** → loại **Ứng dụng web**:
   - *Thực thi dưới dạng*: **Tôi** (tài khoản sở hữu Sheet)
   - *Người có quyền truy cập*: **Bất kỳ ai**
4. Cấp quyền khi được hỏi, sao chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/…/exec`).
5. Khai báo URL cho website:
   - GitHub: **Settings → Secrets and variables → Actions → Variables → New repository variable**,
     tên `CONTACT_FORM_ENDPOINT`, giá trị là URL ở bước 4. Workflow `deploy.yml` truyền biến này vào
     `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` khi build; chạy lại workflow để áp dụng.
   - Chạy thử ở máy: tạo `.env.local` (không commit) với `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=<URL>` rồi `npm run dev`.

Khi sửa `contact-form.gs`, cần **Triển khai → Quản lý triển khai → Chỉnh sửa → Phiên bản mới** thì URL cũ mới chạy code mới.

## Hoạt động của website

- Chưa có `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` (hoặc không phải URL `https`): biểu mẫu chạy chế độ trình diễn,
  chỉ hiện thông báo, không gửi dữ liệu.
- Có URL: kiểm tra tên, số điện thoại, nội dung (thông báo lỗi tiếng Việt), hiện "Đang gửi…", rồi báo thành công hoặc lỗi.
- Request dùng `mode: "no-cors"` (Apps Script không trả header CORS), nên trình duyệt không đọc được phản hồi:
  request tới được Google là coi như đã gửi; chỉ lỗi mạng mới báo lỗi. Hãy kiểm tra Sheet sau lần gửi thử đầu tiên.
- URL Web App nằm trong mã JavaScript công khai của website – đó là điều bình thường với cách làm này;
  bẫy spam `website` lọc bớt bot đơn giản.
