import { NextRequest, NextResponse } from 'next/server';
import { readFile, unlink, readdir } from 'fs/promises';
import path from 'path';
import { applyExportPolicy } from '@/lib/export/applyExportPolicy';
import { getCurrentUserWithTier } from '@/lib/pricing/getCurrentUserWithTier';

const UPLOAD_DIR = '/tmp/image-uploads';

async function cleanupFiles(...paths: string[]) {
  for (const filePath of paths) {
    try {
      await unlink(filePath);
    } catch {
    }
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
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

    const { id } = await context.params;

    if (!id || !/^[a-z0-9]+$/i.test(id)) {
      return NextResponse.json({ error: 'Invalid download ID' }, { status: 400 });
    }

    const files = await readdir(UPLOAD_DIR).catch(() => []);
    const compressedFile = files.find(f => f.startsWith(`${id}_compressed`));
    
    if (!compressedFile) {
      return NextResponse.json(
        { error: 'File not found or expired. Please compress your image again.' },
        { status: 404 }
      );
    }

    const outputPath = path.join(UPLOAD_DIR, compressedFile);
    const inputPath = path.join(UPLOAD_DIR, `${id}_original`);

    const fileBuffer = await readFile(outputPath);

    const ext = path.extname(compressedFile).toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.webp') contentType = 'image/webp';

    const filename = `compressed-image${ext}`;

    // Apply export policy
    const result = applyExportPolicy(user, {
      buffer: fileBuffer,
      mimeType: contentType,
      filename
    });

    if (!result.allowed) {
      return new Response(
        JSON.stringify({ error: 'UPGRADE_REQUIRED', feature: 'export', requiredTier: 'starter' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    setTimeout(() => {
      cleanupFiles(inputPath, outputPath);
    }, 1000);

    return new NextResponse(new Uint8Array(result.payload.buffer), {
      headers: {
        'Content-Type': result.payload.mimeType,
        'Content-Disposition': `attachment; filename="${result.payload.filename}"`,
        'Content-Length': result.payload.buffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to download file. Please try again.' },
      { status: 500 }
    );
  }
}
