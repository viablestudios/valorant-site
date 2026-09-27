import type { Totals } from "./pricing";

export interface CheckoutCustomer {
  email: string;
  name: string;
  address?: { line1: string; line2?: string; city: string; postcode: string; country: string };
}

export interface CreateSessionInput {
  orderId: string;
  totals: Totals;
  customer: CheckoutCustomer;
  successUrl: string;
  cancelUrl: string;
}

export interface PaymentEvent {
  type: "payment.succeeded" | "payment.failed";
  orderId: string;
  providerRef: string;
}

/**
 * Anything that can take a payment implements this. The mock provider is used
 * locally; set PAYMENT_PROVIDER=stripe (plus keys) to switch to Stripe Checkout.
 */
export interface PaymentProvider {
  name: string;
  createCheckoutSession(input: CreateSessionInput): Promise<{ url: string; sessionId: string }>;
  parseWebhook(rawBody: string, headers: Headers): Promise<PaymentEvent | null>;
}

export async function getPaymentProvider(): Promise<PaymentProvider> {
  if (process.env.PAYMENT_PROVIDER === "stripe") {
    const { stripeProvider } = await import("./providers/stripe");
    return stripeProvider;
  }
  const { mockProvider } = await import("./providers/mock");
  return mockProvider;
}
