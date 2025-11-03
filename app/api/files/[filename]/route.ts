import { NextRequest, NextResponse } from "next/server";
import { Client } from "@replit/object-storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    const storage = new Client();
    const result = await storage.downloadAsBytes(filename);
    
    // Replit Object Storage uses a Result pattern
    if (!result.ok) {
      console.error("File download error:", result.error);
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }
    
    const bufferData = result.value;
    
    const ext = filename.split('.').pop()?.toLowerCase();
    const contentTypeMap: Record<string, string> = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'pdf': 'application/pdf',
      'zip': 'application/zip',
      'mp3': 'audio/mpeg',
      'mp4': 'video/mp4',
    };
    
    const contentType = contentTypeMap[ext || ''] || 'application/octet-stream';
    
    // Convert buffer array to Uint8Array for NextResponse compatibility
    // The result.value is an array of Buffers, so we need to extract the first one
    const buffer = Array.isArray(bufferData) ? bufferData[0] : bufferData;
    const uint8Array = new Uint8Array(buffer);
    
    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error("File download error:", error);
    return NextResponse.json(
      { error: "File not found" },
      { status: 404 }
    );
  }
}
