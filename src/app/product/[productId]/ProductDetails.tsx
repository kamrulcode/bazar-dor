"use client";

import type { ProductT, MarketT } from "@/type/type";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

function formatPrice(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return "—";

  return `${value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  })} টাকা`;
}

function SummaryCard({
  label,
  value,
  color,
  note,
}: {
  label: string;
  value: string;
  color: string;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-[#e5ece6] bg-[#fafcf9] p-3">
      <p className="text-xs text-base-content/60">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-xs text-base-content/60">{note}</p>
    </div>
  );
}

export default function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const [product, setProduct] = useState<ProductT | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        const { productId } = await params;

        const response = await fetch(
          `${API_URL}/${encodeURIComponent(productId)}`,
          {
            cache: "no-store",
            headers: { Accept: "application/json" },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`পণ্য লোড করা যায়নি (${response.status})`);
        }

        const data: unknown = await response.json();

        // API returns one product object.
        // Also support { data: product } responses.
        const payload =
          data &&
          typeof data === "object" &&
          "data" in data &&
          !("markets" in data)
            ? (data as { data: unknown }).data
            : data;

        if (
          !payload ||
          typeof payload !== "object" ||
          !("markets" in payload)
        ) {
          throw new Error("API response-এ পণ্যের markets পাওয়া যায়নি।");
        }

        const result = payload as ProductT;

        if (!Array.isArray(result.markets)) {
          throw new Error("পণ্যের market data সঠিক নয়।");
        }

        if (!controller.signal.aborted) {
          setProduct(result);
        }
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "পণ্য লোড করা যায়নি। আবার চেষ্টা করুন।",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => controller.abort();
  }, [params]);

  const markets: MarketT[] = product?.markets ?? [];

  const prices = markets
    .flatMap((market) => [market.min, market.max])
    .filter((price) => Number.isFinite(price));

  const minPrice = prices.length ? Math.min(...prices) : null;
  const maxPrice = prices.length ? Math.max(...prices) : null;

  const changeColor =
    product?.change.dir === "up"
      ? "text-red-500"
      : product?.change.dir === "down"
        ? "text-emerald-600"
        : "text-[#68746b]";

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-4 text-[#27332b] sm:px-6 sm:py-6">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-slate-950 text-sm ">
          <Link href={"/"} className="hover:underline">
            হোম
          </Link>
          <span className="text-gray-400">❯</span>
          <Link
            className="hover:underline"
            href={`/category/${product?.category}`}
          >
            {product?.categoryNameBn}
          </Link>
          <span className="text-gray-400">❯</span>
          <span>{product?.nameBn ?? "বাজার মনিটরিং"}</span>
        </div>

        {/* Product Header */}
        <section className="card mb-3 border border-[#e5ece6] bg-[#fbfdfb] shadow-none">
          <div className="card-body flex flex-row items-center gap-3 p-3 sm:p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gray-200 text-5xl w-20 h-20 ">
              {product?.image ?? product?.categoryIcon ?? "🥬"}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-base font-extrabold sm:text-4xl">
                {product?.nameBn ?? "বাজারদর"}
              </h1>

              <p className="mt-0.5 text-sm text-base-content/70">
                প্রতি কেজি · মসলা
                {product?.categoryNameBn ?? "পণ্যের বিবরণ"}
              </p>

              <p className="mt-1 text-sm text-base-content/60">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-semibold">বেড়েছে</span>{" "}
                {product?.change.pct.toLocaleString("bn-BD")}%
              </p>
            </div>

            <div className="min-w-19 rounded-xl bg-[#f0f5f0] px-3 py-2 text-center">
              <p className="text-sm text-base-content/60">আজকের দাম</p>

              <p className="text-4xl font-extrabold">
                {product ? product.today.toLocaleString("bn-BD") : "—"}
              </p>

              <p className="text-sm text-base-content/60">
                টাকা /{" "}
                {product?.unit === "kg" ? "কেজি" : (product?.unit ?? "একক")}
              </p>

              {product && (
                <p className={`mt-1 text-sm font-semibold ${changeColor}`}>
                  {product.change.dir === "up"
                    ? "▲"
                    : product.change.dir === "down"
                      ? "▼"
                      : "●"}{" "}
                  {product.change.pct.toLocaleString("bn-BD")}%
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Summary and Market Table */}
        <section className="card border border-[#e5ece6] bg-[#fbfdfb] shadow-none">
          <div className="card-body gap-3 p-3 sm:p-4">
            <h2 className="text-lg font-bold">দামের সারসংক্ষেপ</h2>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <SummaryCard
                label="সর্বনিম্ন দাম"
                value={formatPrice(minPrice)}
                color="text-emerald-600"
                note="সবচেয়ে কম দামের বাজার"
              />

              <SummaryCard
                label="সর্বাধিক দাম"
                value={formatPrice(maxPrice)}
                color="text-red-500"
                note="সবচেয়ে বেশি দামের বাজার"
              />

              <SummaryCard
                label="গড় দাম"
                value={formatPrice(product?.today)}
                color="text-emerald-600"
                note="প্রতি কেজি-এর হিসাবে"
              />
            </div>

            <div className="mt-1">
              <h2 className="mb-3 text-lg font-bold">
                বাজারভিত্তিক আঞ্চলিক দাম
              </h2>

              {loading && (
                <div className="flex justify-center p-8">
                  <span className="loading loading-spinner loading-md text-emerald-600" />
                </div>
              )}

              {!loading && error && (
                <div className="alert mb-3 border border-red-200 bg-red-50 text-sm text-red-700">
                  <span>{error}</span>
                </div>
              )}

              {!loading && !error && markets.length === 0 && (
                <div className="rounded-xl border border-[#e5ece6] p-5 text-center text-sm text-[#68746b]">
                  কোনো বাজারের তথ্য পাওয়া যায়নি।
                </div>
              )}

              {!loading && !error && markets.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-[#e5ece6]">
                  <table className="table table-xs w-full min-w-135 text-[10px]">
                    <thead>
                      <tr className="border-b border-[#e5ece6] bg-[#fafcf9] text-[#69746c] text-base">
                        <th className="px-3 py-3 font-medium">বাজার</th>
                        <th className="px-3 py-3 font-medium">বিভাগ</th>
                        <th className="px-3 py-3 text-right font-medium">
                          সর্বনিম্ন
                        </th>
                        <th className="px-3 py-3 text-right font-medium">
                          সর্বাধিক
                        </th>
                        <th className="px-3 py-3 text-right font-medium">
                          গড়
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {markets.map((market, index) => (
                        <tr
                          key={`${market.market}-${index}`}
                          className="text-sm border-b border-[#e5ece6] transition-colors hover:bg-[#edf5ed] even:bg-base-content/5"
                        >
                          <td className="px-3 py-3 font-medium">
                            {market.market}
                          </td>

                          <td className="px-3 py-3 text-[#69746c]">
                            {market.division}
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right">
                            {formatPrice(market.min)}
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right">
                            {formatPrice(market.max)}
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right font-semibold">
                            {formatPrice((market.min + market.max) / 2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>

        <footer className="py-4 text-center text-sm text-base-content/70 flex justify-between">
          <Link
            href={`/category/${product?.category}`}
            className="text-base px-2 py-1 rounded-lg hover:bg-slate-300 font-semibold"
          >
            {product?.categoryIcon} সব {product?.categoryNameBn}
          </Link>
          <p>বাজারদরের তথ্য · {product?.nameBn ?? "পণ্য"}</p>
        </footer>
      </div>
    </main>
  );
}
