import { randomUUID } from "crypto";
import { Client } from "@replit/object-storage";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

// Initialize the Replit object storage client
const replitStorageClient = new Client();

export class ObjectStorageService {
  private bucketName: string | null = null;

  constructor() {
    // Bucket name will be detected on first use
  }
  
  async getBucketName(): Promise<string> {
    if (this.bucketName) {
      return this.bucketName;
    }
    
    // Get bucket from Replit client
    try {
      // The client.list() call will automatically connect to the bucket
      // and we can extract its name from the response
      await replitStorageClient.list();
      
      // The bucket is now initialized, extract its name from any subsequent operation
      // For now, use a simple fallback that we'll update
      this.bucketName = await this.detectBucketName();
      return this.bucketName;
    } catch (error) {
      console.error("Error accessing storage:", error);
      throw new Error("No storage bucket found. Please create a bucket in App Storage.");
    }
  }
  
  private async detectBucketName(): Promise<string> {
    // List objects to get bucket info
    const response = await replitStorageClient.list();
    if (response.ok && response.value.length > 0) {
      // Extract bucket name from the first object's URL
      const firstObject = response.value[0];
      if (firstObject.bucket) {
        return firstObject.bucket;
      }
    }
    
    // If no objects exist, we need to upload a test object to get the bucket name
    // Or use environment variable as fallback
    if (process.env.STORAGE_BUCKET) {
      return process.env.STORAGE_BUCKET;
    }
    
    // Default bucket pattern used by Replit
    // The bucket will be automatically created when we upload
    const testKey = `.test-${randomUUID()}`;
    await replitStorageClient.uploadFromText(testKey, "test");
    const uploadedObj = await replitStorageClient.list({ prefix: testKey });
    if (uploadedObj.ok && uploadedObj.value.length > 0 && uploadedObj.value[0].bucket) {
      await replitStorageClient.delete(testKey); // Clean up
      return uploadedObj.value[0].bucket;
    }
    
    throw new Error("Could not detect bucket name");
  }

  async getUploadUrl(): Promise<{ uploadUrl: string; publicUrl: string }> {
    const bucketName = await this.getBucketName();

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
      throw new Error(
        `Failed to sign object URL, status: ${response.status}`
      );
    }

    const { signed_url: signedURL } = await response.json();
    return signedURL;
  }
}
