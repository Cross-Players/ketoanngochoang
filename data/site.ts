export interface NavigationLink {
  label: string;
  href: string;
  /** Hiển thị dạng nút cam nổi bật trên thanh menu. */
  cta?: boolean;
}
export interface Service {
  /** Anchor id of the card on the home page (used by the Dịch vụ mega menu). */
  slug: string;
  title: string;
  /** Short column heading used in the Dịch vụ mega menu. */
  menuTitle: string;
  image: string;
  alt: string;
  /** Full description of the service (used for JSON-LD). */
  items: readonly string[];
  /** Short sub-service labels (mega menu; the first three are shown on the home card). */
  subServices: readonly string[];
}

export interface Benefit {
  title: string;
  description: string;
}


export interface WorkflowStep {
  title: string;
  description: string;
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
  shortName: "Ngọc Hoàng",
  taxId: "0402357190",
  foundingDate: "2026-09-21",
  street: "Thôn Phước Khương",
  ward: "Xã Bà Nà",
  region: "Đà Nẵng",
  address: "Thôn Phước Khương, xã Bà Nà",
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
export const CONTENT_UPDATED_AT = "2026-09-27";

/** Internal routes (Next.js adds the GitHub Pages basePath automatically). */
export const ROUTES = {
  home: "/",
  about: "/gioi-thieu/",
  services: "/#dich-vu",
  contact: "/#lien-he",
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
    slug: "dv-bhxh",
    title: "DỊCH VỤ BẢO HIỂM XÃ HỘI",
    menuTitle: "Dịch vụ BHXH",
    image: "/assets/employee-300x300-b0d92d6c.png",
    alt: "Biểu tượng người lao động – dịch vụ BHXH và BHYT tại Đà Nẵng",
    items: [
      "Đăng ký tham gia, báo tăng, báo giảm lao động BHXH cho doanh nghiệp",
      "Hướng dẫn đăng ký đóng BHXH tự nguyện cho cá nhân",
      "Gia hạn, mua mới BHYT hộ gia đình",
      "Hướng dẫn hồ sơ hưởng các chế độ BHXH; điều chỉnh thông tin, cấp lại sổ BHXH",
    ],
    subServices: [
      "Báo tăng, báo giảm lao động BHXH cho doanh nghiệp",
      "Đăng ký đóng BHXH tự nguyện cho cá nhân",
      "Gia hạn, mua mới BHYT hộ gia đình",
      "Hồ sơ hưởng các chế độ BHXH",
      "Điều chỉnh thông tin, cấp lại sổ BHXH",
    ],
  },
  {
    slug: "dv-phap-ly",
    title: "DỊCH VỤ PHÁP LÝ DOANH NGHIỆP",
    menuTitle: "Pháp lý doanh nghiệp",
    image: "/assets/company-300x300-57c03f3f.png",
    alt: "Biểu tượng tòa nhà văn phòng – dịch vụ thành lập doanh nghiệp tại Đà Nẵng",
    items: [
      "Tư vấn thủ tục thành lập doanh nghiệp trong nước",
      "Thành lập chi nhánh, văn phòng đại diện và đơn vị phụ thuộc",
      "Thay đổi giấy phép kinh doanh; tạm ngưng hoạt động hoặc giải thể doanh nghiệp",
    ],
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
    title: "DỊCH VỤ THUẾ",
    menuTitle: "Dịch vụ thuế",
    image: "/assets/tax-300x300-ca352e40.png",
    alt: "Biểu tượng tờ khai thuế – dịch vụ kê khai và quyết toán thuế",
    items: [
      "Kê khai thuế",
      "Rà soát tính tuân thủ pháp luật thuế",
      "Quyết toán thuế cuối năm cho doanh nghiệp",
      "Quyết toán thuế thu nhập cá nhân (TNCN)",
    ],
    subServices: [
      "Kê khai thuế",
      "Rà soát tính tuân thủ pháp luật thuế",
      "Quyết toán thuế cuối năm cho doanh nghiệp",
      "Quyết toán thuế TNCN",
    ],
  },
  {
    slug: "dv-ke-toan",
    title: "DỊCH VỤ KẾ TOÁN",
    menuTitle: "Dịch vụ kế toán",
    image: "/assets/accounting-300x300-2b340415.png",
    alt: "Biểu tượng máy tính tiền và bút – dịch vụ kế toán thuế trọn gói",
    items: [
      "Kế toán thuế trọn gói; tư vấn, thiết lập hệ thống kế toán",
      "Kiểm tra, hoàn thiện sổ sách kế toán; lập báo cáo tài chính cuối năm; đánh giá nhanh báo cáo tài chính, quyết toán cuối năm và lập hóa đơn GTGT",
    ],
    subServices: [
      "Kế toán thuế trọn gói",
      "Tư vấn, thiết lập hệ thống kế toán",
      "Kiểm tra, hoàn thiện sổ sách kế toán",
      "Lập báo cáo tài chính cuối năm",
      "Đánh giá nhanh BCTC, quyết toán cuối năm",
      "Lập hóa đơn GTGT",
    ],
  },
  {
    slug: "dv-nhan-su",
    title: "DỊCH VỤ NHÂN SỰ & TIỀN LƯƠNG",
    menuTitle: "Nhân sự & tiền lương",
    image: "/assets/accounting-1-300x300-32be194d.png",
    alt: "Biểu tượng nhân viên tính lương – dịch vụ nhân sự và tiền lương",
    items: [
      "Dịch vụ nhân sự ban đầu cho doanh nghiệp mới thành lập",
      "Dịch vụ tính lương",
      "Theo dõi trích nộp BHXH, BHYT và thuế thu nhập cá nhân (TNCN)",
    ],
    subServices: [
      "Dịch vụ nhân sự ban đầu",
      "Dịch vụ tính lương",
      "Theo dõi trích nộp BHXH, BHYT, thuế TNCN",
    ],
  },
  {
    slug: "dv-ho-tro",
    title: "GIẢI PHÁP HỖ TRỢ DOANH NGHIỆP",
    menuTitle: "Dịch vụ khác",
    image: "/assets/tax-1-300x300-9799d5c8.png",
    alt: "Biểu tượng phong bì hóa đơn – chữ ký số, hóa đơn điện tử cho doanh nghiệp",
    items: [
      "Đại lý chữ ký số, hóa đơn điện tử và phần mềm kê khai BHXH (đối tác Viettel)",
      "Bảng hiệu và dấu tên",
      "Thành lập tài khoản ngân hàng số đẹp (đối tác Techcombank)",
    ],
    subServices: [
      "Chữ ký số, hóa đơn điện tử (đối tác Viettel)",
      "Phần mềm kê khai BHXH (đối tác Viettel)",
      "Bảng hiệu và dấu tên",
      "Tài khoản ngân hàng số đẹp (đối tác Techcombank)",
    ],
  },
];

export const BENEFITS: readonly Benefit[] = [
  {
    title: "Tận tâm với từng hồ sơ",
    description: "Lắng nghe nhu cầu của từng cá nhân, hộ gia đình và doanh nghiệp, giải thích rõ các bước thủ tục trước khi thực hiện.",
  },
  {
    title: "Am hiểu thủ tục BHXH và thuế",
    description: "Đội ngũ tư vấn am hiểu thủ tục BHXH, BHYT, thuế và kế toán, hướng dẫn hồ sơ theo quy định hiện hành.",
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
    description: "Thường xuyên cập nhật thay đổi về BHXH, BHYT, thuế và kế toán để tư vấn kịp thời.",
  },
  {
    title: "Gần gũi, dễ liên hệ",
    description: "Hỗ trợ khách hàng tại Đà Nẵng qua điện thoại và Zalo 0963 548 333.",
  },
];


export const WORKFLOW_STEPS: readonly WorkflowStep[] = [
  {
    title: "TIẾP NHẬN THÔNG TIN",
    description:
      "Lắng nghe nhu cầu, khó khăn và thông tin doanh nghiệp để xác định nội dung cần tư vấn.",
    image: "/assets/quy-trinh-01.jpg",
    alt: "Bước 01 – tiếp nhận thông tin và nhu cầu của khách hàng",
  },
  {
    title: "TIẾN HÀNH XỬ LÝ",
    description:
      "Thực hiện công việc theo quy trình dịch vụ, tuân thủ quy định pháp luật liên quan.",
    image: "/assets/quy-trinh-02.jpg",
    alt: "Bước 02 – đội ngũ Ngọc Hoàng tiến hành xử lý hồ sơ",
  },
  {
    title: "CẬP NHẬT TIẾN ĐỘ",
    description:
      "Phản hồi tiến độ xử lý và chủ động trao đổi khi khách hàng cần được tư vấn.",
    image: "/assets/quy-trinh-03.jpg",
    alt: "Bước 03 – cập nhật tiến độ xử lý cho khách hàng",
  },
  {
    title: "HOÀN TRẢ HỒ SƠ",
    description:
      "Bàn giao hồ sơ để khách hàng lưu trữ sau khi hoàn thành công việc.",
    image: "/assets/quy-trinh-04.jpg",
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
    alt: "Người lao động bị ốm tại văn phòng – minh họa chế độ ốm đau BHXH",
  },
  {
    title: "Quy định về trợ cấp mất việc làm",
    image: "/assets/tro-cap-mat-viec-500x281-74822570.jpg",
    alt: "Ký văn bản chấm dứt hợp đồng – minh họa trợ cấp mất việc làm",
  },
  {
    title: "Các khoản phụ cấp tính đóng và không tính đóng BHXH 2026",
    image: "/assets/pc-dong-bhxh-500x281-86540f91.jpg",
    alt: "Bàn tay che chở mô hình gia đình – minh họa phụ cấp tính đóng BHXH",
  },
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "Ngọc Hoàng hỗ trợ những thủ tục BHXH, BHYT nào tại Đà Nẵng?",
    answer:
      "Ngọc Hoàng hỗ trợ doanh nghiệp đăng ký tham gia, báo tăng, báo giảm lao động BHXH; hướng dẫn cá nhân đăng ký đóng BHXH tự nguyện; gia hạn, mua mới BHYT hộ gia đình; hướng dẫn hồ sơ hưởng các chế độ BHXH và thủ tục điều chỉnh thông tin, cấp lại sổ BHXH.",
  },
  {
    question: "Ngọc Hoàng phục vụ cá nhân hay doanh nghiệp?",
    answer:
      "Ngọc Hoàng tư vấn cho cả cá nhân, hộ gia đình và doanh nghiệp. Với doanh nghiệp, dịch vụ BHXH có thể kết hợp cùng thành lập doanh nghiệp, kế toán thuế và tính lương.",
  },
  {
    question: "Cần chuẩn bị giấy tờ gì khi làm thủ tục BHXH, BHYT?",
    answer:
      "Hồ sơ tùy thuộc vào từng thủ tục. Thông thường cần căn cước công dân và mã số BHXH (nếu đã có); với doanh nghiệp cần thêm thông tin đăng ký doanh nghiệp, danh sách và hợp đồng lao động. Ngọc Hoàng sẽ gửi danh sách hồ sơ cụ thể sau khi nắm rõ trường hợp của bạn.",
  },
  {
    question: "Ngọc Hoàng hỗ trợ khách hàng ở khu vực nào?",
    answer:
      "Ngọc Hoàng có địa chỉ tại Thôn Phước Khương, xã Bà Nà, thành phố Đà Nẵng và hỗ trợ khách hàng trên địa bàn Đà Nẵng. Bạn có thể trao đổi trước qua điện thoại hoặc Zalo 0963 548 333.",
  },
  {
    question: "Làm sao tự tra cứu quá trình đóng BHXH và thẻ BHYT?",
    answer:
      "Bạn có thể tra cứu trên Cổng thông tin điện tử BHXH Việt Nam (baohiemxahoi.gov.vn) hoặc ứng dụng VssID – Bảo hiểm xã hội số. Nếu thông tin chưa khớp, Ngọc Hoàng có thể hướng dẫn thủ tục điều chỉnh.",
  },
  {
    question: "Chi phí dịch vụ BHXH, BHYT được tính như thế nào?",
    answer:
      "Chi phí phụ thuộc vào loại thủ tục và số lượng hồ sơ. Vui lòng gọi hoặc nhắn Zalo 0963 548 333 để được tư vấn và báo giá trước khi thực hiện.",
  },
];

export const FOOTER_LINK_GROUPS = [
  {
    title: "Dịch vụ",
    links: [
      ["Dịch vụ BHXH, BHYT", "/#dv-bhxh"],
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
