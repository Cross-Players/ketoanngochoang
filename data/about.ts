/**
 * Nội dung trang "Giới thiệu" – lấy nguyên văn từ tài liệu Word của khách hàng
 * ("Wed công ty_v1.docx", mục 2. Giới thiệu công ty). Giữ đúng câu chữ; chỉ tách
 * đoạn, in đậm theo bản Word. Dòng Email trong tài liệu còn để trống ("…………..")
 * nên không hiển thị.
 */

/** Một đoạn văn: chuỗi thường hoặc `{ b }` cho phần in đậm như trong bản Word. */
export type RichText = readonly (string | { readonly b: string })[];

export const ABOUT_SLOGAN = "Điểm tựa cho khởi đầu – Hài hòa cùng thịnh vượng";

/** Đoạn ngay dưới khẩu hiệu (bản Word ngắt dòng sau dấu phẩy thứ hai). */
export const ABOUT_MOTTO: readonly string[] = [
  "Phục vụ Khách hàng bằng cả trái tim, đem đến cho Khách hàng sự an tâm tuyệt đối,",
  "luôn tuân thủ Pháp luật và không bao giờ có hành vi vụ lợi.",
];

/** Tiêu đề gốc trong bản Word. */
export const ABOUT_DOC_HEADING = "GIỚI THIỆU VỀ CÔNG TY TNHH TƯ VẤN & DỊCH VỤ NGỌC HOÀNG";

export const ABOUT_INTRO: RichText =
  ["Với đội ngũ kế toán trưởng có trên 10 năm kinh nghiệm hoạt động và tiếp cận với nhiều doanh nghiệp trong những lĩnh vực khác nhau, chúng tôi cam kết đảm bảo chất lượng dịch vụ được kiểm soát chặt chẽ cũng như chính sách giá hợp lý đến với tất cả Quý khách hàng đồng hành cùng Ngọc Hoàng !"];

export const ABOUT_TAX_HEADING =
  "Luật thuế luôn thay đổi và cập nhật liên tục – Sự cần thiết của dịch vụ Thuế Kế Toán";

export const ABOUT_TAX_PARAGRAPHS: readonly RichText[] = [
  ["Nền kinh tế Việt Nam ngày càng mở rộng và không ngừng cải tiến, song song đó là các chính sách luật thuế cũng phải có sự thay đổi liên tục để phù hợp hơn, tạo điều kiện thuận lợi cho quá trình hoạt động và phát triển của các doanh nghiệp."],
  ["Sự thay đổi và cập nhật liên tục về quy định luật thuế đòi hỏi các chủ doanh nghiệp cần nắm bắt kịp thời và thực hiện đúng trong việc quản lý, điều chỉnh phù hợp trong chiến lược kinh doanh để không xảy ra những rủi ro sai phạm về luật thuế."],
  [
    "Chính vì lẽ đó, việc ra đời của loại hình ",
    { b: "Dịch vụ kế toán trọn gói" },
    " thực sự cần thiết đối với tất cả các doanh nghiệp, từ việc hiểu rõ và am tường về luật thuế của các luật sư, kiểm toán giỏi để các chủ doanh nghiệp có thể nhận được tư vấn hỗ trợ tốt hơn, hướng Quý khách hàng tuân thủ đúng pháp luật – luật thuế, hoặc có thể “thay mặt” Quý khách hàng để giải quyết mọi việc liên quan đến thuế kế toán.",
  ],
];

export const ABOUT_WHY_HEADING = "Tại sao bạn nên chọn Dịch Vụ Kế Toán Thuế Ngọc Hoàng?";

export const ABOUT_WHY_LIST: readonly string[] = [
  "Chúng tôi có giấy phép, chứng nhận nghề đủ điều kiện hoạt động trong lĩnh vực này.",
  "Với sự phát triển cùng thời gian, hiện tại Ngọc Hoàng đã sở hữu một đội ngũ nhân sự lớn và có kinh nghiệm dày dặn.",
  "“Phục vụ khách hàng bằng cả trái tim” là phương châm hoạt động được đưa lên hàng đầu đối với mỗi nhân viên của Ngọc Hoàng.",
];

export const ABOUT_BENEFITS_LEAD = "Quyền lợi của khách hàng khi hợp tác cùng Ngọc Hoàng:";

export const ABOUT_BENEFITS: readonly string[] = [
  "Tính ràng buộc trách nhiệm: Ngọc Hoàng đặt uy tín thương hiệu lên hàng đầu. Nếu có sai sót gì xảy ra vì lỗi của nhân sự Ngọc Hoàng, chúng tôi cam kết chịu trách nhiệm hoàn toàn với Quý khách hàng.",
  "Chi phí phù hợp, giúp giảm gánh nặng nhân sự của doanh nghiệp bạn: nếu bạn không kiểm soát chặt chẽ đội ngũ nhân viên kế toán của mình thì đến lúc xảy ra sai sót lớn sẽ làm ảnh hưởng đến việc kinh doanh của bạn, chưa kể đến chi phí phải trả cho nhân viên kế toán khá cao. Đây là lý do bạn cần tìm đến Ngọc Hoàng chúng tôi!",
  "Luôn theo dõi, cập nhật thông tin pháp luật để mang lại sự ổn định phát triển kinh doanh của bạn, tránh những trường hợp rủi ro, sai phạm luật thuế,…",
  "Tối ưu hóa chiến lược thuế để giảm chi phí tối đa nhất cho doanh nghiệp bạn.",
];

export const ABOUT_QUALITY_LIST: readonly string[] = [
  "Trọn gói, không phát sinh phụ phí, chỉ có sản phẩm cộng thêm.",
  "Chất lượng đồng đều và có độ tin cậy cao (tất cả dịch vụ đều thực hiện theo quy trình)",
  "Đáp ứng nhanh, tư vấn (miễn phí) trước các vấn đề của khách hàng cơ sở xét đoán nghề nghiệp hơn đợi khách hàng yêu cầu tư vấn",
  "Được đào tạo bài bản về chuyên môn, kỹ năng và đạo đức.",
  "Ổn định, trưởng bộ phận làm việc tại NGỌC HOÀNG từ 5 năm trở lên.",
  "Nhiệt tình và đồng cảm",
];

export const ABOUT_CLOSING: readonly RichText[] = [
  ["Với phương châm ” Phục vụ khách hàng bằng cả trái tim “, Công Ty TNHH TƯ VẤN & DỊCH VỤ NGỌC HOÀNG cam kết mang lại dịch vụ Thuế Kế Toán chuyên nghiệp và uy tín với chi phí hợp lý nhất cho mọi doanh nghiệp trên toàn quốc."],
  ["Dù bạn có chọn NGỌC HOÀNG hay không, bạn có thể chia sẻ khó khăn mà bạn đang gặp phải về vấn đề thuế – kế toán nếu như bạn đang cần được tư vấn ngay bây giờ!"],
  [
    "Ngọc Hoàng là công ty chuyên nghiệp và hàng đầu về ",
    { b: "dịch vụ kế toán thuế" },
    ", lập báo cáo tài chính, tư vấn thành lập công ty.",
  ],
];

/** Đoạn có số hotline – phần số điện thoại được render thành liên kết gọi. */
export const ABOUT_HOTLINE_PARAGRAPH = {
  before: ["Nếu bạn đang có ý định ", { b: "Thành lập công ty, đăng ký thuế kế toán" }, ", đừng ngần ngại liên hệ với chúng tôi theo số hotline "] as RichText,
  after: " để được tư vấn từ A-Z về chính sách, thủ tục, các vấn đề cần thiết, kiến thức kế toán… Ngọc Hoàng – sự lựa chọn hàng đầu khi bạn muốn tìm đơn vị chuyên nghiệp để đồng hành trong suốt quá trình hoạt động công ty.",
} as const;

export const ABOUT_CONTACT_HEADING = "Liên Hệ Công Ty TNHH Tư vấn & Dịch vụ Ngọc Hoàng";
export const ABOUT_CONTACT_OFFICE = "Văn Phòng Thôn Phú Hòa, Xã Bà Nà, Thành phố Đà Nẵng";
