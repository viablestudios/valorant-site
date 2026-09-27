import crypto from "node:crypto";
import type { PaymentProvider } from "../payment-provider";

/**
 * Stripe Checkout via the REST API (no SDK needed).
 * Setup: add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET, set PAYMENT_PROVIDER=stripe,
 * and point a Stripe webhook at /api/webhooks/payments for `checkout.session.completed`.
 */
const API = "https://api.stripe.com/v1";

export const stripeProvider: PaymentProvider = {
  name: "stripe",
  async createCheckoutSession({ orderId, totals, customer, successUrl, cancelUrl }) {
    const body = new URLSearchParams({
      mode: "payment",
      success_url: `${successUrl}?order=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      customer_email: customer.email,
      client_reference_id: orderId,
      "metadata[orderId]": orderId,
    });
    totals.lines.forEach((l, i) => {
      const key = `line_items[${i}]`;
      if (l.product.stripePriceId) {
        body.append(`${key}[price]`, l.product.stripePriceId);
      } else {
        body.append(`${key}[price_data][currency]`, "gbp");
        body.append(`${key}[price_data][unit_amount]`, String(l.unitPrice));
        body.append(
          `${key}[price_data][product_data][name]`,
          l.variantLabel ? `${l.product.name} (${l.variantLabel})` : l.product.name
        );
      }
      body.append(`${key}[quantity]`, String(l.quantity));
    });
    if (totals.requiresShipping) {
      body.append("shipping_address_collection[allowed_countries][0]", "GB");
      body.append("shipping_options[0][shipping_rate_data][display_name]", "Tracked delivery");
      body.append("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
      body.append("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(totals.shipping));
      body.append("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "gbp");
    }
    const res = await fetch(`${API}/checkout/sessions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
      body,
    });
    if (!res.ok) throw new Error(`Stripe error: ${await res.text()}`);
    const session = await res.json();
    return { url: session.url, sessionId: session.id };
  },

  async parseWebhook(rawBody, headers) {
    const header = headers.get("stripe-signature") ?? "";
    const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
    const expected = crypto
      .createHmac("sha256", process.env.STRIPE_WEBHOOK_SECRET ?? "")
      .update(`${parts.t}.${rawBody}`)
      .digest("hex");
    if (!parts.v1 || expected.length !== parts.v1.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(parts.v1))) return null;
    const event = JSON.parse(rawBody);
    if (event.type !== "checkout.session.completed") return null;
    const session = event.data.object;
    return { type: "payment.succeeded", orderId: session.metadata.orderId, providerRef: session.id };
  },
};
