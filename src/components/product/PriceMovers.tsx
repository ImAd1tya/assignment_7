import type { Product } from "@/types/bazardor";
import { TREND } from "@/lib/format";
import ProductGrid from "./ProductGrid";

export default function PriceMovers({
  title,
  direction,
  products,
}: {
  title: string;
  direction: "up" | "down";
  products: Product[];
}) {
  if (products.length === 0) return null;
  const t = TREND[direction];

  return (
    <section aria-labelledby={`movers-${direction}`} className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span aria-hidden className={`text-base ${t.color}`}>{t.symbol}</span>
        <h2 id={`movers-${direction}`} className="text-xl font-bold leading-7 text-[#1d271f]">
          {title}
        </h2>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}