import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
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

interface AnalyzeRequest {
  competitorAd: string;
  myAd?: string;
  platform: string;
  goal: string;
  audience: string;
  brandTone: string;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in an hour.' },
        { status: 429 }
      );
    }

    const body: AnalyzeRequest = await request.json();
    
    if (!body.competitorAd || body.competitorAd.trim().length === 0) {
      return NextResponse.json(
        { error: 'Competitor ad copy is required.' },
        { status: 400 }
      );
    }

    if (body.competitorAd.length > 10000) {
      return NextResponse.json(
        { error: 'Ad copy is too long. Maximum 10,000 characters.' },
        { status: 400 }
      );
    }

    const platform = body.platform || 'Meta';
    const goal = body.goal || 'Leads';
    const audience = body.audience || 'General audience';
    const brandTone = body.brandTone || 'Neutral';
    const hasMyAd = body.myAd && body.myAd.trim().length > 0;

    const systemPrompt = `You are a senior direct-response ad copy strategist with 15+ years of experience analyzing and writing high-converting ads across all major platforms.

Your task is to analyze the provided ad copy and return a detailed breakdown in strict JSON format.

CRITICAL INSTRUCTIONS:
1. Respond with ONLY valid JSON. No markdown, no code blocks, no explanations.
2. Generate REAL, SPECIFIC analysis based on the actual ad provided.
3. DO NOT use placeholder text like "insight 1" or "suggestion 1" - write actual insights.
4. Every array must contain 2-5 real, substantive items specific to THIS ad.
5. All rewrites must be complete, usable ad copy.

Return this JSON structure:
{
  "summary": "2-3 sentences describing what this specific ad is trying to accomplish",
  "overallScore": 0-100,
  "scores": {
    "hook": 0-10,
    "clarity": 0-10,
    "benefits": 0-10,
    "proof": 0-10,
    "specificity": 0-10,
    "cta": 0-10,
    "platformFit": 0-10
  },
  "diagnosis": ["3-5 strategic insights about what this ad is doing"],
  "whatWorks": ["2-4 specific strengths of this ad"],
  "whatHurts": ["2-4 specific weaknesses of this ad"],
  "improvements": ["3-5 actionable suggestions to improve this ad"],
  "myAdComparison": {
    "isMyAdProvided": ${hasMyAd},
    "summary": "${hasMyAd ? 'Write a detailed comparison of the user ad vs competitor' : 'Only competitor ad was analyzed.'}",
    "strongerAreas": ${hasMyAd ? '["2-3 ways the user ad outperforms competitor"]' : '[]'},
    "weakerAreas": ${hasMyAd ? '["2-3 ways the user ad underperforms"]' : '[]'},
    "priorityFixesForMyAd": ${hasMyAd ? '["Top 3 changes to make to user ad"]' : '[]'}
  },
  "rewrites": {
    "safeUpgrade": "Full rewritten version keeping same structure but stronger",
    "boldVersion": "More aggressive scroll-stopping version for ${platform}",
    "shortFormHookLines": ["5-8 different ultra-short hook lines"],
    "headlines": ["3-5 strong headlines for ${platform}"],
    "ctaIdeas": ["3-5 CTA lines optimized for ${goal}"]
  },
  "platformNotes": "1-2 paragraphs on ${platform} fit and recommendations",
  "audienceNotes": "1-2 paragraphs on how to better reach ${audience}"
}

Context:
- Platform: ${platform}
- Goal: ${goal}
- Target Audience: ${audience}
- Brand Tone: ${brandTone}`;

    const userContent = hasMyAd 
      ? `COMPETITOR AD:\n${body.competitorAd}\n\nMY AD:\n${body.myAd}`
      : `COMPETITOR AD:\n${body.competitorAd}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });

    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      return NextResponse.json(
        { error: 'Failed to analyze ad. Please try again.' },
        { status: 500 }
      );
    }

    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.slice(7);
    }
    if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.slice(3);
    }
    if (cleanedContent.endsWith('```')) {
      cleanedContent = cleanedContent.slice(0, -3);
    }
    cleanedContent = cleanedContent.trim();

    try {
      const analysis = JSON.parse(cleanedContent);
      return NextResponse.json(analysis);
    } catch {
      console.error('Failed to parse OpenAI response as JSON:', cleanedContent);
      return NextResponse.json(
        { error: 'Failed to parse analysis. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Ad copy analyzer error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze ad. Please try again later.' },
      { status: 500 }
    );
  }
}
