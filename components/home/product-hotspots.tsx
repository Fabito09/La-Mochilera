"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductPrice } from "@/components/product/product-price";
import { ProductSpecs } from "@/components/product/product-specs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { whatsappUrlWithMessage } from "@/content/marca";
import { featuredProductShowcase } from "@/content/inicio";
import { findProductByCode, productHref } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function ProductHotspots() {
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(null);
  const product = findProductByCode(featuredProductShowcase.productCode);
  const { hotspots, image } = featuredProductShowcase;

  const toggleHotspot = (index: number) =>
    setActiveHotspotIndex((current) => (current === index ? null : index));

  return (
    <section aria-labelledby="producto-destacado-titulo" className="py-24 md:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[3fr_2fr]">
        <div className="relative aspect-[1933/1369] overflow-hidden rounded-sm bg-muted">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          {hotspots.map((hotspot, index) => {
            const isActive = activeHotspotIndex === index;
            const panelId = `hotspot-${index}`;
            return (
              <div
                key={hotspot.title}
                className="absolute"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  aria-label={`Detalle: ${hotspot.title}`}
                  onClick={() => toggleHotspot(index)}
                  className="relative -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-media focus-visible:ring-offset-2 focus-visible:ring-offset-overlay"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-on-media/60 motion-reduce:hidden" />
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-on-media text-foreground shadow-lg">
                    <Plus
                      aria-hidden="true"
                      className={cn("h-4 w-4 transition-transform", isActive && "rotate-45")}
                    />
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-label={hotspot.title}
                  hidden={!isActive}
                  className={cn(
                    "absolute top-6 z-10 w-56 rounded-sm bg-background p-4 text-left shadow-xl",
                    hotspot.x > 50 ? "right-0" : "left-0",
                  )}
                >
                  <p className="font-display text-xl">{hotspot.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {hotspot.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <SectionHeading
            id="producto-destacado-titulo"
            eyebrow="Producto destacado"
            title={product.name}
            description={`${product.colorName} · Cuero ${product.leatherType}. Toque los puntos de la foto para ver cada detalle.`}
          />
          <ProductPrice product={product} className="mt-6 text-2xl" />
          <ProductSpecs product={product} className="mt-6" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={productHref(product)}>Ver producto</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-foreground bg-transparent">
              <a
                href={whatsappUrlWithMessage(`Hola, me interesa la bota ${product.name} (${product.code}).`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
