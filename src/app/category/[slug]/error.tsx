"use client";

import Link from "next/link";

export default function CategoryError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-[#1d271f]">ক্যাটাগরি লোড করা যায়নি</h1>
      <p className="max-w-lg text-sm text-[#1d271f]/70">
        পণ্যের তথ্য আনতে সমস্যা হয়েছে। আবার চেষ্টা করুন।
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-10 items-center rounded-lg bg-[#05893e] px-4 text-sm font-semibold text-white hover:bg-[#047f39]"
        >
          আবার চেষ্টা করুন
        </button>
        <Link
          href="/"
          className="inline-flex min-h-10 items-center rounded-lg border border-[#e1e8e1] px-4 text-sm font-semibold text-[#1d271f] hover:bg-[#f0f5f0]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
