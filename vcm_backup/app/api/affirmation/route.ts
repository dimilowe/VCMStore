import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import OpenAI from 'openai';

const AREAS = ['body', 'money', 'career', 'relationships', 'creativity', 'general'];
const TONES = ['gentle', 'hype', 'brutal'];

function getTodayUTC(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { area, tone } = body;

    const normalizedArea = area?.toLowerCase()?.trim();
    const normalizedTone = tone?.toLowerCase()?.trim();

    if (!normalizedArea || !AREAS.includes(normalizedArea)) {
      return NextResponse.json(
        { error: 'Invalid area. Choose from: body, money, career, relationships, creativity, or general.' },
        { status: 400 }
      );
    }

    if (!normalizedTone || !TONES.includes(normalizedTone)) {
      return NextResponse.json(
        { error: 'Invalid tone. Choose gentle, hype, or brutal.' },
        { status: 400 }
      );
    }

    const today = getTodayUTC();

    const existingResult = await query(
      'SELECT affirmations FROM daily_affirmations WHERE date = $1 AND area = $2 AND tone = $3',
      [today, normalizedArea, normalizedTone]
    );

    if (existingResult.rows.length > 0) {
      return NextResponse.json({
        affirmations: existingResult.rows[0].affirmations,
        area: normalizedArea,
        tone: normalizedTone,
        date: today,
        cached: true,
      });
    }

    const openai = new OpenAI();

    const areaDescriptions: Record<string, string> = {
      body: 'body image, physical health, and self-acceptance of their appearance',
      money: 'financial worth, earning potential, and deserving abundance',
      career: 'professional confidence, career growth, and purpose',
      relationships: 'boundaries, healthy relationships, and not settling',
      creativity: 'creative expression, artistic confidence, and sharing their work',
      general: 'overall self-worth, confidence, and loving themselves',
    };

    const toneDescriptions: Record<string, string> = {
      gentle: 'warm, nurturing, and softly encouraging',
      hype: 'energetic, confident, and empowering like a best friend hyping you up',
      brutal: 'tough-love honest, direct, and no-nonsense but ultimately supportive',
    };

    const systemPrompt = `You are a blunt but kind mindset coach who writes daily self-love affirmations that are modern, honest, and non-cringey. You never mention "the universe", manifestation, or spiritual jargon. You focus on boundaries, self-respect, confidence, and action. Your affirmations feel like something a real person would actually say to themselves.`;

    const userPrompt = `Write today's daily affirmation about self love for someone focused on: ${areaDescriptions[normalizedArea]}.

Tone: ${normalizedTone} - ${toneDescriptions[normalizedTone]}

Rules:
- Write exactly 1 powerful affirmation (not multiple)
- The affirmation MUST start with "I"
- Length: 15-30 words - make it substantial and meaningful
- Make it specific, grounded, and modern
- No spiritual jargon, no "universe" talk, no manifestation language
- For "brutal" tone: be tough-love but never insulting or mean
- The affirmation should feel believable and actionable
- Make it feel like advice from a wise friend, not a cheesy poster

Return ONLY the affirmation text, nothing else.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 150,
    });

    const response = completion.choices[0]?.message?.content?.trim();

    if (!response) {
      return NextResponse.json(
        { error: 'Failed to generate your daily affirmation. Try again.' },
        { status: 500 }
      );
    }

    const affirmation = response.replace(/^["']|["']$/g, '').trim();
    const affirmations = [affirmation];

    await query(
      `INSERT INTO daily_affirmations (date, area, tone, affirmations) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (date, area, tone) DO NOTHING`,
      [today, normalizedArea, normalizedTone, affirmations]
    );

    return NextResponse.json({
      affirmations,
      area: normalizedArea,
      tone: normalizedTone,
      date: today,
      cached: false,
    });
  } catch (error) {
    console.error('Affirmation generation failed:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Take a breath and try again.' },
      { status: 500 }
    );
  }
}
