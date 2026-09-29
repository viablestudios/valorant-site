import Image from "next/image";
import type { Product } from "@/lib/types";
import { GuideCover } from "./GuideCover";

/** Renders a product's primary visual: a photo/artwork, or a code-drawn guide cover. */
export function ProductMedia({
  product,
  variant = "thumb",
  sizes = "(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority,
}: {
  product: Product;
  variant?: "thumb" | "full";
  sizes?: string;
  priority?: boolean;
}) {
  const media = product.media[0];
  if (media.kind === "cover") {
    return <GuideCover cover={media.cover} size={variant === "full" ? "lg" : "md"} />;
  }
  const src = variant === "thumb" && media.thumb ? media.thumb : media.src;
  return (
    <Image
      src={src}
      alt={media.alt}
      quality={95}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: "cover", objectPosition: media.position }}
    />
  );
}
