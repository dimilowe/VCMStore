import { randomUUID } from "crypto";
import { Storage } from "@google-cloud/storage";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

// Initialize the Google Cloud Storage client with Replit credentials
const objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token",
      },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

export class ObjectStorageService {
  private bucketName: string = "Uploads";

  constructor() {
    // Use the bucket name from environment variable if set, otherwise use "Uploads"
    this.bucketName = process.env.STORAGE_BUCKET || "Uploads";
  }
  
  getBucketName(): string {
    return this.bucketName;
  }

  async getUploadUrl(): Promise<{ uploadUrl: string; publicUrl: string }> {
    const bucketName = this.getBucketName();
    const objectId = randomUUID();
    const objectName = `products/${objectId}`;

    const uploadUrl = await this.signObjectURL({
      bucketName,
      objectName,
      method: "PUT",
      ttlSec: 900, // 15 minutes
    });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${objectName}`;

    return { uploadUrl, publicUrl };
  }

  getPublicUrlFromSignedUrl(signedUrl: string): string {
    // Extract the bucket and object path from a signed URL
    const url = new URL(signedUrl);
    const pathParts = url.pathname.split("/");
    
    // Find bucket name in path
    const bucketIndex = pathParts.findIndex(p => p === this.bucketName);
    if (bucketIndex === -1) {
      // Fallback: return original URL if we can't parse it
      return signedUrl;
    }
    
    const objectName = pathParts.slice(bucketIndex + 1).join("/");
    return `https://storage.googleapis.com/${this.bucketName}/${objectName}`;
  }

  private async signObjectURL({
    bucketName,
    objectName,
    method,
    ttlSec,
  }: {
    bucketName: string;
    objectName: string;
    method: "GET" | "PUT" | "DELETE";
    ttlSec: number;
  }): Promise<string> {
    const request = {
      bucket_name: bucketName,
      object_name: objectName,
      method,
      expires_at: new Date(Date.now() + ttlSec * 1000).toISOString(),
    };

    const response = await fetch(
      `${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to sign object URL, status: ${response.status}, error: ${errorText}`
      );
    }

    const { signed_url: signedURL } = await response.json();
    return signedURL;
  }
}
