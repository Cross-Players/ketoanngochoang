import type { Metadata } from "next";
import { ServiceDetailPage, serviceMetadata } from "@/components/ServiceDetailPage";
import { getServicePage } from "@/data/services";

const page = getServicePage("dich-vu-tinh-luong-da-nang");

export const metadata: Metadata = serviceMetadata(page);

export default function Page() {
  return <ServiceDetailPage page={page} />;
}
