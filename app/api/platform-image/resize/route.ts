import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { getPresetById } from "@/data/platformImagePresets";
import { applyExportPolicy } from "@/lib/export/applyExportPolicy";
import { getCurrentUserWithTier } from "@/lib/pricing/getCurrentUserWithTier";

export async function POST(request: NextRequest) {
  try {
    // Export gating - check auth and tier
    const user = await getCurrentUserWithTier();
    if (!user) {
      return new Response(
        JSON.stringify({ error: "AUTH_REQUIRED", message: "Log in to export your files." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const presetId = formData.get("presetId") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!presetId) {
      return NextResponse.json(
        { error: "No preset ID provided" },
        { status: 400 }
      );
    }

    const preset = getPresetById(presetId);
    if (!preset) {
      return NextResponse.json(
        { error: `Unknown preset: ${presetId}` },
        { status: 400 }
      );
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > preset.maxFileSizeMB) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${preset.maxFileSizeMB}MB` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    const resizedBuffer = await sharp(inputBuffer)
      .resize(preset.width, preset.height, { fit: "cover" })
      .jpeg({ quality: 90 })
      .toBuffer();

    // Apply export policy
    const result = applyExportPolicy(user, {
      buffer: resizedBuffer,
      mimeType: "image/jpeg",
      filename: `${preset.id}-resized.jpg`
    });

    if (!result.allowed) {
      return new Response(
        JSON.stringify({ error: "UPGRADE_REQUIRED", feature: "export", requiredTier: "starter" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(new Uint8Array(result.payload.buffer), {
      headers: {
        "Content-Type": result.payload.mimeType,
        "Content-Disposition": `attachment; filename="${result.payload.filename}"`,
      },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
