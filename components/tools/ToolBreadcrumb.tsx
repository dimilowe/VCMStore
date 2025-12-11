import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ToolBreadcrumbProps {
  toolName: string;
  pillar?: {
    slug: string;
    title: string;
  } | null;
}

export function ToolBreadcrumb({ toolName, pillar }: ToolBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
      <Link href="/tools" className="hover:text-orange-500 transition-colors">
        Tools
      </Link>
      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
      {pillar ? (
        <>
          <Link 
            href={`/tools/${pillar.slug}`} 
            className="hover:text-orange-500 transition-colors"
          >
            {pillar.title}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        </>
      ) : null}
      <span className="text-gray-700 font-medium truncate max-w-[200px] sm:max-w-none">
        {toolName}
      </span>
    </nav>
  );
}
