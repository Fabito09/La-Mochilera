import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface ProductSpecsProps {
  product: Product;
  className?: string;
}

export function ProductSpecs({ product, className }: ProductSpecsProps) {
  const specs = [
    ["Material", product.material],
    ["Tipo de cuero", product.leatherType],
    ["Suela", product.sole],
    ["Cierre", product.closure],
    ["Punta", product.toe],
  ];

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
