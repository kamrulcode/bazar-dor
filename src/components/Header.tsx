"use client";
import Image from "next/image";
import { Suspense, useState, useEffect, useRef } from "react";
import Date from "./Date";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { signOut, useSession } from "@/lib/auth-client";

const Header = () => {
  const { data: session } = useSession();
  console.log(session);
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  // Safe side-effect management for both click outside AND route change updates
  useEffect(() => {
    // 1. Close when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 2. Safe cleanup handling on unmount or route change event transitions
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  return (
    <header className="sticky top-0 bg-main_color z-30 border-b border-[#E1E8E1]">
      <div className="main-container navbar py-3 ">
        <Link href={"/"} className="flex items-center flex-1 gap-2">
          <Image
            src="/logo.png"
            width={48}
            height={48}
            alt="logo"
            className="bg-green-200 p-1 rounded-xl "
          />
          <div>
            <span className="sm:text-2xl text-xl font-bold tracking-tight">
              বাজার দর
            </span>
            <Suspense fallback="Loading...">
              <Date color="text-base-content/60 text-xs sm:text-sm" />
            </Suspense>
          </div>
        </Link>
        <div className="flex flex-none ms-auto gap-2">
          {session?.user ? (
            <ul className="flex items-center gap-2">
              <div className="avatar sm:visible invisible">
                <div className="ring-green-300 ring-offset-green-100 w-7 rounded-sm ring-2 ring-offset-2 flex felx items-center justify-center ">
                  {session.user?.image ? (
                    <Image
                      src={session.user?.image}
                      height={40}
                      width={40}
                      alt="profile"
                    />
                  ) : (
                    <p className="font-bold uppercase  text-xl">
                      {session.user?.name.trim().slice(0, 1)}
                    </p>
                  )}
                </div>
              </div>

              <li ref={dropdownRef} className="relative">
                <div>
                  <div
                    onClick={handleClick}
                    className="flex items-center cursor-pointer"
                  >
                    <h1 className="text-xl font-medium pl-2 pr-1 text-green-900 uppercase">
                      {session.user?.name.trim().split(" ")[0]}
                    </h1>{" "}
                    <span className="text-xs">⏷</span>
                  </div>
                  <div
                    className={`absolute top-10 right-0 w-66 h-42 p-4 rounded-lg bg-[#FAFCFA] main-shadow ${
                      isActive ? "visible" : "invisible"
                    }`}
                  >
                    <h3 className="text-lg font-medium leading-5 capitalize text-slate-600">
                      {session.user?.name}
                    </h3>
                    <p className="text-sm font-normal leading-4 pb-2 text-slate-400">
                      {session.user?.email}
                    </p>
                    <div className="py-2 border-t border-slate-300 mb-2 cursor-pointer">
                      <Link
                        href={"/profile"}
                        className="font-normal text-base "
                      >
                        👤 আমার প্রোফাইল
                      </Link>
                    </div>
                    <Link
                      href={"/"}
                      onClick={() => signOut()}
                      className="text-base cursor-pointer font-normal leading-5 text-[#D03739] hover:text-main_color hover:bg-[#D03739] border border-red-500 rounded-lg px-3 py-1"
                    >
                      ↩︎ সাইন আউট
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Link
                className="  py-px px-4  text-base  flex items-center rounded-lg font-medium leading-5 h-10 hover:bg-accent_color/20"
                href={"/signin"}
              >
                সাইন ইন
              </Link>
              <Link
                className=" py-px px-4 bg-accent_color/90 text-base text-main_color flex items-center rounded-lg font-medium leading-5 h-10 hover:bg-accent_color"
                href={"/signup"}
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>
      <Suspense fallback="loading ...">
        <NavLinks />
      </Suspense>
    </header>
  );
};

export default Header;
