import React, { Suspense } from "react";
import ProductDetails from "./ProductDetails";
import ProductGridSkeleton from "@/components/skeletons/ProductGridSkeleton";

const ProductDetailsPage = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  return (
    <div>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductDetails params={params} />
      </Suspense>
    </div>
  );
};

export default ProductDetailsPage;
