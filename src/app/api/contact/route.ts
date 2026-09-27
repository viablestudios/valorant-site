import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * No email provider is connected yet. Messages are validated and logged
 * server-side only — nothing is emailed or stored durably. Before launch,
 * wire this to a real provider (e.g. Resend, Postmark) and/or persist
 * submissions somewhere, and confirm a public support address to reply from.
 */
export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Fill in your name, email and message." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }

  // TODO before launch: send this to a real inbox / ticketing tool instead of console.log.
  console.log("[contact]", { name, email, message, at: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
