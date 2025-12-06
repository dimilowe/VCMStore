import type { Metadata } from "next";
import { getToolSkinBySlug, ToolSkin } from "@/data/engineKeywordMatrix";
import { toolsRegistry } from "@/data/toolsRegistry";
import { isToolIndexed } from "@/lib/toolRollout";

export function generateToolMetadata(slug: string): Metadata {
  const skin = getToolSkinBySlug(slug);
  const indexed = isToolIndexed(slug);
  
  if (skin) {
    return {
      title: `${skin.h1} - Free Online Tool | VCM Suite`,
      description: skin.metaDescription,
      keywords: [skin.primaryKeyword, ...skin.secondaryKeywords].join(", "),
      openGraph: {
        title: skin.h1,
        description: skin.metaDescription,
        type: "website",
        siteName: "VCM Suite",
      },
      robots: indexed 
        ? { index: true, follow: true }
        : { index: false, follow: false },
    };
  }
  
  const tool = toolsRegistry.find(t => t.slug === slug);
  if (tool) {
    return {
      title: `${tool.name} - Free Online Tool | VCM Suite`,
      description: tool.description,
      openGraph: {
        title: tool.name,
        description: tool.description,
        type: "website",
        siteName: "VCM Suite",
      },
      robots: indexed 
        ? { index: true, follow: true }
        : { index: false, follow: false },
    };
  }
  
  return {
    title: "Free Online Tool | VCM Suite",
    description: "Free online tools for creators and entrepreneurs.",
    robots: { index: false, follow: false },
  };
}

export function getToolSkin(slug: string): ToolSkin | undefined {
  return getToolSkinBySlug(slug);
}

export function shouldIndexTool(slug: string): boolean {
  return isToolIndexed(slug);
}
