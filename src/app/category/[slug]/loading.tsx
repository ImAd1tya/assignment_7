import ProductGridSkeleton from "@/components/common/ProductGridSkeleton";

export default function CategoryLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="skeleton h-8 w-40" />
        <div className="skeleton h-10 w-48 rounded-lg" />
      </div>
      <ProductGridSkeleton count={6} />
    </main>
  );
}