import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";
import { Client } from "@replit/object-storage";
import { query } from "@/lib/db";
import { readFile, readdir } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);

  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const storage = new Client();
    const uploadDir = join(process.cwd(), 'uploads');
    
    let migratedCount = 0;
    let skippedCount = 0;
    let updatedCount = 0;
    let errors: string[] = [];
    
    let files: string[];
    try {
      files = await readdir(uploadDir);
    } catch (err) {
      return NextResponse.json({
        error: "uploads/ directory not found. Run this migration from development environment where files are stored locally."
      }, { status: 400 });
    }
    
    for (const filename of files) {
      try {
        const exists = await storage.exists(filename);
        if (exists) {
          skippedCount++;
          continue;
        }
        
        const filePath = join(uploadDir, filename);
        const fileData = await readFile(filePath);
        
        await storage.uploadFromBytes(filename, fileData);
        migratedCount++;
      } catch (err: any) {
        errors.push(`Failed to migrate ${filename}: ${err.message}`);
        continue;
      }
    }
    
    const thumbnailResult = await query(
      `UPDATE products 
       SET thumbnail_url = REPLACE(thumbnail_url, '/uploads/', '/api/files/')
       WHERE thumbnail_url LIKE '/uploads/%'`
    );
    updatedCount += thumbnailResult.rowCount || 0;
    
    const downloadResult = await query(
      `UPDATE products 
       SET download_url = REPLACE(download_url, '/uploads/', '/api/files/')
       WHERE download_url LIKE '/uploads/%'`
    );
    updatedCount += downloadResult.rowCount || 0;
    
    return NextResponse.json({
      success: true,
      message: `Migration complete. Migrated ${migratedCount} files, skipped ${skippedCount} existing files, updated ${updatedCount} database records`,
      migratedCount,
      skippedCount,
      updatedCount,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json(
      { error: error.message || "Migration failed" },
      { status: 500 }
    );
  }
}
