"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useRef, useState } from "react";

import Date from "./Date";
import NavLinks from "./NavLinks";
import { useSession } from "@/lib/auth-client";
import ProfileMenu from "./ProfileMenu";
import ProfileSkeleton from "./skeletons/ProfileSkeleton";

const Header = () => {
  const { data: session, isPending } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const user = session?.user;

  // Reusable authentication links.
  const authLinks = (
    <>
      <Link
        href="/signin"
        onClick={() => setIsMenuOpen(false)}
        className="flex h-10 items-center justify-center rounded-lg px-4 font-medium text-base-content transition hover:bg-accent_color/20"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        onClick={() => setIsMenuOpen(false)}
        className="flex h-10 items-center justify-center rounded-lg bg-accent_color px-4 font-medium text-main_color transition hover:opacity-90"
      >
        সাইন আপ
      </Link>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[#E1E8E1] bg-main_color">
        <div className="main-container">
          {/* Main header row */}
          <div className="flex min-h-16 items-center justify-between gap-3 py-2">
            {/* Logo on the left */}
            <Link
              href="/"
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="flex min-w-0 items-center gap-2"
            >
              <Image
                src="/logo.png"
                width={56}
                height={56}
                alt="বাজার দর logo"
                priority
                className="h-13 w-13 shrink-0 rounded-xl bg-green-200 p-1"
              />

              <div className="min-w-0">
                <span className="block whitespace-nowrap text-xl font-bold tracking-tight sm:text-2xl">
                  বাজার দর
                </span>

                <Suspense
                  fallback={<span className="text-xs">Loading...</span>}
                >
                  <Date color="text-base-content/60 text-xs sm:text-sm" />
                </Suspense>
              </div>
            </Link>

            {/* Desktop controls: medium screens and larger */}
            <div className="hidden items-center gap-3 md:flex">
              {isPending ? (
                <ProfileSkeleton />
              ) : user ? (
                <ProfileMenu />
              ) : (
                authLinks
              )}
            </div>

            {/* Mobile controls: below medium breakpoint */}
            <div className="relative flex shrink-0 items-center md:hidden">
              {isPending ? (
                <ProfileSkeleton />
              ) : user ? (
                <ProfileMenu />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent_color/20"
                >
                  {isMenuOpen ? "✕" : "☰"}
                </button>
              )}

              {!user && !isPending && isMenuOpen && (
                <div
                  ref={mobileMenuRef}
                  className="absolute right-0 top-full z-40 mt-3 flex w-52 flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-xl"
                >
                  {authLinks}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Navigation links */}
      <Suspense fallback={""}>
        <NavLinks />
      </Suspense>
    </>
  );
};

export default Header;
