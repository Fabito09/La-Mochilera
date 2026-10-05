// Lectura de productos desde la base de datos (los cargan los dueños en el
// panel, /gestion-mochilera).
// Solo se usa en el servidor: las páginas la llaman y pasan los productos ya
// convertidos al formato del sitio (`Product` de FRONTEND/lib/catalog.ts).

import { cache } from "react";
import config from "@payload-config";
import { getPayload } from "payload";
import type { Media, Product as ProductDocument } from "@/backend/payload-types";
import type { Product, ProductImage } from "@/lib/catalog";

function toProductImage(image: number | Media): ProductImage[] {
  // Sin profundidad la relación llega como id; con depth: 1 llega la foto.
  if (typeof image === "number" || !image.url) return [];
  return [{ src: image.url, alt: image.alt }];
}

/** Vacío en el panel = sin control de inventario (se puede pedir). */
const isOutOfStock = (stock: number | null | undefined) => stock === 0;

function toProduct(document: ProductDocument): Product {
  const sizeRows = document.sizes ?? [];
  const sizes = sizeRows.map((row) => row.size);
  const soldOutSizes = sizeRows.filter((row) => isOutOfStock(row.stock)).map((row) => row.size);
  const isAvailable = sizes.length > 0
    ? soldOutSizes.length < sizes.length
    : !isOutOfStock(document.stock);

  return {
    code: document.code,
    slug: document.slug ?? "",
    name: document.name,
    category: document.category,
    shaftHeight: document.shaftHeight ?? undefined,
    leatherType: document.leatherType ?? undefined,
    colorName: document.colorName,
    colorFamilies: document.colorFamilies,
    colorOptions: document.colorOptions?.length ? document.colorOptions : undefined,
    material: document.material,
    closure: document.closure ?? undefined,
    sole: document.sole ?? undefined,
    toe: document.toe ?? undefined,
    priceInColones: document.priceInColones ?? undefined,
    compareAtPriceInColones: document.compareAtPriceInColones ?? undefined,
    badges: document.badges ?? [],
    images: document.images.flatMap(toProductImage),
    sizes,
    soldOutSizes,
    bestSellerRank: document.bestSellerRank,
    releasedOn: document.releasedOn.slice(0, 10),
    isAvailable,
  };
}

/**
 * Productos visibles en la tienda, del más vendido al menos vendido. `cache`
 * evita repetir la consulta cuando varias partes de una misma página la piden.
 */
export const getProducts = cache(async (): Promise<Product[]> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "products",
    where: { isVisible: { equals: true } },
    sort: "bestSellerRank",
    depth: 1,
    pagination: false,
  });
  return docs.map(toProduct).filter((product) => product.images.length > 0);
});
