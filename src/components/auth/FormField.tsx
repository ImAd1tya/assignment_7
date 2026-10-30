import type { InputHTMLAttributes } from "react";

export default function FormField({
  label,
  id,
  ...props
}: { label: string; id: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium leading-5 text-[#1d271f]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...props}
        className="h-10 w-full rounded-lg border border-[#ccd0cc] bg-[#fafcfa] px-3 text-sm text-[#1d271f] placeholder:text-[#1d271f]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#05893e] disabled:opacity-60"
      />
    </div>
  );
}