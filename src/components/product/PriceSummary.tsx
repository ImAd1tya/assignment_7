import { toBn } from "@/lib/format";
import { summarize } from "@/lib/market";
import type { Product } from "@/types/bazardor";

function Stat({ label, value, caption, color }: { label: string; value: number; caption: string; color: string }) {
  return (
    <div className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] px-[25px] py-[17px]">
      <p className="text-xs leading-[18px] text-[#1d271f]">{label}</p>
      <p className={`text-2xl font-bold leading-8 ${color}`}>{toBn(value)} টাকা</p>
      <p className="truncate text-xs leading-[18px] text-[#1d271f]">{caption}</p>
    </div>
  );
}

export default function PriceSummary({
  markets,
  fallbackPrice,
}: {
  markets: Product["markets"];
  fallbackPrice: number;
}) {
  const s = summarize(markets);
  const summary = s ?? {
    min: fallbackPrice,
    minMarket: "বাজারের তথ্য নেই",
    max: fallbackPrice,
    maxMarket: "বাজারের তথ্য নেই",
    avg: fallbackPrice,
  };
  return (
    <section aria-labelledby="price-summary" className="flex flex-col gap-3">
      <h2 id="price-summary" className="text-lg font-semibold leading-7 text-[#1d271f]">
        দামের সারসংক্ষেপ
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat label="সর্বনিম্ন দাম" value={summary.min} caption={`সবচেয়ে কম দামের বাজার: ${summary.minMarket}`} color="text-[#1a9951]" />
        <Stat label="সর্বোচ্চ দাম" value={summary.max} caption={`সবচেয়ে বেশি দামের বাজার: ${summary.maxMarket}`} color="text-[#d03739]" />
        <Stat label="গড় দাম" value={summary.avg} caption={s ? "সব বাজারের গড়" : "বর্তমান দাম"} color="text-[#1d271f]" />
      </div>
    </section>
  );
}