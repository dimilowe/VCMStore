'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Navbar } from '@/components/navbar';
import { Sparkles, Download, RefreshCw, AlertCircle, Loader2, Wand2 } from 'lucide-react';

interface Logo {
  base64: string;
  variant: number;
}

const STYLES = [
  { value: 'modern', label: 'Modern' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'bold', label: 'Bold' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'playful', label: 'Playful' },
];

export default function LogoGeneratorPage() {
  const [businessName, setBusinessName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [style, setStyle] = useState('modern');
  const [iconKeyword, setIconKeyword] = useState('');
  const [logos, setLogos] = useState<Logo[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateLogos = async () => {
    if (!businessName.trim()) {
      setError('Please enter a business name');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/logo-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: businessName.trim(),
          slogan: slogan.trim() || undefined,
          style,
          iconKeyword: iconKeyword.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate logos');
      }

      setLogos(data.logos);
      setRemaining(data.remaining);
      setHasGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadLogo = (base64: string, variant: number) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64}`;
    const safeName = businessName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.download = `${safeName}-logo-${style}-v${variant}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const trackCTAClick = async () => {
    try {
      await fetch('/api/logo-generate/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'cta_click' }),
      });
    } catch {
    }
  };

  return (
    <>
      <Head>
        <title>Free Logo Generator Online - Instant & No Watermark</title>
        <meta name="description" content="Create a professional logo online for free. No signup. No watermark. Instant downloads. AI-powered logo generator for your business." />
        <meta property="og:title" content="Free Online Logo Generator (No Signup)" />
        <meta property="og:description" content="Create professional logos instantly with AI. No signup, no watermark, free downloads." />
        <meta property="og:type" content="website" />
      </Head>
      
      <Navbar />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Logo Generator",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "AI-powered logo generator. Create professional logos for your business instantly. No signup required.",
            "featureList": [
              "AI-powered logo generation",
              "Multiple style options",
              "Instant PNG downloads",
              "No watermarks",
              "No signup required"
            ]
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is this logo generator really free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! You can generate up to 5 logo sets per hour completely free. No signup, no credit card, no watermarks on downloads."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use these logos for my business?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, logos generated are yours to use for commercial purposes. However, for important branding, we recommend having a professional designer refine the AI-generated concept."
                }
              },
              {
                "@type": "Question",
                "name": "What file format do I get?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Logos are downloaded as high-quality PNG files at 1024x1024 pixels, suitable for web use and many print applications."
                }
              },
              {
                "@type": "Question",
                "name": "How does the AI logo generator work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our tool uses advanced AI image generation to create unique logo designs based on your business name, style preferences, and optional icon keywords. Each generation creates 4 unique variations."
                }
              }
            ]
          })
        }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Free Online Logo Generator
          </h1>
          <p className="text-xl text-stone-600 mb-2">
            No Signup Required
          </p>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Create a professional logo for your business in seconds. AI-powered, instant downloads, no watermarks.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 md:p-8 mb-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-stone-700 mb-1.5">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Sunrise Bakery"
                maxLength={50}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-stone-900"
              />
            </div>

            <div>
              <label htmlFor="slogan" className="block text-sm font-medium text-stone-700 mb-1.5">
                Slogan <span className="text-stone-400">(optional)</span>
              </label>
              <input
                id="slogan"
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder="e.g. Fresh baked daily"
                maxLength={100}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-stone-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Logo Style
                </label>
                <select
                  id="style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-stone-900 bg-white"
                >
                  {STYLES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="iconKeyword" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Icon Keyword <span className="text-stone-400">(optional)</span>
                </label>
                <input
                  id="iconKeyword"
                  type="text"
                  value={iconKeyword}
                  onChange={(e) => setIconKeyword(e.target.value)}
                  placeholder="e.g. sun, bread, mountain"
                  maxLength={50}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-stone-900"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={generateLogos}
                disabled={isGenerating || !businessName.trim()}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  isGenerating || !businessName.trim()
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-stone-900'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : hasGenerated ? (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Regenerate Logos
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Logos
                  </>
                )}
              </button>
            </div>

            {remaining !== null && (
              <p className="text-center text-xs text-stone-500">
                {remaining} generations remaining this hour
              </p>
            )}
          </div>

          {logos.length > 0 && (
            <div className="mt-8 pt-8 border-t border-stone-200">
              <h2 className="text-lg font-semibold text-stone-800 mb-4 text-center">
                Your Logo Designs
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {logos.map((logo) => (
                  <div
                    key={logo.variant}
                    className="bg-stone-50 rounded-xl p-4 border border-stone-200 hover:border-yellow-400 transition-all"
                  >
                    <div className="aspect-square bg-white rounded-lg overflow-hidden mb-3 border border-stone-100">
                      <img
                        src={`data:image/png;base64,${logo.base64}`}
                        alt={`${businessName} logo variant ${logo.variant}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <button
                      onClick={() => downloadLogo(logo.base64, logo.variant)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-full transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download PNG
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-stone-900 rounded-2xl p-8 md:p-12 text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want a Full Brand Kit?
          </h2>
          <p className="text-stone-300 mb-6 max-w-xl mx-auto">
            Need more than a logo? APE Funnels gives you landing pages, email sequences, and payment processing—all done for you.
          </p>
          <Link
            href="/store"
            onClick={trackCTAClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-semibold rounded-full transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Explore APE Funnels
          </Link>
        </div>

        <div className="prose prose-stone max-w-none">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            How to Create a Logo Online
          </h2>
          <p className="text-stone-600 mb-6">
            Creating a professional logo for your business has never been easier. Our free online logo generator uses advanced AI to create unique, professional designs in seconds. Simply enter your business name, choose a style, and optionally add an icon keyword to guide the design direction.
          </p>

          <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-10">
            Why Use Our Free Logo Generator?
          </h2>
          <ul className="list-disc list-inside text-stone-600 mb-6 space-y-2">
            <li><strong>Instant Results</strong> - Get 4 unique logo variations in under a minute</li>
            <li><strong>No Signup Required</strong> - Start creating immediately without any account</li>
            <li><strong>No Watermarks</strong> - Download clean, ready-to-use logo files</li>
            <li><strong>Multiple Styles</strong> - Choose from modern, minimalist, bold, luxury, or playful aesthetics</li>
            <li><strong>AI-Powered</strong> - Leverage cutting-edge AI for unique, creative designs</li>
            <li><strong>Commercial Use</strong> - Use your generated logos for your business</li>
          </ul>

          <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-10">
            Tips for Better Logo Results
          </h2>
          <ol className="list-decimal list-inside text-stone-600 mb-6 space-y-2">
            <li>Keep your business name concise and clear</li>
            <li>Choose a style that matches your brand personality</li>
            <li>Use specific icon keywords (e.g., &quot;mountain&quot; instead of &quot;nature&quot;)</li>
            <li>Generate multiple times to explore different concepts</li>
            <li>Download your favorites and refine with a designer if needed</li>
          </ol>

          <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-10">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6 mb-10">
            <div className="bg-stone-50 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-2">Is this logo generator really free?</h3>
              <p className="text-stone-600 text-sm">
                Yes! You can generate up to 5 logo sets per hour completely free. No signup, no credit card, no watermarks on downloads.
              </p>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-2">Can I use these logos for my business?</h3>
              <p className="text-stone-600 text-sm">
                Yes, logos generated are yours to use for commercial purposes. However, for important branding, we recommend having a professional designer refine the AI-generated concept.
              </p>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-2">What file format do I get?</h3>
              <p className="text-stone-600 text-sm">
                Logos are downloaded as high-quality PNG files at 1024x1024 pixels, suitable for web use and many print applications.
              </p>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-2">How does the AI logo generator work?</h3>
              <p className="text-stone-600 text-sm">
                Our tool uses advanced AI image generation to create unique logo designs based on your business name, style preferences, and optional icon keywords. Each generation creates 4 unique variations.
              </p>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-2">Why is there a generation limit?</h3>
              <p className="text-stone-600 text-sm">
                AI image generation requires significant computing resources. The limit of 5 generations per hour ensures the tool remains free and available for everyone.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-stone-500">
          <p className="mb-3">Part of the VCM creator tools stack. Want a full brand kit? Try APE Funnels.</p>
          <div className="flex items-center justify-center gap-6">
            <Link href="/tools/gif-compressor" className="hover:text-stone-700">GIF Compressor</Link>
            <Link href="/tools/image-compressor" className="hover:text-stone-700">Image Compressor</Link>
            <Link href="/tools/word-counter" className="hover:text-stone-700">Word Counter</Link>
            <Link href="/store" className="hover:text-stone-700">VCM Store</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
