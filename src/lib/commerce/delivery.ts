import crypto from "node:crypto";

/**
 * Signed, expiring download links. A token encodes which file and order it is
 * for, plus an expiry, and is signed so it can't be guessed or edited.
 * In production the download route swaps a valid token for a short-lived
 * signed URL from private storage (S3 / Cloudflare R2 / Supabase Storage).
 */
const secret = () => process.env.DOWNLOAD_TOKEN_SECRET ?? "dev-only-secret-change-me";

export function createDownloadToken(orderId: string, storageKey: string, ttlHours = 72) {
  const payload = Buffer.from(
    JSON.stringify({ o: orderId, k: storageKey, e: Date.now() + ttlHours * 3_600_000 })
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyDownloadToken(token: string): { orderId: string; storageKey: string } | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  if (expected.length !== sig.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) {
    return null;
  }
  const data = JSON.parse(Buffer.from(payload, "base64url").toString());
  if (Date.now() > data.e) return null;
  return { orderId: data.o, storageKey: data.k };
}
