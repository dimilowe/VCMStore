'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Info, RefreshCw, ChevronDown, ChevronUp, Flame, Bell, QrCode, ArrowRight, BookOpen } from 'lucide-react';
import { ToolRecord } from '@/lib/toolsRepo';

interface CalculatorEngineProps {
  tool: ToolRecord;
}

interface FAQ {
  question: string;
  answer: string;
}

interface MetricPreset {
  label: string;
  badgeLabel: string;
  explanation: string;
  inputs: { key: string; label: string; placeholder: string; suffix?: string }[];
  formula: (values: Record<string, number>) => number;
  resultLabel: string;
  resultSuffix: string;
  goodRange?: string;
  faqs: FAQ[];
}

const YOUTUBE_METRIC_PRESETS: Record<string, MetricPreset> = {
  'ctr': {
    label: 'Click-Through Rate',
    badgeLabel: 'CTR',
    explanation: 'Click-Through Rate (CTR) measures how often viewers click on your video after seeing the thumbnail. A higher CTR means your thumbnail and title are compelling viewers to watch.',
    inputs: [
      { key: 'clicks', label: 'Clicks', placeholder: 'e.g., 1500' },
      { key: 'impressions', label: 'Impressions', placeholder: 'e.g., 50000' },
    ],
    formula: (v) => (v.clicks / v.impressions) * 100,
    resultLabel: 'CTR',
    resultSuffix: '%',
    goodRange: 'A good YouTube CTR is typically 4-10%. Top performers often see 10%+.',
    faqs: [
      {
        question: 'What is a good YouTube CTR?',
        answer: 'A good YouTube CTR typically ranges from 4-10%. However, this varies by niche. Educational content often sees 2-6%, while entertainment can reach 8-15%. New channels might see lower CTRs as YouTube tests your content with different audiences.',
      },
      {
        question: 'How can I improve my YouTube CTR?',
        answer: 'Focus on creating compelling thumbnails with bright colors, expressive faces, and readable text. Write titles that spark curiosity without being clickbait. A/B test different thumbnails using YouTube\'s built-in feature or tools like Nudge.',
      },
      {
        question: 'Does CTR affect YouTube algorithm?',
        answer: 'Yes, CTR is one of the key signals YouTube uses to determine if your content is worth recommending. Higher CTR combined with good retention tells YouTube your content delivers on its promise.',
      },
      {
        question: 'Why is my YouTube CTR dropping?',
        answer: 'CTR often drops when YouTube expands your audience reach. This is normal - as your video is shown to less targeted viewers, fewer will click. Focus on maintaining a balance between CTR and total impressions.',
      },
    ],
  },
  'cpm': {
    label: 'CPM (Revenue per 1K Views)',
    badgeLabel: 'CPM',
    explanation: 'CPM (Cost Per Mille) represents how much you earn per 1,000 monetized video views. Higher CPM indicates better ad revenue performance.',
    inputs: [
      { key: 'revenue', label: 'Total Revenue ($)', placeholder: 'e.g., 500' },
      { key: 'views', label: 'Monetized Views (in thousands)', placeholder: 'e.g., 100' },
    ],
    formula: (v) => v.revenue / v.views,
    resultLabel: 'CPM',
    resultSuffix: ' USD',
    goodRange: 'Average YouTube CPM ranges from $1-5. Finance, tech, and B2B niches can see $10-50+.',
    faqs: [
      {
        question: 'What affects YouTube CPM rates?',
        answer: 'CPM varies by niche (finance/tech pay more), audience location (US/UK viewers = higher CPM), time of year (Q4 is highest), and video length (8+ min videos allow mid-roll ads). Advertiser demand in your category is the biggest factor.',
      },
      {
        question: 'Why is my CPM so low?',
        answer: 'Low CPM usually means: audience in lower-paying regions, content not attractive to advertisers, videos too short for mid-roll ads, or off-season timing. Niches like gaming and vlogs typically have lower CPMs than business or finance.',
      },
      {
        question: 'How can I increase my YouTube CPM?',
        answer: 'Create longer videos (8+ minutes) for mid-roll ads, target high-CPM topics, grow your US/UK audience, post during Q4 when ad spend peaks, and ensure your content is brand-safe for premium advertisers.',
      },
      {
        question: 'What is the difference between CPM and RPM?',
        answer: 'CPM is what advertisers pay per 1,000 ad impressions. RPM (Revenue Per Mille) is what you actually earn per 1,000 views after YouTube\'s 45% cut. RPM is typically 40-60% of CPM.',
      },
    ],
  },
  'avg-view-duration': {
    label: 'Average View Duration',
    badgeLabel: 'AVD',
    explanation: 'Average View Duration shows how long viewers typically watch your videos. It\'s calculated by dividing total watch time by total views.',
    inputs: [
      { key: 'totalWatchTime', label: 'Total Watch Time (minutes)', placeholder: 'e.g., 50000' },
      { key: 'views', label: 'Total Views', placeholder: 'e.g., 10000' },
    ],
    formula: (v) => v.totalWatchTime / v.views,
    resultLabel: 'Avg Duration',
    resultSuffix: ' min',
    goodRange: 'Aim for 50%+ of your video length. For a 10-min video, 5+ minutes is solid.',
    faqs: [
      {
        question: 'What is a good average view duration on YouTube?',
        answer: 'A good average view duration is typically 50% or more of your video length. For a 10-minute video, aim for 5+ minutes. However, this varies - tutorials may have lower AVD as viewers leave once they learn what they need.',
      },
      {
        question: 'How do I increase average view duration?',
        answer: 'Hook viewers in the first 30 seconds, use pattern interrupts every 30-60 seconds, promise and deliver value throughout, avoid long intros, and use chapters to help viewers navigate. End screens can also extend watch time.',
      },
      {
        question: 'Does average view duration affect recommendations?',
        answer: 'Yes, AVD is crucial for YouTube recommendations. Videos with high AVD signal quality content to the algorithm. YouTube wants to keep viewers on the platform, so it promotes videos that hold attention.',
      },
      {
        question: 'Why is my view duration low on Shorts?',
        answer: 'Shorts AVD works differently - viewers swipe quickly, so even 5-10 seconds can be good for a 30-second Short. Focus on immediate hooks and quick payoffs for Shorts content.',
      },
    ],
  },
  'retention': {
    label: 'Audience Retention Rate',
    badgeLabel: 'Retention',
    explanation: 'Audience Retention measures what percentage of your video viewers watch on average. It\'s one of the most important metrics for YouTube algorithm success.',
    inputs: [
      { key: 'avgDuration', label: 'Avg View Duration (seconds)', placeholder: 'e.g., 180' },
      { key: 'videoLength', label: 'Video Length (seconds)', placeholder: 'e.g., 600' },
    ],
    formula: (v) => (v.avgDuration / v.videoLength) * 100,
    resultLabel: 'Retention',
    resultSuffix: '%',
    goodRange: 'Aim for 40-60% retention. Top videos often achieve 70%+.',
    faqs: [
      {
        question: 'What is a good retention rate on YouTube?',
        answer: '40-60% retention is considered good for most content. Educational videos might see 30-50%, while highly engaging entertainment can reach 60-80%. The key is improving relative to your own past performance.',
      },
      {
        question: 'How does retention affect my videos?',
        answer: 'Retention is the #1 signal YouTube uses for recommendations. High retention = more suggested video placements = more views. A video with 50% retention will typically outperform one with 30% retention.',
      },
      {
        question: 'What causes retention drops?',
        answer: 'Common causes: long intros, unfulfilled promises, pacing issues, off-topic tangents, low energy sections, and natural stopping points. Use YouTube Analytics retention graph to identify exactly where viewers leave.',
      },
      {
        question: 'Is 50% retention good for YouTube Shorts?',
        answer: 'For Shorts, retention works differently since videos are so short. Aim for 80%+ retention on Shorts - viewers who watch to the end are more likely to engage and see your content again.',
      },
    ],
  },
  'clicks-per-impression': {
    label: 'Clicks per Impression Ratio',
    badgeLabel: 'CPI',
    explanation: 'Clicks per Impression shows the raw ratio of how many viewers clicked after seeing your video. This helps analyze thumbnail performance.',
    inputs: [
      { key: 'clicks', label: 'Total Clicks', placeholder: 'e.g., 1500' },
      { key: 'impressions', label: 'Total Impressions', placeholder: 'e.g., 50000' },
    ],
    formula: (v) => v.clicks / v.impressions,
    resultLabel: 'Ratio',
    resultSuffix: '',
    goodRange: 'A ratio of 0.04-0.10 (4-10%) is typical. Higher is better.',
    faqs: [
      {
        question: 'How is clicks per impression different from CTR?',
        answer: 'They measure the same thing but are expressed differently. CTR is a percentage (e.g., 5%), while clicks per impression is a decimal ratio (e.g., 0.05). Both help you understand thumbnail and title performance.',
      },
      {
        question: 'Why track impressions separately from views?',
        answer: 'Impressions show how often YouTube displayed your thumbnail. Views only count actual watches. The gap between them reveals your thumbnail\'s effectiveness at converting browsers into viewers.',
      },
      {
        question: 'What counts as an impression on YouTube?',
        answer: 'An impression is counted when your thumbnail is shown for at least 1 second and at least 50% visible. This includes home page, search results, suggested videos, and subscriptions feed.',
      },
      {
        question: 'Can I have too many impressions?',
        answer: 'More impressions are generally good, but if clicks don\'t follow, your CTR drops. YouTube may reduce impressions if low CTR signals your content isn\'t resonating with the audience it\'s being shown to.',
      },
    ],
  },
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
  'longform': 'Long-Form',
  'shorts': 'Shorts',
};

function getMetricFromDimensions(dimensions: Record<string, any> | null): string {
  if (!dimensions) return 'ctr';
  return dimensions.metric || 'ctr';
}

function getContentTypeFromDimensions(dimensions: Record<string, any> | null): string {
  if (!dimensions) return 'longform';
  return dimensions.content_type || 'longform';
}

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-1"
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 px-1 text-gray-600 text-sm leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

function FAQSection({ faqs, metric }: { faqs: FAQ[]; metric: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="bg-white rounded-xl border p-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}

function RelatedCalculators({ cluster, currentSlug }: { cluster: string; currentSlug: string }) {
  const siblingTools = [
    { slug: 'youtube-ctr-longform-calculator', name: 'CTR Calculator (Longform)' },
    { slug: 'youtube-ctr-shorts-calculator', name: 'CTR Calculator (Shorts)' },
    { slug: 'youtube-cpm-longform-calculator', name: 'CPM Calculator (Longform)' },
    { slug: 'youtube-cpm-shorts-calculator', name: 'CPM Calculator (Shorts)' },
    { slug: 'youtube-retention-longform-calculator', name: 'Retention Calculator (Longform)' },
    { slug: 'youtube-retention-shorts-calculator', name: 'Retention Calculator (Shorts)' },
    { slug: 'youtube-avg-view-duration-longform-calculator', name: 'Avg View Duration (Longform)' },
    { slug: 'youtube-avg-view-duration-shorts-calculator', name: 'Avg View Duration (Shorts)' },
    { slug: 'youtube-clicks-per-impression-longform-calculator', name: 'Clicks/Impression (Longform)' },
    { slug: 'youtube-clicks-per-impression-shorts-calculator', name: 'Clicks/Impression (Shorts)' },
  ].filter((t) => t.slug !== currentSlug);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Other YouTube Metric Calculators
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {siblingTools.slice(0, 6).map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="p-3 bg-white border rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors text-sm font-medium text-gray-700 hover:text-orange-700"
          >
            {tool.name}
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href={`/tools/clusters/${cluster}`}
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm"
        >
          View all {cluster.replace(/-/g, ' ')} tools
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function RelatedArticles({ cluster }: { cluster: string }) {
  const articles = [
    { slug: 'what-is-a-good-youtube-ctr', title: 'What Is a Good YouTube CTR?' },
    { slug: 'how-to-improve-youtube-retention', title: 'How to Improve YouTube Retention' },
    { slug: 'youtube-cpm-rates-explained', title: 'YouTube CPM Rates Explained' },
  ];

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-orange-500" />
        Related Articles
      </h2>
      <div className="space-y-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/tools/clusters/${cluster}/${article.slug}`}
            className="block p-4 bg-white border rounded-lg hover:border-orange-300 hover:shadow-sm transition-all group"
          >
            <span className="font-medium text-gray-800 group-hover:text-orange-700">
              {article.title}
            </span>
            <span className="block text-xs text-gray-400 mt-1">Read article →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PostResultUpsell() {
  return (
    <div className="mt-10 p-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border border-orange-200 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold text-gray-900">Turn These Numbers Into Growth</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4">
        Understanding your metrics is step one. Now take action with tools designed to boost your performance.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-orange-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Nudge</h4>
              <p className="text-sm text-gray-600 mt-1">
                Boost CTR and retention with smart overlays that guide viewers.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-orange-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">QR Social</h4>
              <p className="text-sm text-gray-600 mt-1">
                Convert viewers into followers with one scannable link.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/product/nudge"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
        >
          Try Nudge
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <Link
          href="/product/qrsocial"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
        >
          Get QR Social
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

function ToolSchema({ tool, preset }: { tool: ToolRecord; preset: MetricPreset }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description || preset.explanation,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VCM Suite',
      url: 'https://vcmsuite.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function CalculatorEngine({ tool }: CalculatorEngineProps) {
  const metric = getMetricFromDimensions(tool.dimensions);
  const contentType = getContentTypeFromDimensions(tool.dimensions);
  const preset = YOUTUBE_METRIC_PRESETS[metric] || YOUTUBE_METRIC_PRESETS['ctr'];
  
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
    
    for (const input of preset.inputs) {
      const val = parseFloat(values[input.key] || '0');
      if (isNaN(val) || val < 0) {
        setError(`Please enter a valid number for ${input.label}`);
        return;
      }
      numericValues[input.key] = val;
    }

    const divisorKey = preset.inputs[1]?.key;
    if (divisorKey && numericValues[divisorKey] === 0) {
      setError(`${preset.inputs[1].label} cannot be zero`);
      return;
    }

    try {
      const calcResult = preset.formula(numericValues);
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
      <ToolSchema tool={tool} preset={preset} />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <article>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="w-8 h-8" />
                <span className="px-2 py-0.5 bg-white/20 rounded text-sm font-medium">
                  {CONTENT_TYPE_LABELS[contentType] || contentType}
                </span>
                <span className="px-2 py-0.5 bg-white/20 rounded text-sm font-medium">
                  {preset.badgeLabel}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
              {tool.description && (
                <p className="mt-2 text-orange-100 text-lg">{tool.description}</p>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg mb-6">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800">{preset.explanation}</p>
                  {preset.goodRange && (
                    <p className="text-xs text-blue-600 mt-2 font-medium">{preset.goodRange}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {preset.inputs.map((input) => (
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
                  Calculate {preset.resultLabel}
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
                  <div className="text-sm text-green-700 mb-1">{preset.resultLabel}</div>
                  <div className="text-4xl font-bold text-green-800">
                    {result.toLocaleString()}{preset.resultSuffix}
                  </div>
                  {preset.goodRange && (
                    <div className="text-xs text-green-600 mt-2">{preset.goodRange}</div>
                  )}
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

          <PostResultUpsell />

          <FAQSection faqs={preset.faqs} metric={metric} />

          {tool.cluster && (
            <>
              <RelatedCalculators cluster={tool.cluster} currentSlug={tool.slug} />
              <RelatedArticles cluster={tool.cluster} />
            </>
          )}
        </article>
      </div>
    </div>
  );
}
