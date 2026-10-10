"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SignUP() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!");
      return;
    }

    // Connect your registration API here.

    try {
      const { error: signUPerror } = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      });

      if (signUPerror) {
        console.error("Registration error:", signUPerror);
        toast.error(signUPerror.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
        return;
      }
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
      router.push("/");
      router.refresh();

      // console.log("Registration successful:", data);
    } catch (err) {
      console.error("Signup failed:", err);
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="py-10 bg-[#f0f5f0] px-4  text-[#253029] ">
      {" "}
      <div className="mx-auto w-full max-w-104">
        {/* Header */}{" "}
        <header className="mb-6 text-center">
          {" "}
          <h1 className="text-[25px] font-bold tracking-tight">
            অ্যাকাউন্ট তৈরি করুন{" "}
          </h1>{" "}
          <p className="mt-1 text-sm text-[#737d75]">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত ড্যাশ দেখুন।{" "}
          </p>{" "}
        </header>
        {/* Registration Card */}
        <section className="rounded-2xl border border-[#dce5dd] bg-[#fbfcfb] px-6 py-6 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label htmlFor="name" className="mb-1.5 text-sm font-medium">
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="যেমন: রহিম উদ্দিন"
                value={formData.name}
                onChange={handleChange}
                className="input h-10 min-h-10 w-full rounded-lg border border-[#dce5dd] bg-transparent px-3 text-sm outline-none focus:border-[#07883e] focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label htmlFor="email" className="mb-1.5 text-sm font-medium">
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="input h-10 min-h-10 w-full rounded-lg border border-[#dce5dd] bg-transparent px-3 text-sm outline-none focus:border-[#07883e] focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 text-sm font-medium"
              >
                পাসওয়ার্ড
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
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
                <p onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </p>
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
            </div>

            {/* Confirm Password */}
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
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="আবার লিখুন"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
              className="btn h-10 min-h-10 w-full rounded-lg border-none bg-[#07883e] text-sm font-semibold text-white shadow-md hover:bg-[#067533]"
            >
              অ্যাকাউন্ট তৈরি করুন
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
              onClick={() => {
                // Connect Google OAuth here.
              }}
              className="btn h-10 min-h-10 gap-1.5 rounded-lg border border-[#dce5dd] bg-transparent px-2 text-xs font-semibold text-[#253029] shadow-none hover:bg-[#f0f5f0] sm:text-sm"
            >
              <span className="text-base font-bold text-[#4285f4]">
                <FaGoogle />
              </span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() => {
                // Connect GitHub OAuth here.
              }}
              className="btn h-10 min-h-10 gap-1.5 rounded-lg border border-[#dce5dd] bg-transparent px-2 text-xs font-semibold text-[#253029] shadow-none hover:bg-[#f0f5f0] sm:text-sm"
            >
              <FaGithub />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Sign In */}
          <p className="mt-4 text-center text-sm">
            অ্যাকাউন্টটি আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#07883e] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </section>
        {/* Back Link */}
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
