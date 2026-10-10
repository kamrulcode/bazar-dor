"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, ArrowLeft, UserRound } from "lucide-react";
import { signOut, updateUser, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [updatedName, setUpdatedName] = useState("");
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!updatedName.trim()) {
      toast.error("নাম লিখুন।");
      return;
    }

    const data = await updateUser({
      name: updatedName.trim(),
    });
    toast.success("আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    console.log(data);
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 text-[#253029]">
      {" "}
      <div className="mx-auto w-full max-w-104">
        {/* Header */}{" "}
        <header className="mb-6 text-center">
          {" "}
          <h1 className="text-[25px] font-bold tracking-tight">
            আমার প্রোফাইল{" "}
          </h1>{" "}
          <p className="mt-1 text-sm text-[#737d75]">
            আপনার ব্যক্তিগত তথ্য দেখুন ও আপডেট করুন।{" "}
          </p>{" "}
        </header>
        {/* Profile Card */}
        <section className="rounded-2xl border border-[#dce5dd] bg-[#fbfcfb] px-6 py-7">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="avatar placeholder">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-green-200 bg-[#e0eee3] text-[#07883e] shadow-sm">
                {session?.user.image ? (
                  <Image
                    src={session?.user.image}
                    width={96}
                    height={96}
                    alt="profile"
                  />
                ) : (
                  <UserRound size={48} strokeWidth={1.5} />
                )}
              </div>
            </div>

            <h2 className="mt-4 text-xl font-bold">{session?.user.name}</h2>
            <p className="mt-1 text-sm text-[#737d75]">আপনার অ্যাকাউন্ট</p>
          </div>

          <div className="my-6 h-px bg-[#e2e8e3]" />

          {/* Update Profile */}
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="form-control">
              <label htmlFor="name" className="mb-1.5 text-sm font-medium">
                আপনার নাম
              </label>

              <input
                id="name"
                type="text"
                value={updatedName}
                onChange={(e) => {
                  setUpdatedName(e.target.value);
                }}
                placeholder="আপনার নাম লিখুন"
                className="input h-10 min-h-10 w-full rounded-lg border border-[#dce5dd] bg-transparent px-3 text-sm outline-none focus:border-[#07883e] focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="btn h-10 min-h-10 w-full rounded-lg border-none bg-[#07883e] text-sm font-semibold text-white shadow-md hover:bg-[#067533]"
            >
              আপডেট করুন
            </button>
          </form>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="btn mt-3 h-10 min-h-10 w-full rounded-lg text-[#D03739]  border border-red-500  text-sm font-semibold shadow-none hover:text-main_color hover:bg-[#D03739]"
          >
            <LogOut size={16} />
            সাইন আউট
          </button>
        </section>
        {/* Back Home */}
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
