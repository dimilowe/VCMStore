import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { compressImage, formatFileSize, detectFormat, getOutputExtension, CompressionLevel } from '@/lib/image-compressor';
import { checkRateLimit } from '@/lib/rate-limiter';
import { getCurrentUserWithTier } from '@/lib/pricing/getCurrentUserWithTier';
import { checkHeavyToolAccess, heavyToolAccessToResponse } from '@/lib/pricing/heavyTools';
import { ENGINE_REGISTRY } from '@/engines';

const UPLOAD_DIR = '/tmp/image-uploads';
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const FILE_EXPIRY_MS = 10 * 60 * 1000;

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

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

function scheduleCleanup(jobId: string, extension: string) {
  setTimeout(async () => {
    const inputPath = path.join(UPLOAD_DIR, `${jobId}_original`);
    const outputPath = path.join(UPLOAD_DIR, `${jobId}_compressed${extension}`);
    await cleanupFiles(inputPath, outputPath);
  }, FILE_EXPIRY_MS);
}

function isAllowedFile(file: File): boolean {
  const ext = path.extname(file.name).toLowerCase();
  const isAllowedType = ALLOWED_TYPES.includes(file.type) || file.type === 'application/octet-stream';
  const isAllowedExt = ALLOWED_EXTENSIONS.includes(ext);
  return isAllowedType && isAllowedExt;
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

    if (!isAllowedFile(file)) {
      return NextResponse.json(
        { error: 'Only JPG, PNG, and WebP images are allowed' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit. Please upload a smaller image.' },
        { status: 400 }
      );
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const jobId = generateId();
    const format = detectFormat(file.type, file.name);
    const outputExtension = getOutputExtension(format);
    const inputPath = path.join(UPLOAD_DIR, `${jobId}_original`);
    const outputPath = path.join(UPLOAD_DIR, `${jobId}_compressed${outputExtension}`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(inputPath, buffer);

    const result = await compressImage(inputPath, outputPath, format, level);

    if (!result.success) {
      await cleanupFiles(inputPath, outputPath);
      return NextResponse.json(
        { error: result.error || 'Compression failed. Please try again.' },
        { status: 500 }
      );
    }

    scheduleCleanup(jobId, outputExtension);

    return NextResponse.json({
      success: true,
      jobId,
      originalSize: result.originalSize,
      compressedSize: result.compressedSize,
      reduction: result.reduction,
      originalSizeFormatted: formatFileSize(result.originalSize!),
      compressedSizeFormatted: formatFileSize(result.compressedSize!),
      outputFormat: result.outputFormat,
      remaining: rateLimit.remaining
    });

  } catch (error) {
    console.error('Image compression error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
