"use client";

import Link from "next/link";
import { CLOUD_CONFIG_BY_SLUG } from "@/lib/clouds";
import type { CloudSlug } from "@/lib/clouds";

interface CloudUpsellBlockProps {
  cloudSlugs: CloudSlug[];
}

export function CloudUpsellBlock({ cloudSlugs }: CloudUpsellBlockProps) {
  if (!cloudSlugs || cloudSlugs.length === 0) return null;

  const configs = cloudSlugs
    .map((slug) => CLOUD_CONFIG_BY_SLUG[slug])
    .filter(Boolean);

  if (configs.length === 0) return null;

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 p-6 bg-gradient-to-br from-white via-gray-50 to-orange-50">
      <h2 className="text-xl font-semibold mb-2 text-gray-900">
        Unlock full power with VCM Clouds
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        This tool is part of the VCM ecosystem. Subscribe to the matching Cloud(s)
        to unlock AI workflows, batch features, and pro-level automations.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {configs.map((cloud) => (
          <div
            key={cloud.slug}
            className="border border-gray-200 rounded-xl p-4 flex flex-col justify-between bg-white hover:shadow-md transition-shadow"
          >
            <div>
              <div className="text-sm font-semibold mb-1 text-gray-900">{cloud.name}</div>
              <div className="text-xs text-gray-500 mb-3">
                {cloud.shortDescription}
              </div>
            </div>
            <div>
              <Link
                href={`/store/${cloud.productSlug}`}
                className="inline-flex items-center text-xs font-medium text-orange-600 hover:text-orange-700 underline"
              >
                Explore {cloud.name} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
