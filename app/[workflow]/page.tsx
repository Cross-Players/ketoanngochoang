import { notFound } from "next/navigation";
import { WorkflowDetailPage, getWorkflowStep, workflowMetadata } from "@/components/WorkflowDetailPage";
import { WORKFLOW_STEPS } from "@/data/site";

/** Một template, 4 trang tĩnh: /tiep-nhan-thong-tin/, /tien-hanh-xu-ly/, /cap-nhat-tien-do/, /hoan-tra-ho-so/. */
export const dynamicParams = false;

type Params = Promise<{ workflow: string }>;

export function generateStaticParams() {
  return WORKFLOW_STEPS.map((step) => ({ workflow: step.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const step = getWorkflowStep((await params).workflow);
  return step ? workflowMetadata(step) : {};
}

export default async function WorkflowRoutePage({ params }: { params: Params }) {
  const step = getWorkflowStep((await params).workflow);
  if (!step) notFound();
  return <WorkflowDetailPage step={step} />;
}
