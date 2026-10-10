"use client";
import { toBanglaNumber } from "@/fn/function";
import { useSession } from "@/lib/auth-client";
import type { ProductT } from "@/type/type";
import Link from "next/link";

interface ProductCardProps {
  p: ProductT;
}

const ProductCard = ({ p }: ProductCardProps) => {
  const { data: session } = useSession();
  const isUp = p.change.dir === "up";
  const isDown = p.change.dir === "down";

  const unitBn: Record<string, string> = {
    kg: "কেজি",
    gm: "গ্রাম",
    g: "গ্রাম",
    litre: "লিটার",
    l: "লিটার",
    ml: "মিলি",
    piece: "টি",
    pcs: "টি",
    dozen: "ডজন",
  };

  return (
    <Link
      href={
        session?.user
          ? `/product/${p.id}`
          : `/signin?callbackUrl=${encodeURIComponent(`/product/${p.id}`)}`
      }
      className="flex gap-10 rounded-xl border border-base-200 bg-base-100 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md "
    >
      <div className="flex items-center justify-center h-25 w-25  rounded-xl bg-slate-200">
        <span className="text-6xl">{p.image}</span>
      </div>
      <div className="flex flex-col justify-between w-full">
        <div>
          <h3 className="font-semibold text-base">{p.nameBn}</h3>

          <p className="text-xs text-base-content/60">
            প্রতি / {unitBn[p.unit] ?? p.unit}
          </p>
        </div>

        <div className="mt-5 flex items-end justify-between ">
          <div>
            <p className="text-xs text-base-content/60 font-normal">
              আজকের দাম
            </p>

            <p className="text-xl font-bold leading-7">
              ৳{toBanglaNumber(p.today)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
          </div>
          <div
            className={`rounded-xl px-2 py-1 text-xs font-semibold ${
              isUp
                ? "bg-red-100 text-red-600"
                : isDown
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {isUp && "▲"}
            {isDown && "▼"}
            {!isUp && !isDown && "—"} {p.change.pct}%
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
