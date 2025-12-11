import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";

interface Pillar {
  slug: string;
  title: string;
  description: string;
}

interface PillarCollectionsProps {
  pillars: Pillar[];
}

export function PillarCollections({ pillars }: PillarCollectionsProps) {
  if (pillars.length === 0) return null;
  
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-orange-500" />
          Tool Collections
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((pillar) => (
          <Link
            key={pillar.slug}
            href={`/tools/${pillar.slug}`}
            className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-200"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors mb-2">
              {pillar.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
              {pillar.description}
            </p>
            <span className="text-sm text-orange-500 font-medium flex items-center gap-1">
              View all tools <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
