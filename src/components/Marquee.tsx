import { toBanglaNumber } from "@/fn/function";
import { ProductT } from "@/type/type";
import Marquee from "react-fast-marquee";
const MarqueePage = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const products: ProductT[] = await res.json();

  return (
    <Marquee speed={120}>
      <div className="flex  gap-6 border-y border-[#E1E8E1] py-2">
        {products.map((product, i) => {
          const { dir, pct } = product.change;
          return (
            <div key={i} className="flex gap-2">
              <span>{product.image}</span>
              <p>{product.nameBn}</p>
              <p>{toBanglaNumber(product.today)} টাকা/কেজি</p>
              <span
                className={` ${dir === "up" ? "text-priceup" : "text-pricedown"}`}
              >
                {dir === "up" ? "▲" : "▼"}
                {toBanglaNumber(Math.abs(pct))}%
              </span>
            </div>
          );
        })}
        {products.map((product, i) => {
          const { dir, pct } = product.change;
          return (
            <div key={i} className="flex gap-2">
              <span>{product.image}</span>
              <p>{product.nameBn}</p>
              <p>{toBanglaNumber(product.today)} টাকা/কেজি</p>
              <span
                className={` ${dir === "up" ? "text-priceup" : "text-pricedown"}`}
              >
                {dir === "up" ? "▲" : "▼"}
                {toBanglaNumber(Math.abs(pct))}%
              </span>
            </div>
          );
        })}
      </div>
    </Marquee>
  );
};

export default MarqueePage;
