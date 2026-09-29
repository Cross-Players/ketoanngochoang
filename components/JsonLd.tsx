import { serializeJsonLd, type JsonLdNode } from "@/lib/seo";

/** Dữ liệu có cấu trúc schema.org cho trang; bỏ qua các nút undefined (vd. khi chưa có URL công khai). */
export function JsonLd({ nodes }: { nodes: ReadonlyArray<JsonLdNode | undefined> }) {
  const graph = nodes.filter((node): node is JsonLdNode => Boolean(node));
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />;
}
