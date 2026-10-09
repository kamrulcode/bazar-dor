import getProducts from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";

const AllProductsSection = async () => {
  const products = await getProducts();

  return (
    <section className="py-8">
      <SectionTitle
        title="সব পণ্যের দাম"
        description="বাজারের সকল পণ্যের বর্তমান দাম"
        icon={""}
      />

      <ProductGrid products={products} />
    </section>
  );
};

export default AllProductsSection;
