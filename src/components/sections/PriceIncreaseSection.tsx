import getProducts from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";

const PriceIncreaseSection = async () => {
  const products = await getProducts();

  const increasedProducts = products.filter(
    (product) => product.change.dir === "up",
  );
  const icon = (
    <span className={`text-lg font-semibold   text-red-600`}>▲</span>
  );

  return (
    <section className="py-8">
      <SectionTitle
        title="দাম বেড়েছে"
        description="আজ যেসব পণ্যের দাম বেড়েছে"
        icon={icon}
      />

      <ProductGrid products={increasedProducts} limit={6} />
    </section>
  );
};

export default PriceIncreaseSection;
