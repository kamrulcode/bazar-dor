"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavCategorySkeleton from "./skeletons/NavCategorySkeleton";

interface NavT {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = () => {
  const pathname = usePathname();
  const [data, setData] = useState<NavT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories",
        );

        if (!res.ok) {
          throw new Error("Failed to load products");
        }
        const navData = await res.json();

        setData(navData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <NavCategorySkeleton />;

  return (
    <div className="sm:sticky top-17 z-10 bg-main_color border-b border-[#E1E8E1]">
      <div className="flex flex-wrap  items-center main-container justify-center pt-1 pb-2 ">
        {data.map((nav) => (
          <Link
            // onClick={() => handleClick(nav.id)}
            href={`/category/${nav.slug}`}
            aria-current={
              pathname === `/category/${nav.slug}` ? "page" : undefined
            }
            key={nav.id}
            className={`pl-2 pr-4 py-1.5 font-semibold text-sm flex gap-1 items-center hover:bg-slate-200 rounded-lg ${pathname === `/category/${nav.slug}` ? "bg-green-700   text-main_color hover:text-black" : ""}`}
          >
            <span>{nav.icon}</span>
            <span>{nav.nameBn}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;
