import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { checkRateLimit } from '@/lib/rate-limiter';

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

interface GenerateRequest {
  description: string;
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
    const { description } = body;

    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please describe the logo you want' },
        { status: 400 }
      );
    }

    if (description.length > 500) {
      return NextResponse.json(
        { error: 'Description must be 500 characters or less' },
        { status: 400 }
      );
    }

    const basePrompt = `Create a professional logo design based on this description: "${description.trim()}". 
Design requirements:
- Clean, vector-style logo with simple shapes
- Professional quality suitable for business use
- Pure white or transparent background
- No text watermarks, no photographer credits
- High contrast and clear visibility
- Scalable design that works at any size`;

    const logos: { base64: string; variant: number }[] = [];
    
    for (let i = 0; i < 4; i++) {
      try {
        const variationPrompt = `${basePrompt}

This is variation ${i + 1} of 4. Create a unique interpretation:
${i === 0 ? '- Focus on a clean, minimalist approach' : ''}
${i === 1 ? '- Try a more bold and impactful design' : ''}
${i === 2 ? '- Create an icon-focused version' : ''}
${i === 3 ? '- Design a more abstract or artistic interpretation' : ''}`;

        const response = await openai.images.generate({
          model: 'gpt-image-1',
          prompt: variationPrompt,
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
        { error: 'Failed to generate logos. Please try a different description.' },
        { status: 500 }
      );
    }

    console.log(`[Logo Generator] Generated ${logos.length} logos for: "${description.trim().slice(0, 50)}..."`);

    return NextResponse.json({
      success: true,
      logos,
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
