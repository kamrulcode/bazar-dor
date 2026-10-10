export default function MarqueeSkeleton() {
  return (
    <div className="w-full overflow-hidden border-y border-base-200 bg-[#e7e2e2]">
      <div className="flex h-10 w-max animate-pulse items-center gap-6 px-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex shrink-0 items-center gap-2">
            {/* Icon */}
            <div className="skeleton h-7 w-4 shrink-0 rounded-full" />

            {/* Product name */}
            <div className="skeleton h-7 w-28 rounded-sm" />

            {/* Price */}
            <div className="skeleton h-7 w-24 rounded-sm" />

            {/* Price change */}
            <div className="skeleton h-7 w-12 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
