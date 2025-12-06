import type { Metadata } from "next";
import { getToolSkinBySlug, ToolSkin } from "@/data/engineKeywordMatrix";
import { toolsRegistry } from "@/data/toolsRegistry";

export function generateToolMetadata(slug: string): Metadata {
  const skin = getToolSkinBySlug(slug);
  
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
      robots: skin.isIndexed ? "index, follow" : "noindex, follow",
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
    };
  }
  
  return {
    title: "Free Online Tool | VCM Suite",
    description: "Free online tools for creators and entrepreneurs.",
  };
}

export function getToolSkin(slug: string): ToolSkin | undefined {
  return getToolSkinBySlug(slug);
}

export function shouldIndexTool(slug: string): boolean {
  const skin = getToolSkinBySlug(slug);
  return skin?.isIndexed ?? true;
}
