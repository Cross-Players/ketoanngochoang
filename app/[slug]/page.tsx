import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage, serviceMetadata } from "@/components/ServiceDetailPage";
import { WorkflowDetailPage, workflowMetadata } from "@/components/WorkflowDetailPage";
import { SERVICE_PAGES, getServicePage } from "@/data/services";
import { WORKFLOW_STEPS, getWorkflowStep } from "@/data/site";

/**
 * Một route cho mọi trang chi tiết ở cấp gốc, xuất tĩnh lúc build:
 * - 6 trang dịch vụ (data/services.ts → components/ServiceDetailPage.tsx), vd. /dich-vu-ke-toan-da-nang/
 * - 4 bước quy trình (WORKFLOW_STEPS → components/WorkflowDetailPage.tsx), vd. /tiep-nhan-thong-tin/
 * Slug lạ → 404 (app/not-found.tsx).
 */
export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return [...SERVICE_PAGES, ...WORKFLOW_STEPS].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (service) return serviceMetadata(service);
  const step = getWorkflowStep(slug);
  return step ? workflowMetadata(step) : {};
}

export default async function DetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (service) return <ServiceDetailPage page={service} />;
  const step = getWorkflowStep(slug);
  if (!step) notFound();
  return <WorkflowDetailPage step={step} />;
}
