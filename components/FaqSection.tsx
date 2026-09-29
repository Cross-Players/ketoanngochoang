import { COMPANY, FAQ_ITEMS } from "@/data/site";

const LINKABLE_DOMAIN = "baohiemxahoi.gov.vn";

function renderAnswer(answer: string) {
  const index = answer.indexOf(LINKABLE_DOMAIN);
  if (index === -1) return answer;
  return (
    <>
      {answer.slice(0, index)}
      <a href={`https://${LINKABLE_DOMAIN}/`} target="_blank" rel="noopener noreferrer">{LINKABLE_DOMAIN}</a>
      {answer.slice(index + LINKABLE_DOMAIN.length)}
    </>
  );
}

export function FaqSection() {
  return (
    <section className="faq section-space" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <h2 className="section-title" id="faq-title"><span className="section-title-text">CÂU HỎI THƯỜNG GẶP VỀ DỊCH VỤ TẠI ĐÀ NẴNG</span></h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary><h3>{item.question}</h3></summary>
              <p>{renderAnswer(item.answer)}</p>
            </details>
          ))}
        </div>
        <p className="faq-contact">Chưa thấy câu hỏi của bạn? Gọi hoặc nhắn Zalo <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>.</p>
      </div>
    </section>
  );
}
