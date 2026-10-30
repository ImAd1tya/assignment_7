export type SortKey = "default" | "price-asc" | "price-desc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return NaN;
  const latin = value
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/[^\d.]/g, "");
  return latin ? parseFloat(latin) : NaN;
}

export function sortByPrice<T extends { today: unknown }>(items: T[], key: SortKey): T[] {
  if (key === "default") return items;
  const dir = key === "price-asc" ? 1 : -1;

  return [...items].sort((a, b) => {
    const x = toNumber(a.today);
    const y = toNumber(b.today);
    if (Number.isNaN(x) && Number.isNaN(y)) return 0;
    if (Number.isNaN(x)) return 1;
    if (Number.isNaN(y)) return -1;
    return (x - y) * dir;
  });
}