import { toBn } from "@/lib/format";
import { marketAvg } from "@/lib/market";
import type { Product } from "@/types/bazardor";

const th = "px-4 py-3 text-left text-sm font-bold leading-[21px] text-[#1d271f]";
const td = "px-4 py-3 text-sm leading-[21px] text-[#1d271f]";

export default function MarketTable({ markets }: { markets: Product["markets"] }) {
  return (
    <section aria-labelledby="market-prices" className="flex flex-col gap-3">
      <h2 id="market-prices" className="text-lg font-semibold leading-7 text-[#1d271f]">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-[#e1e8e1] bg-[#fafcfa]">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b border-[#e1e8e1]">
              <th scope="col" className={th}>বাজার</th>
              <th scope="col" className={th}>বিভাগ</th>
              <th scope="col" className={`${th} text-right`}>সর্বনিম্ন</th>
              <th scope="col" className={`${th} text-right`}>সর্বাধিক</th>
              <th scope="col" className={`${th} text-right`}>গড়</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((m, i) => (
              <tr key={m.market} className={i % 2 === 1 ? "bg-[#f0f5f0]" : undefined}>
                <th scope="row" className={`${td} text-left font-medium`}>{m.market}</th>
                <td className={td}>{m.division}</td>
                <td className={`${td} text-right`}>{toBn(m.min)} টাকা</td>
                <td className={`${td} text-right`}>{toBn(m.max)} টাকা</td>
                <td className={`${td} text-right font-semibold`}>{toBn(marketAvg(m))} টাকা</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}