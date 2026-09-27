import type { PaymentProvider } from "../payment-provider";

/**
 * Local stand-in for a real payment provider. It approves every payment
 * instantly and sends the customer to the success page, exactly as Stripe
 * Checkout would after a successful card payment.
 */
export const mockProvider: PaymentProvider = {
  name: "mock",
  async createCheckoutSession({ orderId, successUrl }) {
    const sessionId = `mock_cs_${orderId}`;
    const url = new URL(successUrl);
    url.searchParams.set("order", orderId);
    url.searchParams.set("session_id", sessionId);
    return { url: url.toString(), sessionId };
  },
  async parseWebhook(rawBody) {
    const data = JSON.parse(rawBody);
    return { type: "payment.succeeded", orderId: data.orderId, providerRef: data.sessionId };
  },
};
