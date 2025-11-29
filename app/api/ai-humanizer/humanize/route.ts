import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

function getRateLimitInfo(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }
  
  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { allowed, remaining } = getRateLimitInfo(ip);
    
    if (!allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in an hour.' },
        { status: 429 }
      );
    }

    const { text } = await request.json();

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide text to humanize' },
        { status: 400 }
      );
    }

    if (text.length > 15000) {
      return NextResponse.json(
        { error: 'Text is too long. Maximum 15,000 characters.' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert editor who specializes in making AI-generated content sound more human and natural.

Your task is to rewrite the given text to sound more human-written while preserving the original meaning and key information.

Techniques to apply:
1. Vary sentence length and structure - mix short punchy sentences with longer flowing ones
2. Add conversational elements - contractions, rhetorical questions, personal observations
3. Replace generic phrases with specific, concrete examples
4. Remove hedging language and be more direct
5. Add personality and voice - opinions, humor where appropriate
6. Use more natural transitions instead of formulaic ones
7. Include imperfections that humans naturally have - sentence fragments, informal language
8. Replace jargon with plain language
9. Add sensory details and storytelling elements where relevant
10. Remove excessive qualifiers and filler words

Rules:
- Do NOT invent new facts or information
- Preserve the core message and structure
- Keep approximately the same length (within 20%)
- Return ONLY the rewritten text, no explanations or commentary
- Maintain paragraph breaks`;

    const userPrompt = `Rewrite this text to sound more human and less AI-generated:

${text.trim()}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 4000,
    });

    const humanizedText = response.choices[0]?.message?.content || '';

    if (!humanizedText) {
      return NextResponse.json(
        { error: 'Failed to humanize text. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      humanizedText: humanizedText.trim(),
      remaining
    });

  } catch (error) {
    console.error('AI Humanizer Humanize API error:', error);
    return NextResponse.json(
      { error: 'Failed to humanize text. Please try again.' },
      { status: 500 }
    );
  }
}
