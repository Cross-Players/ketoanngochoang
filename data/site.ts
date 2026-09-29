export interface NavigationLink {
  label: string;
  href: string;
  /** Hiển thị dạng nút cam nổi bật trên thanh menu. */
  cta?: boolean;
}
export interface Service {
  /** Anchor id of the card on the home page (used by the Dịch vụ mega menu). */
  slug: string;
  /** Tên nhóm – dùng chung cho cột mega menu, tiêu đề thẻ dịch vụ trang chủ và JSON-LD. */
  title: string;
  image: string;
  alt: string;
  /**
   * Danh sách dịch vụ con – NGUỒN DỮ LIỆU DUY NHẤT cho mega menu Dịch vụ, thẻ dịch vụ trang chủ
   * (3 mục đầu) và JSON-LD. Sửa ở đây là đồng bộ mọi nơi.
   */
  subServices: readonly string[];
}

export interface Benefit {
  title: string;
  description: string;
}


export interface WorkflowStep {
  /** Đoạn đường dẫn trang chi tiết: "/{slug}/". */
  slug: string;
  title: string;
  /** Mô tả ngắn trên thẻ trang chủ; cũng là đoạn mở đầu (in đậm) của trang chi tiết. */
  description: string;
  /**
   * Nội dung trang chi tiết – BẢN NHÁP chờ khách hàng duyệt. Chỉ diễn đạt lại mô tả thẻ và các thông tin
   * đã có trên website (dịch vụ, liên hệ, câu hỏi thường gặp); không có số liệu, thời hạn hay cam kết mới.
   */
  body: readonly string[];
  /** Icon bước (đã tách khỏi ảnh thẻ cũ quy-trinh-0x.jpg) – canh giữa vùng trắng của thẻ. */
  image: string;
  alt: string;
}

export interface NewsItem {
  title: string;
  image: string;
  alt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const COMPANY = {
  name: "CÔNG TY TNHH TƯ VẤN & DỊCH VỤ NGỌC HOÀNG",
  /** Chữ thương hiệu cạnh logo trên header, tách 2 dòng (ghép lại đúng bằng `name`). */
  wordmark: ["CÔNG TY TNHH TƯ VẤN & DỊCH VỤ", "NGỌC HOÀNG"],
  shortName: "Ngọc Hoàng",
  taxId: "0402357190",
  foundingDate: "2026-09-21",
  street: "Thôn Phú Hòa",
  ward: "Xã Bà Nà",
  region: "Đà Nẵng",
  address: "Thôn Phú Hòa, xã Bà Nà",
  city: "Thành phố Đà Nẵng",
  phoneE164: "+84963548333",
  phone: "0963 548 333",
  phoneHref: "tel:+84963548333",
  hotline: "0963 548 333",
  hotlineHref: "tel:+84963548333",
  zaloHref: "https://zalo.me/0963548333",
  email: "",
} as const;

/** Ngày cập nhật nội dung gần nhất, dùng cho lastModified trong sitemap. */
export const CONTENT_UPDATED_AT = "2026-09-29";

/** Internal routes (Next.js adds the GitHub Pages basePath automatically). */
export const ROUTES = {
  home: "/",
  about: "/gioi-thieu/",
  services: "/#dich-vu",
  contact: "/#lien-he",
  /** Trang chi tiết một bước quy trình, vd. ROUTES.workflow("tiep-nhan-thong-tin") → "/tiep-nhan-thong-tin/". */
  workflow: (slug: string) => `/${slug}/`,
} as const;

export const NAVIGATION: readonly NavigationLink[] = [
  { label: "Trang chủ", href: ROUTES.home },
  { label: "Giới thiệu", href: ROUTES.about },
  { label: "Dịch vụ", href: ROUTES.services },
  // Nút CTA dẫn thẳng tới form tư vấn (trước đây nhảy tới dải CTA xanh, gây hiểu nhầm).
  { label: "Tư Vấn Lập Công Ty", href: ROUTES.contact, cta: true },
  { label: "Chia sẻ", href: "/#co-hoi-moi" },
  { label: "Hỏi đáp", href: "/#faq" },
  { label: "Liên hệ", href: ROUTES.contact },
];

export const SERVICES: readonly Service[] = [
  {
    slug: "dv-phap-ly",
    title: "Pháp lý doanh nghiệp",
    image: "/assets/company-300x300-57c03f3f.png",
    alt: "Biểu tượng tòa nhà văn phòng – dịch vụ thành lập doanh nghiệp tại Đà Nẵng",
    subServices: [
      "Thành lập doanh nghiệp trong nước",
      "Thành lập chi nhánh, văn phòng đại diện, đơn vị phụ thuộc",
      "Thay đổi giấy phép kinh doanh",
      "Tạm ngưng hoạt động",
      "Giải thể doanh nghiệp",
    ],
  },
  {
    slug: "dv-thue",
    title: "Dịch vụ thuế",
    image: "/assets/tax-300x300-ca352e40.png",
    alt: "Biểu tượng tờ khai thuế – dịch vụ kê khai và quyết toán thuế",
    subServices: [
      "Dịch vụ kê khai thuế",
      "Rà soát tính tuân thủ pháp luật thuế",
      "Quyết toán thuế cuối năm cho doanh nghiệp",
      "Quyết toán thuế TNCN",
    ],
  },
  {
    slug: "dv-ke-toan",
    title: "Dịch vụ kế toán",
    image: "/assets/accounting-300x300-2b340415.png",
    alt: "Biểu tượng máy tính tiền và bút – dịch vụ kế toán trọn gói",
    subServices: [
      "Dịch vụ kế toán trọn gói",
      "Tư vấn, thiết lập hệ thống kế toán",
      "Kiểm tra, hoàn thiện sổ sách kế toán",
      "Lập báo cáo tài chính cuối năm",
      "Đánh giá nhanh BCTC, quyết toán cuối năm",
      "Dịch vụ lập hoá đơn GTGT",
    ],
  },
  {
    slug: "dv-nhan-su",
    title: "Nhân sự & tiền lương",
    image: "/assets/accounting-1-300x300-32be194d.png",
    alt: "Biểu tượng nhân viên tính lương – dịch vụ nhân sự và tiền lương",
    subServices: [
      "Dịch vụ nhân sự ban đầu",
      "Dịch vụ tính lương",
      "Theo dõi trích nộp thuế TNCN",
      "Theo dõi trích nộp BHXH, BHYT, BHTN cho người lao động",
    ],
  },
  {
    slug: "dv-ho-tro",
    title: "Dịch vụ khác",
    image: "/assets/tax-1-300x300-9799d5c8.png",
    alt: "Biểu tượng phong bì hóa đơn – chữ ký số, hóa đơn điện tử cho doanh nghiệp",
    subServices: [
      "Chữ ký số, hóa đơn điện tử (đối tác Viettel)",
      "Bảng hiệu và dấu tên",
      "Thành lập tài khoản ngân hàng số đẹp (đối tác Techcombank)",
    ],
  },
];

export const BENEFITS: readonly Benefit[] = [
  {
    title: "Tận tâm với từng hồ sơ",
    description: "Lắng nghe nhu cầu của từng cá nhân, hộ gia đình và doanh nghiệp, giải thích rõ các bước thủ tục trước khi thực hiện.",
  },
  {
    title: "Am hiểu thuế, kế toán và thủ tục doanh nghiệp",
    description: "Đội ngũ tư vấn am hiểu thuế, kế toán và thủ tục doanh nghiệp, hướng dẫn hồ sơ theo quy định hiện hành.",
  },
  {
    title: "Báo giá rõ ràng trước khi làm",
    description: "Phạm vi công việc và chi phí được thống nhất với khách hàng trước khi thực hiện.",
  },
  {
    title: "Minh bạch và tuân thủ pháp luật",
    description: "Làm việc đúng quy định, bảo mật thông tin khách hàng và chịu trách nhiệm với phần việc Ngọc Hoàng đảm nhận.",
  },
  {
    title: "Theo dõi quy định mới",
    description: "Thường xuyên cập nhật thay đổi về thuế và kế toán để tư vấn kịp thời.",
  },
  {
    title: "Gần gũi, dễ liên hệ",
    description: "Hỗ trợ khách hàng tại Đà Nẵng qua điện thoại và Zalo 0963 548 333.",
  },
];


export const WORKFLOW_STEPS: readonly WorkflowStep[] = [
  {
    slug: "tiep-nhan-thong-tin",
    title: "TIẾP NHẬN THÔNG TIN",
    description:
      "Lắng nghe nhu cầu, khó khăn và thông tin doanh nghiệp để xác định nội dung cần tư vấn.",
    body: [
      "Bạn có thể liên hệ Ngọc Hoàng qua điện thoại, Zalo hoặc gửi yêu cầu tư vấn ngay trên website.",
      "Hồ sơ cần chuẩn bị tùy thuộc vào từng thủ tục. Ngọc Hoàng sẽ gửi danh sách hồ sơ cụ thể sau khi nắm rõ trường hợp của bạn.",
    ],
    image: "/assets/workflow/step-01.png",
    alt: "Bước 01 – tiếp nhận thông tin và nhu cầu của khách hàng",
  },
  {
    slug: "tien-hanh-xu-ly",
    title: "TIẾN HÀNH XỬ LÝ",
    description:
      "Thực hiện công việc theo quy trình dịch vụ, tuân thủ quy định pháp luật liên quan.",
    body: [
      "Phạm vi công việc và chi phí được thống nhất với bạn trước khi thực hiện.",
      "Ngọc Hoàng xử lý hồ sơ theo đúng phạm vi đã trao đổi, trong các mảng pháp lý doanh nghiệp, thuế, kế toán, nhân sự & tiền lương và các dịch vụ khác.",
    ],
    image: "/assets/workflow/step-02.png",
    alt: "Bước 02 – đội ngũ Ngọc Hoàng tiến hành xử lý hồ sơ",
  },
  {
    slug: "cap-nhat-tien-do",
    title: "CẬP NHẬT TIẾN ĐỘ",
    description:
      "Phản hồi tiến độ xử lý và chủ động trao đổi khi khách hàng cần được tư vấn.",
    body: [
      "Trong quá trình xử lý, bạn có thể hỏi tình trạng hồ sơ qua điện thoại hoặc Zalo.",
      "Khi có thông tin cần bổ sung hoặc cần bạn quyết định, Ngọc Hoàng sẽ trao đổi để bạn nắm rõ trước khi làm tiếp.",
    ],
    image: "/assets/workflow/step-03.png",
    alt: "Bước 03 – cập nhật tiến độ xử lý cho khách hàng",
  },
  {
    slug: "hoan-tra-ho-so",
    title: "HOÀN TRẢ HỒ SƠ",
    description:
      "Bàn giao hồ sơ để khách hàng lưu trữ sau khi hoàn thành công việc.",
    body: [
      "Hồ sơ được bàn giao lại để bạn lưu trữ.",
      "Nếu cần hỗ trợ thêm các thủ tục khác, bạn có thể tiếp tục liên hệ Ngọc Hoàng qua điện thoại hoặc Zalo.",
    ],
    image: "/assets/workflow/step-04.png",
    alt: "Bước 04 – bàn giao, hoàn trả hồ sơ cho khách hàng",
  },
];

export const NEWS_ITEMS: readonly NewsItem[] = [
  {
    title: "Loại hình Công ty TNHH một thành viên",
    image: "/assets/tnhh-mtv-500x281-9062b88d.jpg",
    alt: "Tòa nhà văn phòng – minh họa bài viết về công ty TNHH một thành viên",
  },
  {
    title: "Quy định về hưởng chế độ ốm đau đối với người lao động",
    image: "/assets/che-do-om-dau-500x281-49bc54a6.jpg",
    alt: "Người lao động bị ốm tại văn phòng – minh họa chế độ ốm đau",
  },
  {
    title: "Quy định về trợ cấp mất việc làm",
    image: "/assets/tro-cap-mat-viec-500x281-74822570.jpg",
    alt: "Ký văn bản chấm dứt hợp đồng – minh họa trợ cấp mất việc làm",
  },
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "Ngọc Hoàng cung cấp những dịch vụ nào?",
    answer:
      "Ngọc Hoàng hỗ trợ kế toán và thuế, pháp lý doanh nghiệp (thành lập, thay đổi giấy phép kinh doanh, tạm ngưng hoạt động, giải thể), nhân sự & tiền lương, cùng các dịch vụ khác như chữ ký số, hóa đơn điện tử, bảng hiệu và dấu tên. Mỗi nhóm dịch vụ có trang giới thiệu riêng trong mục Dịch vụ.",
  },
  {
    question: "Ngọc Hoàng phục vụ cá nhân hay doanh nghiệp?",
    answer:
      "Ngọc Hoàng tư vấn cho cả cá nhân, hộ gia đình và doanh nghiệp.",
  },
  {
    question: "Ngọc Hoàng hỗ trợ khách hàng ở khu vực nào?",
    answer:
      "Ngọc Hoàng có địa chỉ tại Thôn Phú Hòa, xã Bà Nà, thành phố Đà Nẵng và hỗ trợ khách hàng trên địa bàn Đà Nẵng. Bạn có thể trao đổi trước qua điện thoại hoặc Zalo 0963 548 333.",
  },
  {
    question: "Chi phí dịch vụ được tính như thế nào?",
    answer:
      "Chi phí phụ thuộc vào loại thủ tục và số lượng hồ sơ. Vui lòng gọi hoặc nhắn Zalo 0963 548 333 để được tư vấn và báo giá trước khi thực hiện.",
  },
];

export const FOOTER_LINK_GROUPS = [
  {
    title: "Dịch vụ",
    links: [
      ["Tư vấn thành lập doanh nghiệp", "/#dv-phap-ly"],
      ["Dịch vụ Thuế", "/#dv-thue"],
      ["Dịch vụ Kế toán", "/#dv-ke-toan"],
      ["Dịch vụ Nhân sự", "/#dv-nhan-su"],
      ["Dịch vụ Pháp lý", "/#dv-phap-ly"],
    ],
  },
  {
    title: "Tin tức",
    links: [
      ["Giới thiệu Ngọc Hoàng", "/gioi-thieu/"],
      ["Câu hỏi thường gặp", "/#faq"],
      ["Liên hệ Ngọc Hoàng", "/#lien-he"],
    ],
  },
] as const;
