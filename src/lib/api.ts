import type { Product } from "@/types/bazardor";

export const API = "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API}/products`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Products request failed (${res.status})`);
  return res.json();
}