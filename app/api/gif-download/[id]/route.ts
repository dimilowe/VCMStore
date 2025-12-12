import { NextRequest, NextResponse } from 'next/server';
import { readFile, unlink, stat } from 'fs/promises';
import path from 'path';
import { applyExportPolicy } from '@/lib/export/applyExportPolicy';
import { getCurrentUserWithTier } from '@/lib/pricing/getCurrentUserWithTier';

const UPLOAD_DIR = '/tmp/gif-uploads';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params;
    
    // Validate ID format to prevent path traversal
    if (!/^[a-z0-9]+$/i.test(id)) {
      return NextResponse.json({ error: 'Invalid file ID' }, { status: 400 });
    }

    const compressedPath = path.join(UPLOAD_DIR, `${id}_compressed.gif`);
    const originalPath = path.join(UPLOAD_DIR, `${id}_original.gif`);

    // Check if file exists
    try {
      await stat(compressedPath);
    } catch {
      return NextResponse.json({ error: 'File not found or expired' }, { status: 404 });
    }

    // Read the compressed file
    const fileBuffer = await readFile(compressedPath);

    // Apply export policy
    const result = applyExportPolicy(user, {
      buffer: fileBuffer,
      mimeType: 'image/gif',
      filename: `compressed-${id}.gif`
    });

    if (!result.allowed) {
      return new Response(
        JSON.stringify({ error: 'UPGRADE_REQUIRED', feature: 'export', requiredTier: 'starter' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Clean up both files after sending
    setTimeout(async () => {
      try {
        await unlink(compressedPath);
        await unlink(originalPath);
      } catch {
        // Files may already be deleted, ignore
      }
    }, 1000);

    // Return the file as a download
    return new NextResponse(new Uint8Array(result.payload.buffer), {
      headers: {
        'Content-Type': result.payload.mimeType,
        'Content-Disposition': `attachment; filename="${result.payload.filename}"`,
        'Content-Length': result.payload.buffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}
