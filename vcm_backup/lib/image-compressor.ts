import sharp from 'sharp';
import fs from 'fs/promises';

export type CompressionLevel = 'light' | 'balanced' | 'max';
export type ImageFormat = 'jpeg' | 'png' | 'webp';

interface CompressionResult {
  success: boolean;
  outputPath?: string;
  originalSize?: number;
  compressedSize?: number;
  reduction?: number;
  outputFormat?: string;
  error?: string;
}

function getFormatFromMime(mimeType: string): ImageFormat {
  if (mimeType.includes('png')) return 'png';
  if (mimeType.includes('webp')) return 'webp';
  return 'jpeg';
}

function getFormatFromExtension(filename: string): ImageFormat {
  const ext = filename.toLowerCase().split('.').pop();
  if (ext === 'png') return 'png';
  if (ext === 'webp') return 'webp';
  return 'jpeg';
}

export function detectFormat(mimeType: string, filename: string): ImageFormat {
  if (mimeType && mimeType !== 'application/octet-stream') {
    return getFormatFromMime(mimeType);
  }
  return getFormatFromExtension(filename);
}

export async function compressImage(
  inputPath: string,
  outputPath: string,
  format: ImageFormat,
  level: CompressionLevel = 'balanced'
): Promise<CompressionResult> {
  try {
    const originalStats = await fs.stat(inputPath);
    const originalSize = originalStats.size;

    let image = sharp(inputPath);
    
    const metadata = await image.metadata();

    switch (format) {
      case 'jpeg':
        const jpegQuality = level === 'light' ? 80 : level === 'balanced' ? 65 : 45;
        image = image.jpeg({ 
          quality: jpegQuality,
          mozjpeg: true
        });
        break;
      
      case 'png':
        const pngCompression = level === 'light' ? 6 : level === 'balanced' ? 7 : 9;
        const pngColors = level === 'light' ? 256 : level === 'balanced' ? 128 : 64;
        
        if (level === 'max') {
          image = image.png({ 
            compressionLevel: pngCompression,
            palette: true,
            colors: pngColors,
            effort: 10
          });
        } else {
          image = image.png({ 
            compressionLevel: pngCompression,
            effort: level === 'balanced' ? 7 : 4
          });
        }
        break;
      
      case 'webp':
        const webpQuality = level === 'light' ? 85 : level === 'balanced' ? 75 : 50;
        image = image.webp({ 
          quality: webpQuality,
          effort: level === 'max' ? 6 : 4
        });
        break;
    }

    if (level === 'max' && metadata.width && metadata.width > 1920) {
      image = image.resize(1920, undefined, { 
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    await image.toFile(outputPath);

    const compressedStats = await fs.stat(outputPath);
    const compressedSize = compressedStats.size;
    const reduction = Math.round((1 - compressedSize / originalSize) * 100);

    return {
      success: true,
      outputPath,
      originalSize,
      compressedSize,
      reduction,
      outputFormat: format
    };
  } catch (error) {
    console.error('Image compression error:', error);
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

export function getOutputExtension(format: ImageFormat): string {
  switch (format) {
    case 'jpeg': return '.jpg';
    case 'png': return '.png';
    case 'webp': return '.webp';
    default: return '.jpg';
  }
}
