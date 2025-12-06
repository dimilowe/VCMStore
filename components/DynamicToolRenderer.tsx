"use client";

import { ToolSkin } from "@/data/engineKeywordMatrix";
import { AutomatedToolLinks, AutomatedBreadcrumbs, ToolSchemaScript } from "@/components/AutomatedLinks";
import PlatformImageToolClient from "@/components/PlatformImageToolClient";
import { getPresetBySlug } from "@/data/platformImagePresets";

interface DynamicToolRendererProps {
  skin: ToolSkin;
}

export default function DynamicToolRenderer({ skin }: DynamicToolRendererProps) {
  const renderEngine = () => {
    switch (skin.engineType) {
      case "platform-resizer":
        const preset = getPresetBySlug(skin.slug);
        if (preset) {
          return <PlatformImageToolClient preset={preset} />;
        }
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{skin.h1}</h2>
            <p className="text-gray-600 mb-6">{skin.introCopy}</p>
            {skin.dimensions && (
              <div className="text-4xl font-mono text-orange-500 mb-4">
                {skin.dimensions.width} × {skin.dimensions.height}
              </div>
            )}
            <p className="text-sm text-gray-500">
              This tool variant is coming soon. Check our other resizer tools.
            </p>
          </div>
        );
      
      case "calculator":
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{skin.h1}</h2>
            <p className="text-gray-600 mb-6">{skin.introCopy}</p>
            <p className="text-sm text-gray-500">
              Calculator engine implementation coming soon.
            </p>
          </div>
        );
      
      case "ai-analysis":
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{skin.h1}</h2>
            <p className="text-gray-600 mb-6">{skin.introCopy}</p>
            <p className="text-sm text-gray-500">
              AI analysis engine implementation coming soon.
            </p>
          </div>
        );
      
      default:
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{skin.h1}</h2>
            <p className="text-gray-600">{skin.introCopy}</p>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <AutomatedBreadcrumbs currentToolSlug={skin.slug} />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{skin.h1}</h1>
          <p className="text-lg text-gray-600">{skin.introCopy}</p>
        </div>
        
        {renderEngine()}
        
        <AutomatedToolLinks currentToolSlug={skin.slug} />
        
        <ToolSchemaScript currentToolSlug={skin.slug} />
      </div>
    </main>
  );
}
