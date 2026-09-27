"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Reach-out form at the bottom of the page. Posts to /api/contact.
 * No email provider is wired up yet — see the API route for what to connect
 * before launch. Until then, submissions are only logged server-side.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Message could not be sent.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Message could not be sent.");
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-form contact-sent">
        <p className="eyebrow">Message sent</p>
        <h3>Got it. We&apos;ll reply soon.</h3>
        <p>
          We aim to respond within <strong>2–3 days</strong> — we&apos;re a small team and reply to every message in
          order, so thanks for your patience.
        </p>
        <button type="button" className="text-button" onClick={() => setStatus("idle")}>
          Send another message ↗
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" required autoComplete="name" className="input" />
      </div>
      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" className="input" placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="contact-message">What&apos;s your question?</label>
        <textarea id="contact-message" name="message" required rows={5} className="input contact-textarea" />
      </div>

      {status === "error" && (
        <p role="alert" className="contact-error">
          {error} Check your details and try again.
        </p>
      )}

      <div className="contact-submit">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        <p className="muted">We aim to respond in 2–3 days due to the volume of messages we get.</p>
      </div>
    </form>
  );
}
