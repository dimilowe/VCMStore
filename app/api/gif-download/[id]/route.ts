import { NextRequest, NextResponse } from 'next/server';
import { readFile, unlink, stat } from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = '/tmp/gif-uploads';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/gif',
        'Content-Disposition': `attachment; filename="compressed-${id}.gif"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}
