"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { shopCategories } from "@/content/navegacion";
import { PRODUCT_CATEGORIES, categoryLabels, type ProductCategory } from "@/lib/catalog";

const CATEGORY_PARAM = "where[category][equals]";

/** Mismo nombre que en el menú de la tienda (Botas, Accesorios, Gorros). */
function categoryTitle(category: ProductCategory): string {
  const shopCategory = shopCategories.find((candidate) => candidate.href.endsWith(`/${category}`));
  return shopCategory?.label ?? categoryLabels[category];
}

// Pestañas sobre la lista de productos del panel: filtran por categoría.
export function ProductCategoryTabs() {
  const pathname = usePathname();
  const selected = useSearchParams().get(CATEGORY_PARAM);

  const tabs = [
    { label: "Todos", href: pathname, isActive: !selected },
    ...PRODUCT_CATEGORIES.map((category) => ({
      label: categoryTitle(category),
      href: `${pathname}?${new URLSearchParams({ [CATEGORY_PARAM]: category })}`,
      isActive: selected === category,
    })),
  ];

  return (
    <nav aria-label="Categorías de productos" className="admin-category-tabs">
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          href={tab.href}
          aria-current={tab.isActive ? "page" : undefined}
          className="admin-category-tabs__tab"
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
