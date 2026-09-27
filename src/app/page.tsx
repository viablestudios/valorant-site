import { Storefront } from "@/components/home/Storefront";
import { getAllProducts, getReviews } from "@/lib/catalog";
import { gallery } from "@/lib/data/gallery";
import { ProductQuickView } from "@/components/product/ProductQuickView";
export default async function HomePage() {
  const products = await getAllProducts();
  const reviews = await getReviews();
  return (
    <>
      <Storefront products={products} reviews={reviews} gallery={gallery} />
      <ProductQuickView products={products} reviews={reviews} />
    </>
  );
}
