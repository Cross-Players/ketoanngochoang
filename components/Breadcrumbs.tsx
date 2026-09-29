import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbNode, type BreadcrumbItem } from "@/lib/seo";

/**
 * Breadcrumb hiển thị + JSON-LD BreadcrumbList từ CÙNG một danh sách (không lệch nhau).
 * Mục cuối là trang hiện tại (không có href); `path` là đường dẫn tương đối của trang, vd. "gioi-thieu/".
 */
export function Breadcrumbs({ items, path }: { items: readonly BreadcrumbItem[]; path: string }) {
  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        {items.map((item, index) => (
          <span className="breadcrumb-item" key={item.label}>
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </span>
        ))}
      </nav>
      <JsonLd nodes={[breadcrumbNode(items, path)]} />
    </>
  );
}
