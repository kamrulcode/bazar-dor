import type { ProductT } from "@/type/type";

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

const getProducts = async (): Promise<ProductT[]> => {
  const response = await fetch(API_URL, {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
};

export default getProducts;
