import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { applyExportPolicy } from '@/lib/export/applyExportPolicy';
import { getCurrentUserWithTier } from '@/lib/pricing/getCurrentUserWithTier';

const OUTPUT_DIR = '/tmp/producer-tag-output';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    // Export gating - check auth and tier
    const user = await getCurrentUserWithTier();
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'AUTH_REQUIRED', message: 'Log in to export your files.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { filename } = await params;

    const safePattern = /^output_[a-zA-Z0-9_-]+\.mp3$/;
    if (!safePattern.test(filename)) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      );
    }

    const filePath = path.join(OUTPUT_DIR, filename);

    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found or expired' },
        { status: 404 }
      );
    }

    const stats = await stat(filePath);
    const maxAge = 30 * 60 * 1000;
    if (Date.now() - stats.mtimeMs > maxAge) {
      await unlink(filePath);
      return NextResponse.json(
        { error: 'File has expired. Please generate a new one.' },
        { status: 410 }
      );
    }

    const fileBuffer = await readFile(filePath);

    // Apply export policy
    const payload = {
      buffer: fileBuffer,
      mimeType: 'audio/mpeg',
      filename: 'tagged_audio.mp3'
    };
    const result = applyExportPolicy(user, payload);

    if (!result.allowed) {
      return new Response(
        JSON.stringify({ error: 'UPGRADE_REQUIRED', feature: 'export', requiredTier: 'starter' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new NextResponse(result.payload.buffer, {
      headers: {
        'Content-Type': result.payload.mimeType,
        'Content-Disposition': `attachment; filename="${result.payload.filename}"`,
        'Content-Length': result.payload.buffer.length.toString(),
        'Cache-Control': 'no-store'
      }
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
