"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Box, Layers, ChevronRight, Play, Check, AlertCircle, Loader2 } from "lucide-react";

interface BlueprintDimension {
  id: string;
  label: string;
  valueCount: number;
}

interface Blueprint {
  id: string;
  name: string;
  description: string;
  engineId: string;
  segment: string;
  dimensionCount: number;
  dimensions: BlueprintDimension[];
  potentialShells: number;
  linkRules: {
    siblingsPerTool: number;
    articlesPerTool: number;
    pillarSlug?: string;
  };
  defaults: {
    priority: string;
    isIndexed: boolean;
    inDirectory: boolean;
  };
}

interface ExpansionStats {
  totalShells: number;
  byEngine: Record<string, number>;
  byStatus: Record<string, number>;
  byCluster: Record<string, number>;
}

interface ExpansionResult {
  engineId: string;
  createdCount: number;
  skippedCount: number;
  created: string[];
  skipped: string[];
  errors: string[];
}

export default function EnginesAdminPage() {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [stats, setStats] = useState<ExpansionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanding, setExpanding] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, ExpansionResult>>({});

  useEffect(() => {
    loadBlueprints();
  }, []);

  async function loadBlueprints() {
    try {
      const res = await fetch("/api/admin/engines");
      const data = await res.json();
      setBlueprints(data.blueprints || []);
      setStats(data.stats || null);
    } catch (error) {
      console.error("Failed to load blueprints:", error);
    } finally {
      setLoading(false);
    }
  }

  async function runExpansion(blueprintId: string) {
    setExpanding(blueprintId);
    try {
      const res = await fetch("/api/admin/engines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "expand", blueprintId }),
      });
      const result = await res.json();
      setResults(prev => ({ ...prev, [blueprintId]: result }));
      loadBlueprints();
    } catch (error) {
      console.error("Expansion failed:", error);
    } finally {
      setExpanding(null);
    }
  }

  async function runAllExpansions() {
    setExpanding("all");
    try {
      const res = await fetch("/api/admin/engines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "expandAll" }),
      });
      const data = await res.json();
      for (const result of data.results) {
        setResults(prev => ({ ...prev, [result.engineId]: result }));
      }
      loadBlueprints();
    } catch (error) {
      console.error("Expansion failed:", error);
    } finally {
      setExpanding(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  const totalPotential = blueprints.reduce((sum, bp) => sum + bp.potentialShells, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/tools"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Zap className="w-6 h-6 text-orange-500" />
            Engine Expansion Factory
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border p-4">
            <div className="text-sm text-gray-500 mb-1">Blueprints</div>
            <div className="text-2xl font-bold text-gray-900">{blueprints.length}</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-sm text-gray-500 mb-1">Total Potential</div>
            <div className="text-2xl font-bold text-orange-600">{totalPotential}</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-sm text-gray-500 mb-1">Generated Shells</div>
            <div className="text-2xl font-bold text-green-600">{stats?.totalShells || 0}</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-sm text-gray-500 mb-1">Drafts</div>
            <div className="text-2xl font-bold text-gray-600">{stats?.byStatus?.draft || 0}</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Engine Blueprints</h2>
          <button
            onClick={runAllExpansions}
            disabled={expanding !== null}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {expanding === "all" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Expand All Blueprints
          </button>
        </div>

        <div className="space-y-4">
          {blueprints.map((blueprint) => {
            const result = results[blueprint.id];
            const isExpanding = expanding === blueprint.id;

            return (
              <div
                key={blueprint.id}
                className="bg-white rounded-lg border overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Box className="w-5 h-5 text-orange-500" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          {blueprint.name}
                        </h3>
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                          {blueprint.engineId}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded">
                          {blueprint.segment}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {blueprint.description}
                      </p>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {blueprint.dimensionCount} dimension{blueprint.dimensionCount !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {blueprint.dimensions.map(d => `${d.label} (${d.valueCount})`).join(" × ")}
                          </span>
                        </div>
                        <div className="font-medium text-orange-600">
                          = {blueprint.potentialShells} shells
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span>Links: {blueprint.linkRules.siblingsPerTool} siblings, {blueprint.linkRules.articlesPerTool} articles</span>
                        {blueprint.linkRules.pillarSlug && (
                          <span>Pillar: {blueprint.linkRules.pillarSlug}</span>
                        )}
                        <span>Default: {blueprint.defaults.priority}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => runExpansion(blueprint.id)}
                        disabled={expanding !== null}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        {isExpanding ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        Run Expansion
                      </button>

                      {result && (
                        <div className="text-right text-sm">
                          {result.createdCount > 0 && (
                            <div className="flex items-center gap-1 text-green-600">
                              <Check className="w-3 h-3" />
                              {result.createdCount} created
                            </div>
                          )}
                          {result.skippedCount > 0 && (
                            <div className="flex items-center gap-1 text-gray-500">
                              <AlertCircle className="w-3 h-3" />
                              {result.skippedCount} skipped
                            </div>
                          )}
                          {result.errors.length > 0 && (
                            <div className="text-red-500">
                              {result.errors.length} error(s)
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {stats && Object.keys(stats.byEngine).length > 0 && (
          <div className="mt-8 bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Shells by Engine</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(stats.byEngine).map(([engine, count]) => (
                <div key={engine} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">{engine}</div>
                  <div className="text-xl font-bold text-gray-900">{count}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">How It Works</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li><strong>Blueprints</strong> define engine + dimensions (platforms, niches, content types)</li>
            <li><strong>Run Expansion</strong> generates Cartesian product of all dimension combinations</li>
            <li>Each combo becomes a <strong>draft shell</strong> with unique slug, SEO metadata, and link rules</li>
            <li>Shells start as <strong>draft</strong>, not indexed - you control when to publish and index</li>
            <li><strong>Idempotent</strong>: Running twice won't create duplicates (skips existing slugs)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
