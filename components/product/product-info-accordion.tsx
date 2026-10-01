import { ProductSpecs } from "@/components/product/product-specs";
import { AccordionItem } from "@/components/ui/accordion-item";
import { careInstructions, shippingText, warrantyText } from "@/content/ficha-producto";
import type { Product } from "@/lib/catalog";

interface ProductInfoAccordionProps {
  product: Product;
}

export function ProductInfoAccordion({ product }: ProductInfoAccordionProps) {
  return (
    <div className="border-t">
      <AccordionItem title="Materiales y construcción" isOpenByDefault>
        <ProductSpecs product={product} />
      </AccordionItem>
      <AccordionItem title="Cuidado del cuero">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
          {careInstructions.map((instruction) => (
            <li key={instruction}>{instruction}</li>
          ))}
        </ul>
      </AccordionItem>
      <AccordionItem title="Garantía y reparaciones">
        <p className="text-sm leading-6 text-muted-foreground">{warrantyText}</p>
      </AccordionItem>
      <AccordionItem title="Envíos y showroom">
        <p className="text-sm leading-6 text-muted-foreground">{shippingText}</p>
      </AccordionItem>
    </div>
  );
}
