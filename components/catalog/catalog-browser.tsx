"use client";

import { useMemo, useState } from "react";
import { FilterPanel, type ToggleFilter } from "@/components/catalog/filter-panel";
import { MobileFiltersDialog } from "@/components/catalog/mobile-filters-dialog";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { catalogTexts } from "@/content/tienda";
import type { Product, ShaftHeight } from "@/lib/catalog";
import {
  collectFilterOptions,
  countActiveFilters,
  emptyFilters,
  filterProducts,
  sortOptions,
  sortProducts,
  toggleFilterValue,
  type CatalogFilters,
  type SortOption,
} from "@/lib/catalog-filters";

const PAGE_SIZE = 6;
/** Tarjetas visibles sin hacer scroll (móvil y escritorio). */
const ABOVE_THE_FOLD_COUNT = 2;

interface CatalogBrowserProps {
  products: Product[];
  presetShaftHeight?: ShaftHeight;
}

function initialFilters(presetShaftHeight?: ShaftHeight): CatalogFilters {
  return presetShaftHeight ? { ...emptyFilters, shaftHeights: [presetShaftHeight] } : emptyFilters;
}

export function CatalogBrowser({ products, presetShaftHeight }: CatalogBrowserProps) {
  const [filters, setFilters] = useState(() => initialFilters(presetShaftHeight));
  const [sort, setSort] = useState<SortOption>("novedades");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filterOptions = useMemo(() => collectFilterOptions(products), [products]);
  const matchingProducts = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [products, filters, sort],
  );
  const visibleProducts = matchingProducts.slice(0, visibleCount);
  const activeFilterCount = countActiveFilters(filters);

  const toggleFilter: ToggleFilter = (group, value) => {
    setFilters((current) => toggleFilterValue(current, group, value));
    setVisibleCount(PAGE_SIZE);
  };
  const clearFilters = () => {
    setFilters(emptyFilters);
    setVisibleCount(PAGE_SIZE);
  };

  const filterPanelProps = {
    options: filterOptions,
    filters,
    onToggle: toggleFilter,
    onClear: clearFilters,
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-12">
      <aside aria-label="Filtros" className="hidden lg:block">
        <div className="sticky top-[calc(var(--header-height)+1.5rem)]">
          <FilterPanel idPrefix="filtros-escritorio" {...filterPanelProps} />
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {matchingProducts.length} {matchingProducts.length === 1 ? "producto" : "productos"}
          </p>
          <div className="flex items-center gap-3">
            <MobileFiltersDialog
              activeFilterCount={activeFilterCount}
              resultCount={matchingProducts.length}
            >
              <FilterPanel idPrefix="filtros-movil" {...filterPanelProps} />
            </MobileFiltersDialog>
            <label htmlFor="orden-catalogo" className="sr-only">
              Ordenar por
            </label>
            <select
              id="orden-catalogo"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h2 className="sr-only">Productos</h2>
        {matchingProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl">{catalogTexts.noResultsMessage}</p>
            <Button variant="outline" className="mt-6 border-foreground bg-transparent" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product, index) => (
              <li key={product.code}>
                <ProductCard product={product} isAboveTheFold={index < ABOVE_THE_FOLD_COUNT} />
              </li>
            ))}
          </ul>
        )}

        {visibleCount < matchingProducts.length && (
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-foreground bg-transparent"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              Cargar más
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
