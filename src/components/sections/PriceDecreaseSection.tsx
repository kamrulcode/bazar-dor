import getProducts from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";

const PriceDecreaseSection = async () => {
  const products = await getProducts();

  const decreasedProducts = products.filter(
    (product) => product.change.dir === "down",
  );
  const icon = (
    <span className={`text-lg font-semibold   text-green-600`}>▼</span>
  );

  return (
    <section className="py-8">
      <SectionTitle
        title="দাম কমেছে"
        description="আজ যেসব পণ্যের দাম কমেছে"
        icon={icon}
      />

      <ProductGrid products={decreasedProducts} limit={6} />
    </section>
  );
};

export default PriceDecreaseSection;
