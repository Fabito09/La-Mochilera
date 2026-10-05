import Image from "next/image";
import Link from "next/link";
import { ProductBadges } from "@/components/product/product-badges";
import { ProductPrice } from "@/components/product/product-price";
import { productEyebrow, productHref, type Product } from "@/lib/catalog";

interface ProductCardProps {
  product: Product;
  /** true en las tarjetas visibles al cargar la página: su foto se pide primero. */
  isAboveTheFold?: boolean;
}

export function ProductCard({ product, isAboveTheFold = false }: ProductCardProps) {
  const [mainImage] = product.images;

  return (
    <Link href={productHref(product)} className="group block focus-visible:outline-none">
      <div className="relative aspect-3/2 overflow-hidden rounded-sm bg-muted ring-offset-4 ring-offset-background group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          loading={isAboveTheFold ? "eager" : "lazy"}
          fetchPriority={isAboveTheFold ? "high" : "auto"}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <ProductBadges badges={product.badges} className="absolute left-3 top-3" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {productEyebrow(product)}
          </p>
          <h3 className="mt-1 font-display text-2xl leading-tight group-hover:underline group-hover:underline-offset-4">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {[product.colorName, product.leatherType].filter(Boolean).join(" · ")}
          </p>
        </div>
        <ProductPrice product={product} className="shrink-0 pt-5 text-base" />
      </div>
    </Link>
  );
}
