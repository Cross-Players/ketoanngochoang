import type { ReactNode } from "react";

/**
 * Tiêu đề section dùng chung (H2 căn giữa, hai vạch mảnh hai bên: —— TIÊU ĐỀ ——).
 * Kiểu nằm ở `.section-title` trong globals.css; RevealOnScroll nhận `.section-title` để chữ nổi lên rồi vạch vẽ ra ngoài
 * (cần lớp con `.section-title-text`). Không dùng cho H1 banner, tiêu đề thẻ/khung hay tiêu đề phụ.
 */
export function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 className="section-title" id={id}>
      <span className="section-title-text">{children}</span>
    </h2>
  );
}
