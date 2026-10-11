import { Suspense } from "react";
import CategoryProducts from "./CategoryProducts";
import ProductGridSkeleton from "@/components/skeletons/ProductGridSkeleton";
import { Metadata } from "next";
import { connection } from "next/server";

type Props = {
  params: Promise<{ productSlug: string }>;
};
interface CaragoryT {
  icon: string;
  id: string;
  nameBn: string;
  slug: string;
}
async function getProduct() {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/categories`,
    {
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) return null;

  return res.json();
}

async function DynamicMarker() {
  await connection();
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  "use cache";

  const { productSlug } = await params;

  console.log(productSlug);
  const products: CaragoryT[] = await getProduct();

  const product = products.filter((p) => p.id === productSlug);

  console.log(product[0]);

  return {
    title: product[0] ? `${product[0].nameBn}` : "পৃষ্ঠা পাওয়া যায়নি",
  };
}

const CategoryProduct = ({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) => {
  return (
    <div className="main-container flex-1 flex flex-col justify-center ">
      <Suspense fallback={"লোড হচ্ছে"}>
        <DynamicMarker />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton />}>
        <CategoryProducts params={params} />
      </Suspense>
    </div>
  );
};

export default CategoryProduct;
