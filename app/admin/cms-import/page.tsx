"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Upload, CheckCircle, AlertCircle, FileJson, Loader2 } from "lucide-react";

interface ImportResult {
  slug: string;
  type: string;
  status: "created" | "updated" | "error";
  health: "thin" | "ok" | "strong";
  word_count: number;
  error?: string;
}

interface ImportResponse {
  ok: boolean;
  count: number;
  created: number;
  updated: number;
  errors: number;
  results: ImportResult[];
}

interface ParsedPreview {
  slug: string;
  type: string;
  title?: string;
}

export default function CMSImportPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [parseError, setParseError] = useState<string | null>(null);
  const [preview, setPreview] = useState<ParsedPreview[]>([]);
  const [importing, setImporting] = useState(false);
  const [importResponse, setImportResponse] = useState<ImportResponse | null>(null);

  const handleValidate = () => {
    setParseError(null);
    setPreview([]);
    setImportResponse(null);

    if (!jsonInput.trim()) {
      setParseError("Please paste some JSON content");
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const objects = Array.isArray(parsed) ? parsed : [parsed];

      if (objects.length === 0) {
        setParseError("No objects found in JSON");
        return;
      }

      const previews: ParsedPreview[] = objects.map((obj) => ({
        slug: obj.slug || "(missing)",
        type: obj.type || "(missing)",
        title: obj.title || obj.seo?.title || "(no title)",
      }));

      setPreview(previews);
    } catch (e) {
      setParseError(`Invalid JSON: ${(e as Error).message}`);
    }
  };

  const handleImport = async () => {
    if (preview.length === 0) {
      setParseError("Please validate the JSON first");
      return;
    }

    setImporting(true);
    setImportResponse(null);

    try {
      const parsed = JSON.parse(jsonInput);
      const response = await fetch("/api/admin/cms/bulk-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const data = await response.json();

      if (!response.ok) {
        setParseError(data.error || "Import failed");
        return;
      }

      setImportResponse(data);
      setPreview([]);
    } catch (e) {
      setParseError(`Import error: ${(e as Error).message}`);
    } finally {
      setImporting(false);
    }
  };

  const handleClear = () => {
    setJsonInput("");
    setParseError(null);
    setPreview([]);
    setImportResponse(null);
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "strong":
        return "bg-green-100 text-green-800";
      case "ok":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "created":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "updated":
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CMS Import</h1>
            <p className="text-gray-600 mt-1">
              Bulk import CMS objects (tools, articles, products) from JSON
            </p>
          </div>
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileJson className="w-5 h-5 text-orange-500" />
                <h2 className="font-semibold text-gray-900">JSON Input</h2>
              </div>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder={`Paste your CMS JSON here...

Example:
[
  {
    "type": "tool",
    "slug": "image-resizer-online",
    "title": "Free Image Resizer Online",
    "engine_config": { "engine": "resizer" },
    "seo": { "title": "...", "description": "..." },
    "body": [...],
    "faq": [...]
  }
]`}
                className="w-full h-80 p-4 font-mono text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              />

              {parseError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{parseError}</p>
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleValidate}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Validate JSON
                </button>
                <button
                  onClick={handleImport}
                  disabled={preview.length === 0 || importing}
                  className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {importing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Import {preview.length > 0 ? `(${preview.length})` : ""}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {preview.length > 0 && !importResponse && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-semibold text-gray-900 mb-4">
                  Preview ({preview.length} objects)
                </h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {preview.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.slug}</p>
                        <p className="text-sm text-gray-500">{item.title}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded">
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {importResponse && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  {importResponse.ok ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-yellow-500" />
                  )}
                  <div>
                    <h2 className="font-semibold text-gray-900">Import Complete</h2>
                    <p className="text-sm text-gray-600">
                      {importResponse.created} created, {importResponse.updated} updated
                      {importResponse.errors > 0 && `, ${importResponse.errors} errors`}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {importResponse.results.map((result, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(result.status)}
                        <div>
                          <p className="font-medium text-gray-900">{result.slug}</p>
                          <p className="text-sm text-gray-500">
                            {result.word_count} words
                            {result.error && (
                              <span className="text-red-600 ml-2">{result.error}</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${getHealthColor(
                            result.health
                          )}`}
                        >
                          {result.health}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded">
                          {result.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Next step:</strong> Go to{" "}
                    <a href="/admin/seo-control" className="underline">
                      SEO Control Center
                    </a>{" "}
                    to review and enable indexing for your new pages.
                  </p>
                </div>
              </div>
            )}

            {preview.length === 0 && !importResponse && (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
                <FileJson className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Paste JSON and click &quot;Validate&quot; to preview
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                1
              </div>
              <p className="text-gray-600">
                Generate CMS objects with ChatGPT prompts
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                2
              </div>
              <p className="text-gray-600">
                Paste JSON here and validate
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                3
              </div>
              <p className="text-gray-600">
                Import to create pages in database
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                4
              </div>
              <p className="text-gray-600">
                Enable indexing in SEO Control Center
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
