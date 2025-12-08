import { randomUUID } from "crypto";

export class FileStorageService {
  getUploadConfig() {
    return {
      dest: 'uploads/',
      limits: {
        fileSize: 500 * 1024 * 1024, // 500MB for download files
      },
    };
  }

  getFileUrl(filename: string): string {
    return `/uploads/${filename}`;
  }

  generateFilename(originalName: string): string {
    const ext = originalName.split('.').pop();
    return `${randomUUID()}.${ext}`;
  }
}

export const fileStorage = new FileStorageService();
