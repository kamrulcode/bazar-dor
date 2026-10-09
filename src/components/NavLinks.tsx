"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavT {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = () => {
  const [data, setData] = useState<NavT[]>([]);
  const [isActive, setIsActive] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories",
      );
      const navData = await res.json();

      setData(navData);
    }

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  const handleClick = (id: string) => {
    console.log("click", id);

    setIsActive(id);
  };
  return (
    <div className="flex items-center main-container justify-center py-4">
      {data.map((nav) => (
        <Link
          onClick={() => handleClick(nav.id)}
          href={`/category/${nav.slug}`}
          key={nav.id}
          className={`pl-2 pr-4 py-1.5 font-semibold text-sm flex gap-1 items-center ${isActive === nav.id ? "bg-green-700  rounded-lg text-main_color" : ""}`}
        >
          <span>{nav.icon}</span>
          <span>{nav.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
