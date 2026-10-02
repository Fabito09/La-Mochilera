"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { OptionPicker } from "@/components/product/option-picker";
import { SizeGuideDialog } from "@/components/product/size-guide-dialog";
import { Button } from "@/components/ui/button";
import { whatsappUrlWithMessage } from "@/content/marca";
import type { Product } from "@/lib/catalog";

interface ProductPurchasePanelProps {
  product: Product;
}

interface PurchaseSelection {
  size: string | null;
  color: string | null;
}

/** Opciones que el producto tiene y la persona todavía no eligió. */
function missingChoices(product: Product, selection: PurchaseSelection): string[] {
  const missing: string[] = [];
  if (product.sizes.length > 0 && !selection.size) missing.push("tallas");
  if (product.colorOptions && !selection.color) missing.push("colores");
  return missing;
}

function purchaseMessage(product: Product, selection: PurchaseSelection): string {
  const color = selection.color ?? (product.colorOptions ? null : product.colorName);
  const details = [color && `color ${color}`, selection.size && `talla ${selection.size}`]
    .filter(Boolean)
    .join(", ");
  const reference = `${product.name} (${product.code})${details ? `, ${details}` : ""}`;
  const missing = missingChoices(product, selection);
  const priceQuestion = product.priceInColones === undefined ? " ¿Me confirma el precio?" : "";

  return missing.length > 0
    ? `Hola, me interesa ${reference}. ¿Qué ${missing.join(" y ")} tienen disponibles?${priceQuestion}`
    : `Hola, quiero comprar ${reference}.${priceQuestion}`;
}

// Hoy la marca vende por WhatsApp (así lo indica su catálogo). Cuando se
// defina la plataforma de e-commerce, este panel suma "Añadir al carrito".
export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [selection, setSelection] = useState<PurchaseSelection>({ size: null, color: null });
  const missing = missingChoices(product, selection);

  return (
    <div className="mt-8 space-y-6">
      {product.colorOptions && (
        <OptionPicker
          legend="Color"
          name="color"
          options={product.colorOptions}
          selected={selection.color}
          onSelect={(color) => setSelection((current) => ({ ...current, color }))}
          gridClassName="grid-cols-2 sm:grid-cols-3"
        />
      )}

      {product.sizes.length > 0 && (
        <OptionPicker
          legend="Talla (EU)"
          name="talla"
          options={product.sizes.map(String)}
          selected={selection.size}
          onSelect={(size) => setSelection((current) => ({ ...current, size }))}
          aside={<SizeGuideDialog />}
        />
      )}

      <Button asChild size="lg" className="w-full">
        <a
          href={whatsappUrlWithMessage(purchaseMessage(product, selection))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
          {missing.length > 0 ? `Consultar ${missing.join(" y ")} por WhatsApp` : "Comprar por WhatsApp"}
        </a>
      </Button>
      {!product.isAvailable && (
        <p className="text-sm text-muted-foreground">
          Este modelo está agotado por ahora. Escríbanos para saber cuándo vuelve.
        </p>
      )}
    </div>
  );
}
