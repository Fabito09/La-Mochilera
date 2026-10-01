"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { SizeGuideDialog } from "@/components/product/size-guide-dialog";
import { Button } from "@/components/ui/button";
import { whatsappUrlWithMessage } from "@/content/marca";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface ProductPurchasePanelProps {
  product: Product;
}

function purchaseMessage(product: Product, selectedSize: number | null): string {
  const productReference = `la bota ${product.name}, color ${product.colorName} (${product.code})`;
  return selectedSize
    ? `Hola, quiero comprar ${productReference} en talla ${selectedSize}.`
    : `Hola, me interesa ${productReference}. ¿Qué tallas tienen disponibles?`;
}

// Hoy la marca vende por WhatsApp (así lo indica su catálogo). Cuando se
// defina la plataforma de e-commerce, este panel suma "Añadir al carrito".
export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <div className="mt-8">
      <fieldset>
        <legend className="sr-only">Talla (EU)</legend>
        <div className="flex items-center justify-between">
          <p aria-hidden="true" className="text-sm font-medium">
            Talla (EU){selectedSize && <span className="text-muted-foreground">: {selectedSize}</span>}
          </p>
          <SizeGuideDialog />
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-7">
          {product.sizes.map((size) => {
            const inputId = `talla-${size}`;
            const isSelected = selectedSize === size;
            return (
              <div key={size}>
                <input
                  id={inputId}
                  type="radio"
                  name="talla"
                  value={size}
                  checked={isSelected}
                  onChange={() => setSelectedSize(size)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={inputId}
                  className={cn(
                    "flex h-11 cursor-pointer items-center justify-center rounded-sm border text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input hover:bg-accent",
                  )}
                >
                  {size}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <Button asChild size="lg" className="mt-6 w-full">
        <a
          href={whatsappUrlWithMessage(purchaseMessage(product, selectedSize))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
          {selectedSize ? `Comprar talla ${selectedSize} por WhatsApp` : "Consultar tallas por WhatsApp"}
        </a>
      </Button>
      {!product.isAvailable && (
        <p className="mt-3 text-sm text-muted-foreground">
          Este modelo está agotado por ahora. Escríbanos para saber cuándo vuelve.
        </p>
      )}
    </div>
  );
}
