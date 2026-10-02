import { Storefront } from "@/components/home/Storefront";
import { getAllProducts } from "@/lib/catalog";
import { gallery } from "@/lib/data/gallery";
import { listPublicReviews } from "@/lib/reviewStore";
import { ProductQuickView } from "@/components/product/ProductQuickView";
export default async function HomePage() {
  const products = await getAllProducts();
  const reviews = (await listPublicReviews()).filter((r) => products.some((p) => p.slug === r.productSlug));
  return (
    <>
      <Storefront products={products} reviews={reviews} gallery={gallery} />
      <ProductQuickView products={products} reviews={reviews} />
    </>
  );
}
