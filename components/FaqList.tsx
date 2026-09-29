import type { FaqItem } from "@/data/site";

/** Danh sách hỏi đáp dạng mở/đóng – dùng chung cho trang chủ và trang dịch vụ (JSON-LD FAQPage lấy cùng dữ liệu). */
export function FaqList({ items, openFirst = false }: { items: readonly FaqItem[]; openFirst?: boolean }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details key={item.question} open={openFirst && index === 0}>
          <summary><h3>{item.question}</h3></summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
