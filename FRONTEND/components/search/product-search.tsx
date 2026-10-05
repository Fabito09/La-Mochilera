"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { searchPage } from "@/content/paginas/utilitarias";
import { searchProducts, type Product } from "@/lib/catalog";

// La búsqueda queda en la URL (?q=…) para poder compartirla o volver atrás.
export function ProductSearch({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const results = searchProducts(products, query);
  const hasQuery = query.trim().length > 0;

  const updateQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    const params = nextQuery.trim() ? `?q=${encodeURIComponent(nextQuery)}` : "";
    router.replace(`${pathname}${params}`, { scroll: false });
  };

  return (
    <div>
      <form role="search" onSubmit={(event) => event.preventDefault()} className="max-w-2xl">
        <label htmlFor="busqueda" className="text-sm font-medium">
          {searchPage.inputLabel}
        </label>
        <div className="relative mt-2">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            id="busqueda"
            type="search"
            autoFocus
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder={searchPage.inputPlaceholder}
            className="h-14 w-full rounded-md border border-input bg-background pl-12 pr-4 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </form>

      <p aria-live="polite" className="mt-8 text-sm text-muted-foreground">
        {!hasQuery
          ? searchPage.emptyQueryMessage
          : results.length === 0
            ? searchPage.noResultsMessage
            : `${results.length} ${results.length === 1 ? "resultado" : "resultados"}`}
      </p>

      {results.length > 0 && <h2 className="sr-only">Resultados</h2>}
      {results.length > 0 && (
        <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <li key={product.code}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
