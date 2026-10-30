import AuthShell from "../../components/auth/AuthShell";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <SignUpForm enabledProviders={getEnabledProviders()} />
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