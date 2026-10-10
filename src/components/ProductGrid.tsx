import ProductCard from "@/components/ProductCard";
import type { ProductT } from "@/type/type";

interface ProductGridProps {
  products: ProductT[];
  limit?: number;
}

const ProductGrid = ({ products, limit }: ProductGridProps) => {
  const visibleProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} p={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
