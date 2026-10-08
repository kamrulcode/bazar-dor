import Link from "next/link";

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
    <div className="flex items-center main-container justify-center py-4">
      {navData.map((nav) => (
        <Link
          href={`/${nav.slug}`}
          key={nav.id}
          className="px-3 py-px font-semibold text-xs flex gap-1 items-center"
        >
          <span>{nav.icon}</span>
          <span>{nav.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
