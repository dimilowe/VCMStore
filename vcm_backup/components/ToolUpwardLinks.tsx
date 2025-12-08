"use client";

import Link from "next/link";
import { FolderOpen, Layers } from "lucide-react";
import { getToolLinkInfo } from "@/lib/toolInterlinking";

interface ToolUpwardLinksProps {
  toolSlug: string;
}

export function ToolUpwardLinks({ toolSlug }: ToolUpwardLinksProps) {
  const linkInfo = getToolLinkInfo(toolSlug);
  
  if (!linkInfo.pillarUrl && !linkInfo.categoryUrl) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {linkInfo.pillarUrl && (
        <Link
          href={linkInfo.pillarUrl}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 rounded-lg text-sm font-medium transition-colors"
        >
          <Layers className="w-4 h-4" />
          <span>View all tools in this collection</span>
        </Link>
      )}
      
      {linkInfo.categoryUrl && (
        <Link
          href={linkInfo.categoryUrl}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 rounded-lg text-sm font-medium transition-colors"
        >
          <FolderOpen className="w-4 h-4" />
          <span>More {linkInfo.categoryLabel}</span>
        </Link>
      )}
    </div>
  );
}

export function ToolBreadcrumbs({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const linkInfo = getToolLinkInfo(toolSlug);

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">
      <Link href="/tools" className="hover:text-orange-500 transition-colors">
        Tools
      </Link>
      
      {linkInfo.categoryUrl && (
        <>
          <span>/</span>
          <Link href={linkInfo.categoryUrl} className="hover:text-orange-500 transition-colors">
            {linkInfo.categoryLabel}
          </Link>
        </>
      )}
      
      {linkInfo.pillarUrl && (
        <>
          <span>/</span>
          <Link href={linkInfo.pillarUrl} className="hover:text-orange-500 transition-colors truncate max-w-[200px]">
            {linkInfo.pillarTitle}
          </Link>
        </>
      )}
      
      <span>/</span>
      <span className="text-gray-900 font-medium truncate max-w-[200px]">{toolName}</span>
    </nav>
  );
}
