"use client";

import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold">আমার প্রোফাইল</h1>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm">
        {isPending || !user ? (
          <div className="flex flex-col items-center gap-3">
            <div className="skeleton h-20 w-20 rounded-2xl" />
            <div className="skeleton h-6 w-40" />
            <div className="skeleton h-4 w-52" />
            <div className="skeleton mt-2 h-10 w-44 rounded-lg" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-primary text-3xl font-semibold text-primary-content">
              {user.image ? (
                <Image
                  src={user.image}
                  alt=""
                  width={80}
                  height={80}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </span>
            <h2 className="mt-3 text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-base-content/60">{user.email}</p>

            <Link href="/profile/update" className="btn btn-primary mt-5">
              তথ্য আপডেট করুন
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}