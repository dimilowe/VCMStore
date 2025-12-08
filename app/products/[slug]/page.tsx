import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import { VCMRenderer } from "@/components/renderers/VCMRenderer";
import { CMSObject } from "@/lib/types/cms";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

async function getProductFromCMS(slug: string): Promise<CMSObject | null> {
  const result = await query(
    `SELECT * FROM cms_objects WHERE slug = $1 AND type = 'product'`,
    [slug]
  );
  return result.rows[0] || null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cmsObject = await getProductFromCMS(slug);
  
  if (!cmsObject) {
    return { title: 'Product Not Found' };
  }
  
  return {
    title: cmsObject.data.seo_title || cmsObject.data.title,
    description: cmsObject.data.seo_description || cmsObject.data.description,
    openGraph: {
      title: cmsObject.data.seo_title || cmsObject.data.title,
      description: cmsObject.data.seo_description || cmsObject.data.description,
      images: cmsObject.data.thumbnail_url ? [cmsObject.data.thumbnail_url] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cmsObject = await getProductFromCMS(slug);

  if (!cmsObject) {
    notFound();
  }

  return <VCMRenderer cmsObject={cmsObject} />;
}
