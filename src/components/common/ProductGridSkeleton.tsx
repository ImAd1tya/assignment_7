export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="লোড হচ্ছে">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-base-300 bg-base-100 p-4">
          <div className="skeleton h-40 w-full rounded-xl" />
          <div className="skeleton mt-4 h-5 w-3/4" />
          <div className="skeleton mt-2 h-4 w-1/3" />
          <div className="mt-4 flex items-center justify-between">
            <div className="skeleton h-6 w-24" />
            <div className="skeleton h-6 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}