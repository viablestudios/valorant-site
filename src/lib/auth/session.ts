import type { Customer, Order } from "@/lib/types";

/**
 * Authentication seam. Right now it returns a demo customer so the account
 * area can be designed and tested. To add real auth (Auth.js, Clerk,
 * Supabase Auth…), replace these functions with ones that read the session
 * and query your database. Nothing else in the app needs to change.
 */

const demoCustomer: Customer = {
  id: "cus_demo",
  name: "Ryan Mercer",
  handle: "vantagepoint",
  email: "ryan@example.com",
  memberSince: "2025-11-04",
  rank: "Diamond 2",
};

const demoOrders: Order[] = [
  {
    id: "PF-M4Q8Z2",
    createdAt: "2026-09-12",
    status: "fulfilled",
    email: demoCustomer.email,
    lines: [{ productId: "prd_climb_bundle", name: "The Climb Bundle", quantity: 1, unitPrice: 4999 }],
    subtotal: 4999,
    shipping: 0,
    total: 4999,
  },
  {
    id: "PF-L9D3K7",
    createdAt: "2026-08-02",
    status: "shipped",
    email: demoCustomer.email,
    lines: [
      { productId: "prd_case_contour", name: "Contour Phone Case", variant: "iPhone 16 Pro", quantity: 1, unitPrice: 2200 },
      { productId: "prd_coaster_set", name: "Reticle Coaster Set", quantity: 1, unitPrice: 1800 },
    ],
    subtotal: 4000,
    shipping: 0,
    total: 4000,
  },
  {
    id: "PF-J2W6P1",
    createdAt: "2026-06-18",
    status: "fulfilled",
    email: demoCustomer.email,
    lines: [
      { productId: "prd_wp_redline", name: "Redline", quantity: 1, unitPrice: 249 },
      { productId: "prd_wp_upward", name: "Upward", quantity: 1, unitPrice: 199 },
      { productId: "prd_crosshair_lab", name: "Crosshair & Sensitivity Lab", quantity: 1, unitPrice: 499 },
    ],
    subtotal: 947,
    shipping: 0,
    total: 947,
  },
];

export async function getCurrentUser(): Promise<Customer | null> {
  return demoCustomer;
}

export async function getOrdersForUser(customerId: string): Promise<Order[]> {
  return customerId === demoCustomer.id ? demoOrders : [];
}
