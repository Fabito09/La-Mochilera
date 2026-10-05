// Tipos y funciones del catálogo. Los productos los cargan los dueños en el
// panel de administración (/gestion-mochilera); BACKEND/catalog-data.ts los lee de la base de
// datos. Estas funciones reciben la lista y no dependen de dónde vino.

// Las listas de opciones las comparten el sitio y el panel de administración.
export const PRODUCT_CATEGORIES = ["botas", "accesorios", "gorros"] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/** Coincide con el último tramo de la URL: /tienda/botas/cana-media */
export type ShaftHeight = "cana-baja" | "cana-media" | "cana-alta" | "urbanas";

export const COLOR_FAMILIES = [
  "Marrón",
  "Miel y camel",
  "Negro",
  "Gris",
  "Vino",
  "Verde",
  "Mostaza",
  "Crema y arena",
] as const;
export type ColorFamily = (typeof COLOR_FAMILIES)[number];

export const PRODUCT_BADGES = ["Precio especial", "Nuevo", "Preventa"] as const;
export type ProductBadge = (typeof PRODUCT_BADGES)[number];

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  code: string;
  slug: string;
  name: string;
  category: ProductCategory;
  /** Solo botas. */
  shaftHeight?: ShaftHeight;
  /** Solo productos de cuero. */
  leatherType?: string;
  /** Nombre evocador del color, tal como se muestra al cliente. */
  colorName: string;
  /** Grupos de color para el filtro del catálogo. */
  colorFamilies: ColorFamily[];
  /** Colores para elegir al comprar (p. ej. gorros). Sin valor = color único. */
  colorOptions?: string[];
  material: string;
  closure?: string;
  sole?: string;
  toe?: string;
  /** Sin valor = se muestra "Consultar precio". */
  priceInColones?: number;
  /** Precio anterior, se muestra tachado. */
  compareAtPriceInColones?: number;
  badges: ProductBadge[];
  /** La primera es la foto principal. */
  images: ProductImage[];
  /** Tallas EU del modelo. Vacío = producto sin talla (no muestra selector). */
  sizes: number[];
  /** Tallas con inventario en 0: se muestran pero no se pueden elegir. */
  soldOutSizes: number[];
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

/** Nombre del tipo de producto, en singular. */
export const categoryLabels: Record<ProductCategory, string> = {
  botas: "Bota",
  accesorios: "Accesorio",
  gorros: "Gorro",
};

export function isShaftHeight(value: string): value is ShaftHeight {
  return value in shaftHeightLabels;
}

/** Texto corto sobre el nombre: la altura de caña en botas, el tipo en el resto. */
export function productEyebrow(product: Product): string {
  return product.shaftHeight
    ? shaftHeightLabels[product.shaftHeight]
    : categoryLabels[product.category];
}

export function findProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find((candidate) => candidate.slug === slug);
}

export function productHref(product: Product): string {
  return `/producto/${product.slug}`;
}

/** Tallas que se pueden pedir hoy (las del modelo menos las agotadas). */
export function sizesInStock(product: Product): number[] {
  return product.sizes.filter((size) => !product.soldOutSizes.includes(size));
}

export function productsInCategory(products: Product[], category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

/** Productos parecidos: primero la misma categoría y altura de caña, luego el resto. */
export function relatedProducts(products: Product[], product: Product, limit: number): Product[] {
  const similarity = (candidate: Product) =>
    (candidate.category === product.category ? 2 : 0) +
    (candidate.shaftHeight && candidate.shaftHeight === product.shaftHeight ? 1 : 0);
  return products
    .filter((candidate) => candidate.code !== product.code)
    .sort((a, b) => similarity(b) - similarity(a))
    .slice(0, limit);
}

/** Mismo modelo en otros colores (productos con el mismo nombre). */
export function colorVariantsOf(products: Product[], product: Product): Product[] {
  return products.filter(
    (candidate) => candidate.name === product.name && candidate.code !== product.code,
  );
}

function normalizeForSearch(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Busca por nombre, color, cuero, tipo o código; cada palabra debe coincidir. */
export function searchProducts(products: Product[], query: string): Product[] {
  const words = normalizeForSearch(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  return products.filter((product) => {
    const searchableText = normalizeForSearch(
      [
        product.name,
        product.code,
        product.colorName,
        ...product.colorFamilies,
        ...(product.colorOptions ?? []),
        product.leatherType,
        productEyebrow(product),
      ]
        .filter(Boolean)
        .join(" "),
    );
    return words.every((word) => searchableText.includes(word));
  });
}
