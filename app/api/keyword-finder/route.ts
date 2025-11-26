import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { checkRateLimit } from '@/lib/rate-limiter';

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

interface KeywordIdea {
  keyword: string;
  difficulty: number;
  searchVolume: number;
  intent: 'informational' | 'transactional' | 'commercial' | 'navigational';
  contentAngle: string;
  notes: string;
}

interface KeywordRequest {
  seed: string;
  maxResults?: number;
  maxDifficulty?: number;
  language?: string;
}

interface KeywordResponse {
  seed: string;
  keywords: KeywordIdea[];
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const rateLimit = checkRateLimit(ip, 'keyword-finder');
    if (!rateLimit.allowed) {
      const minutes = Math.ceil(rateLimit.resetIn / 60000);
      return NextResponse.json(
        { error: `Rate limit exceeded. Try again in ${minutes} minutes.` },
        { status: 429 }
      );
    }

    const body: KeywordRequest = await request.json();
    const { seed, maxResults = 50, maxDifficulty = 30, language = 'English' } = body;

    if (!seed || typeof seed !== 'string' || seed.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a seed keyword or topic' },
        { status: 400 }
      );
    }

    if (seed.length > 200) {
      return NextResponse.json(
        { error: 'Seed keyword must be 200 characters or less' },
        { status: 400 }
      );
    }

    const sanitizedSeed = seed.trim().slice(0, 200);
    const clampedMaxResults = Math.min(Math.max(10, maxResults), 100);
    const clampedMaxDifficulty = Math.min(Math.max(10, maxDifficulty), 60);

    const systemPrompt = `You are an SEO strategist. Given a seed keyword or topic, you generate ONLY **long-tail, low-competition keyword ideas** with real searcher intent, focusing on opportunities smaller websites can rank for.

Rules:
- Focus on very specific, long-tail phrases (3+ words).
- Avoid super general head terms like "marketing", "SEO", "shoes".
- Assume ${language} search unless otherwise specified.
- Estimate difficulty from 0–100 where:
  - 0–20 = very easy (rarely targeted, niche)
  - 21–35 = easy (some competition but achievable)
  - 36–55 = medium (requires quality content)
  - 56+ = hard (established sites dominate)
- Return mostly keywords with difficulty <= ${clampedMaxDifficulty}, only a few slightly above to show range.
- Estimate monthly search volume as a rough bucket: 10, 30, 70, 150, 300, 700, 1200, 2400, etc.
- Classify intent as: informational, transactional, commercial, or navigational.
- Generate diverse keyword angles covering different aspects of the topic.

Respond in **pure JSON** only, no markdown, no commentary, with this exact shape:

{
  "seed": "${sanitizedSeed}",
  "keywords": [
    {
      "keyword": "string",
      "difficulty": number,
      "searchVolume": number,
      "intent": "informational" | "transactional" | "commercial" | "navigational",
      "contentAngle": "string - suggested article or page angle",
      "notes": "short note on why this is a good low-competition opportunity"
    }
  ]
}

Generate exactly ${clampedMaxResults} keyword ideas.`;

    const userPrompt = `Find low-competition keyword ideas for: "${sanitizedSeed}"`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 4000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    let parsed: KeywordResponse;
    try {
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      parsed = JSON.parse(cleanContent);
    } catch {
      console.error('Failed to parse AI response:', content.slice(0, 500));
      throw new Error('Invalid response format');
    }

    if (!parsed.keywords || !Array.isArray(parsed.keywords)) {
      throw new Error('Invalid response structure');
    }

    const validatedKeywords: KeywordIdea[] = parsed.keywords
      .filter((k: any) => 
        typeof k.keyword === 'string' &&
        typeof k.difficulty === 'number' &&
        typeof k.searchVolume === 'number' &&
        ['informational', 'transactional', 'commercial', 'navigational'].includes(k.intent)
      )
      .map((k: any): KeywordIdea => ({
        keyword: k.keyword,
        difficulty: Math.max(0, Math.min(100, k.difficulty)),
        searchVolume: Math.max(0, k.searchVolume),
        intent: k.intent,
        contentAngle: typeof k.contentAngle === 'string' ? k.contentAngle : '',
        notes: typeof k.notes === 'string' ? k.notes : ''
      }))
      .slice(0, clampedMaxResults);

    console.log(`[Keyword Finder] Generated ${validatedKeywords.length} keywords for: "${sanitizedSeed}"`);

    return NextResponse.json({
      seed: sanitizedSeed,
      keywords: validatedKeywords,
      remaining: rateLimit.remaining
    });

  } catch (error) {
    console.error('Keyword finder error:', error);
    return NextResponse.json(
      { error: 'Failed to generate keywords. Please try again.' },
      { status: 500 }
    );
  }
}
