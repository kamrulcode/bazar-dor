import { Suspense } from "react";
import CategoryProducts from "./CategoryProducts";
import ProductGridSkeleton from "@/components/skeletons/ProductGridSkeleton";

const CategoryProduct = ({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) => {
  return (
    <div className="main-container h-full ">
      <Suspense fallback={<ProductGridSkeleton />}>
        <CategoryProducts params={params} />
      </Suspense>
    </div>
  );
};

export default CategoryProduct;
