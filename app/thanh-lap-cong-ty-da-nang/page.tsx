import type { Metadata } from "next";
import { ServiceDetailPage, serviceMetadata } from "@/components/ServiceDetailPage";
import { getServicePage } from "@/data/services";

const page = getServicePage("thanh-lap-cong-ty-da-nang");

export const metadata: Metadata = serviceMetadata(page);

export default function Page() {
  return <ServiceDetailPage page={page} />;
}
