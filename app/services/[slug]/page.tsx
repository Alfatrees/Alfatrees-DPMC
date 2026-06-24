import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICE_DETAILS } from "@/lib/constants";
import { ServiceDetailPage } from "@/components/services/service-detail-page";

const VALID_SLUGS = Object.keys(SERVICE_DETAILS);

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = SERVICE_DETAILS[slug];
  if (!data) return {};

  return {
    title: `${data.title} Services`,
    description: data.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = SERVICE_DETAILS[slug];

  if (!data) {
    notFound();
  }

  return <ServiceDetailPage data={data} />;
}
