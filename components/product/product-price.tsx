import { formatPriceInColones } from "@/lib/format-price";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface ProductPriceProps {
  product: Product;
  className?: string;
}

export function ProductPrice({ product, className }: ProductPriceProps) {
  const { priceInColones, compareAtPriceInColones } = product;
  const hasDiscount =
    compareAtPriceInColones !== undefined && compareAtPriceInColones > priceInColones;

  return (
    <p className={cn("flex items-baseline gap-2 font-medium", className)}>
      {hasDiscount && (
        <span className="text-[0.85em] font-normal text-muted-foreground line-through">
          <span className="sr-only">Precio anterior: </span>
          {formatPriceInColones(compareAtPriceInColones)}
        </span>
      )}
      <span>
        {hasDiscount && <span className="sr-only">Precio actual: </span>}
        {formatPriceInColones(priceInColones)}
      </span>
    </p>
  );
}
