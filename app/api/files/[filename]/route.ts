import { NextRequest, NextResponse } from "next/server";
import { Client } from "@replit/object-storage";

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    
    const storage = new Client();
    const fileData = await storage.downloadAsBytes(filename);
    
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
    
    return new NextResponse(fileData, {
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
