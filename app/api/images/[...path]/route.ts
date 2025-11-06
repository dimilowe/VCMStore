import { NextRequest, NextResponse } from "next/server";
import { Client } from "@replit/object-storage";

const client = new Client();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const fileName = path.join('/');

    // Download file from Object Storage
    const result = await client.downloadAsBytes(fileName);

    if (!result.ok) {
      console.error("Download error:", result.error);
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    // Determine content type from extension
    const extension = fileName.split('.').pop()?.toLowerCase();
    const contentTypeMap: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
    };
    const contentType = contentTypeMap[extension || ''] || 'image/jpeg';

    // Return image with proper headers
    return new NextResponse(Buffer.from(result.value), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error("Image serve error:", error);
    return NextResponse.json(
      { error: "Failed to serve image" },
      { status: 500 }
    );
  }
}
