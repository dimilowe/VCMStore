import type { EngineType } from "@/engines";
import type { SearchIntent } from "@/data/toolsRegistry";
import type { ToolSegment, ToolSkin, ToolPriority } from "@/data/engineKeywordMatrix";

export interface LinkRules {
  siblingsPerTool: number;
  articlesPerTool: number;
  pillarSlug?: string;
  defaultCTAs: {
    quickCTA?: string;
    bottomCTA?: string;
  };
}

export interface DimensionArray {
  id: string;
  label: string;
  values: DimensionValue[];
}

export interface DimensionValue {
  id: string;
  label: string;
  variations?: string[];
  config?: Record<string, unknown>;
}

export interface SlugPattern {
  template: string;
  transform?: (parts: Record<string, string>) => string;
}

export interface EngineBlueprint {
  id: string;
  engineId: EngineType;
  name: string;
  description: string;
  segment: ToolSegment;
  
  slugPattern: SlugPattern;
  titlePattern: string;
  keywordPattern: string;
  descriptionPattern: string;
  
  dimensions: DimensionArray[];
  
  clusterResolver: (combo: CartesianCombo) => string | undefined;
  
  linkRules: LinkRules;
  
  defaults: {
    priority: ToolPriority;
    isIndexed: boolean;
    inDirectory: boolean;
    searchIntent: SearchIntent;
  };
  
  inputType: "image" | "text" | "url" | "file" | "number" | "selection" | "none" | "multi";
  outputType: "image" | "text" | "file" | "download" | "analysis" | "display" | "interactive";
}

export interface CartesianCombo {
  dimensions: Record<string, DimensionValue>;
  slug: string;
  name: string;
  primaryKeyword: string;
  description: string;
  engineId: EngineType;
  segment: ToolSegment;
}

export interface GeneratedShell {
  slug: string;
  name: string;
  engineType: EngineType;
  segment: ToolSegment;
  priority: ToolPriority;
  isIndexed: boolean;
  inDirectory: boolean;
  clusterSlug?: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  h1: string;
  metaDescription: string;
  introCopy: string;
  linkRules: LinkRules;
  dimensions: Record<string, string>;
  createdAt: string;
  status: "draft" | "ready" | "indexed";
}

export interface ExpansionResult {
  engineId: string;
  createdCount: number;
  skippedCount: number;
  created: string[];
  skipped: string[];
  errors: string[];
  warnings: string[];
  missingClusters: string[];
}

function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] || `{${key}}`);
}

export function generateCartesianCombos(blueprint: EngineBlueprint): CartesianCombo[] {
  const { dimensions, slugPattern, titlePattern, keywordPattern, descriptionPattern, engineId, segment } = blueprint;
  
  if (dimensions.length === 0) {
    return [];
  }
  
  const dimensionArrays = dimensions.map(d => 
    d.values.map(v => ({ dimensionId: d.id, value: v }))
  );
  
  function cartesian<T>(arrays: T[][]): T[][] {
    if (arrays.length === 0) return [[]];
    const [first, ...rest] = arrays;
    const restCombos = cartesian(rest);
    return first.flatMap(item => restCombos.map(combo => [item, ...combo]));
  }
  
  const allCombos = cartesian(dimensionArrays);
  
  return allCombos.map(combo => {
    const dimensionsMap: Record<string, DimensionValue> = {};
    const valuesMap: Record<string, string> = {};
    
    for (const { dimensionId, value } of combo) {
      dimensionsMap[dimensionId] = value;
      valuesMap[dimensionId] = value.id;
      valuesMap[`${dimensionId}_label`] = value.label;
    }
    
    let slug: string;
    if (slugPattern.transform) {
      slug = slugPattern.transform(valuesMap);
    } else {
      slug = interpolate(slugPattern.template, valuesMap);
    }
    
    slug = slug.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    
    const name = interpolate(titlePattern, valuesMap);
    const primaryKeyword = interpolate(keywordPattern, valuesMap).toLowerCase();
    const description = interpolate(descriptionPattern, valuesMap);
    
    return {
      dimensions: dimensionsMap,
      slug,
      name,
      primaryKeyword,
      description,
      engineId,
      segment,
    };
  });
}

export function comboToShell(
  combo: CartesianCombo,
  blueprint: EngineBlueprint
): GeneratedShell {
  const clusterSlug = blueprint.clusterResolver(combo);
  
  const dimensionLabels: Record<string, string> = {};
  for (const [key, val] of Object.entries(combo.dimensions)) {
    dimensionLabels[key] = val.label;
  }
  
  return {
    slug: combo.slug,
    name: combo.name,
    engineType: blueprint.engineId,
    segment: combo.segment,
    priority: blueprint.defaults.priority,
    isIndexed: blueprint.defaults.isIndexed,
    inDirectory: blueprint.defaults.inDirectory,
    clusterSlug,
    primaryKeyword: combo.primaryKeyword,
    secondaryKeywords: [
      `${combo.primaryKeyword} free`,
      `${combo.primaryKeyword} online`,
      `best ${combo.primaryKeyword}`,
    ],
    searchIntent: blueprint.defaults.searchIntent,
    h1: combo.name,
    metaDescription: `${combo.description}. Free online tool, no signup required.`,
    introCopy: combo.description,
    linkRules: blueprint.linkRules,
    dimensions: dimensionLabels,
    createdAt: new Date().toISOString(),
    status: "draft",
  };
}

export function generateAllShells(blueprint: EngineBlueprint): GeneratedShell[] {
  const combos = generateCartesianCombos(blueprint);
  return combos.map(combo => comboToShell(combo, blueprint));
}

const BLUEPRINT_REGISTRY: Map<string, EngineBlueprint> = new Map();

export function registerBlueprint(blueprint: EngineBlueprint): void {
  BLUEPRINT_REGISTRY.set(blueprint.id, blueprint);
}

export function getBlueprint(id: string): EngineBlueprint | undefined {
  return BLUEPRINT_REGISTRY.get(id);
}

export function getAllBlueprints(): EngineBlueprint[] {
  return Array.from(BLUEPRINT_REGISTRY.values());
}

export function getBlueprintsByEngine(engineId: EngineType): EngineBlueprint[] {
  return getAllBlueprints().filter(b => b.engineId === engineId);
}
