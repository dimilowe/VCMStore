'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Info, RefreshCw } from 'lucide-react';
import { ToolRecord } from '@/lib/toolsRepo';

interface CalculatorEngineProps {
  tool: ToolRecord;
}

interface MetricConfig {
  label: string;
  inputs: { key: string; label: string; placeholder: string; suffix?: string }[];
  formula: (values: Record<string, number>) => number;
  resultLabel: string;
  resultSuffix: string;
  description: string;
}

const METRIC_CONFIGS: Record<string, MetricConfig> = {
  'ctr': {
    label: 'Click-Through Rate',
    inputs: [
      { key: 'clicks', label: 'Clicks', placeholder: 'e.g., 1500' },
      { key: 'impressions', label: 'Impressions', placeholder: 'e.g., 50000' },
    ],
    formula: (v) => (v.clicks / v.impressions) * 100,
    resultLabel: 'CTR',
    resultSuffix: '%',
    description: 'Measures how often viewers click on your video after seeing the thumbnail.',
  },
  'cpm': {
    label: 'Cost Per Mille (CPM)',
    inputs: [
      { key: 'revenue', label: 'Revenue ($)', placeholder: 'e.g., 500' },
      { key: 'views', label: 'Monetized Views (thousands)', placeholder: 'e.g., 100' },
    ],
    formula: (v) => v.revenue / v.views,
    resultLabel: 'CPM',
    resultSuffix: ' USD',
    description: 'Revenue earned per 1,000 monetized video views.',
  },
  'avg-view-duration': {
    label: 'Average View Duration',
    inputs: [
      { key: 'totalWatchTime', label: 'Total Watch Time (minutes)', placeholder: 'e.g., 50000' },
      { key: 'views', label: 'Total Views', placeholder: 'e.g., 10000' },
    ],
    formula: (v) => v.totalWatchTime / v.views,
    resultLabel: 'Avg Duration',
    resultSuffix: ' min',
    description: 'Average time viewers spend watching your video.',
  },
  'retention': {
    label: 'Audience Retention',
    inputs: [
      { key: 'avgDuration', label: 'Avg View Duration (seconds)', placeholder: 'e.g., 180' },
      { key: 'videoLength', label: 'Video Length (seconds)', placeholder: 'e.g., 600' },
    ],
    formula: (v) => (v.avgDuration / v.videoLength) * 100,
    resultLabel: 'Retention',
    resultSuffix: '%',
    description: 'Percentage of your video that viewers watch on average.',
  },
  'clicks-per-impression': {
    label: 'Clicks per Impression',
    inputs: [
      { key: 'clicks', label: 'Clicks', placeholder: 'e.g., 1500' },
      { key: 'impressions', label: 'Impressions', placeholder: 'e.g., 50000' },
    ],
    formula: (v) => v.clicks / v.impressions,
    resultLabel: 'Clicks/Impression',
    resultSuffix: '',
    description: 'Raw ratio of clicks to impressions.',
  },
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
  'longform': 'Long-Form Videos',
  'shorts': 'YouTube Shorts',
};

function getMetricFromDimensions(dimensions: Record<string, any> | null): string {
  if (!dimensions) return 'ctr';
  return dimensions.metric || 'ctr';
}

function getContentTypeFromDimensions(dimensions: Record<string, any> | null): string {
  if (!dimensions) return 'longform';
  return dimensions.content_type || 'longform';
}

export default function CalculatorEngine({ tool }: CalculatorEngineProps) {
  const metric = getMetricFromDimensions(tool.dimensions);
  const contentType = getContentTypeFromDimensions(tool.dimensions);
  const config = METRIC_CONFIGS[metric] || METRIC_CONFIGS['ctr'];
  
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setResult(null);
    setError(null);
  };

  const calculate = () => {
    const numericValues: Record<string, number> = {};
    
    for (const input of config.inputs) {
      const val = parseFloat(values[input.key] || '0');
      if (isNaN(val) || val < 0) {
        setError(`Please enter a valid number for ${input.label}`);
        return;
      }
      numericValues[input.key] = val;
    }

    const divisorKey = config.inputs[1]?.key;
    if (divisorKey && numericValues[divisorKey] === 0) {
      setError(`${config.inputs[1].label} cannot be zero`);
      return;
    }

    try {
      const calcResult = config.formula(numericValues);
      setResult(Math.round(calcResult * 100) / 100);
      setError(null);
    } catch {
      setError('Calculation error. Please check your inputs.');
    }
  };

  const reset = () => {
    setValues({});
    setResult(null);
    setError(null);
  };

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

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-8 h-8" />
              <span className="px-2 py-0.5 bg-white/20 rounded text-sm">
                {CONTENT_TYPE_LABELS[contentType] || contentType}
              </span>
            </div>
            <h1 className="text-2xl font-bold">{tool.name}</h1>
            {tool.description && (
              <p className="mt-2 text-orange-100">{tool.description}</p>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg mb-6">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">{config.description}</p>
            </div>

            <div className="space-y-4">
              {config.inputs.map((input) => (
                <div key={input.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {input.label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder={input.placeholder}
                      value={values[input.key] || ''}
                      onChange={(e) => handleInputChange(input.key, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    {input.suffix && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {input.suffix}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={calculate}
                className="flex-1 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Calculate {config.resultLabel}
              </button>
              <button
                onClick={reset}
                className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                title="Reset"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {result !== null && (
              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="text-sm text-green-700 mb-1">{config.resultLabel}</div>
                <div className="text-4xl font-bold text-green-800">
                  {result.toLocaleString()}{config.resultSuffix}
                </div>
              </div>
            )}
          </div>
        </div>

        {tool.cluster && (
          <div className="mt-6 p-4 bg-white rounded-lg border text-center">
            <p className="text-sm text-gray-600">
              This tool is part of the{' '}
              <Link
                href={`/tools/clusters/${tool.cluster}`}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                {tool.cluster.replace(/-/g, ' ')}
              </Link>{' '}
              topic cluster.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
