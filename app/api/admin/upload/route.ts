import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";
import { ObjectStorageService } from "@/lib/object-storage";

export async function POST() {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);

  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const storage = new ObjectStorageService();
    const { uploadUrl, publicUrl } = await storage.getUploadUrl();

    return NextResponse.json({ uploadUrl, publicUrl });
  } catch (error: any) {
    console.error("Upload URL generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
