const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-xl border border-base-200 p-4">
          <div className="flex gap-3">
            <div className="h-14 w-14 animate-pulse rounded-lg bg-base-200" />

            <div className="flex-1">
              <div className="h-4 w-2/3 animate-pulse rounded bg-base-200" />

              <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-base-200" />
            </div>
          </div>

          <div className="mt-6 h-7 w-1/3 animate-pulse rounded bg-base-200" />

          <div className="mt-4 h-3 w-full animate-pulse rounded bg-base-200" />
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
