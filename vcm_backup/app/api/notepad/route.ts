import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

const MAX_INPUT_LENGTH = 8000;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

const modeInstructions: Record<string, string> = {
  summarize: "Summarize this note in a few concise paragraphs while keeping the key ideas. Be direct and preserve the most important information.",
  rewrite: "Rewrite this note to be clearer and more readable, keeping the same meaning and tone. Improve flow and word choice without changing the core message.",
  expand: "Expand this note with more detail and helpful elaboration, keeping the same topic. Add context, examples, or explanations where appropriate.",
  shorten: "Shorten this note while preserving the core meaning and important details. Remove redundancy and unnecessary words."
};

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in an hour.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { mode, text } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required.' },
        { status: 400 }
      );
    }

    const trimmedText = text.trim();

    if (trimmedText.length < 10) {
      return NextResponse.json(
        { error: 'Please provide at least 10 characters of text.' },
        { status: 400 }
      );
    }

    let textToProcess = trimmedText;
    if (trimmedText.length > MAX_INPUT_LENGTH) {
      textToProcess = trimmedText.slice(0, MAX_INPUT_LENGTH);
    }

    const validMode = modeInstructions[mode] ? mode : 'rewrite';
    const instruction = modeInstructions[validMode];

    const systemPrompt = `You are a helpful writing assistant. Your task is to transform the user's text according to specific instructions. Output only the transformed text without any preamble, explanation, or commentary. Do not wrap in quotes or add any formatting markers.`;

    const userPrompt = `${instruction}

Here is the text to transform:

${textToProcess}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content?.trim();

    if (!responseText) {
      return NextResponse.json(
        { error: 'AI request failed. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: responseText });

  } catch (error) {
    console.error('Notepad AI API error:', error);
    return NextResponse.json(
      { error: 'AI request failed. Please try again.' },
      { status: 500 }
    );
  }
}
