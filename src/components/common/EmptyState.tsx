import Link from "next/link";

export default function EmptyState({
  title = "কিছু পাওয়া যায়নি",
  message,
}: {
  title?: string;
  message: string;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] px-4 py-14 text-center"
    >
      <span aria-hidden className="text-5xl">🧺</span>
      <p className="text-sm font-semibold text-[#05893e]">৪০৪</p>
      <h1 className="text-xl font-bold text-[#1d271f]">{title}</h1>
      <p className="max-w-md text-sm text-[#1d271f]">{message}</p>
      <Link
        href="/"
        className="btn btn-primary btn-sm mt-2 border-[#047f39] bg-[#05893e] text-[#f3fbf4] hover:bg-[#047f39] sm:btn-md"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}