// Tipos y funciones del catálogo. Los datos de cada producto viven en
// content/productos.ts: para cambiar un producto se edita ese archivo.

import { products } from "@/content/productos";

export type ProductCategory = "botas" | "accesorios" | "gorros";

/** Coincide con el último tramo de la URL: /tienda/botas/cana-media */
export type ShaftHeight = "cana-baja" | "cana-media" | "cana-alta" | "urbanas";

export type ColorFamily = "Marrón" | "Miel y camel" | "Negro" | "Gris";

export type ProductBadge = "100% cuero" | "Precio especial" | "Nuevo" | "Preventa";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  code: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shaftHeight: ShaftHeight;
  leatherType: string;
  /** Nombre evocador del color, tal como se muestra al cliente. */
  colorName: string;
  /** Grupo de color para el filtro del catálogo. */
  colorFamily: ColorFamily;
  material: string;
  closure: string;
  sole: string;
  toe: string;
  priceInColones: number;
  /** Precio anterior, se muestra tachado. */
  compareAtPriceInColones?: number;
  badges: ProductBadge[];
  /** La primera es la foto principal. */
  images: ProductImage[];
  /** Tallas EU disponibles. */
  sizes: number[];
  /** Orden en "Más vendidos" (1 = el más vendido). */
  bestSellerRank: number;
  /** Fecha de lanzamiento (AAAA-MM-DD), para ordenar por novedades. */
  releasedOn: string;
  isAvailable: boolean;
}

export const shaftHeightLabels: Record<ShaftHeight, string> = {
  "cana-baja": "Caña baja",
  "cana-media": "Caña media",
  "cana-alta": "Caña alta",
  urbanas: "Bota urbana",
};

export function isShaftHeight(value: string): value is ShaftHeight {
  return value in shaftHeightLabels;
}

export function findProductByCode(code: string): Product {
  const product = products.find((candidate) => candidate.code === code);
  if (!product) throw new Error(`Producto ${code} no existe en el catálogo`);
  return product;
}

export function findProductBySlug(slug: string): Product | undefined {
  return products.find((candidate) => candidate.slug === slug);
}

export function productHref(product: Product): string {
  return `/producto/${product.slug}`;
}

export function productsInCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

/** Productos parecidos: primero la misma altura de caña, luego el resto. */
export function relatedProducts(product: Product, limit: number): Product[] {
  const others = products.filter((candidate) => candidate.code !== product.code);
  const sameShaft = others.filter((candidate) => candidate.shaftHeight === product.shaftHeight);
  const differentShaft = others.filter((candidate) => candidate.shaftHeight !== product.shaftHeight);
  return [...sameShaft, ...differentShaft].slice(0, limit);
}

/** Mismo modelo en otros colores (productos con el mismo nombre). */
export function colorVariantsOf(product: Product): Product[] {
  return products.filter(
    (candidate) => candidate.name === product.name && candidate.code !== product.code,
  );
}

function normalizeForSearch(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Busca por nombre, color, cuero, altura de caña o código; cada palabra debe coincidir. */
export function searchProducts(query: string): Product[] {
  const words = normalizeForSearch(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  return products.filter((product) => {
    const searchableText = normalizeForSearch(
      [
        product.name,
        product.code,
        product.colorName,
        product.colorFamily,
        product.leatherType,
        shaftHeightLabels[product.shaftHeight],
      ].join(" "),
    );
    return words.every((word) => searchableText.includes(word));
  });
}
