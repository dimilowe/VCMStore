import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { compressGif, formatFileSize, CompressionLevel } from '@/lib/gif-compressor';
import { checkRateLimit } from '@/lib/rate-limiter';
import { getCurrentUserWithTier } from '@/lib/pricing/getCurrentUserWithTier';
import { checkHeavyToolAccess, heavyToolAccessToResponse } from '@/lib/pricing/heavyTools';
import { ENGINE_REGISTRY } from '@/engines';

const UPLOAD_DIR = '/tmp/gif-uploads';
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const FILE_EXPIRY_MS = 10 * 60 * 1000;

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

async function cleanupFiles(...paths: string[]) {
  for (const filePath of paths) {
    try {
      await unlink(filePath);
    } catch {
    }
  }
}

function scheduleCleanup(jobId: string) {
  setTimeout(async () => {
    const inputPath = path.join(UPLOAD_DIR, `${jobId}_original.gif`);
    const outputPath = path.join(UPLOAD_DIR, `${jobId}_compressed.gif`);
    await cleanupFiles(inputPath, outputPath);
  }, FILE_EXPIRY_MS);
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUserWithTier();

    const engineConfig = ENGINE_REGISTRY["image-compress"];
    const heavyAccess = checkHeavyToolAccess(user, engineConfig.heavyMode);
    if (!heavyAccess.allowed) {
      return heavyToolAccessToResponse(heavyAccess);
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
    
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      const minutesLeft = Math.ceil(rateLimit.resetIn / 60000);
      return NextResponse.json(
        { 
          error: `You've hit the hourly limit for free compressions. Please try again in ${minutesLeft} minutes.`,
          rateLimited: true 
        },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const level = (formData.get('level') as CompressionLevel) || 'balanced';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.includes('gif') && !file.name.toLowerCase().endsWith('.gif')) {
      return NextResponse.json({ error: 'Only GIF files are allowed' }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit. Please upload a smaller GIF.' },
        { status: 400 }
      );
    }

    // Ensure upload directory exists
    await mkdir(UPLOAD_DIR, { recursive: true });

    // Generate unique ID for this compression job
    const jobId = generateId();
    const inputPath = path.join(UPLOAD_DIR, `${jobId}_original.gif`);
    const outputPath = path.join(UPLOAD_DIR, `${jobId}_compressed.gif`);

    // Save uploaded file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(inputPath, buffer);

    // Compress the GIF
    const result = await compressGif(inputPath, outputPath, level);

    if (!result.success) {
      // Clean up files on failure
      await cleanupFiles(inputPath, outputPath);
      return NextResponse.json(
        { error: result.error || 'Compression failed. Please try again.' },
        { status: 500 }
      );
    }

    // Schedule cleanup for files not downloaded within 10 minutes
    scheduleCleanup(jobId);

    return NextResponse.json({
      success: true,
      jobId,
      originalSize: result.originalSize,
      compressedSize: result.compressedSize,
      reduction: result.reduction,
      originalSizeFormatted: formatFileSize(result.originalSize!),
      compressedSizeFormatted: formatFileSize(result.compressedSize!),
      remaining: rateLimit.remaining
    });

  } catch (error) {
    console.error('GIF compression error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
