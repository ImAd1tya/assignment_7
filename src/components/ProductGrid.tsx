import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/bazardor";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6 text-center text-[#1d271f]/70">
        কোনো পণ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
