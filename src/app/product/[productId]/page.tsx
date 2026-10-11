import React, { Suspense } from "react";
import ProductDetails from "./ProductDetails";
import ProductGridSkeleton from "@/components/skeletons/ProductGridSkeleton";
import { Metadata } from "next";
import { connection } from "next/server";

type Props = {
  params: Promise<{ productId: string }>;
};

async function getProduct(id: string) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
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

  const { productId } = await params;
  const product = await getProduct(productId);

  return {
    title: product ? `${product.nameBn}` : "পৃষ্ঠা পাওয়া যায়নি",
  };
}

const ProductDetailsPage = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  return (
    <div>
      <Suspense fallback={null}>
        <DynamicMarker />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductDetails params={params} />
      </Suspense>
    </div>
  );
};

export default ProductDetailsPage;
