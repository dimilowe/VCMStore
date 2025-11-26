'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Search, Shuffle, Copy, Check, Sparkles } from 'lucide-react';

interface EmojiCombo {
  id: number;
  combo: string;
  label: string;
  category: string;
  tags: string[];
}

const CATEGORIES = [
  'all',
  'cute',
  'aesthetic',
  'funny',
  'flirty',
  'meme',
  'happy',
  'sad',
  'angry',
  'spooky',
  'celebration',
  'sass',
  'hype',
];

export default function EmojiCombosPage() {
  const [combos, setCombos] = useState<EmojiCombo[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    fetch('/api/emoji-combos')
      .then((res) => res.json())
      .then((data) => setCombos(data))
      .catch((err) => console.error('Failed to load emoji combos:', err));
  }, []);

  const filteredCombos = useMemo(() => {
    return combos.filter((combo) => {
      const matchesCategory = category === 'all' || combo.category === category;
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        combo.combo.includes(search) ||
        combo.label.toLowerCase().includes(searchLower) ||
        combo.tags.some((tag) => tag.toLowerCase().includes(searchLower));
      return matchesCategory && matchesSearch;
    });
  }, [combos, category, search]);

  const copyToClipboard = async (combo: EmojiCombo) => {
    try {
      await navigator.clipboard.writeText(combo.combo);
      setCopiedId(combo.id);
      setToast('Copied to clipboard ✅');
      setTimeout(() => {
        setCopiedId(null);
        setToast(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getRandomCombo = () => {
    if (filteredCombos.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredCombos.length);
    const randomCombo = filteredCombos[randomIndex];
    
    setHighlightedId(randomCombo.id);
    
    const cardElement = cardRefs.current[randomCombo.id];
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    setTimeout(() => {
      setHighlightedId(null);
    }, 1500);
  };

  const getCategoryColor = (cat: string) => {
    const colors: { [key: string]: string } = {
      cute: 'bg-pink-100 text-pink-700',
      aesthetic: 'bg-purple-100 text-purple-700',
      funny: 'bg-yellow-100 text-yellow-700',
      flirty: 'bg-red-100 text-red-700',
      meme: 'bg-orange-100 text-orange-700',
      happy: 'bg-green-100 text-green-700',
      sad: 'bg-blue-100 text-blue-700',
      angry: 'bg-red-100 text-red-700',
      spooky: 'bg-stone-100 text-stone-700',
      celebration: 'bg-amber-100 text-amber-700',
      sass: 'bg-violet-100 text-violet-700',
      hype: 'bg-emerald-100 text-emerald-700',
    };
    return colors[cat] || 'bg-stone-100 text-stone-700';
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Emoji Combos Generator",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Generate and copy free emoji combos for social media captions, bios, and posts.",
            "featureList": [
              "100+ curated emoji combinations",
              "Filter by category",
              "Search by keyword",
              "One-click copy",
              "Random combo generator",
              "No signup required"
            ]
          })
        }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Emoji Combos Generator
          </h1>
          <p className="text-xl text-stone-600 mb-2">
            Copy-paste aesthetic emoji combos for your captions, bios, and posts
          </p>
          <p className="text-sm text-stone-400">
            Free tool for creators. No signup required.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search emojis or names (e.g. 'heart', 'happy')"
                className="w-full pl-12 pr-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all text-stone-900"
              />
            </div>
            <button
              onClick={getRandomCombo}
              disabled={filteredCombos.length === 0}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-violet-500 hover:bg-violet-600 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
            >
              <Shuffle className="w-5 h-5" />
              Random Combo
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  category === cat
                    ? 'bg-violet-500 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredCombos.length === 0 ? (
          <div className="bg-stone-50 rounded-2xl p-12 text-center">
            <p className="text-stone-500 text-lg">No emoji combos found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {filteredCombos.map((combo) => (
              <div
                key={combo.id}
                ref={(el) => { cardRefs.current[combo.id] = el; }}
                className={`bg-white rounded-xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-all relative ${
                  highlightedId === combo.id ? 'ring-4 ring-violet-400 ring-opacity-75 animate-pulse' : ''
                }`}
              >
                <span
                  className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                    combo.category
                  )}`}
                >
                  {combo.category}
                </span>
                <div className="text-4xl mb-3 select-all">{combo.combo}</div>
                <p className="text-sm text-stone-500 mb-4">{combo.label}</p>
                <button
                  onClick={() => copyToClipboard(combo)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all ${
                    copiedId === combo.id
                      ? 'bg-green-100 text-green-700'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {copiedId === combo.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="bg-stone-900 rounded-2xl p-8 md:p-10 text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Level Up Your Content
          </h2>
          <p className="text-stone-300 mb-5 max-w-xl mx-auto">
            Great captions deserve great funnels. Turn your content into conversions with APE Funnels.
          </p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-semibold rounded-full transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Explore APE Funnels
          </Link>
        </div>

        <div className="prose prose-stone max-w-none">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            What Are Emoji Combos?
          </h2>
          <p className="text-stone-600 mb-4">
            Emoji combos are creative combinations of emojis that express moods, aesthetics, or vibes better than single emojis alone. They&apos;ve become essential for social media captions, Instagram bios, TikTok posts, and text messages.
          </p>
          <p className="text-stone-600 mb-4">
            Whether you want something cute like 🥺👉👈, aesthetic like ✨💫🌙, or funny like 😭💀, the right emoji combo can make your content stand out and connect with your audience.
          </p>
          <p className="text-stone-600 mb-8">
            This free emoji combos generator gives you 100+ curated combinations across categories like cute, aesthetic, funny, flirty, meme, and more. Just find one you like and click to copy!
          </p>

          <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-10">
            How to Use Emoji Combos
          </h2>
          <ul className="list-disc list-inside text-stone-600 mb-8 space-y-2">
            <li><strong>Instagram captions</strong> — Add personality to your posts with matching emoji combos</li>
            <li><strong>Instagram & TikTok bios</strong> — Make your profile stand out with aesthetic combinations</li>
            <li><strong>YouTube titles & descriptions</strong> — Catch attention in search results</li>
            <li><strong>Text messages</strong> — Express yourself better with creative emoji strings</li>
            <li><strong>Discord & Twitch</strong> — Add flair to your messages and streams</li>
          </ul>

          <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-10">
            Popular Emoji Combo Categories
          </h2>
          <ul className="list-disc list-inside text-stone-600 mb-8 space-y-2">
            <li><strong>Aesthetic emojis</strong> — Dreamy, soft, and visually pleasing combinations</li>
            <li><strong>Cute emojis</strong> — Sweet, adorable combos for wholesome vibes</li>
            <li><strong>Funny emojis</strong> — Combos that express laughter and humor</li>
            <li><strong>Flirty emojis</strong> — Playful combinations for romantic contexts</li>
            <li><strong>Meme emojis</strong> — Internet culture favorites like 🤡 and 👁️👄👁️</li>
          </ul>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}

      <footer className="border-t border-stone-200 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-stone-500">
          <p className="mb-3">Built for creators. Add this to your bookmarks.</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link href="/tools/visualization" className="hover:text-stone-700">Visualization Tool</Link>
            <Link href="/tools/keyword-finder" className="hover:text-stone-700">Keyword Finder</Link>
            <Link href="/tools/logo-generator" className="hover:text-stone-700">Logo Generator</Link>
            <Link href="/tools/word-counter" className="hover:text-stone-700">Word Counter</Link>
            <Link href="/store" className="hover:text-stone-700">VCM Store</Link>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
