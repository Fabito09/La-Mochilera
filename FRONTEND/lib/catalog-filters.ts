// Filtros y orden del catálogo, como funciones puras (sin estado ni vista).

import { shaftHeightLabels, sizesInStock, type ColorFamily, type Product, type ShaftHeight } from "@/lib/catalog";
import { formatPriceInColones } from "@/lib/format-price";

export type SortOption = "novedades" | "mas-vendidos" | "precio-asc" | "precio-desc";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "novedades", label: "Novedades" },
  { value: "mas-vendidos", label: "Más vendidos" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
];

interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

const PRICE_STEP_LOW = 50_000;
const PRICE_STEP_HIGH = 75_000;

export const priceRanges: PriceRange[] = [
  { id: "hasta-50000", label: `Hasta ${formatPriceInColones(PRICE_STEP_LOW)}`, min: 0, max: PRICE_STEP_LOW },
  {
    id: "50000-75000",
    label: `${formatPriceInColones(PRICE_STEP_LOW)} a ${formatPriceInColones(PRICE_STEP_HIGH)}`,
    min: PRICE_STEP_LOW,
    max: PRICE_STEP_HIGH,
  },
  { id: "desde-75000", label: `Más de ${formatPriceInColones(PRICE_STEP_HIGH)}`, min: PRICE_STEP_HIGH, max: Infinity },
];

export interface CatalogFilters {
  shaftHeights: ShaftHeight[];
  leatherTypes: string[];
  colorFamilies: ColorFamily[];
  sizes: number[];
  priceRangeIds: string[];
}

export type FilterGroup = keyof CatalogFilters;

export const emptyFilters: CatalogFilters = {
  shaftHeights: [],
  leatherTypes: [],
  colorFamilies: [],
  sizes: [],
  priceRangeIds: [],
};

export function countActiveFilters(filters: CatalogFilters): number {
  return Object.values(filters).reduce((total, values) => total + values.length, 0);
}

/** Agrega el valor si no estaba y lo quita si ya estaba. */
export function toggleFilterValue<Group extends FilterGroup>(
  filters: CatalogFilters,
  group: Group,
  value: CatalogFilters[Group][number],
): CatalogFilters {
  const currentValues = filters[group] as CatalogFilters[Group][number][];
  const nextValues = currentValues.includes(value)
    ? currentValues.filter((current) => current !== value)
    : [...currentValues, value];
  return { ...filters, [group]: nextValues };
}

function matchesPriceRanges(product: Product, priceRangeIds: string[]): boolean {
  return priceRanges
    .filter((range) => priceRangeIds.includes(range.id))
    .some((range) => {
      const price = product.priceInColones;
      return price !== undefined && price >= range.min && price < range.max;
    });
}

/** Dentro de un grupo alcanza con cumplir una opción; entre grupos, todas. */
export function filterProducts(products: Product[], filters: CatalogFilters): Product[] {
  return products.filter((product) => {
    const { shaftHeights, leatherTypes, colorFamilies, sizes, priceRangeIds } = filters;
    if (shaftHeights.length > 0 && !(product.shaftHeight && shaftHeights.includes(product.shaftHeight))) return false;
    if (leatherTypes.length > 0 && !(product.leatherType && leatherTypes.includes(product.leatherType))) return false;
    if (colorFamilies.length > 0 && !product.colorFamilies.some((family) => colorFamilies.includes(family))) return false;
    if (sizes.length > 0 && !sizes.some((size) => sizesInStock(product).includes(size))) return false;
    if (priceRangeIds.length > 0 && !matchesPriceRanges(product, priceRangeIds)) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "novedades":
      return sorted.sort((a, b) => b.releasedOn.localeCompare(a.releasedOn));
    case "mas-vendidos":
      return sorted.sort((a, b) => a.bestSellerRank - b.bestSellerRank);
    // Los productos sin precio publicado van al final en ambos sentidos.
    case "precio-asc":
      return sorted.sort((a, b) => (a.priceInColones ?? Infinity) - (b.priceInColones ?? Infinity));
    case "precio-desc":
      return sorted.sort((a, b) => (b.priceInColones ?? -Infinity) - (a.priceInColones ?? -Infinity));
  }
}

export interface FilterOptions {
  shaftHeights: ShaftHeight[];
  leatherTypes: string[];
  colorFamilies: ColorFamily[];
  sizes: number[];
}

/** Solo se ofrecen opciones que existen en los productos mostrados. */
export function collectFilterOptions(products: Product[]): FilterOptions {
  const unique = <Value>(values: Value[]) => [...new Set(values)];
  return {
    // De la más baja a la más alta, en el orden de shaftHeightLabels.
    shaftHeights: (Object.keys(shaftHeightLabels) as ShaftHeight[]).filter((shaftHeight) =>
      products.some((product) => product.shaftHeight === shaftHeight),
    ),
    leatherTypes: unique(products.flatMap((product) => product.leatherType ?? [])).sort(),
    colorFamilies: unique(products.flatMap((product) => product.colorFamilies)).sort(),
    sizes: unique(products.flatMap(sizesInStock)).sort((a, b) => a - b),
  };
}
