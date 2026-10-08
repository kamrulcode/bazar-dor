import type { ProductT } from "@/type/type";

interface ProductCardProps {
  p: ProductT;
}

const ProductCard = ({ p }: ProductCardProps) => {
  const isUp = p.change.dir === "up";
  const isDown = p.change.dir === "down";

  return (
    <article className="rounded-xl border border-base-200 bg-base-100 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-12 w-12  rounded-xl bg-slate-200">
          <span className="text-2xl">{p.image}</span>
        </div>

        <div>
          <h3 className="font-semibold text-base">{p.nameBn}</h3>

          <p className="text-xs text-base-content/60">{p.categoryNameBn}</p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-base-content/60 font-normal">আজকের দাম</p>

          <p className="text-xl font-bold leading-7">
            ৳{p.today} <span className="text-sm font-medium">টাকা</span>
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
    </article>
  );
};

export default ProductCard;
