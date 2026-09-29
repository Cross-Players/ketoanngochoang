import { BENEFITS } from "@/data/site";
import { getPublicAssetPath } from "@/lib/site-paths";

/** Danh sách lý do chọn Ngọc Hoàng (BENEFITS) – dùng chung cho trang chủ và trang dịch vụ. */
export function BenefitList({ className }: { className?: string }) {
  return (
    <ul className={className ? `benefit-list ${className}` : "benefit-list"}>
      {BENEFITS.map((benefit) => (
        <li key={benefit.title}>
          <img src={getPublicAssetPath("/assets/tick-1-300x300-c2a0320a.png")} alt="" width="40" height="40" loading="lazy" />
          <div><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
        </li>
      ))}
    </ul>
  );
}
