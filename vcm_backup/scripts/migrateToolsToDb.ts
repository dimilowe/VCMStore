import { toolsRegistry, Tool } from "../data/toolsRegistry";
import { upsertTool, NewToolInput, getToolCount } from "../lib/toolsRepo";

export async function migrateToolsToDatabase(): Promise<{
  migrated: number;
  skipped: number;
  errors: string[];
}> {
  const result = {
    migrated: 0,
    skipped: 0,
    errors: [] as string[],
  };

  console.log(`Starting migration of ${toolsRegistry.length} tools from registry to database...`);

  for (const tool of toolsRegistry) {
    try {
      const toolInput: NewToolInput = {
        slug: tool.slug,
        name: tool.name,
        description: tool.description,
        engine: tool.engineType,
        cluster: tool.clusterSlug || undefined,
        segment: undefined,
        status: 'published',
        linkStatus: 'Ready',
        isIndexed: true,
        inDirectory: true,
        featured: tool.isTrending || false,
        blueprintId: undefined,
        dimensions: {},
        linkRules: {},
        category: tool.category,
        tags: tool.tags,
        icon: tool.icon,
        iconBg: tool.iconBg,
        priority: tool.priority,
        isNew: tool.isNew || false,
        isTrending: tool.isTrending || false,
        isMbb: tool.isMBB || false,
        inputType: tool.inputType,
        outputType: tool.outputType,
        primaryKeyword: tool.primaryKeyword || undefined,
        secondaryKeywords: tool.secondaryKeywords || undefined,
        searchIntent: tool.searchIntent || undefined,
        pillarSlug: tool.pillarSlug || undefined,
        recommendedTools: tool.recommendedTools || undefined,
        recommendedArticles: tool.recommendedArticles || undefined,
        relatedTools: tool.relatedTools || undefined,
        relatedArticles: tool.relatedArticles || undefined,
        source: 'legacy',
      };

      await upsertTool(toolInput);
      result.migrated++;
      console.log(`  Migrated: ${tool.slug}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push(`${tool.slug}: ${errorMessage}`);
      console.error(`  Error migrating ${tool.slug}: ${errorMessage}`);
    }
  }

  console.log(`\nMigration complete: ${result.migrated} migrated, ${result.skipped} skipped, ${result.errors.length} errors`);
  return result;
}

export async function getMigrationStats(): Promise<{
  registryCount: number;
  dbTotalCount: number;
  dbLegacyCount: number;
  dbExpansionCount: number;
}> {
  const [dbTotalCount, dbLegacyCount, dbExpansionCount] = await Promise.all([
    getToolCount(),
    getToolCount({ source: 'legacy' }),
    getToolCount({ source: 'expansion' }),
  ]);

  return {
    registryCount: toolsRegistry.length,
    dbTotalCount,
    dbLegacyCount,
    dbExpansionCount,
  };
}
