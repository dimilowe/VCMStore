'use client';

import Link from 'next/link';
import { Clock, ArrowLeft, Wrench } from 'lucide-react';
import { ToolForRenderer } from '@/lib/cms/getCmsToolBySlug';

interface ToolComingSoonProps {
  tool: ToolForRenderer;
}

export default function ToolComingSoon({ tool }: ToolComingSoonProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-orange-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {tool.name}
          </h1>

          {tool.description && (
            <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
              {tool.description}
            </p>
          )}

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium mb-8">
            <Wrench className="w-4 h-4" />
            Coming Soon
          </div>

          <div className="border-t pt-6 mt-6">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              {tool.engine && (
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">Engine:</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded">{tool.engine}</span>
                </div>
              )}
              {tool.interlinkParent && (
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">Parent:</span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded">
                    {tool.interlinkParent}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            This tool is being developed as part of the VCM Suite creator toolkit.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 mt-4 text-orange-600 hover:text-orange-700 font-medium"
          >
            Explore available tools
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
