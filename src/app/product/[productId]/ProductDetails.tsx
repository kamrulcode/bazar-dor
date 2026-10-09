type ApiProduct = Record<string, unknown>;

type MarketProduct = {
  id: string;
  name: string;
  district: string;
  wholesale: number | null;
  retail: number | null;
  price: number | null;
  unit: string;
};

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

function firstValue(item: ApiProduct, keys: string[]): unknown {
  for (const key of keys) {
    const value = item[key];
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }
  return undefined;
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== "string") return null;

  const normalized = value
    .replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)))
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  if (!normalized || normalized === "-") return null;

  const result = Number(normalized);
  return Number.isFinite(result) ? result : null;
}

function toText(value: unknown, fallback = "—"): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  return fallback;
}

function getProducts(payload: unknown): ApiProduct[] {
  if (Array.isArray(payload)) {
    return payload as ApiProduct[];
  }

  if (!payload || typeof payload !== "object") return [];

  const obj = payload as Record<string, unknown>;

  for (const key of ["products", "data", "results", "items"]) {
    const value = obj[key];

    if (Array.isArray(value)) {
      return value as ApiProduct[];
    }

    if (value && typeof value === "object") {
      const nested = getProducts(value);
      if (nested.length) return nested;
    }
  }

  return [];
}

function normalizeProduct(item: ApiProduct, index: number): MarketProduct {
  const name = firstValue(item, [
    "name",
    "product_name",
    "productName",
    "title",
    "bn_name",
    "name_bn",
  ]);

  const wholesale = toNumber(
    firstValue(item, [
      "wholesale_price",
      "wholesalePrice",
      " পাইকারি দাম",
      " পাইকারি",
    ]),
  );

  const retail = toNumber(
    firstValue(item, [
      "retail_price",
      "retailPrice",
      "current_price",
      "currentPrice",
      "price",
      "selling_price",
      "sellingPrice",
      "দাম",
    ]),
  );

  const price = retail ?? wholesale;

  return {
    id: toText(item.id ?? item._id ?? item.slug, String(index)),
    name: toText(name, `পণ্য ${index + 1}`),
    district: toText(
      firstValue(item, [
        "district",
        "location",
        "market",
        "market_name",
        "marketName",
        "area",
      ]),
    ),
    wholesale,
    retail,
    price,
    unit: toText(
      firstValue(item, ["unit", "measurement_unit", "measurementUnit"]),
      "কেজি",
    ),
  };
}

function formatPrice(value: number | null): string {
  if (value === null) return "—";

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
      <p className="text-[10px] text-[#68746b]">{label}</p>
      <p className={`mt-1 text-lg font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-[9px] text-[#68746b]">{note}</p>
    </div>
  );
}

async function fetchMarketProducts(): Promise<{
  products: MarketProduct[];
  error: string | null;
}> {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return {
        products: [],
        error: `API request failed (${response.status})`,
      };
    }

    const payload: unknown = await response.json();
    const products = getProducts(payload).map(normalizeProduct);

    return { products, error: null };
  } catch {
    return {
      products: [],
      error: "বাজারদরের তথ্য আনা যায়নি। API সংযোগ পরীক্ষা করুন।",
    };
  }
}

export default async function Home() {
  const { products, error } = await fetchMarketProducts();

  const prices = products
    .map((product) => product.price)
    .filter((price): price is number => price !== null);

  const minPrice = prices.length ? Math.min(...prices) : null;
  const maxPrice = prices.length ? Math.max(...prices) : null;
  const averagePrice = prices.length
    ? prices.reduce((sum, price) => sum + price, 0) / prices.length
    : null;

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-4 text-[#27332b] sm:px-6 sm:py-6">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-[10px] text-[#69746c]">
          <span>হোম</span>
          <span>/</span>
          <span>ঢাকা</span>
          <span>/</span>
          <span>বাজার মনিটরিং</span>
        </div>

        {/* Header */}
        <section className="card mb-3 border border-[#e5ece6] bg-[#fbfdfb] shadow-none">
          <div className="card-body flex flex-row items-center gap-3 p-3 sm:p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
              🥬
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-base font-extrabold sm:text-lg">
                বাজার সাইট চাল
              </h1>
              <p className="mt-1 text-[10px] text-[#788279]">
                দৈনিক বাজার · ঢাকা
              </p>
              <p className="mt-1 text-[10px] text-[#68746b]">
                সর্বশেষ পণ্যের বাজারদর দেখুন
              </p>
            </div>

            <div className="min-w-19 rounded-xl bg-[#f0f5f0] px-3 py-2 text-center">
              <p className="text-[9px] text-[#68746b]">গড় বাজারদর</p>
              <p className="text-xl font-extrabold">
                {averagePrice === null
                  ? "—"
                  : averagePrice.toLocaleString("bn-BD", {
                      maximumFractionDigits: 1,
                    })}
              </p>
              <p className="text-[9px] text-[#68746b]">টাকা / পণ্য</p>
            </div>
          </div>
        </section>

        {/* Products and summary */}
        <section className="card border border-[#e5ece6] bg-[#fbfdfb] shadow-none">
          <div className="card-body gap-3 p-3 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xs font-bold">দামের সারসংক্ষেপ</h2>
              <span className="text-[10px] text-[#788279]">
                মোট পণ্য: {products.length.toLocaleString("bn-BD")}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <SummaryCard
                label="সর্বনিম্ন দাম"
                value={formatPrice(minPrice)}
                color="text-emerald-600"
                note="API থেকে প্রাপ্ত সর্বনিম্ন মূল্য"
              />
              <SummaryCard
                label="সর্বোচ্চ দাম"
                value={formatPrice(maxPrice)}
                color="text-red-500"
                note="API থেকে প্রাপ্ত সর্বোচ্চ মূল্য"
              />
              <SummaryCard
                label="গড় দর"
                value={formatPrice(averagePrice)}
                color="text-emerald-600"
                note="মূল্য পাওয়া পণ্যগুলোর গড়"
              />
            </div>

            <div className="mt-1">
              <h2 className="mb-3 text-xs font-bold">
                বাজারভিত্তিক পণ্যের দাম
              </h2>

              {error && (
                <div className="alert mb-3 border border-red-200 bg-red-50 text-sm text-red-700">
                  <span>{error}</span>
                </div>
              )}

              {!error && products.length === 0 && (
                <div className="rounded-xl border border-[#e5ece6] p-5 text-center text-sm text-[#68746b]">
                  কোনো পণ্যের তথ্য পাওয়া যায়নি। API response structure পরীক্ষা
                  করুন।
                </div>
              )}

              {products.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-[#e5ece6]">
                  <table className="table table-xs w-full min-w-135 text-[10px]">
                    <thead>
                      <tr className="border-b border-[#e5ece6] bg-[#fafcf9] text-[#69746c]">
                        <th className="px-3 py-3 font-medium">পণ্যের নাম</th>
                        <th className="px-3 py-3 font-medium">বাজার / জেলা</th>
                        <th className="px-3 py-3 text-right font-medium">
                          পাইকারি
                        </th>
                        <th className="px-3 py-3 text-right font-medium">
                          খুচরা
                        </th>
                        <th className="px-3 py-3 text-right font-medium">
                          একক
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-[#e5ece6] transition-colors hover:bg-[#edf5ed]"
                        >
                          <td className="px-3 py-3 font-medium">
                            {product.name}
                          </td>
                          <td className="px-3 py-3 text-[#69746c]">
                            {product.district}
                          </td>
                          <td className="px-3 py-3 text-right whitespace-nowrap">
                            {formatPrice(product.wholesale)}
                          </td>
                          <td className="px-3 py-3 text-right whitespace-nowrap">
                            {formatPrice(product.retail)}
                          </td>
                          <td className="px-3 py-3 text-right whitespace-nowrap">
                            {product.unit}
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
      </div>
    </main>
  );
}
