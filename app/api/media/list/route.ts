import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { UserSessionData, userSessionOptions } from "@/lib/user-session";
import { Client } from "@replit/object-storage";

const client = new Client();

export async function GET(request: NextRequest) {
  try {
    const session = await getIronSession<UserSessionData>(await cookies(), userSessionOptions);
    
    if (!session.isLoggedIn || !session.isAdmin) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    // List all files from object storage
    const filesResult = await client.list();
    
    if (!filesResult.ok) {
      console.error("Storage list error:", filesResult.error);
      return NextResponse.json(
        { error: "Failed to list files from storage" },
        { status: 500 }
      );
    }

    // The Replit Object Storage returns an array of objects with 'name' property
    const allFiles = filesResult.value;
    
    // Filter for image files only
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const imageFiles = allFiles.filter((file: any) => {
      // file.name is the filename
      const filename = file.name || file.key || file;
      if (typeof filename !== 'string') return false;
      
      const ext = filename.split('.').pop()?.toLowerCase();
      return ext && imageExtensions.includes(ext);
    });

    // Convert to URLs and add metadata
    const images = imageFiles.map((file: any) => {
      const filename = file.name || file.key || file;
      return {
        filename: filename,
        url: `/api/files/${filename}`,
        uploadedAt: filename.includes('blog-') ? 
          parseInt(filename.split('-')[1]) : Date.now()
      };
    });

    // Sort by upload date (newest first)
    images.sort((a: any, b: any) => b.uploadedAt - a.uploadedAt);

    return NextResponse.json({ 
      success: true, 
      images 
    });
  } catch (error) {
    console.error("Media list error:", error);
    return NextResponse.json(
      { error: "Failed to load media library" },
      { status: 500 }
    );
  }
}
