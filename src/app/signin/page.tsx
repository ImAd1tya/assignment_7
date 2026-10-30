import { Suspense } from "react";
import AuthShell, { FormSkeleton } from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <Suspense fallback={<FormSkeleton fields={2} />}>
        <SignInForm enabledProviders={getEnabledProviders()} />
      </Suspense>
    </AuthShell>
  );
}

function getEnabledProviders() {
  const providers: Array<"google" | "github"> = [];
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push("google");
  }
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    providers.push("github");
  }
  return providers;
}
