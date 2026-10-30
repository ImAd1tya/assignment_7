import type { Category, Product } from "@/types/bazardor";

export const API = (
  process.env.NEXT_PUBLIC_BAZARDOR_API_URL ||
  "https://api.api-store.workers.dev/api/bazardor"
).replace(/\/+$/, "");

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status}): ${path}`);
  return res.json();
}

export const getProducts = () => get<Product[]>("/products");

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const list = await get<Product[]>(`/products?slug=${encodeURIComponent(slug)}`);
  return list[0] ?? null;
}

export async function getCategory(slug: string): Promise<Category | null> {
  const list = await get<Category[]>(`/categories?slug=${encodeURIComponent(slug)}`);
  return list[0] ?? null;
}

export const getProductsByCategory = (slug: string) =>
  get<Product[]>(`/products?category=${encodeURIComponent(slug)}`);