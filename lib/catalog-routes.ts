// Traduce la URL de la tienda (/tienda, /tienda/botas, /tienda/botas/cana-media)
// a qué productos mostrar. Las categorías salen del menú en content/navegacion.ts,
// así que agregar una categoría al menú también crea su página.

import { catalogTexts } from "@/content/tienda";
import { shopCategories, shopLink, type NavLink } from "@/content/navegacion";
import {
  isShaftHeight,
  productsInCategory,
  type Product,
  type ProductCategory,
  type ShaftHeight,
} from "@/lib/catalog";
import { products } from "@/content/productos";

export interface CatalogPage {
  title: string;
  description: string;
  products: Product[];
  /** Filtro de altura de caña ya aplicado por la URL. */
  presetShaftHeight?: ShaftHeight;
  breadcrumbs: NavLink[];
}

const PRODUCT_CATEGORIES: ProductCategory[] = ["botas", "chaquetas", "accesorios", "cuidado-del-cuero"];

function lastSegment(href: string): string {
  return href.split("/").at(-1) ?? "";
}

function isProductCategory(value: string): value is ProductCategory {
  return PRODUCT_CATEGORIES.includes(value as ProductCategory);
}

function isShopHref(href: string): boolean {
  return href.startsWith(`${shopLink.href}/`);
}

export function resolveCatalogPage(segments: string[] = []): CatalogPage | null {
  const [categorySlug, subcategorySlug, ...extraSegments] = segments;
  const shopBreadcrumb: NavLink = { label: shopLink.label, href: shopLink.href };

  if (!categorySlug) {
    return {
      title: catalogTexts.allProductsTitle,
      description: catalogTexts.allProductsDescription,
      products,
      breadcrumbs: [shopBreadcrumb],
    };
  }

  const category = shopCategories.find((candidate) => lastSegment(candidate.href) === categorySlug);
  if (!category || !isProductCategory(categorySlug) || extraSegments.length > 0) return null;

  const categoryProducts = productsInCategory(categorySlug);
  const categoryBreadcrumbs = [shopBreadcrumb, { label: category.label, href: category.href }];
  const description = categoryProducts.length > 0
    ? (category.description ?? "")
    : catalogTexts.emptyCategoryDescription;

  if (!subcategorySlug) {
    return { title: category.label, description, products: categoryProducts, breadcrumbs: categoryBreadcrumbs };
  }

  const subcategory = category.subcategories.find(
    (candidate) => isShopHref(candidate.href) && lastSegment(candidate.href) === subcategorySlug,
  );
  if (!subcategory) return null;

  const presetShaftHeight = isShaftHeight(subcategorySlug) ? subcategorySlug : undefined;
  return {
    title: subcategory.label,
    description,
    products: categoryProducts,
    presetShaftHeight,
    breadcrumbs: [...categoryBreadcrumbs, { label: subcategory.label, href: subcategory.href }],
  };
}

/** Todas las URLs de la tienda, para generarlas por adelantado. */
export function catalogStaticParams(): { segmentos: string[] }[] {
  const params = [{ segmentos: [] as string[] }];
  for (const category of shopCategories) {
    const categorySlug = lastSegment(category.href);
    params.push({ segmentos: [categorySlug] });
    for (const subcategory of category.subcategories.filter((link) => isShopHref(link.href))) {
      params.push({ segmentos: [categorySlug, lastSegment(subcategory.href)] });
    }
  }
  return params;
}
