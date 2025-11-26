import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export type CompressionLevel = 'light' | 'balanced' | 'max';

interface CompressionResult {
  success: boolean;
  outputPath?: string;
  originalSize?: number;
  compressedSize?: number;
  reduction?: number;
  error?: string;
}

export async function compressGif(
  inputPath: string,
  outputPath: string,
  level: CompressionLevel = 'balanced'
): Promise<CompressionResult> {
  try {
    const originalStats = await fs.stat(inputPath);
    const originalSize = originalStats.size;

    let command: string;
    const palettePath = inputPath.replace('.gif', '_palette.png');

    switch (level) {
      case 'light':
        // Light compression: preserve fps and quality, just optimize palette
        command = `ffmpeg -y -i "${inputPath}" -vf "fps=15,scale=iw:ih:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5" -loop 0 "${outputPath}"`;
        break;
      
      case 'balanced':
        // Balanced: reduce fps slightly, good palette optimization
        command = `ffmpeg -y -i "${inputPath}" -vf "fps=12,scale=iw:ih:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" -loop 0 "${outputPath}"`;
        break;
      
      case 'max':
        // Max compression: reduce fps, limit dimensions, fewer colors
        command = `ffmpeg -y -i "${inputPath}" -vf "fps=10,scale='min(480,iw)':'-1':flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=2" -loop 0 "${outputPath}"`;
        break;
    }

    await execAsync(command, { timeout: 120000 }); // 2 minute timeout

    // Clean up palette file if it exists
    try {
      await fs.unlink(palettePath);
    } catch {
      // Palette file may not exist, ignore
    }

    const compressedStats = await fs.stat(outputPath);
    const compressedSize = compressedStats.size;
    const reduction = Math.round((1 - compressedSize / originalSize) * 100);

    return {
      success: true,
      outputPath,
      originalSize,
      compressedSize,
      reduction
    };
  } catch (error) {
    console.error('GIF compression error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Compression failed'
    };
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
