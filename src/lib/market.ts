import type { Product } from "@/types/bazardor";

type Market = Product["markets"][number];

export const marketAvg = (m: Market) => Math.round((m.min + m.max) / 2);

export function summarize(markets: Market[]) {
  if (markets.length === 0) return null;
  const lowest = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const highest = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const avg = Math.round(markets.reduce((s, m) => s + marketAvg(m), 0) / markets.length);
  return { min: lowest.min, minMarket: lowest.market, max: highest.max, maxMarket: highest.market, avg };
}