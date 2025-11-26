import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const AREAS = ['body', 'money', 'career', 'relationships', 'creativity', 'general'];
const TONES = ['gentle', 'hype', 'brutal'];

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

    const openai = new OpenAI();

    const toneDescriptions: Record<string, string> = {
      gentle: 'warm, nurturing, and softly encouraging',
      hype: 'energetic, confident, and empowering like a best friend hyping you up',
      brutal: 'tough-love honest, direct, and no-nonsense but ultimately supportive',
    };

    const systemPrompt = `You are a blunt but kind mindset coach who writes self-love affirmations that are modern, honest, and non-cringey. You never mention "the universe", manifestation, or spiritual jargon. You focus on boundaries, self-respect, confidence, and action. Your affirmations feel like something a real person would actually say to themselves.`;

    const userPrompt = `Write 3 affirmations about self love for someone focused on the area: ${normalizedArea}.

Tone: ${normalizedTone} - ${toneDescriptions[normalizedTone]}

Rules:
- Each affirmation MUST start with "I"
- Keep each affirmation under 20 words
- Make them specific, grounded, and modern
- No spiritual jargon or "universe" talk
- For "brutal" tone: be tough-love but never insulting or mean
- Each affirmation should feel believable and actionable

Return exactly 3 affirmations, one per line, with no numbering or bullet points.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 300,
    });

    const response = completion.choices[0]?.message?.content?.trim();

    if (!response) {
      return NextResponse.json(
        { error: 'Failed to generate affirmations. Try again.' },
        { status: 500 }
      );
    }

    const affirmations = response
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && line.startsWith('I'));

    return NextResponse.json({
      affirmations,
      area: normalizedArea,
      tone: normalizedTone,
    });
  } catch (error) {
    console.error('Affirmation generation failed:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Take a breath and try again.' },
      { status: 500 }
    );
  }
}
