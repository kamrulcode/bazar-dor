import { toBanglaNumber } from "@/fn/function";
import { ProductT } from "@/type/type";
import MarqueeText from "react-marquee-text";

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const products: ProductT[] = await res.json();

  return (
    <MarqueeText duration={20} pauseOnHover={true} direction="right">
      <div className="flex  gap-6 border-y border-[#E1E8E1] py-2">
        {[...products.slice(0, 9), ...products.slice(0, 9)].map(
          (product, i) => {
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
          },
        )}
      </div>
    </MarqueeText>
  );
};

export default Marquee;
