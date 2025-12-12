import { canExportFullRes, shouldWatermarkExports } from '../pricing/permissions';

type UserLike = { subscription_tier?: string | null } | null | undefined;

type ExportPayload = {
  buffer: Buffer;
  mimeType: string;
  filename: string;
};

export type ExportPolicyResult = 
  | { allowed: true; payload: ExportPayload; watermarked: boolean }
  | { allowed: false; reason: string };

export function applyExportPolicy(user: UserLike, payload: ExportPayload): ExportPolicyResult {
  const fullRes = canExportFullRes(user);
  const watermark = shouldWatermarkExports(user);

  if (!fullRes && !watermark) {
    return { 
      allowed: false, 
      reason: 'Upgrade to export files.' 
    };
  }

  let outputPayload = payload;

  if (watermark) {
    // TODO: Hook in watermarking logic when available
    // outputPayload = addWatermarkToPayload(outputPayload);
  }

  return {
    allowed: true,
    payload: outputPayload,
    watermarked: watermark,
  };
}

export function createExportErrorResponse(reason: string): Response {
  return new Response(
    JSON.stringify({ error: reason, upgradeRequired: true }),
    { 
      status: 403, 
      headers: { 'Content-Type': 'application/json' } 
    }
  );
}
