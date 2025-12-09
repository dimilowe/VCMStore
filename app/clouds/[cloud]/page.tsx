import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCmsCloudBySlug } from "@/lib/cms/getCmsCloudBySlug";
import CloudPageClient from "./CloudPageClient";

type Props = {
  params: Promise<{ cloud: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cloud: slug } = await params;
  const cloud = await getCmsCloudBySlug(slug);
  
  if (!cloud) {
    return { title: "Cloud Not Found" };
  }

  return {
    title: cloud.seoTitle,
    description: cloud.seoDescription,
  };
}

export default async function CloudPage({ params }: Props) {
  const { cloud: slug } = await params;
  const cloud = await getCmsCloudBySlug(slug);

  if (!cloud) {
    notFound();
  }

  return <CloudPageClient cloud={cloud} />;
}
