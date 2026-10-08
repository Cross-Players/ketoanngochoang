/**
 * Nhân sự hiển thị ở trang Giới thiệu (/gioi-thieu/).
 * Họ tên, chức danh và slogan do khách hàng cung cấp (29/09/2026) – giữ nguyên văn, không thêm thông tin khác.
 * Ảnh: `public/staff/<photo>-{360,540,720}.webp` (khung 4:5 cắt quanh gương mặt từ ảnh gốc khách gửi).
 */
export type StaffMember = {
  readonly name: string;
  readonly title: string;
  readonly slogan: string;
  /** Tên tệp ảnh (không gồm hậu tố kích thước). */
  readonly photo: string;
};

/** Các bề rộng ảnh đã xuất (px), dùng cho srcSet. Tỉ lệ luôn 4:5. */
export const STAFF_PHOTO_WIDTHS = [360, 540, 720] as const;

export const STAFF: readonly StaffMember[] = [
  {
    name: "Lâm Tú Nhã",
    title: "Chuyên viên Dịch vụ kế toán",
    slogan: "Tỉ mỉ từng con số — Trọn vẹn một niềm tin",
    photo: "lam-tu-nha",
  },
  {
    name: "Trương Thị Ngọc Quyền",
    title: "Chuyên viên Dịch vụ kế toán",
    slogan: "Thấu hiểu sổ sách — Điểm tựa tài chính vững vàng",
    photo: "truong-thi-ngoc-quyen",
  },
  {
    name: "Lê Hồng Hạnh",
    title: "Chuyên viên Dịch vụ kế toán",
    slogan: "Tận tâm trong chuyên môn — Minh bạch trong giá trị",
    photo: "le-hong-hanh",
  },
];
