"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newName = (name ?? session?.user.name ?? "").trim();

    if (!newName) return toast.error("নাম দিন");
    if (newName === session?.user.name) return toast("নামে কোনো পরিবর্তন নেই");

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name: newName });

      if (error) {
        toast.error(error.message ?? "আপডেট ব্যর্থ হয়েছে");
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error("Profile update request failed", error);
      toast.error("তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mb-5 mt-1 text-sm text-base-content/60">আপনার প্রোফাইলের নাম পরিবর্তন করুন</p>

        {isPending ? (
          <div className="grid gap-3">
            <div className="skeleton h-5 w-16" />
            <div className="skeleton h-10 w-full rounded-lg" />
            <div className="skeleton h-10 w-full rounded-lg" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-3">
            <label className="grid gap-1 text-sm font-medium">
              নাম
              <input
                name="name"
                type="text"
                value={name ?? session?.user.name ?? ""}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম"
                className="input w-full"
              />
            </label>
            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading && <span className="loading loading-spinner loading-sm" />}
              Update Information
            </button>
            <Link href="/profile" className="btn btn-ghost w-full">
              বাতিল
            </Link>
          </form>
        )}
      </div>
    </main>
  );
}