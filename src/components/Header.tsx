import Image from "next/image";
import { Suspense } from "react";
import Date from "./Date";
import Link from "next/link";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header>
      <div className="main-container navbar bg-base-100 shadow-sm">
        <div className="flex items-center flex-1 gap-2">
          <Image
            src="/logo-icon.png"
            width={40}
            height={40}
            alt="logo"
            className="bg-accent_color p-2 rounded-xl "
          />
          <div>
            <span className="text-xl font-bold tracking-tight">বাজার দর</span>
            <Suspense fallback="Loading...">
              <Date />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-none ms-auto gap-2">
          <Link
            href={"/"}
            className="py-px px-4  flex items-center rounded-lg font-medium leading-5 h-10"
          >
            সাইন ইন
          </Link>
          <Link
            href={"/"}
            className="py-px px-4 bg-accent_color text-sm text-main_color flex items-center rounded-lg font-medium leading-5 h-10"
          >
            সাইন আপ
          </Link>
          {/* <ul className="menu menu-horizontal px-1">
            <li>
              <a>Link</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul> */}
        </div>
      </div>
      <Suspense fallback="loading ...">
        <NavLinks />
      </Suspense>
    </header>
  );
};

export default Header;
