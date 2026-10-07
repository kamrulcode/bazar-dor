import Link from "next/link";
import React, { Suspense } from "react";

interface NavT {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const navData: NavT[] = await res.json();
  console.log(navData);
  return (
    <div className="flex items-center main-container justify-center">
      {navData.map((nav) => (
        <Link
          href={`/${nav.slug}`}
          key={nav.id}
          className="px-3 py-px font-medium text-xs flex gap-2 items-center"
        >
          {nav.icon}
          {nav.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
