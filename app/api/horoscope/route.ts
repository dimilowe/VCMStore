import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import OpenAI from 'openai';

const ZODIAC_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const TONES = ['sweet', 'sassy', 'brutal'];

function getTodayUTC(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sign, tone } = body;

    const normalizedSign = sign?.toLowerCase()?.trim();
    const normalizedTone = tone?.toLowerCase()?.trim();

    if (!normalizedSign || !ZODIAC_SIGNS.includes(normalizedSign)) {
      return NextResponse.json(
        { error: 'Invalid zodiac sign' },
        { status: 400 }
      );
    }

    if (!normalizedTone || !TONES.includes(normalizedTone)) {
      return NextResponse.json(
        { error: 'Invalid tone. Choose sweet, sassy, or brutal.' },
        { status: 400 }
      );
    }

    const today = getTodayUTC();

    const existingResult = await query(
      'SELECT horoscope_text FROM daily_horoscopes WHERE date = $1 AND sign = $2 AND tone = $3',
      [today, normalizedSign, normalizedTone]
    );

    if (existingResult.rows.length > 0) {
      return NextResponse.json({
        horoscope: existingResult.rows[0].horoscope_text,
        sign: normalizedSign,
        tone: normalizedTone,
        cached: true,
      });
    }

    const openai = new OpenAI();

    const toneInstructions = {
      sweet: 'Be warm, encouraging, and supportive. Like a best friend giving a pep talk.',
      sassy: 'Be witty, playful, and a bit cheeky. Throw in some gentle teasing.',
      brutal: 'Be brutally honest and drag them a little, but ultimately encouraging. Roast them with love.',
    };

    const systemPrompt = `You are a brutally honest, funny, slightly unhinged astrologer. You write daily horoscopes that feel like a mix of best friend, therapist, and roast comic. You always speak in the second person ('you'), never mention AI, never talk about star charts or transits directly, and you keep it grounded, modern, and relatable. No generic fluff - be specific and concrete.`;

    const userPrompt = `Write today's horoscope of the day for ${normalizedSign.charAt(0).toUpperCase() + normalizedSign.slice(1)}.

Tone: ${normalizedTone.charAt(0).toUpperCase() + normalizedTone.slice(1)} - ${toneInstructions[normalizedTone as keyof typeof toneInstructions]}

Rules:
- Length: 130-200 words exactly
- Speak in second person ("you")
- Make it specific and concrete, not generic zodiac fluff
- Do NOT mention dates, star positions, planets, or birth charts
- Include at least one actionable piece of advice
- End with something memorable

Return ONLY the horoscope text, nothing else.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 400,
    });

    const horoscopeText = completion.choices[0]?.message?.content?.trim();

    if (!horoscopeText) {
      return NextResponse.json(
        { error: 'The stars are buffering. Try again in a minute.' },
        { status: 500 }
      );
    }

    await query(
      `INSERT INTO daily_horoscopes (date, sign, tone, horoscope_text) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (date, sign, tone) DO NOTHING`,
      [today, normalizedSign, normalizedTone, horoscopeText]
    );

    return NextResponse.json({
      horoscope: horoscopeText,
      sign: normalizedSign,
      tone: normalizedTone,
      cached: false,
    });
  } catch (error) {
    console.error('Horoscope generation failed:', error);
    return NextResponse.json(
      { error: 'The stars are buffering. Try again in a minute.' },
      { status: 500 }
    );
  }
}
