import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { TrustBar } from "@/components/home/trust-bar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { catalogTexts } from "@/content/tienda";
import { shopLink } from "@/content/navegacion";
import { catalogStaticParams, resolveCatalogPage } from "@/lib/catalog-routes";

// Solo existen las URLs que salen del menú de la tienda; el resto da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return catalogStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/tienda/[[...segmentos]]">): Promise<Metadata> {
  const { segmentos } = await params;
  const catalogPage = resolveCatalogPage(segmentos);
  if (!catalogPage) return {};
  return { title: catalogPage.title, description: catalogPage.description };
}

export default async function CatalogPage({ params }: PageProps<"/tienda/[[...segmentos]]">) {
  const { segmentos } = await params;
  const catalogPage = resolveCatalogPage(segmentos);
  if (!catalogPage) notFound();

  const hasProducts = catalogPage.products.length > 0;

  return (
    <main className="pt-10">
      <Container className="pb-24 md:pb-32">
        <Breadcrumbs items={catalogPage.breadcrumbs} />
        <header className="mb-10 mt-8 max-w-2xl">
          <h1 className="font-display text-5xl leading-none md:text-6xl">{catalogPage.title}</h1>
          {catalogPage.description && (
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{catalogPage.description}</p>
          )}
        </header>

        {hasProducts ? (
          <CatalogBrowser
            key={segmentos?.join("/") ?? "todo"}
            products={catalogPage.products}
            presetShaftHeight={catalogPage.presetShaftHeight}
          />
        ) : (
          <div className="rounded-sm bg-muted px-6 py-20 text-center">
            <p className="font-display text-4xl">{catalogTexts.emptyCategoryTitle}</p>
            <Button asChild size="lg" className="mt-8">
              <Link href={shopLink.href}>Ver las botas</Link>
            </Button>
          </div>
        )}
      </Container>
      <TrustBar />
    </main>
  );
}
