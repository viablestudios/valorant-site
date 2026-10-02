import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminEnabled, passwordMatches, sessionToken, tooManyAttempts } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  if (!adminEnabled()) return NextResponse.json({ error: "The admin is switched off. Set ADMIN_PASSWORD (8+ characters) in .env.local." }, { status: 503 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (tooManyAttempts(ip)) return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });

  let body: { password?: string } = {};
  try {
    body = await request.json();
  } catch {}
  if (!passwordMatches(String(body.password ?? ""))) return NextResponse.json({ error: "Wrong password." }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
