"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");
  const [showPassword, setShowPassword] = useState(false);

  const redirectTo =
    callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
      ? callbackUrl
      : "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { error: signInError } = await signIn.email({
        email,
        password,
      });

      if (signInError) {
        toast.error(signInError.message || "সাইন ইন করা যায়নি!");
        return;
      }

      // Show the toast before redirecting
      toast.success("সফলভাবে সাইন ইন হয়েছে।");
      // Wait 2 seconds so the user can see the toast
      setTimeout(() => {
        router.replace(redirectTo);
      }, 2000);
    } catch (err) {
      console.error("Sign-in failed:", err);
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="h-170 bg-[#f0f5f0] px-4 pt-8 text-[#253029] sm:pt-8">
      <div className="mx-auto w-full max-w-104">
        {/* Heading */}{" "}
        <header className="mb-6 text-center">
          {" "}
          <h1 className="text-[25px] font-bold tracking-tight">
            সাইন ইন{" "}
          </h1>{" "}
          <p className="mt-1 text-sm leading-6 text-[#737d75]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।{" "}
          </p>{" "}
        </header>
        {/* Login Card */}
        <section className="rounded-2xl border border-[#dce5dd] bg-[#fbfcfb] px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label htmlFor="email" className="mb-1.5 text-sm font-medium">
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="input h-10 min-h-10 w-full rounded-lg border border-[#dce5dd] bg-transparent px-3 text-sm outline-none focus:border-[#07883e] focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 text-sm font-medium"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <label className="input validator w-full focus:outline-none outline-none">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  minLength={8}
                />
                <p onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </p>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn mt-1 h-10 min-h-10 w-full rounded-lg border-none bg-[#07883e] text-sm font-semibold text-white shadow-md hover:bg-[#067533]"
            >
              সাইন ইন
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#dce3dd]" />
            <span className="text-xs text-[#657068]">অথবা</span>
            <div className="h-px flex-1 bg-[#dce3dd]" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={async () => {
                // Connect Google OAuth here.
                const data = await signIn.social({
                  provider: "google",
                });
                console.log(data);
              }}
              className="btn h-10 min-h-10 gap-1 rounded-lg border border-[#dce5dd] bg-transparent px-2 text-xs font-semibold text-[#253029] shadow-none hover:bg-[#f0f5f0] sm:text-sm"
            >
              <span className="text-base font-bold text-[#4285f4]">
                <FaGoogle />
              </span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={async () => {
                // Connect GitHub OAuth here.
                const data = await signIn.social({
                  provider: "github",
                });
                console.log(data);
              }}
              className="btn h-10 min-h-10 gap-1 rounded-lg border border-[#dce5dd] bg-transparent px-2 text-xs font-semibold text-[#253029] shadow-none hover:bg-[#f0f5f0] sm:text-sm"
            >
              <FaGithub />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Register Link */}
          <p className="mt-4 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#07883e] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>
        {/* Back to Home */}
        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-1 text-sm text-[#7b857e] transition hover:text-[#07883e]"
        >
          <ArrowLeft size={14} />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
