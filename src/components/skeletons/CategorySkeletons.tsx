export function CategorySkeletons() {
  return (
    <div className="min-h-screen space-y-8 bg-[#f0f5f1] px-4 py-6 sm:px-6 lg:px-12 animate-pulse">
      <div className="mx-auto max-w-screen-2xl space-y-8">
        {/* Header skeleton */}
        <div className="flex items-center gap-6 rounded-2xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="skeleton h-16 w-16 shrink-0 rounded-xl" />

          <div className="flex-1 space-y-3">
            <div className="skeleton h-5 w-32" />
            <div className="skeleton h-4 w-56 max-w-full" />
          </div>
        </div>

        {/* Toolbar skeleton */}
        <div className="flex items-center justify-between gap-4">
          <div className="skeleton h-4 w-40" />
          <div className="skeleton h-8 w-44 rounded-md" />
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="card rounded-2xl border border-base-200 bg-white shadow-sm"
            >
              <div className="card-body flex-row items-center gap-5 p-4">
                <div className="skeleton h-24 w-20 shrink-0 rounded-xl sm:w-24" />

                <div className="flex flex-1 flex-col justify-between gap-5 self-stretch py-1">
                  <div className="space-y-2">
                    <div className="skeleton h-5 w-24" />
                    <div className="skeleton h-3 w-20" />
                  </div>

                  <div className="space-y-2">
                    <div className="skeleton h-3 w-16" />
                    <div className="flex justify-between gap-2">
                      <div className="skeleton h-5 w-28" />
                      <div className="skeleton h-6 w-14 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
