"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { addLocalReview } from "@/lib/localReviews";
import type { Product } from "@/lib/types";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Reach-out form at the bottom of the page. Posts to /api/contact.
 * No email provider is wired up yet — see the API route for what to connect
 * before launch. Until then, submissions are only logged server-side.
 */
export function ContactForm({ products }: { products: Product[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);

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
    <div className="contact-form-wrap">
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

      <button type="button" className="text-button review-toggle" onClick={() => setReviewOpen(true)}>
        Leave a review
      </button>

      <Modal open={reviewOpen} onClose={() => setReviewOpen(false)} label="Leave a review" width={860} header={<h2 className="display" style={{ fontSize: 28 }}>Leave a review</h2>}>
        <ReviewForm products={products} onDone={() => setReviewOpen(false)} />
      </Modal>
    </div>
  );
}

function ReviewForm({ products, onDone }: { products: Product[]; onDone: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating < 1) {
      setStatus("error");
      setError("Choose a rating.");
      return;
    }
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rating }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Review could not be sent.");

      addLocalReview({
        id: `local-${Date.now()}`,
        handle: data.name.trim().toLowerCase().replace(/\s+/g, "_").slice(0, 24) || "you",
        productSlug: data.productSlug,
        rating: rating as 1 | 2 | 3 | 4 | 5,
        title: data.title,
        body: data.body,
        date: new Date().toISOString().slice(0, 10),
        placeholder: false,
        verified: false,
      });

      setStatus("sent");
      form.reset();
      setRating(0);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Review could not be sent.");
    }
  }

  if (status === "sent") {
    return (
      <div className="review-form-sent">
        <p className="eyebrow">Review added</p>
        <h3>Thanks — you can see it in the reviews section now.</h3>
        <p className="muted">
          It&apos;s showing in your browser as a preview of the flow. Reviews go through a check before they&apos;re
          shown to other visitors.
        </p>
        <div className="contact-submit">
          <button type="button" className="text-button" onClick={() => setStatus("idle")}>
            Leave another review ↗
          </button>
          <a className="text-button" href="#reviews" onClick={onDone}>
            Jump to reviews ↗
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="review-form" onSubmit={onSubmit}>
      <div className="review-form-row">
        <div className="field">
          <label htmlFor="review-name">Your name or gamer tag</label>
          <input id="review-name" name="name" required autoComplete="nickname" className="input" />
        </div>
        <div className="field">
          <label htmlFor="review-product">Which product?</label>
          <select id="review-product" name="productSlug" required className="input" defaultValue="">
            <option value="" disabled>
              Choose a product
            </option>
            {products.map((p) => (
              <option key={p.id} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <span>Rating</span>
        <div className="review-star-input" role="radiogroup" aria-label="Rating out of 5" aria-required="true">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
              className={n <= rating ? "on" : ""}
              onClick={() => setRating(n)}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="field">
        <label htmlFor="review-title">Title</label>
        <input id="review-title" name="title" required maxLength={120} className="input" />
      </div>
      <div className="field">
        <label htmlFor="review-body">Your review</label>
        <textarea id="review-body" name="body" required rows={4} maxLength={2000} className="input contact-textarea" />
      </div>

      {status === "error" && (
        <p role="alert" className="contact-error">
          {error} Check your details and try again.
        </p>
      )}

      <div className="contact-submit">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Submitting…" : "Submit review"}
        </Button>
      </div>
    </form>
  );
}
