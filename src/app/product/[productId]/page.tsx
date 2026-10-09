import React, { Suspense } from "react";
import ProductDetails from "./ProductDetails";

const ProductDetailsPage = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  return (
    <div>
      <Suspense fallback={"loading..."}>
        <ProductDetails params={params} />
      </Suspense>
    </div>
  );
};

export default ProductDetailsPage;
