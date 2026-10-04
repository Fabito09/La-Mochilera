import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page/page-header";
import { ProductSearch } from "@/components/search/product-search";
import { Container } from "@/components/ui/container";
import { searchPage } from "@/content/paginas/utilitarias";
import { getProducts } from "@/lib/catalog-data";

export const metadata: Metadata = {
  title: searchPage.title,
  description: searchPage.metaDescription,
  robots: { index: false },
};

export default async function SearchPage() {
  const products = await getProducts();

  return (
    <main>
      <PageHeader
        breadcrumbs={[{ label: searchPage.eyebrow, href: "/buscar" }]}
        eyebrow={searchPage.eyebrow}
        title={searchPage.title}
      />
      <Container className="pb-24">
        {/* useSearchParams necesita un límite de Suspense en páginas estáticas. */}
        <Suspense>
          <ProductSearch products={products} />
        </Suspense>
      </Container>
    </main>
  );
}
