'use client';

import { useState, FormEvent } from 'react';
import { Lock, ExternalLink, TrendingDown, Store, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToolForRenderer } from '@/lib/cms/getCmsToolBySlug';
import { getPricePresetBySlug, PriceEngineConfig, PriceEngineCTA } from '@/engines/price-engine/config';
import ShoppingCloudUpgradeModal from '@/components/modals/ShoppingCloudUpgradeModal';

interface PriceEngineProps {
  tool: ToolForRenderer;
  canUsePro?: boolean;
  canUseBasic?: boolean;
  entitlementsLoading?: boolean;
}

interface ResultData {
  productTitle: string;
  priceRange: string;
  retailer: string;
  priceHistory: number[];
}

function PriceHistorySparkline({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const height = 60;
  const width = 200;
  const padding = 4;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-zinc-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-zinc-600">Price History (Last 30 days)</span>
        <TrendingDown className="w-4 h-4 text-green-500" />
      </div>
      <svg width={width} height={height} className="w-full" viewBox={`0 0 ${width} ${height}`}>
        <polyline
          points={points}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        {data.map((value, index) => {
          const x = padding + (index / (data.length - 1)) * (width - padding * 2);
          const y = height - padding - ((value - min) / range) * (height - padding * 2);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="#ec4899"
              className="opacity-70"
            />
          );
        })}
      </svg>
      <div className="flex justify-between text-xs text-zinc-400 mt-1">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

function RetailerBadge({ mode, retailer }: { mode: string; retailer: string }) {
  const badges: Record<string, { bg: string; text: string; label: string }> = {
    amazon: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Amazon' },
    shein: { bg: 'bg-black', text: 'text-white', label: 'SHEIN' },
    aliexpress: { bg: 'bg-red-100', text: 'text-red-700', label: 'AliExpress' },
    zara: { bg: 'bg-zinc-900', text: 'text-white', label: 'ZARA' },
    generic: { bg: 'bg-zinc-100', text: 'text-zinc-700', label: retailer },
  };

  const badge = badges[mode] || badges.generic;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
      <Store className="w-3 h-3" />
      {badge.label}
    </span>
  );
}

function CTAButton({ 
  cta, 
  onClick, 
  canUsePro 
}: { 
  cta: PriceEngineCTA; 
  onClick: () => void;
  canUsePro?: boolean;
}) {
  const isLocked = !canUsePro;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        isLocked
          ? 'border-zinc-200 hover:border-pink-300 hover:bg-pink-50/50'
          : 'border-pink-200 bg-pink-50'
      }`}
    >
      <div className="flex items-start gap-3">
        {isLocked && (
          <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0">
            <Lock className="w-4 h-4 text-zinc-400" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-zinc-900">{cta.label}</span>
            {isLocked && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-600">
                Pro
              </span>
            )}
          </div>
          {cta.description && (
            <p className="text-sm text-zinc-500 mt-0.5">{cta.description}</p>
          )}
        </div>
        <ExternalLink className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-1" />
      </div>
    </button>
  );
}

export default function PriceEngine({ tool, canUsePro, entitlementsLoading }: PriceEngineProps) {
  const config = getPricePresetBySlug(tool.preset || tool.slug) || {
    slug: tool.slug,
    title: tool.name,
    subtitle: tool.description,
    mode: 'generic' as const,
    allowUrlInput: true,
    allowNameInput: true,
    urlLabel: 'Product URL',
    urlPlaceholder: 'Paste a product link...',
    nameLabel: 'Product name',
    namePlaceholder: 'Enter product name...',
    showFakePriceHistory: true,
    showCurrentPriceBlock: true,
    showRetailerBadge: true,
    ctas: [],
    cloudTag: 'shopping' as const,
    faqs: []
  };

  const [urlInput, setUrlInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const [showFaq, setShowFaq] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCTA, setSelectedCTA] = useState<PriceEngineCTA | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!urlInput && !nameInput) return;

    setIsLoading(true);

    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'price_tool_submitted',
          properties: {
            toolSlug: tool.slug,
            mode: config.mode,
            hasUrl: Boolean(urlInput),
            hasName: Boolean(nameInput),
          },
        }),
      }).catch(() => {});
    } catch {}

    await new Promise(resolve => setTimeout(resolve, 800));

    const productTitle = nameInput || extractProductName(urlInput);
    const retailer = detectRetailer(urlInput, config.mode);
    
    const fakePrices = generateFakePriceHistory();
    const currentPrice = fakePrices[fakePrices.length - 1];
    const lowPrice = Math.min(...fakePrices);
    
    setResult({
      productTitle,
      priceRange: `$${lowPrice} – $${currentPrice}`,
      retailer,
      priceHistory: fakePrices,
    });

    setIsLoading(false);
  };

  const handleCTAClick = async (cta: PriceEngineCTA) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'price_tool_cta_clicked',
          properties: {
            toolSlug: tool.slug,
            mode: config.mode,
            ctaId: cta.id,
          },
        }),
      }).catch(() => {});
    } catch {}

    setSelectedCTA(cta);
    setModalOpen(true);
  };

  const faqs = config.faqs || [];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">
          {config.title}
        </h1>
        {config.subtitle && (
          <p className="text-lg text-zinc-600">
            {config.subtitle}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {config.allowUrlInput && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              {config.urlLabel || 'Product URL'}
            </label>
            <Input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={config.urlPlaceholder}
              className="w-full"
            />
          </div>
        )}

        {config.allowUrlInput && config.allowNameInput && (
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <div className="flex-1 h-px bg-zinc-200" />
            <span>or</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>
        )}

        {config.allowNameInput && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              {config.nameLabel || 'Product name'}
            </label>
            <Input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={config.namePlaceholder}
              className="w-full"
            />
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || (!urlInput && !nameInput)}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
        >
          {isLoading ? 'Checking Price...' : 'Check Price'}
        </Button>
      </form>

      {result && (
        <div className="space-y-6 mb-8">
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="text-xl font-semibold text-zinc-900">
                {result.productTitle}
              </h2>
              {config.showRetailerBadge && (
                <RetailerBadge mode={config.mode} retailer={result.retailer} />
              )}
            </div>

            {config.showCurrentPriceBlock && (
              <div className="mb-4">
                <span className="text-sm text-zinc-500">Current Price Range</span>
                <p className="text-3xl font-bold text-zinc-900">
                  {result.priceRange}
                </p>
              </div>
            )}

            {config.showFakePriceHistory && (
              <PriceHistorySparkline data={result.priceHistory} />
            )}
          </div>

          {config.ctas.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 uppercase tracking-wide">
                Upgrade to unlock
              </h3>
              {config.ctas.map((cta) => (
                <CTAButton
                  key={cta.id}
                  cta={cta}
                  onClick={() => handleCTAClick(cta)}
                  canUsePro={canUsePro}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {faqs.length > 0 && (
        <div className="border-t border-zinc-200 pt-8 mt-8">
          <button
            onClick={() => setShowFaq(!showFaq)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-semibold text-zinc-900">
              Frequently Asked Questions
            </h3>
            {showFaq ? (
              <ChevronUp className="w-5 h-5 text-zinc-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-zinc-400" />
            )}
          </button>
          {showFaq && (
            <div className="mt-4 space-y-4">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h4 className="font-medium text-zinc-900 mb-1">
                    {faq.q}
                  </h4>
                  <p className="text-sm text-zinc-600">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ShoppingCloudUpgradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        sourceToolSlug={tool.slug}
        sourceCTAId={selectedCTA?.id}
      />
    </div>
  );
}

function extractProductName(url: string): string {
  if (!url) return 'Product';
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const segments = path.split('/').filter(Boolean);
    const productSegment = segments.find(s => s.length > 10 && !s.match(/^[a-z]{2,3}$/i));
    if (productSegment) {
      return productSegment
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
        .slice(0, 60);
    }
    return 'Product';
  } catch {
    return 'Product';
  }
}

function detectRetailer(url: string, mode: string): string {
  if (mode === 'amazon') return 'Amazon';
  if (!url) return 'Online Store';
  
  const domain = url.toLowerCase();
  if (domain.includes('amazon')) return 'Amazon';
  if (domain.includes('shein')) return 'SHEIN';
  if (domain.includes('aliexpress')) return 'AliExpress';
  if (domain.includes('zara')) return 'ZARA';
  if (domain.includes('walmart')) return 'Walmart';
  if (domain.includes('target')) return 'Target';
  if (domain.includes('ebay')) return 'eBay';
  
  return 'Online Store';
}

function generateFakePriceHistory(): number[] {
  const basePrice = 50 + Math.random() * 100;
  const prices: number[] = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < 7; i++) {
    const change = (Math.random() - 0.4) * 15;
    currentPrice = Math.max(basePrice * 0.7, Math.min(basePrice * 1.3, currentPrice + change));
    prices.push(Math.round(currentPrice));
  }
  
  return prices;
}
