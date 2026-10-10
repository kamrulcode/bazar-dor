"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfileMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const user = session?.user;
  const initial = user?.name?.trim().charAt(0).toUpperCase() || "U";
  const firstName = user?.name?.trim().split(/\s+/)[0] || "User";

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  if (!user) return null;

  return (
    <div ref={profileRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-accent_color/10"
      >
        <span className="flex  h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-green-100 ring-2 ring-green-300 p-1">
          {user.image ? (
            <Image
              src={user.image}
              width={36}
              height={36}
              alt="Profile picture"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xl font-bold text-green-900">{initial}</span>
          )}
        </span>

        <span className="hidden font-semibold text-green-900 md:inline uppercase">
          {firstName}
        </span>

        <span className="hidden text-xs md:inline">⏷</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white p-4 text-slate-800 shadow-xl">
          <h3 className="font-semibold capitalize">{user.name || "User"}</h3>

          <p className="break-all text-sm text-slate-500">{user.email}</p>

          <div className="my-4 border-t border-slate-200" />

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 hover:bg-green-50"
          >
            👤 আমার প্রোফাইল
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-2 w-full rounded-lg border border-red-200 px-3 py-2 text-left text-red-600 hover:bg-red-50"
          >
            ↩︎ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}
