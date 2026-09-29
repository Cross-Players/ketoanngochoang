import type { FaqItem } from "@/data/site";

/**
 * Trang chi tiết dịch vụ (round 6 – theo kế hoạch từ khóa SEO & AEO Desk 29/09/2026).
 *
 * NGUYÊN TẮC NỘI DUNG (bắt buộc khi sửa):
 * - Viết mới hoàn toàn, không sao chép câu chữ của website khác (bố cục tham khảo timsen.vn: banner, giới thiệu,
 *   công việc bao gồm, đối tượng, chi phí, quy trình, vì sao chọn, hồ sơ cần chuẩn bị, hỏi đáp, liên hệ).
 * - Tên các mục dịch vụ của khách hàng giữ NGUYÊN VĂN như trong SERVICES (data/site.ts).
 * - Ngọc Hoàng là công ty MỚI THÀNH LẬP (21/09/2026). "Trên 10 năm kinh nghiệm" chỉ nói về ĐỘI NGŨ NHÂN SỰ.
 * - Không nêu số khách hàng, giải thưởng, số năm hoạt động, cam kết/bảo đảm kết quả, giá cụ thể,
 *   thời hạn hay lệ phí pháp lý cụ thể. Nhận định pháp lý chỉ ở mức chung; văn bản cụ thể duy nhất được
 *   nhắc là Công văn 4370/BTC-DNTN (trang thay đổi đăng ký kinh doanh) – cần chuyên gia rà soát.
 * - Không dùng từ khóa BHXH/BHYT; chỉ giữ nguyên văn mục "Theo dõi trích nộp BHXH, BHYT, BHTN cho người lao động"
 *   ở trang tính lương (một dòng phụ).
 */

export interface ServicePageItem {
  title: string;
  description: string;
}

export interface ServicePageLink {
  label: string;
  href: string;
}

export interface ServicePageSection {
  /** Anchor id trong trang (mega menu / thẻ dịch vụ trang chủ trỏ tới). */
  id: string;
  title: string;
  paragraphs?: readonly string[];
  items?: readonly ServicePageItem[];
  links?: readonly ServicePageLink[];
}

export interface ServicePage {
  /** Đường dẫn: "/{slug}/". */
  slug: string;
  /** Tên ngắn dùng cho breadcrumb, thẻ "Dịch vụ liên quan" và JSON-LD. */
  name: string;
  /** Title trang (layout tự thêm " | Ngọc Hoàng"). */
  metaTitle: string;
  metaDescription: string;
  /** Từ khóa chính (duy nhất cho URL này theo kế hoạch). Chỉ dùng để ghi chú, không in ra trang. */
  keyword: string;
  h1: string;
  lead: string;
  /** Mô tả ngắn cho JSON-LD OfferCatalog (trang chủ) và Service (trang này). */
  summary: string;
  intro: { title: string; paragraphs: readonly string[] };
  sections: readonly ServicePageSection[];
  audience: { title: string; items: readonly string[] };
  pricing: { id: string; title: string; paragraphs: readonly string[] };
  whyTitle: string;
  prepare: { title: string; items: readonly string[] };
  faqTitle: string;
  faq: readonly FaqItem[];
  related: readonly string[];
}

export const SERVICE_PAGES: readonly ServicePage[] = [
  {
    slug: "dich-vu-ke-toan-da-nang",
    name: "Dịch vụ kế toán thuế",
    metaTitle: "Dịch vụ kế toán Đà Nẵng trọn gói",
    metaDescription:
      "Dịch vụ kế toán thuế trọn gói tại Đà Nẵng: ghi sổ, kê khai thuế, báo cáo tài chính và quyết toán cuối năm cho doanh nghiệp nhỏ. Gọi 0963 548 333.",
    keyword: "dịch vụ kế toán đà nẵng",
    h1: "Dịch vụ kế toán thuế trọn gói tại Đà Nẵng",
    lead:
      "Ngọc Hoàng nhận phần việc kế toán, kê khai thuế và báo cáo cuối năm cho doanh nghiệp tại Đà Nẵng, để chủ doanh nghiệp dành thời gian cho việc kinh doanh.",
    summary: "Kế toán trọn gói, kê khai thuế, báo cáo tài chính và quyết toán cuối năm cho doanh nghiệp tại Đà Nẵng.",
    intro: {
      title: "Dịch vụ kế toán thuế là gì, bao gồm những công việc nào?",
      paragraphs: [
        "Dịch vụ kế toán thuế là khi doanh nghiệp giao phần việc sổ sách và thuế cho một đơn vị bên ngoài thay vì tự tuyển kế toán nội bộ. Đơn vị dịch vụ nhận chứng từ, ghi sổ, lập tờ khai, báo cáo tài chính và làm việc với cơ quan thuế khi cần, trong phạm vi hai bên đã thống nhất.",
        "Với doanh nghiệp mới thành lập hoặc quy mô nhỏ, cách làm này giúp sổ sách luôn có người theo dõi mà không phải lo tuyển dụng, đào tạo hay bố trí chỗ ngồi cho một vị trí kế toán riêng.",
      ],
    },
    sections: [
      {
        id: "ke-toan",
        title: "Dịch vụ kế toán",
        items: [
          {
            title: "Dịch vụ kế toán trọn gói",
            description:
              "Nhận hóa đơn, chứng từ theo kỳ, hạch toán và ghi sổ; theo dõi doanh thu, chi phí, công nợ và lập các báo cáo trong phạm vi đã thống nhất.",
          },
          {
            title: "Tư vấn, thiết lập hệ thống kế toán",
            description:
              "Gợi ý cách sắp xếp chứng từ, sổ sách và luồng hóa đơn sao cho gọn, phù hợp với quy mô và ngành nghề của doanh nghiệp.",
          },
          {
            title: "Kiểm tra, hoàn thiện sổ sách kế toán",
            description:
              "Rà lại sổ sách, chứng từ các kỳ trước, chỉ ra chỗ chưa khớp hoặc còn thiếu và cùng doanh nghiệp hoàn thiện để số liệu nhất quán.",
          },
          {
            title: "Dịch vụ lập hoá đơn GTGT",
            description: "Lập hóa đơn giá trị gia tăng cho giao dịch bán hàng, cung cấp dịch vụ dựa trên thông tin doanh nghiệp gửi.",
          },
        ],
      },
      {
        id: "thue",
        title: "Kê khai và báo cáo thuế",
        items: [
          {
            title: "Dịch vụ kê khai thuế",
            description:
              "Lập và nộp các tờ khai thuế định kỳ, báo trước số thuế cần nộp để doanh nghiệp chủ động dòng tiền.",
          },
          {
            title: "Rà soát tính tuân thủ pháp luật thuế",
            description:
              "Xem lại tờ khai, hóa đơn và chứng từ đã kê khai để sớm nhận ra sai sót, tư vấn hướng điều chỉnh theo quy định hiện hành.",
          },
        ],
      },
      {
        id: "quyet-toan",
        title: "Quyết toán và báo cáo tài chính cuối năm",
        items: [
          {
            title: "Lập báo cáo tài chính cuối năm",
            description: "Tổng hợp số liệu cả năm, lập bộ báo cáo tài chính để doanh nghiệp nộp cho cơ quan quản lý.",
          },
          {
            title: "Quyết toán thuế cuối năm cho doanh nghiệp",
            description:
              "Lập hồ sơ quyết toán thuế năm dựa trên sổ sách, đối chiếu với các tờ khai đã nộp trong năm trước khi gửi cơ quan thuế.",
          },
          {
            title: "Đánh giá nhanh BCTC, quyết toán cuối năm",
            description:
              "Đọc nhanh báo cáo tài chính và hồ sơ quyết toán doanh nghiệp tự lập, lưu ý những chỉ tiêu nên xem lại trước khi nộp.",
          },
        ],
        links: [{ label: "Quyết toán thuế TNCN cho người lao động", href: "/dich-vu-tinh-luong-da-nang/#thue-tncn" }],
      },
      {
        id: "doanh-nghiep-moi",
        title: "Kế toán cho doanh nghiệp mới thành lập",
        paragraphs: [
          "Sau khi có giấy chứng nhận đăng ký doanh nghiệp, công ty cần bắt tay vào một loạt việc về thuế và sổ sách: khai thuế ban đầu, mở tài khoản ngân hàng, đăng ký chữ ký số, hóa đơn điện tử và tổ chức sổ sách kế toán.",
          "Ngọc Hoàng hướng dẫn từng việc theo tình hình thực tế của doanh nghiệp và có thể nhận làm kế toán ngay từ kỳ đầu tiên, để sổ sách được nề nếp từ ngày đầu.",
        ],
        links: [
          { label: "Dịch vụ thành lập công ty", href: "/thanh-lap-cong-ty-da-nang/" },
          { label: "Chữ ký số, hóa đơn điện tử", href: "/chu-ky-so-hoa-don-dien-tu-da-nang/" },
        ],
      },
    ],
    audience: {
      title: "Dịch vụ kế toán phù hợp với doanh nghiệp nào?",
      items: [
        "Doanh nghiệp mới thành lập, chưa có kế toán riêng.",
        "Doanh nghiệp nhỏ muốn giảm việc tuyển dụng và quản lý kế toán nội bộ.",
        "Doanh nghiệp có sổ sách các kỳ trước cần rà soát, hoàn thiện.",
        "Doanh nghiệp đã có kế toán nội bộ nhưng muốn có người kiểm tra lại báo cáo cuối năm.",
      ],
    },
    pricing: {
      id: "bang-gia",
      title: "Báo giá dịch vụ kế toán",
      paragraphs: [
        "Ngọc Hoàng không áp một mức phí chung cho mọi doanh nghiệp. Chi phí phụ thuộc vào số lượng hóa đơn, chứng từ, ngành nghề, số lao động và phần việc bạn muốn giao.",
        "Sau khi trao đổi, chúng tôi gửi báo giá cụ thể và thống nhất với bạn trước khi thực hiện.",
      ],
    },
    whyTitle: "Vì sao chọn Ngọc Hoàng làm kế toán thuế?",
    prepare: {
      title: "Doanh nghiệp cần chuẩn bị gì?",
      items: [
        "Giấy chứng nhận đăng ký doanh nghiệp.",
        "Hóa đơn đầu vào, đầu ra và chứng từ thu chi của kỳ cần làm.",
        "Sổ sách, tờ khai, báo cáo các kỳ trước (nếu doanh nghiệp đã hoạt động).",
        "Thông tin tài khoản ngân hàng và chữ ký số của doanh nghiệp (nếu có).",
      ],
    },
    faqTitle: "Hỏi đáp về dịch vụ kế toán tại Đà Nẵng",
    faq: [
      {
        question: "Dịch vụ kế toán trọn gói tại Đà Nẵng giá bao nhiêu một tháng?",
        answer:
          "Chi phí tùy vào số lượng hóa đơn, chứng từ, ngành nghề và phạm vi công việc nên không có một mức chung. Ngọc Hoàng gửi báo giá cụ thể sau khi nắm thông tin và thống nhất với bạn trước khi làm.",
      },
      {
        question: "Có nên thuê dịch vụ kế toán hay tuyển kế toán nội bộ?",
        answer:
          "Nếu khối lượng chứng từ chưa nhiều và chưa cần một người làm toàn thời gian, thuê dịch vụ giúp tiết kiệm công tuyển dụng, quản lý. Khi doanh nghiệp lớn dần, có thể kết hợp kế toán nội bộ với dịch vụ kiểm tra, quyết toán cuối năm. Ngọc Hoàng sẽ tư vấn theo tình hình thực tế của bạn.",
      },
      {
        question: "Doanh nghiệp mới thành lập có cần làm kế toán, kê khai thuế ngay không?",
        answer:
          "Sau khi thành lập, doanh nghiệp đã phát sinh các nghĩa vụ về thuế và kế toán theo quy định. Nếu chưa có kế toán riêng, bạn có thể giao cho đơn vị dịch vụ để sổ sách được theo dõi từ kỳ đầu.",
      },
      {
        question: "Ngọc Hoàng có nhận hoàn thiện sổ sách các năm trước không?",
        answer:
          "Có. Với dịch vụ kiểm tra, hoàn thiện sổ sách kế toán, Ngọc Hoàng rà soát chứng từ, sổ sách các kỳ trước và trao đổi với bạn những điểm cần bổ sung hoặc điều chỉnh.",
      },
    ],
    related: ["thanh-lap-cong-ty-da-nang", "dich-vu-tinh-luong-da-nang", "chu-ky-so-hoa-don-dien-tu-da-nang"],
  },
  {
    slug: "thanh-lap-cong-ty-da-nang",
    name: "Thành lập công ty",
    metaTitle: "Dịch vụ thành lập công ty tại Đà Nẵng",
    metaDescription:
      "Dịch vụ thành lập công ty, chi nhánh, văn phòng đại diện tại Đà Nẵng: tư vấn loại hình, soạn và nộp hồ sơ, hỗ trợ việc sau thành lập. Gọi 0963 548 333.",
    keyword: "dịch vụ thành lập công ty đà nẵng",
    h1: "Dịch vụ thành lập công ty tại Đà Nẵng",
    lead:
      "Từ lúc còn cân nhắc loại hình đến khi nhận giấy chứng nhận đăng ký doanh nghiệp, Ngọc Hoàng cùng bạn chuẩn bị hồ sơ và các bước cần thiết để công ty sẵn sàng hoạt động.",
    summary: "Tư vấn và thực hiện thủ tục thành lập doanh nghiệp, chi nhánh, văn phòng đại diện tại Đà Nẵng.",
    intro: {
      title: "Dịch vụ thành lập công ty gồm những gì?",
      paragraphs: [
        "Để mở công ty, người sáng lập cần quyết định nhiều nội dung: loại hình doanh nghiệp, tên công ty, địa chỉ trụ sở, ngành nghề, vốn điều lệ, người đại diện theo pháp luật… rồi lập hồ sơ nộp cho cơ quan đăng ký kinh doanh.",
        "Khi dùng dịch vụ, bạn được Ngọc Hoàng tư vấn từng nội dung, soạn và nộp hồ sơ, theo dõi kết quả, đồng thời hướng dẫn những việc cần làm tiếp theo để công ty đi vào hoạt động.",
      ],
    },
    sections: [
      {
        id: "thanh-lap",
        title: "Thành lập doanh nghiệp trong nước",
        items: [
          {
            title: "Tư vấn loại hình doanh nghiệp",
            description:
              "So sánh các loại hình phổ biến như công ty TNHH một thành viên, công ty TNHH hai thành viên trở lên, công ty cổ phần để bạn chọn loại phù hợp với kế hoạch.",
          },
          {
            title: "Tư vấn tên, ngành nghề, vốn và trụ sở",
            description:
              "Kiểm tra tên dự kiến, chọn mã ngành nghề sát với hoạt động thực tế, trao đổi về vốn điều lệ và địa chỉ trụ sở chính.",
          },
          {
            title: "Soạn và nộp hồ sơ đăng ký",
            description:
              "Soạn bộ hồ sơ đăng ký doanh nghiệp theo thông tin đã thống nhất, nộp cho cơ quan đăng ký kinh doanh và theo dõi đến khi có kết quả.",
          },
          {
            title: "Bàn giao kết quả",
            description: "Bàn giao giấy chứng nhận đăng ký doanh nghiệp cùng hồ sơ liên quan để doanh nghiệp lưu giữ.",
          },
        ],
      },
      {
        id: "chi-nhanh",
        title: "Thành lập chi nhánh, văn phòng đại diện, đơn vị phụ thuộc",
        paragraphs: [
          "Khi muốn mở rộng hoạt động sang địa điểm khác, doanh nghiệp cần chọn hình thức phù hợp: chi nhánh có thể trực tiếp kinh doanh, còn văn phòng đại diện chủ yếu làm nhiệm vụ đại diện, liên lạc cho công ty.",
          "Ngọc Hoàng tư vấn hình thức phù hợp với mục đích của bạn, sau đó chuẩn bị và nộp hồ sơ đăng ký hoạt động cho đơn vị phụ thuộc.",
        ],
      },
      {
        id: "sau-thanh-lap",
        title: "Những việc cần làm sau khi thành lập",
        paragraphs: [
          "Có giấy chứng nhận đăng ký doanh nghiệp mới là bước đầu. Để bắt đầu hoạt động, công ty thường còn cần làm bảng hiệu, con dấu, mở tài khoản ngân hàng, đăng ký chữ ký số và hóa đơn điện tử, khai thuế ban đầu và tổ chức sổ sách kế toán.",
          "Ngọc Hoàng có thể hỗ trợ tiếp các việc này để bạn không phải làm việc với nhiều đơn vị khác nhau.",
        ],
        links: [
          { label: "Kế toán cho doanh nghiệp mới thành lập", href: "/dich-vu-ke-toan-da-nang/#doanh-nghiep-moi" },
          { label: "Chữ ký số, hóa đơn điện tử, bảng hiệu và dấu tên", href: "/chu-ky-so-hoa-don-dien-tu-da-nang/" },
        ],
      },
    ],
    audience: {
      title: "Dịch vụ thành lập công ty dành cho ai?",
      items: [
        "Cá nhân, nhóm khởi nghiệp lần đầu mở công ty.",
        "Người bận rộn, không có thời gian tự chuẩn bị và theo dõi hồ sơ.",
        "Nhà đầu tư muốn được tư vấn kỹ về loại hình, vốn và ngành nghề trước khi đăng ký.",
        "Doanh nghiệp đang hoạt động muốn mở chi nhánh hoặc văn phòng đại diện.",
      ],
    },
    pricing: {
      id: "chi-phi",
      title: "Chi phí thành lập công ty",
      paragraphs: [
        "Chi phí phụ thuộc vào loại hình, số thành viên và các việc đi kèm bạn muốn Ngọc Hoàng hỗ trợ (như con dấu, bảng hiệu, chữ ký số).",
        "Phí dịch vụ và các khoản lệ phí nhà nước (nếu có) được báo rõ trước khi thực hiện.",
      ],
    },
    whyTitle: "Vì sao chọn Ngọc Hoàng khi thành lập công ty?",
    prepare: {
      title: "Cần chuẩn bị gì để thành lập công ty?",
      items: [
        "Giấy tờ pháp lý cá nhân của chủ sở hữu, các thành viên hoặc cổ đông và người đại diện theo pháp luật.",
        "Tên công ty dự kiến (nên có thêm vài phương án dự phòng).",
        "Địa chỉ trụ sở chính.",
        "Ngành nghề dự định kinh doanh và mức vốn điều lệ dự kiến.",
      ],
    },
    faqTitle: "Hỏi đáp về thành lập công ty tại Đà Nẵng",
    faq: [
      {
        question: "Thành lập công ty TNHH 1 thành viên ở Đà Nẵng cần những gì?",
        answer:
          "Cơ bản bạn cần giấy tờ pháp lý của chủ sở hữu và người đại diện theo pháp luật, tên công ty dự kiến, địa chỉ trụ sở, ngành nghề và mức vốn điều lệ. Ngọc Hoàng sẽ gửi danh sách cụ thể và soạn hồ sơ theo thông tin bạn cung cấp.",
      },
      {
        question: "Thành lập công ty mất bao lâu?",
        answer:
          "Thời gian phụ thuộc vào việc hồ sơ được chuẩn bị đầy đủ, chính xác và thời gian xử lý của cơ quan đăng ký kinh doanh. Ngọc Hoàng sẽ báo tiến độ dự kiến khi tiếp nhận hồ sơ của bạn.",
      },
      {
        question: "Nên chọn công ty TNHH hay công ty cổ phần?",
        answer:
          "Hai loại hình khác nhau về số lượng thành viên, cách góp và huy động vốn, cơ cấu quản lý. Công ty TNHH thường hợp với quy mô nhỏ, ít thành viên; công ty cổ phần linh hoạt hơn khi cần nhiều cổ đông. Ngọc Hoàng tư vấn cụ thể dựa trên kế hoạch của bạn.",
      },
      {
        question: "Tôi có phải tự đến cơ quan nhà nước để nộp hồ sơ không?",
        answer:
          "Hồ sơ đăng ký doanh nghiệp hiện có thể nộp trực tuyến. Khi dùng dịch vụ, Ngọc Hoàng thay bạn chuẩn bị và nộp hồ sơ; bạn cung cấp thông tin, giấy tờ và ký các văn bản cần thiết.",
      },
    ],
    related: ["dich-vu-ke-toan-da-nang", "thay-doi-dang-ky-kinh-doanh-da-nang", "chu-ky-so-hoa-don-dien-tu-da-nang"],
  },
  {
    slug: "thay-doi-dang-ky-kinh-doanh-da-nang",
    name: "Thay đổi giấy phép kinh doanh",
    metaTitle: "Dịch vụ thay đổi giấy phép kinh doanh Đà Nẵng",
    metaDescription:
      "Thay đổi đăng ký kinh doanh tại Đà Nẵng: địa chỉ trụ sở, người đại diện, vốn, thành viên, ngành nghề, tên công ty. Tư vấn hồ sơ rõ ràng. Gọi 0963 548 333.",
    keyword: "dịch vụ thay đổi giấy phép kinh doanh (Đà Nẵng)",
    h1: "Dịch vụ thay đổi giấy phép kinh doanh tại Đà Nẵng",
    lead:
      "Khi thông tin của công ty thay đổi, Ngọc Hoàng giúp bạn xác định cần làm thủ tục gì, chuẩn bị hồ sơ và nộp cho cơ quan đăng ký kinh doanh.",
    summary: "Thay đổi nội dung đăng ký doanh nghiệp: địa chỉ, người đại diện, vốn, thành viên, ngành nghề, tên công ty.",
    intro: {
      title: "Khi nào cần thay đổi đăng ký kinh doanh?",
      paragraphs: [
        "Trong quá trình hoạt động, doanh nghiệp có thể chuyển trụ sở, thay người đại diện theo pháp luật, tăng hoặc giảm vốn, thay đổi thành viên, bổ sung ngành nghề hay đổi tên. Tùy từng nội dung, doanh nghiệp đăng ký hoặc thông báo thay đổi với cơ quan đăng ký kinh doanh theo quy định.",
        "Cập nhật kịp thời giúp thông tin đăng ký khớp với thực tế, tránh vướng mắc khi làm việc với ngân hàng, cơ quan thuế và đối tác.",
      ],
    },
    sections: [
      {
        id: "noi-dung-thay-doi",
        title: "Thay đổi giấy phép kinh doanh",
        items: [
          {
            title: "Thay đổi địa chỉ trụ sở chính",
            description:
              "Tư vấn thủ tục khi chuyển trụ sở, lưu ý các việc cần cập nhật với cơ quan thuế, hóa đơn và con dấu sau khi đổi địa chỉ.",
          },
          {
            title: "Thay đổi người đại diện theo pháp luật",
            description: "Chuẩn bị hồ sơ khi thay người đại diện theo pháp luật hoặc thay đổi thông tin của người đại diện.",
          },
          {
            title: "Thay đổi vốn điều lệ, thành viên, chủ sở hữu",
            description: "Hỗ trợ hồ sơ tăng, giảm vốn điều lệ, chuyển nhượng phần vốn góp, thay đổi thành viên hoặc chủ sở hữu công ty.",
          },
          {
            title: "Bổ sung, thay đổi ngành nghề kinh doanh",
            description: "Rà soát ngành nghề đang đăng ký, chọn mã ngành phù hợp với hoạt động mới và lập hồ sơ thông báo.",
          },
          {
            title: "Thay đổi tên công ty",
            description:
              "Kiểm tra tên mới dự kiến, chuẩn bị hồ sơ và nhắc những thứ cần làm lại theo tên mới như con dấu, bảng hiệu, hóa đơn.",
          },
        ],
      },
      {
        id: "dia-chi-sau-sap-nhap",
        title: "Cập nhật địa chỉ sau khi sắp xếp đơn vị hành chính",
        paragraphs: [
          "Sau đợt sắp xếp lại đơn vị hành chính, tên xã, phường trong địa chỉ trụ sở của nhiều doanh nghiệp tại Đà Nẵng đã thay đổi.",
          "Theo hướng dẫn của Bộ Tài chính tại Công văn 4370/BTC-DNTN, doanh nghiệp không bắt buộc làm thủ tục thay đổi địa chỉ chỉ vì lý do này; có thể cập nhật khi có nhu cầu hoặc khi đăng ký thay đổi nội dung khác. Ngọc Hoàng tư vấn thời điểm cập nhật phù hợp và các giấy tờ, hóa đơn nên lưu ý.",
        ],
      },
    ],
    audience: {
      title: "Dịch vụ này dành cho doanh nghiệp nào?",
      items: [
        "Doanh nghiệp chuyển trụ sở hoặc muốn cập nhật địa chỉ theo tên đơn vị hành chính mới.",
        "Doanh nghiệp thay đổi người đại diện, thành viên, chủ sở hữu hoặc vốn điều lệ.",
        "Doanh nghiệp mở rộng sang lĩnh vực kinh doanh mới.",
        "Doanh nghiệp muốn đổi tên công ty.",
      ],
    },
    pricing: {
      id: "chi-phi",
      title: "Chi phí thay đổi đăng ký kinh doanh",
      paragraphs: [
        "Chi phí tùy thuộc vào nội dung và số nội dung cần thay đổi. Ngọc Hoàng báo rõ phí dịch vụ và các khoản lệ phí nhà nước (nếu có) trước khi thực hiện.",
      ],
    },
    whyTitle: "Vì sao chọn Ngọc Hoàng cho thủ tục thay đổi?",
    prepare: {
      title: "Cần chuẩn bị gì?",
      items: [
        "Giấy chứng nhận đăng ký doanh nghiệp hiện tại.",
        "Điều lệ công ty và các lần thay đổi gần nhất (nếu có).",
        "Thông tin, giấy tờ liên quan đến nội dung thay đổi (địa chỉ mới, người đại diện mới, thành viên mới…).",
        "Giấy tờ pháp lý của người đại diện theo pháp luật.",
      ],
    },
    faqTitle: "Hỏi đáp về thay đổi đăng ký kinh doanh",
    faq: [
      {
        question: "Sau sáp nhập, công ty ở Đà Nẵng có bắt buộc đổi địa chỉ trên giấy phép kinh doanh không?",
        answer:
          "Theo Công văn 4370/BTC-DNTN của Bộ Tài chính, doanh nghiệp không bắt buộc làm thủ tục thay đổi địa chỉ chỉ vì địa giới hành chính thay đổi; có thể cập nhật khi có nhu cầu. Hãy liên hệ Ngọc Hoàng để được tư vấn theo trường hợp cụ thể.",
      },
      {
        question: "Thay đổi đăng ký kinh doanh mất bao lâu và làm ở đâu?",
        answer:
          "Hồ sơ được nộp cho cơ quan đăng ký kinh doanh, thời gian phụ thuộc vào nội dung thay đổi và việc hồ sơ đầy đủ, hợp lệ. Ngọc Hoàng sẽ báo tiến độ dự kiến khi nhận hồ sơ.",
      },
      {
        question: "Có thể thay đổi nhiều nội dung cùng lúc không?",
        answer:
          "Nhiều nội dung có thể được xử lý trong cùng một lần nộp nếu phù hợp. Ngọc Hoàng sẽ xem các thay đổi bạn cần và tư vấn cách làm gọn nhất.",
      },
      {
        question: "Sau khi thay đổi đăng ký kinh doanh cần làm gì thêm?",
        answer:
          "Tùy nội dung thay đổi, doanh nghiệp có thể cần cập nhật với cơ quan thuế, ngân hàng, hóa đơn điện tử, con dấu, bảng hiệu. Ngọc Hoàng sẽ nhắc các việc liên quan khi hoàn tất thủ tục.",
      },
    ],
    related: ["thanh-lap-cong-ty-da-nang", "tam-ngung-giai-the-cong-ty-da-nang", "dich-vu-ke-toan-da-nang"],
  },
  {
    slug: "tam-ngung-giai-the-cong-ty-da-nang",
    name: "Tạm ngưng, giải thể doanh nghiệp",
    metaTitle: "Dịch vụ giải thể doanh nghiệp tại Đà Nẵng",
    metaDescription:
      "Dịch vụ tạm ngừng kinh doanh và giải thể doanh nghiệp tại Đà Nẵng: tư vấn phương án, chuẩn bị hồ sơ, hoàn tất thủ tục thuế. Gọi 0963 548 333.",
    keyword: "dịch vụ giải thể doanh nghiệp tại đà nẵng",
    h1: "Dịch vụ tạm ngừng kinh doanh và giải thể doanh nghiệp tại Đà Nẵng",
    lead:
      "Khi cần tạm dừng hoạt động hoặc chấm dứt doanh nghiệp, Ngọc Hoàng giúp bạn chọn hướng phù hợp và làm thủ tục theo đúng trình tự, hạn chế vướng mắc về sau.",
    summary: "Tư vấn và thực hiện thủ tục tạm ngừng kinh doanh, giải thể doanh nghiệp tại Đà Nẵng.",
    intro: {
      title: "Tạm ngừng kinh doanh và giải thể khác nhau thế nào?",
      paragraphs: [
        "Tạm ngừng kinh doanh là khi doanh nghiệp dừng hoạt động trong một thời gian rồi có thể quay lại; doanh nghiệp vẫn tồn tại và vẫn còn một số nghĩa vụ cần lưu ý. Giải thể là thủ tục chấm dứt sự tồn tại của doanh nghiệp, đòi hỏi thanh toán các khoản nợ và hoàn tất nghĩa vụ thuế trước khi kết thúc.",
        "Chọn sai hướng hoặc bỏ sót bước có thể khiến hồ sơ kéo dài, vì vậy Ngọc Hoàng tìm hiểu kỹ tình trạng doanh nghiệp trước khi đề xuất cách làm.",
      ],
    },
    sections: [
      {
        id: "tam-ngung",
        title: "Tạm ngưng hoạt động",
        paragraphs: [
          "Doanh nghiệp muốn tạm ngừng kinh doanh cần thông báo với cơ quan đăng ký kinh doanh trước thời điểm tạm ngừng; thời hạn tạm ngừng có giới hạn theo quy định.",
        ],
        items: [
          {
            title: "Tư vấn thời điểm và thời hạn tạm ngừng",
            description:
              "Chọn thời điểm bắt đầu và thời hạn tạm ngừng hợp với kế hoạch, lưu ý những nghĩa vụ vẫn còn trong thời gian tạm ngừng.",
          },
          {
            title: "Chuẩn bị và nộp hồ sơ thông báo",
            description: "Soạn thông báo tạm ngừng kinh doanh cùng văn bản nội bộ liên quan, nộp cho cơ quan đăng ký kinh doanh và theo dõi kết quả.",
          },
          {
            title: "Hoạt động trở lại",
            description: "Hỗ trợ thủ tục khi doanh nghiệp muốn kinh doanh trở lại trước thời hạn đã thông báo hoặc cần tạm ngừng tiếp.",
          },
        ],
      },
      {
        id: "giai-the",
        title: "Giải thể doanh nghiệp",
        paragraphs: [
          "Giải thể gồm nhiều bước liên quan đến cả cơ quan đăng ký kinh doanh và cơ quan thuế. Ngọc Hoàng đồng hành từ lúc doanh nghiệp ra quyết định đến khi hoàn tất thủ tục.",
        ],
        items: [
          {
            title: "Rà soát trước khi giải thể",
            description:
              "Kiểm tra sổ sách, hóa đơn, nghĩa vụ thuế, công nợ và các chi nhánh, văn phòng đại diện (nếu có) để lên kế hoạch giải thể.",
          },
          {
            title: "Hoàn tất nghĩa vụ thuế",
            description: "Hỗ trợ lập hồ sơ quyết toán và làm thủ tục với cơ quan thuế để hoàn tất nghĩa vụ, đóng mã số thuế theo quy định.",
          },
          {
            title: "Lập và nộp hồ sơ giải thể",
            description: "Soạn quyết định, biên bản và hồ sơ giải thể, nộp cho cơ quan đăng ký kinh doanh và theo dõi đến khi hoàn tất.",
          },
        ],
      },
    ],
    audience: {
      title: "Dịch vụ này dành cho doanh nghiệp nào?",
      items: [
        "Doanh nghiệp cần tạm dừng hoạt động để tái cơ cấu hoặc chờ thời điểm phù hợp.",
        "Doanh nghiệp không còn nhu cầu hoạt động và muốn chấm dứt đúng thủ tục.",
        "Doanh nghiệp đã ngừng hoạt động một thời gian nhưng chưa làm thủ tục.",
      ],
    },
    pricing: {
      id: "chi-phi",
      title: "Chi phí tạm ngừng, giải thể doanh nghiệp",
      paragraphs: [
        "Chi phí phụ thuộc vào tình trạng sổ sách, nghĩa vụ thuế còn lại và số đơn vị phụ thuộc cần xử lý. Ngọc Hoàng rà soát trước, báo giá rõ ràng và chỉ thực hiện khi bạn đồng ý.",
      ],
    },
    whyTitle: "Vì sao chọn Ngọc Hoàng cho thủ tục tạm ngừng, giải thể?",
    prepare: {
      title: "Cần chuẩn bị gì?",
      items: [
        "Giấy chứng nhận đăng ký doanh nghiệp.",
        "Thời gian dự kiến tạm ngừng hoặc lý do giải thể.",
        "Sổ sách, báo cáo, tờ khai thuế các kỳ gần nhất.",
        "Thông tin về chi nhánh, văn phòng đại diện, hóa đơn và con dấu (nếu có).",
      ],
    },
    faqTitle: "Hỏi đáp về tạm ngừng kinh doanh và giải thể",
    faq: [
      {
        question: "Tạm ngừng kinh doanh tối đa bao lâu?",
        answer:
          "Thời hạn mỗi lần tạm ngừng và việc tạm ngừng liên tiếp đều có giới hạn theo quy định về đăng ký doanh nghiệp. Ngọc Hoàng sẽ tư vấn thời hạn phù hợp với trường hợp của bạn.",
      },
      {
        question: "Trong thời gian tạm ngừng có phải nộp báo cáo tài chính không?",
        answer:
          "Việc nộp tờ khai thuế và báo cáo tài chính khi tạm ngừng phụ thuộc vào thời điểm và thời hạn tạm ngừng của doanh nghiệp. Ngọc Hoàng sẽ rà soát và cho bạn biết những nghĩa vụ còn phải thực hiện.",
      },
      {
        question: "Nên tạm ngừng hay giải thể doanh nghiệp?",
        answer:
          "Nếu còn dự định kinh doanh trở lại, tạm ngừng có thể phù hợp hơn; nếu không còn nhu cầu hoạt động, giải thể giúp chấm dứt các nghĩa vụ phát sinh về sau. Ngọc Hoàng sẽ phân tích cụ thể trước khi bạn quyết định.",
      },
      {
        question: "Giải thể doanh nghiệp mất bao lâu?",
        answer:
          "Thời gian phụ thuộc nhiều vào tình trạng sổ sách, nghĩa vụ thuế và công nợ của doanh nghiệp. Sau khi rà soát, Ngọc Hoàng sẽ thông báo các bước và tiến độ dự kiến.",
      },
    ],
    related: ["thay-doi-dang-ky-kinh-doanh-da-nang", "dich-vu-ke-toan-da-nang", "thanh-lap-cong-ty-da-nang"],
  },
  {
    slug: "dich-vu-tinh-luong-da-nang",
    name: "Tính lương và nhân sự",
    metaTitle: "Dịch vụ tính lương Đà Nẵng cho doanh nghiệp nhỏ",
    metaDescription:
      "Dịch vụ tính lương tại Đà Nẵng cho doanh nghiệp nhỏ: lập bảng lương, thiết lập nhân sự ban đầu, theo dõi và quyết toán thuế TNCN. Gọi 0963 548 333.",
    keyword: "dịch vụ tính lương đà nẵng",
    h1: "Dịch vụ tính lương và nhân sự tại Đà Nẵng",
    lead:
      "Ngọc Hoàng tính lương mỗi kỳ theo dữ liệu chấm công và chính sách lương của công ty, đồng thời theo dõi thuế thu nhập cá nhân của người lao động.",
    summary: "Thiết lập nhân sự ban đầu, tính lương hằng kỳ, theo dõi và quyết toán thuế TNCN cho doanh nghiệp tại Đà Nẵng.",
    intro: {
      title: "Dịch vụ tính lương thuê ngoài là gì?",
      paragraphs: [
        "Đó là khi doanh nghiệp giao việc tính lương hằng kỳ cho một đơn vị bên ngoài, dựa trên bảng chấm công, hợp đồng lao động và chính sách lương thưởng của công ty, kèm các khoản khấu trừ như thuế thu nhập cá nhân.",
        "Doanh nghiệp vẫn chủ động quyết định chính sách và chi trả lương; đơn vị dịch vụ lo phần tính toán, đối chiếu và lập báo cáo, giúp hạn chế sai sót và giữ thông tin lương trong phạm vi cần thiết.",
      ],
    },
    sections: [
      {
        id: "nhan-su-tien-luong",
        title: "Nhân sự & tiền lương",
        items: [
          {
            title: "Dịch vụ nhân sự ban đầu",
            description:
              "Giúp doanh nghiệp mới chuẩn bị giấy tờ nhân sự cơ bản như mẫu hợp đồng lao động, hồ sơ nhân viên, quy chế lương thưởng và thang bảng lương phù hợp quy mô.",
          },
          {
            title: "Dịch vụ tính lương",
            description:
              "Tính lương theo kỳ từ dữ liệu chấm công và chính sách của công ty, lập bảng lương, phiếu lương cho người lao động và báo cáo tổng hợp chi phí lương.",
          },
          {
            title: "Theo dõi trích nộp thuế TNCN",
            description: "Tính số thuế thu nhập cá nhân cần khấu trừ mỗi kỳ, lập tờ khai và theo dõi số đã nộp của từng người lao động.",
          },
          {
            title: "Theo dõi trích nộp BHXH, BHYT, BHTN cho người lao động",
            description: "Theo dõi các khoản trích theo lương trên bảng lương hằng kỳ.",
          },
        ],
      },
      {
        id: "thue-tncn",
        title: "Quyết toán thuế thu nhập cá nhân",
        paragraphs: [
          "Cuối năm, tổ chức trả thu nhập cần tổng hợp thu nhập và số thuế đã khấu trừ của người lao động để quyết toán thuế thu nhập cá nhân theo quy định.",
        ],
        items: [
          {
            title: "Quyết toán thuế TNCN",
            description: "Tổng hợp dữ liệu lương cả năm, đối chiếu với các tờ khai đã nộp và lập hồ sơ quyết toán thuế TNCN của doanh nghiệp.",
          },
          {
            title: "Hỗ trợ người lao động",
            description: "Hướng dẫn thủ tục khi người lao động ủy quyền cho doanh nghiệp quyết toán thay và chuẩn bị chứng từ khấu trừ thuế khi người lao động cần.",
          },
        ],
      },
    ],
    audience: {
      title: "Dịch vụ tính lương phù hợp với ai?",
      items: [
        "Doanh nghiệp nhỏ chưa có bộ phận nhân sự hoặc kế toán tiền lương riêng.",
        "Doanh nghiệp mới thành lập bắt đầu tuyển những nhân viên đầu tiên.",
        "Chủ doanh nghiệp muốn thông tin lương chỉ những người phụ trách được biết.",
        "Doanh nghiệp cần người lập hồ sơ quyết toán thuế TNCN cuối năm.",
      ],
    },
    pricing: {
      id: "bang-gia",
      title: "Báo giá dịch vụ tính lương",
      paragraphs: [
        "Chi phí phụ thuộc chủ yếu vào số lượng nhân viên, số kỳ trả lương và độ phức tạp của chính sách lương thưởng. Ngọc Hoàng báo giá sau khi nắm thông tin và thống nhất với bạn trước khi thực hiện.",
      ],
    },
    whyTitle: "Vì sao chọn Ngọc Hoàng tính lương cho doanh nghiệp?",
    prepare: {
      title: "Doanh nghiệp cần chuẩn bị gì?",
      items: [
        "Danh sách nhân viên, hợp đồng lao động và mức lương thỏa thuận.",
        "Bảng chấm công hoặc dữ liệu ngày công mỗi kỳ.",
        "Chính sách lương, thưởng, phụ cấp của công ty (nếu có).",
        "Mã số thuế cá nhân và thông tin người phụ thuộc của người lao động.",
      ],
    },
    faqTitle: "Hỏi đáp về dịch vụ tính lương",
    faq: [
      {
        question: "Dịch vụ tính lương thuê ngoài là gì, doanh nghiệp nhỏ có cần không?",
        answer:
          "Đó là việc giao phần tính lương hằng kỳ cho đơn vị bên ngoài dựa trên chấm công và chính sách lương của công ty. Với doanh nghiệp ít nhân viên, chưa có kế toán tiền lương riêng, đây là cách có bảng lương rõ ràng mà không cần tuyển thêm người.",
      },
      {
        question: "Thông tin lương của nhân viên được bảo mật thế nào?",
        answer:
          "Ngọc Hoàng chỉ dùng thông tin lương cho công việc được giao và giới hạn người tiếp cận. Cách gửi nhận dữ liệu được thống nhất với doanh nghiệp ngay từ đầu.",
      },
      {
        question: "Ngọc Hoàng có nhận quyết toán thuế TNCN cho doanh nghiệp không?",
        answer:
          "Có. Ngọc Hoàng tổng hợp dữ liệu lương cả năm và lập hồ sơ quyết toán thuế TNCN cho doanh nghiệp.",
      },
    ],
    related: ["dich-vu-ke-toan-da-nang", "thanh-lap-cong-ty-da-nang", "chu-ky-so-hoa-don-dien-tu-da-nang"],
  },
  {
    slug: "chu-ky-so-hoa-don-dien-tu-da-nang",
    name: "Chữ ký số, hóa đơn điện tử",
    metaTitle: "Chữ ký số, hóa đơn điện tử Đà Nẵng",
    metaDescription:
      "Chữ ký số, hóa đơn điện tử (đối tác Viettel), bảng hiệu, dấu tên và tài khoản số đẹp (đối tác Techcombank) cho doanh nghiệp Đà Nẵng. Gọi 0963 548 333.",
    keyword: "chữ ký số đà nẵng",
    h1: "Chữ ký số, hóa đơn điện tử và dịch vụ hỗ trợ doanh nghiệp tại Đà Nẵng",
    lead:
      "Chữ ký số, hóa đơn điện tử, con dấu, bảng hiệu, tài khoản ngân hàng – những thứ doanh nghiệp dùng hằng ngày – được Ngọc Hoàng hỗ trợ đăng ký cùng lúc với các dịch vụ khác.",
    summary: "Chữ ký số, hóa đơn điện tử (đối tác Viettel), bảng hiệu, dấu tên và tài khoản ngân hàng số đẹp (đối tác Techcombank).",
    intro: {
      title: "Vì sao doanh nghiệp cần chữ ký số và hóa đơn điện tử?",
      paragraphs: [
        "Chữ ký số dùng để ký điện tử tờ khai thuế, hồ sơ nộp trực tuyến và hóa đơn. Hóa đơn điện tử là hình thức hóa đơn doanh nghiệp dùng khi bán hàng, cung cấp dịch vụ và cần được đăng ký sử dụng với cơ quan thuế.",
        "Với doanh nghiệp mới, đây thường là những việc nên làm sớm để có thể xuất hóa đơn và kê khai thuế. Ngọc Hoàng hướng dẫn đăng ký, cài đặt và sử dụng để bạn bắt đầu thuận lợi.",
      ],
    },
    sections: [
      {
        id: "chu-ky-so",
        title: "Chữ ký số, hóa đơn điện tử (đối tác Viettel)",
        items: [
          {
            title: "Chữ ký số",
            description: "Tư vấn gói chữ ký số phù hợp, hỗ trợ đăng ký, cài đặt và hướng dẫn dùng để ký tờ khai, hồ sơ điện tử.",
          },
          {
            title: "Hóa đơn điện tử",
            description: "Hỗ trợ đăng ký sử dụng hóa đơn điện tử với cơ quan thuế, thiết lập mẫu hóa đơn và hướng dẫn lập, gửi hóa đơn cho khách hàng.",
          },
          {
            title: "Gia hạn và hỗ trợ sử dụng",
            description: "Hỗ trợ gia hạn chữ ký số khi đến hạn và giải đáp vướng mắc trong quá trình sử dụng.",
          },
        ],
      },
      {
        id: "dau-bang-hieu",
        title: "Bảng hiệu và dấu tên",
        items: [
          {
            title: "Con dấu, dấu tên",
            description: "Hỗ trợ làm con dấu công ty theo thông tin đăng ký doanh nghiệp, cùng dấu tên, dấu chức danh khi cần.",
          },
          {
            title: "Bảng hiệu",
            description: "Hỗ trợ làm bảng hiệu cho trụ sở, chi nhánh với thông tin doanh nghiệp theo đăng ký.",
          },
        ],
      },
      {
        id: "tai-khoan-so-dep",
        title: "Thành lập tài khoản ngân hàng số đẹp (đối tác Techcombank)",
        paragraphs: [
          "Ngọc Hoàng hỗ trợ doanh nghiệp mở tài khoản tại Techcombank và chọn số tài khoản dễ nhớ theo nhu cầu. Điều kiện, thủ tục mở tài khoản và các loại phí (nếu có) áp dụng theo chính sách của ngân hàng tại thời điểm đăng ký.",
        ],
      },
    ],
    audience: {
      title: "Dịch vụ này dành cho ai?",
      items: [
        "Doanh nghiệp mới thành lập cần chuẩn bị công cụ để bắt đầu hoạt động.",
        "Doanh nghiệp muốn đăng ký mới hoặc gia hạn chữ ký số, hóa đơn điện tử.",
        "Doanh nghiệp đổi tên, địa chỉ cần làm lại con dấu, bảng hiệu.",
        "Doanh nghiệp muốn có số tài khoản ngân hàng dễ nhớ.",
      ],
    },
    pricing: {
      id: "chi-phi",
      title: "Chi phí chữ ký số, hóa đơn điện tử",
      paragraphs: [
        "Chi phí phụ thuộc vào gói chữ ký số, số lượng hóa đơn và các hạng mục bạn chọn. Ngọc Hoàng tư vấn gói phù hợp và báo giá trước khi thực hiện.",
      ],
    },
    whyTitle: "Vì sao chọn Ngọc Hoàng?",
    prepare: {
      title: "Cần chuẩn bị gì?",
      items: [
        "Giấy chứng nhận đăng ký doanh nghiệp.",
        "Giấy tờ pháp lý của người đại diện theo pháp luật.",
        "Email và thông tin liên hệ dùng để nhận, gửi hóa đơn.",
        "Mẫu bảng hiệu, con dấu mong muốn (nếu có).",
      ],
    },
    faqTitle: "Hỏi đáp về chữ ký số và hóa đơn điện tử",
    faq: [
      {
        question: "Doanh nghiệp mới thành lập có cần chữ ký số ngay không?",
        answer:
          "Chữ ký số thường cần dùng sớm để kê khai thuế trực tuyến và ký hóa đơn điện tử. Ngọc Hoàng có thể hỗ trợ đăng ký chữ ký số cùng lúc với các thủ tục sau thành lập.",
      },
      {
        question: "Chữ ký số, hóa đơn điện tử của Ngọc Hoàng là của đơn vị nào?",
        answer:
          "Ngọc Hoàng cung cấp chữ ký số, hóa đơn điện tử với đối tác Viettel và tư vấn gói phù hợp với nhu cầu sử dụng của bạn.",
      },
      {
        question: "Có hỗ trợ làm con dấu và bảng hiệu cho công ty mới không?",
        answer:
          "Có. Bảng hiệu và dấu tên nằm trong nhóm dịch vụ khác của Ngọc Hoàng; bạn có thể đăng ký cùng lúc với thủ tục thành lập công ty.",
      },
    ],
    related: ["thanh-lap-cong-ty-da-nang", "dich-vu-ke-toan-da-nang", "thay-doi-dang-ky-kinh-doanh-da-nang"],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug);
}

/** Câu giới thiệu đội ngũ dùng ở mục "Vì sao chọn" – "trên 10 năm kinh nghiệm" là của ĐỘI NGŨ, không phải công ty. */
export const TEAM_NOTE =
  "Ngọc Hoàng là công ty mới thành lập tại Đà Nẵng, với đội ngũ nhân sự có trên 10 năm kinh nghiệm trong lĩnh vực kế toán, thuế.";
