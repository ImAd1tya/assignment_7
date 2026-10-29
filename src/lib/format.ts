import type { Trend } from "@/types/bazardor";

export const toBn = (n: number, decimals = 0) =>
  n.toLocaleString("bn-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const TREND: Record<Trend, { color: string; symbol: string }> = {
  up: { color: "text-[#05893e]", symbol: "▲" },
  down: { color: "text-[#d03739]", symbol: "▼" },
  flat: { color: "text-[#1d271f]/60", symbol: "—" },
};