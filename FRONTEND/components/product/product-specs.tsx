import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface ProductSpecsProps {
  product: Product;
  className?: string;
}

// Solo se muestran los datos que el producto tiene (un gorro no tiene suela).
export function ProductSpecs({ product, className }: ProductSpecsProps) {
  const specs = [
    ["Material", product.material],
    ["Tipo de cuero", product.leatherType],
    ["Suela", product.sole],
    ["Cierre", product.closure],
    ["Punta", product.toe],
  ].filter((spec): spec is [string, string] => Boolean(spec[1]));

  return (
    <dl className={cn("divide-y border-y text-sm", className)}>
      {specs.map(([term, detail]) => (
        <div key={term} className="grid grid-cols-[7rem_1fr] gap-4 py-3">
          <dt className="font-medium">{term}</dt>
          <dd className="text-muted-foreground">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
