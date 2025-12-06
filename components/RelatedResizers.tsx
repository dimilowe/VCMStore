"use client";

import Link from "next/link";
import { Youtube, Instagram, Video, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { platformImagePresets } from "@/data/platformImagePresets";

const iconMap: Record<string, React.ElementType> = {
  "youtube-thumbnail": Youtube,
  "instagram-post": Instagram,
  "instagram-story": Instagram,
  "tiktok-cover": Video,
  "twitter-header": Twitter,
  "linkedin-banner": Linkedin,
};

const bgMap: Record<string, string> = {
  "youtube-thumbnail": "bg-red-500",
  "instagram-post": "bg-pink-500",
  "instagram-story": "bg-purple-500",
  "tiktok-cover": "bg-gray-900",
  "twitter-header": "bg-sky-500",
  "linkedin-banner": "bg-blue-700",
};

type RelatedResizersProps = {
  currentPresetId: string;
};

export default function RelatedResizers({ currentPresetId }: RelatedResizersProps) {
  const otherPresets = platformImagePresets.filter(p => p.id !== currentPresetId);

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">More Image Resizers</h2>
        <Link
          href="/tools/social-media-image-sizes"
          className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
        >
          View All Sizes <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {otherPresets.map((preset) => {
          const IconComponent = iconMap[preset.id] || Youtube;
          const bgClass = bgMap[preset.id] || "bg-gray-500";
          
          return (
            <Link
              key={preset.id}
              href={`/tools/${preset.slug}`}
              className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-md transition-all group"
            >
              <div className={`w-10 h-10 ${bgClass} rounded-lg flex items-center justify-center mb-2`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-800 text-center group-hover:text-orange-600">
                {preset.name.replace(' Resizer', '')}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {preset.width}×{preset.height}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <p className="text-sm text-orange-800">
          <strong>Pro tip:</strong> Bookmark our{" "}
          <Link href="/tools/social-media-image-sizes" className="underline hover:text-orange-900">
            Social Media Image Size Guide
          </Link>{" "}
          for quick reference to all platform dimensions.
        </p>
      </div>
    </section>
  );
}
