import Hero from "@/components/hero";
import PriceMovers from "@/components/PriceMovers";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";
import type { Product } from "@/types/bazardor";

export default async function Home() {
  let products: Product[] = [];
  let failed = false;
  try {
    products = await getProducts();
  } catch {
    failed = true;
  }

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <>
      <Hero />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:py-10">
        {failed ? (
          <p role="alert" className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6 text-center text-[#1d271f]">
            দাম লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
          </p>
        ) : (
          <>
            <PriceMovers title="আজ দাম বেড়েছে" direction="up" products={risers} />
            <PriceMovers title="আজ দাম কমেছে" direction="down" products={fallers} />

          
            <section
              id="সব-পণ্য"
              aria-labelledby="all-products"
              className="flex scroll-mt-40 flex-col gap-3"
            >
              <h2 id="all-products" className="text-xl font-bold leading-7 text-[#1d271f]">
                সব পণ্য
              </h2>
              <p className="text-sm leading-5 text-[#1d271f]/70">
                বাজারের সব নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও পরিবর্তন দেখুন।
              </p>
              <p className="text-sm leading-5 text-[#1d271f]/70">
                মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
              </p>
              <ProductGrid products={products} />
            </section>
          </>
        )}
      </main>
    </>
  );
}