import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { checkRateLimit } from '@/lib/rate-limiter';

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

const STYLES: Record<string, string> = {
  modern: 'modern, clean lines, geometric shapes, contemporary design',
  minimalist: 'minimalist, simple, clean, minimal elements, whitespace',
  bold: 'bold, strong, impactful, thick lines, powerful presence',
  luxury: 'luxury, elegant, sophisticated, premium, refined',
  playful: 'playful, fun, colorful, friendly, approachable'
};

interface GenerateRequest {
  businessName: string;
  slogan?: string;
  style: string;
  iconKeyword?: string;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const rateLimit = checkRateLimit(ip, 'logo-generator');
    if (!rateLimit.allowed) {
      const minutes = Math.ceil(rateLimit.resetIn / 60000);
      return NextResponse.json(
        { error: `Rate limit exceeded. Try again in ${minutes} minutes.` },
        { status: 429 }
      );
    }

    const body: GenerateRequest = await request.json();
    const { businessName, slogan, style, iconKeyword } = body;

    if (!businessName || businessName.trim().length === 0) {
      return NextResponse.json(
        { error: 'Business name is required' },
        { status: 400 }
      );
    }

    if (businessName.length > 50) {
      return NextResponse.json(
        { error: 'Business name must be 50 characters or less' },
        { status: 400 }
      );
    }

    const styleDescription = STYLES[style] || STYLES.modern;

    let prompt = `Design a clean, professional logo for a brand called "${businessName.trim()}". `;
    prompt += `Style: ${styleDescription}. `;
    
    if (slogan && slogan.trim()) {
      prompt += `The brand's slogan is "${slogan.trim()}". `;
    }
    
    if (iconKeyword && iconKeyword.trim()) {
      prompt += `Include an icon concept based on: ${iconKeyword.trim()}. `;
    }
    
    prompt += `Create a minimalist, vector-style logo with simple shapes and flat colors. `;
    prompt += `The logo should be on a pure white background. `;
    prompt += `Professional quality, suitable for business use. `;
    prompt += `No text watermarks, no photographer credits, no signatures.`;

    const logos: { base64: string; variant: number }[] = [];
    
    for (let i = 0; i < 4; i++) {
      try {
        const response = await openai.images.generate({
          model: 'gpt-image-1',
          prompt: prompt + ` Variation ${i + 1} with unique design approach.`,
          size: '1024x1024',
        });
        
        const base64 = response.data?.[0]?.b64_json;
        if (base64) {
          logos.push({ base64, variant: i + 1 });
        }
      } catch (imgError) {
        console.error(`Error generating logo variant ${i + 1}:`, imgError);
      }
    }

    if (logos.length === 0) {
      return NextResponse.json(
        { error: 'Failed to generate logos. Please try again.' },
        { status: 500 }
      );
    }

    console.log(`[Logo Generator] Generated ${logos.length} logos for "${businessName.trim()}" (style: ${style})`);

    return NextResponse.json({
      success: true,
      logos,
      businessName: businessName.trim(),
      style,
      remaining: rateLimit.remaining
    });

  } catch (error) {
    console.error('Logo generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate logos. Please try again.' },
      { status: 500 }
    );
  }
}
