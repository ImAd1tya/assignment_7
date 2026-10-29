import ProductCard from "@/components/ProductCard";
import type { Product, Trend } from "@/types/bazardor";

export default function PriceMovers({
  title,
  direction,
  products,
}: {
  title: string;
  direction: Exclude<Trend, "flat">;
  products: Product[];
}) {
  const isRising = direction === "up";

  return (
    <section aria-labelledby={`movers-${direction}`} className="flex flex-col gap-4">
      <h2
        id={`movers-${direction}`}
        className={`text-xl font-bold leading-7 ${isRising ? "text-[#05893e]" : "text-[#d03739]"}`}
      >
        {title} <span aria-hidden>{isRising ? "▲" : "▼"}</span>
      </h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4 text-sm text-[#1d271f]/70">
          এই মুহূর্তে দেখানোর মতো কোনো পণ্যের তথ্য নেই।
        </p>
      )}
    </section>
  );
}
