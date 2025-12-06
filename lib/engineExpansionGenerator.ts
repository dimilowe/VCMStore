import fs from "fs";
import path from "path";
import {
  EngineBlueprint,
  GeneratedShell,
  ExpansionResult,
  generateAllShells,
  getBlueprint,
  getAllBlueprints,
} from "./engineBlueprint";

interface ShellsConfig {
  shells: Record<string, GeneratedShell>;
  lastUpdated: string;
}

const SHELLS_CONFIG_PATH = path.join(process.cwd(), "data/generatedShells.json");

function loadShellsConfig(): ShellsConfig {
  try {
    if (fs.existsSync(SHELLS_CONFIG_PATH)) {
      const data = fs.readFileSync(SHELLS_CONFIG_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading shells config:", error);
  }
  return { shells: {}, lastUpdated: new Date().toISOString() };
}

function saveShellsConfig(config: ShellsConfig): void {
  try {
    const dir = path.dirname(SHELLS_CONFIG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SHELLS_CONFIG_PATH, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error("Error saving shells config:", error);
    throw new Error("Failed to save shells configuration");
  }
}

export function runExpansion(blueprintId: string): ExpansionResult {
  const blueprint = getBlueprint(blueprintId);
  
  if (!blueprint) {
    return {
      engineId: blueprintId,
      createdCount: 0,
      skippedCount: 0,
      created: [],
      skipped: [],
      errors: [`Blueprint not found: ${blueprintId}`],
    };
  }
  
  return expandBlueprint(blueprint);
}

export function expandBlueprint(blueprint: EngineBlueprint): ExpansionResult {
  const config = loadShellsConfig();
  const shells = generateAllShells(blueprint);
  
  const result: ExpansionResult = {
    engineId: blueprint.id,
    createdCount: 0,
    skippedCount: 0,
    created: [],
    skipped: [],
    errors: [],
  };
  
  for (const shell of shells) {
    if (config.shells[shell.slug]) {
      result.skippedCount++;
      result.skipped.push(shell.slug);
    } else {
      config.shells[shell.slug] = shell;
      result.createdCount++;
      result.created.push(shell.slug);
    }
  }
  
  if (result.createdCount > 0) {
    config.lastUpdated = new Date().toISOString();
    saveShellsConfig(config);
  }
  
  return result;
}

export function expandAllBlueprints(): ExpansionResult[] {
  const blueprints = getAllBlueprints();
  return blueprints.map(bp => expandBlueprint(bp));
}

export function getGeneratedShell(slug: string): GeneratedShell | undefined {
  const config = loadShellsConfig();
  return config.shells[slug];
}

export function getAllGeneratedShells(): GeneratedShell[] {
  const config = loadShellsConfig();
  return Object.values(config.shells);
}

export function getShellsByEngine(engineId: string): GeneratedShell[] {
  return getAllGeneratedShells().filter(s => s.engineType === engineId);
}

export function getShellsByCluster(clusterSlug: string): GeneratedShell[] {
  return getAllGeneratedShells().filter(s => s.clusterSlug === clusterSlug);
}

export function getShellsByStatus(status: "draft" | "ready" | "indexed"): GeneratedShell[] {
  return getAllGeneratedShells().filter(s => s.status === status);
}

export function updateShellStatus(
  slug: string,
  updates: Partial<Pick<GeneratedShell, "status" | "isIndexed" | "inDirectory">>
): boolean {
  const config = loadShellsConfig();
  
  if (!config.shells[slug]) {
    return false;
  }
  
  config.shells[slug] = {
    ...config.shells[slug],
    ...updates,
  };
  
  config.lastUpdated = new Date().toISOString();
  saveShellsConfig(config);
  
  return true;
}

export function bulkUpdateShellStatus(
  slugs: string[],
  updates: Partial<Pick<GeneratedShell, "status" | "isIndexed" | "inDirectory">>
): { updated: string[]; notFound: string[] } {
  const config = loadShellsConfig();
  const updated: string[] = [];
  const notFound: string[] = [];
  
  for (const slug of slugs) {
    if (config.shells[slug]) {
      config.shells[slug] = {
        ...config.shells[slug],
        ...updates,
      };
      updated.push(slug);
    } else {
      notFound.push(slug);
    }
  }
  
  if (updated.length > 0) {
    config.lastUpdated = new Date().toISOString();
    saveShellsConfig(config);
  }
  
  return { updated, notFound };
}

export function deleteShell(slug: string): boolean {
  const config = loadShellsConfig();
  
  if (!config.shells[slug]) {
    return false;
  }
  
  delete config.shells[slug];
  config.lastUpdated = new Date().toISOString();
  saveShellsConfig(config);
  
  return true;
}

export function getExpansionStats(): {
  totalShells: number;
  byEngine: Record<string, number>;
  byStatus: Record<string, number>;
  byCluster: Record<string, number>;
} {
  const shells = getAllGeneratedShells();
  
  const byEngine: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  const byCluster: Record<string, number> = {};
  
  for (const shell of shells) {
    byEngine[shell.engineType] = (byEngine[shell.engineType] || 0) + 1;
    byStatus[shell.status] = (byStatus[shell.status] || 0) + 1;
    if (shell.clusterSlug) {
      byCluster[shell.clusterSlug] = (byCluster[shell.clusterSlug] || 0) + 1;
    }
  }
  
  return {
    totalShells: shells.length,
    byEngine,
    byStatus,
    byCluster,
  };
}

export function previewExpansion(blueprintId: string): {
  blueprint: EngineBlueprint | null;
  wouldCreate: string[];
  wouldSkip: string[];
  totalPotential: number;
} {
  const blueprint = getBlueprint(blueprintId);
  
  if (!blueprint) {
    return {
      blueprint: null,
      wouldCreate: [],
      wouldSkip: [],
      totalPotential: 0,
    };
  }
  
  const config = loadShellsConfig();
  const shells = generateAllShells(blueprint);
  
  const wouldCreate: string[] = [];
  const wouldSkip: string[] = [];
  
  for (const shell of shells) {
    if (config.shells[shell.slug]) {
      wouldSkip.push(shell.slug);
    } else {
      wouldCreate.push(shell.slug);
    }
  }
  
  return {
    blueprint,
    wouldCreate,
    wouldSkip,
    totalPotential: shells.length,
  };
}
