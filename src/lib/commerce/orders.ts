import { productIndex } from "@/lib/catalog";
import type { Totals } from "./pricing";
import type { CheckoutCustomer } from "./payment-provider";
import { createDownloadToken } from "./delivery";

/**
 * Order storage. This in-memory store resets when the dev server restarts —
 * swap these functions for database calls (Prisma, Drizzle, Supabase…) and
 * the rest of the app keeps working unchanged.
 */
export interface StoredOrder {
  id: string;
  createdAt: string;
  status: "pending" | "paid";
  customer: CheckoutCustomer;
  totals: Totals;
}

const g = globalThis as unknown as { __orders?: Map<string, StoredOrder> };
const store = (g.__orders ??= new Map<string, StoredOrder>());

export function newOrderId() {
  return `PF-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`;
}

export async function createOrder(order: StoredOrder) {
  store.set(order.id, order);
  return order;
}

export async function getOrder(id: string) {
  return store.get(id);
}

export async function markPaid(id: string) {
  const order = store.get(id);
  if (order) order.status = "paid";
  return order;
}

export interface DownloadLink {
  product: string;
  file: string;
  format: string;
  size: string;
  href: string;
}

/** Download links for every digital file in an order (bundles expand to their contents). */
export function downloadsForOrder(orderId: string, productIds: string[]): DownloadLink[] {
  const out: DownloadLink[] = [];
  const seen = new Set<string>();
  const all = Object.values(productIndex);
  const visit = (id: string) => {
    const p = productIndex[id];
    if (!p || p.type !== "digital" || seen.has(p.id)) return;
    seen.add(p.id);
    p.bundleOf?.forEach((slug) => {
      const child = all.find((x) => x.slug === slug);
      if (child) visit(child.id);
    });
    if (p.slug === "wallpaper-vault") all.filter((x) => x.wallpaper).forEach((x) => visit(x.id));
    p.files?.forEach((f) =>
      out.push({
        product: p.name,
        file: f.name,
        format: f.format,
        size: f.sizeLabel,
        href: `/api/downloads/${createDownloadToken(orderId, f.storageKey)}`,
      })
    );
  };
  productIds.forEach(visit);
  return out;
}
