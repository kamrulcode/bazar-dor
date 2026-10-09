"use client";

import ProductGrid from "@/components/ProductGrid";
import { toBanglaNumber } from "@/fn/function";
import { ProductT } from "@/type/type";
import { useEffect, useMemo, useState } from "react";

const CategoryProducts = ({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) => {
  const [categoryData, setCategoryData] = useState<ProductT[]>([]);
  const [onlyCategory, setOnlyCategory] = useState<ProductT>();
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">(
    "default",
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const { productSlug } = await params;

        const res = await fetch(
          `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(productSlug)}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: ProductT[] = await res.json();

        if (!cancelled) {
          setCategoryData(data);
        }
      } catch {
        if (!cancelled) {
          setError("পণ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [params]);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const { productSlug } = await params;

        const res = await fetch(
          `https://api.api-store.workers.dev/api/bazardor/categories/${encodeURIComponent(productSlug)}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: ProductT = await res.json();

        if (!cancelled) {
          setOnlyCategory(data);
        }
      } catch {
        if (!cancelled) {
          setError("পণ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [params]);

  const sortedProducts = useMemo(() => {
    if (sortOrder === "default") {
      return categoryData;
    }

    return [...categoryData].sort((a, b) =>
      sortOrder === "asc" ? a.today - b.today : b.today - a.today,
    );
  }, [categoryData, sortOrder]);

  if (loading) {
    return <p className="py-6">পণ্য লোড হচ্ছে...</p>;
  }

  if (error) {
    return <p className="py-6 text-red-600">{error}</p>;
  }

  return (
    <div>
      <div className="flex  my-6 gap-10 rounded-xl border border-base-200 bg-base-100 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md items-center">
        <div className="flex items-center justify-center h-18 w-18  rounded-xl bg-slate-200">
          <span className="text-3xl">{onlyCategory?.icon}</span>
        </div>
        <div className="flex flex-col justify-between w-full">
          <div>
            <h3 className="font-semibold text-xl">{onlyCategory?.nameBn}</h3>

            <p className="text-base text-base-content/60">
              {toBanglaNumber(sortedProducts.length)}টি পণ্যের আজকের দাম ও
              পরিবর্তন
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 py-3">
        <p>মোট {toBanglaNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে </p>
        <div className="flex items-center gap-3">
          <label htmlFor="sortOrder" className="text-sm font-medium">
            সাজান:
          </label>

          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "default" | "asc" | "desc")
            }
            className="select select-bordered select-sm w-48"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">কম দাম থেকে বেশি</option>
            <option value="desc">বেশি দাম থেকে কম</option>
          </select>
        </div>
      </div>
      <ProductGrid products={sortedProducts} />
    </div>
  );
};

export default CategoryProducts;
