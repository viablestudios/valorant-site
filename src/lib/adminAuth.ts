import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Minimal admin sign-in for /admin/reviews. One password, set in the ADMIN_PASSWORD environment variable
 * (see .env.example). The session cookie is a signed token derived from that password, so changing the
 * password signs everyone out. Without ADMIN_PASSWORD set (8+ characters) the admin is switched off.
 */
export const ADMIN_COOKIE = "pkf_admin";

const password = () => process.env.ADMIN_PASSWORD ?? "";
export const adminEnabled = () => password().length >= 8;

const token = () => crypto.createHmac("sha256", password()).update("peakform-admin-session-v1").digest("hex");

function safeEqual(a: string, b: string) {
  const x = crypto.createHash("sha256").update(a).digest();
  const y = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(x, y);
}

export const passwordMatches = (attempt: string) => adminEnabled() && safeEqual(attempt, password());
export const sessionToken = () => token();

export async function isAdmin(): Promise<boolean> {
  if (!adminEnabled()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return !!value && safeEqual(value, token());
}

/** Very small in-memory limiter for sign-in attempts (per server process). */
const attempts = new Map<string, { n: number; reset: number }>();
export function tooManyAttempts(key: string) {
  const now = Date.now();
  const rec = attempts.get(key);
  if (!rec || rec.reset < now) {
    attempts.set(key, { n: 1, reset: now + 10 * 60 * 1000 });
    return false;
  }
  rec.n += 1;
  return rec.n > 8;
}
