import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { stripHtmlForTTS, generateContentHash } from '@/lib/textToSpeech';
import { getSignedUrl } from '@replit/object-storage';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface BlogPost {
  id: number;
  title: string;
  content: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    
    // Fetch blog post
    const result = await query(
      'SELECT id, title, content FROM blog_posts WHERE id = $1',
      [postId]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    const post: BlogPost = result.rows[0];
    
    // Generate cache key based on content hash
    const contentHash = generateContentHash(post.content);
    const cacheKey = `blog-audio-${postId}-${contentHash}.mp3`;
    
    // Check if audio already exists in object storage
    try {
      const existingUrl = await getSignedUrl(cacheKey);
      if (existingUrl) {
        return NextResponse.json({ 
          audioUrl: `/api/files/${cacheKey}`,
          cached: true 
        });
      }
    } catch (error) {
      // File doesn't exist, continue to generate
    }
    
    // Strip HTML and prepare text for TTS
    const textContent = stripHtmlForTTS(post.content);
    
    // Add title at the beginning
    const fullText = `${post.title}.\n\n${textContent}`;
    
    // Generate audio using OpenAI TTS
    const mp3Response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'nova', // Natural, warm female voice
      input: fullText,
      speed: 1.0,
    });
    
    // Convert response to buffer
    const arrayBuffer = await mp3Response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Save to Replit Object Storage
    const { uploadUrl } = await fetch(
      `${process.env.REPLIT_DB_URL?.replace('db.', 'object-storage.')}?key=${encodeURIComponent(cacheKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'audio/mpeg',
        },
      }
    ).then(res => res.json());
    
    await fetch(uploadUrl, {
      method: 'PUT',
      body: buffer,
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
    
    // Return proxy URL
    return NextResponse.json({ 
      audioUrl: `/api/files/${cacheKey}`,
      cached: false 
    });
    
  } catch (error) {
    console.error('TTS generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate audio' },
      { status: 500 }
    );
  }
}
