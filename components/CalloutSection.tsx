export function CalloutSection() {
  return (
    <section className="callout" id="thanh-lap">
      <div className="container callout-inner">
        {/* 3 dòng canh giữa trên desktop (kiểu TIM SEN); trên mobile các dòng tự chảy liền nhau. */}
        <p>
          <span className="callout-line">Hỗ trợ hoàn tất thủ tục thành lập công ty, và kế toán của bạn nhanh chóng và dễ dàng hơn</span>{" "}
          <span className="callout-line">đó là hoạt động mỗi ngày của Ngọc Hoàng thông qua các gói dịch vụ mà chúng tôi cung cấp</span>{" "}
          <span className="callout-line">cho khách hàng với chi phí hợp lý</span>
        </p>
        <div className="button-row">
          <a className="button button-outline callout-button" href="#lien-he">Đăng ký ngay</a>
          <a className="button button-outline callout-button" href="#dich-vu">Tìm hiểu thêm</a>
        </div>
      </div>
    </section>
  );
}
