'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Sparkles, Loader2, RefreshCw, Copy, Check } from 'lucide-react';

const AREAS = [
  { id: 'body', label: 'Body & Health', emoji: '💪', description: 'Physical self-acceptance' },
  { id: 'money', label: 'Money & Worth', emoji: '💰', description: 'Financial confidence' },
  { id: 'career', label: 'Career & Purpose', emoji: '🚀', description: 'Professional growth' },
  { id: 'relationships', label: 'Relationships', emoji: '💕', description: 'Healthy boundaries' },
  { id: 'creativity', label: 'Creativity', emoji: '🎨', description: 'Creative confidence' },
  { id: 'general', label: 'General Self-Love', emoji: '✨', description: 'Overall self-worth' },
];

const TONES = [
  { id: 'gentle', label: 'Gentle', emoji: '🌸', description: 'Warm & nurturing' },
  { id: 'hype', label: 'Hype', emoji: '🔥', description: 'Energetic & empowering' },
  { id: 'brutal', label: 'Brutal', emoji: '💀', description: 'Tough love, no BS' },
];

const EXAMPLE_AFFIRMATIONS = [
  "I am allowed to take up space without apologizing for it.",
  "I don't need to earn rest. I deserve it just because I exist.",
  "I am worthy of love that doesn't require me to shrink myself.",
  "I release the need to be perfect to be valuable.",
  "I trust my gut, even when it's inconvenient for others.",
  "I am not too much. I am exactly the right amount.",
  "I deserve relationships where I don't have to beg for the bare minimum.",
  "I am allowed to change my mind without owing anyone an explanation.",
  "I celebrate my small wins because they matter.",
  "I am learning to love the parts of me I was taught to hide.",
  "I am not responsible for other people's reactions to my boundaries.",
  "I give myself permission to outgrow versions of me that no longer fit.",
  "I am worthy of success that doesn't require my burnout.",
  "I choose peace over being right.",
  "I am allowed to rest before I'm completely exhausted.",
  "I trust myself to handle whatever comes my way.",
  "I am not defined by my productivity or my output.",
  "I deserve to be chosen, not just tolerated.",
  "I am becoming the person I needed when I was younger.",
  "I release the need to explain myself to people who don't want to understand.",
  "I am allowed to have needs and express them clearly.",
  "I honor my energy by saying no to what drains me.",
  "I am worthy of spaces where I feel safe to be myself.",
  "I choose to speak to myself with kindness, even when I mess up.",
  "I am enough, even on the days I don't feel like it.",
];

export default function AffirmationAboutSelfLovePage() {
  const [selectedArea, setSelectedArea] = useState<string>('general');
  const [selectedTone, setSelectedTone] = useState<string>('hype');
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateAffirmations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/affirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          area: selectedArea,
          tone: selectedTone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate affirmations');
      }

      setAffirmations(data.affirmations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyAffirmation = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Real AF Self-Love Affirmation Generator',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        description: 'Generate honest, powerful affirmations about self love. Choose your topic and tone for personalized, non-cringey self-love affirmations.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is an affirmation about self love?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'An affirmation about self love is a positive statement you repeat to yourself to build self-worth, confidence, and self-acceptance. Unlike generic affirmations, self-love affirmations focus specifically on how you relate to yourself.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do self love affirmations actually work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Research shows that affirmations can help rewire thought patterns over time, especially when the affirmations feel believable and are practiced consistently. The key is using affirmations that resonate with you, not ones that feel fake.',
            },
          },
          {
            '@type': 'Question',
            name: 'How often should I use self love affirmations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Daily practice is ideal. Many people find it helpful to repeat affirmations in the morning, before bed, or during moments of self-doubt. Even 2-3 minutes of intentional practice can make a difference.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why do some affirmations feel cringey or fake?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Affirmations feel fake when they\'re too far from your current beliefs. The trick is to use affirmations that feel like a stretch but still believable. Our generator creates grounded, realistic affirmations that feel authentic.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Free Self-Love Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              Affirmation About Self Love
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Get honest, powerful affirmations about self love that you'll actually believe. Choose your focus area and tone, and let our AI generate personalized affirmations without the cringe.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 md:p-8 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-stone-700 mb-3">
                1. What area do you want to focus on?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {AREAS.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedArea === area.id
                        ? 'border-rose-500 bg-rose-50 shadow-md'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{area.emoji}</div>
                    <div className="font-semibold text-stone-800 text-sm">{area.label}</div>
                    <div className="text-xs text-stone-500">{area.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-stone-700 mb-3">
                2. Choose your tone
              </label>
              <div className="grid grid-cols-3 gap-3">
                {TONES.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      selectedTone === tone.id
                        ? 'border-rose-500 bg-rose-50 shadow-md'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{tone.emoji}</div>
                    <div className="font-semibold text-stone-800">{tone.label}</div>
                    <div className="text-xs text-stone-500">{tone.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateAffirmations}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                isLoading
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Writing you something you actually believe...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate My Self-Love Affirmation
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
                {error}
              </div>
            )}
          </div>

          {affirmations.length > 0 && (
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Your Affirmations
                </h3>
                <button
                  onClick={generateAffirmations}
                  disabled={isLoading}
                  className="text-white/80 hover:text-white flex items-center gap-1 text-sm"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  New ones
                </button>
              </div>
              <div className="space-y-3">
                {affirmations.map((affirmation, index) => (
                  <div
                    key={index}
                    className="bg-white/15 backdrop-blur rounded-xl p-4 flex items-start justify-between gap-3 group"
                  >
                    <p className="text-white text-lg font-medium leading-relaxed">
                      "{affirmation}"
                    </p>
                    <button
                      onClick={() => copyAffirmation(affirmation, index)}
                      className="text-white/60 hover:text-white shrink-0 p-1"
                      title="Copy affirmation"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-white/70 text-sm text-center mt-4">
                Repeat these to yourself daily. Mean it more each time. ✨
              </p>
            </div>
          )}

          <div className="space-y-12 mt-16">
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                What Is an Affirmation About Self Love?
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                An affirmation about self love is a positive statement you repeat to yourself to build self-worth, confidence, and self-acceptance. Unlike generic positive affirmations, self-love affirmations focus specifically on how you relate to yourself — your boundaries, your worth, and your right to take up space.
              </p>
              <p className="text-stone-600 leading-relaxed">
                The best affirmations about self love aren't fluffy or fake. They're grounded in reality, feel believable, and help you slowly rewire negative thought patterns. Our generator creates modern, honest affirmations that feel like something you'd actually say to yourself — not something from a cheesy motivational poster.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                25 Example Affirmations About Self Love
              </h2>
              <p className="text-stone-600 mb-4">
                Here are 25 powerful affirmations about self love to get you started:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {EXAMPLE_AFFIRMATIONS.map((affirmation, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-stone-200 hover:border-rose-200 hover:shadow-sm transition-all"
                  >
                    <p className="text-stone-700 text-sm">"{affirmation}"</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                How to Use Self Love Affirmations Without Lying to Yourself
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-800 mb-2">1. Choose affirmations that feel like a stretch, not a lie</h3>
                  <p className="text-stone-600 text-sm">If an affirmation feels completely unbelievable, it won't stick. Start with statements that feel slightly uncomfortable but not impossible.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-800 mb-2">2. Practice consistently, not perfectly</h3>
                  <p className="text-stone-600 text-sm">You don't need a 30-minute routine. Even repeating your affirmation once in the mirror while brushing your teeth counts.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-800 mb-2">3. Use them in moments of self-doubt</h3>
                  <p className="text-stone-600 text-sm">The best time to use an affirmation about self love is when you need it most — when your inner critic is being loud.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-800 mb-2">4. Write them down, don't just think them</h3>
                  <p className="text-stone-600 text-sm">Journaling your affirmations adds another layer of reinforcement. Try writing your top 3 each morning.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-800 mb-2">5. Update them as you grow</h3>
                  <p className="text-stone-600 text-sm">As your self-love journey evolves, so should your affirmations. What felt like a stretch last month might feel natural now.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-6">
                FAQ: Affirmation About Self Love
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-800 mb-2">What is an affirmation about self love?</h3>
                  <p className="text-stone-600 text-sm">An affirmation about self love is a positive statement you repeat to yourself to build self-worth and self-acceptance. These affirmations focus on your relationship with yourself — your boundaries, confidence, and inherent value as a person.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-800 mb-2">Do self love affirmations actually work?</h3>
                  <p className="text-stone-600 text-sm">Research shows that affirmations can help rewire thought patterns over time, especially when the affirmations feel believable and are practiced consistently. The key is using affirmations that resonate with you, not ones that feel fake or forced.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-800 mb-2">How often should I use self love affirmations?</h3>
                  <p className="text-stone-600 text-sm">Daily practice is ideal. Many people find it helpful to repeat affirmations in the morning, before bed, or during moments of self-doubt. Even 2-3 minutes of intentional practice can make a difference over time.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-800 mb-2">Why do some affirmations feel cringey or fake?</h3>
                  <p className="text-stone-600 text-sm">Affirmations feel fake when they're too far from your current beliefs. If you don't believe "I am perfect in every way," it's going to feel hollow. Our generator creates grounded, realistic affirmations that feel authentic rather than performative.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-800 mb-2">Can I use the same affirmation every day?</h3>
                  <p className="text-stone-600 text-sm">Absolutely. In fact, repetition is key to making affirmations stick. Find one or two that really resonate and use them until they feel natural. Then you can evolve to new ones as you grow.</p>
                </div>
              </div>
            </section>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-stone-200">
            <p className="text-stone-500 text-sm">
              Free tool by{' '}
              <Link href="/" className="text-rose-600 hover:text-rose-700 font-medium">
                VCM Store
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
