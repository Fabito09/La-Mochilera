import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBadges } from "@/components/product/product-badges";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfoAccordion } from "@/components/product/product-info-accordion";
import { ProductJsonLd } from "@/components/product/product-json-ld";
import { ProductPrice } from "@/components/product/product-price";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductReviews } from "@/components/product/product-reviews";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { products } from "@/content/productos";
import { shopLink } from "@/content/navegacion";
import {
  colorVariantsOf,
  findProductBySlug,
  productHref,
  relatedProducts,
  shaftHeightLabels,
} from "@/lib/catalog";

const RELATED_PRODUCTS_LIMIT = 4;

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) return {};
  const [mainImage] = product.images;
  return {
    title: `${product.name} ${product.colorName}`,
    description: `${product.name} en cuero ${product.leatherType}, color ${product.colorName.toLowerCase()}. ${shaftHeightLabels[product.shaftHeight]} de cuero vacuno. Envíos a toda Costa Rica.`,
    openGraph: { images: [{ url: mainImage.src, alt: mainImage.alt }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/producto/[slug]">) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) notFound();

  const colorVariants = colorVariantsOf(product);
  const shaftLabel = shaftHeightLabels[product.shaftHeight];

  return (
    <main className="pt-10">
      <ProductJsonLd product={product} />
      <Container>
        <Breadcrumbs
          items={[
            { label: shopLink.label, href: shopLink.href },
            { label: shaftLabel, href: `${shopLink.href}/botas/${product.shaftHeight}` },
            { label: product.name, href: productHref(product) },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <ProductGallery images={product.images} />

          <div className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start">
            <ProductBadges badges={product.badges} />
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-secondary">
              {shaftLabel} · Código {product.code}
            </p>
            <h1 className="mt-2 font-display text-5xl leading-none md:text-6xl">{product.name}</h1>
            <ProductPrice product={product} className="mt-4 text-2xl" />

            <div className="mt-6">
              <p className="text-sm">
                <span className="font-medium">Color:</span> {product.colorName}
              </p>
              {colorVariants.length > 0 && (
                <ul className="mt-3 flex gap-2" aria-label="Otros colores del mismo modelo">
                  <li>
                    <span
                      aria-current="page"
                      className="relative block h-14 w-14 overflow-hidden rounded-sm bg-overlay ring-2 ring-primary ring-offset-2 ring-offset-background"
                    >
                      <Image src={product.images[0].src} alt={product.colorName} fill sizes="56px" className="object-cover" />
                    </span>
                  </li>
                  {colorVariants.map((variant) => (
                    <li key={variant.code}>
                      <Link
                        href={productHref(variant)}
                        aria-label={`Ver en color ${variant.colorName}`}
                        className="relative block h-14 w-14 overflow-hidden rounded-sm bg-overlay opacity-80 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Image src={variant.images[0].src} alt="" fill sizes="56px" className="object-cover" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ProductPurchasePanel product={product} />

            <div className="mt-10">
              <ProductInfoAccordion product={product} />
            </div>
          </div>
        </div>
      </Container>

      <div className="mt-24">
        <ProductReviews product={product} />
      </div>

      <section aria-labelledby="relacionados-titulo" className="bg-muted py-20">
        <Container>
          <SectionHeading id="relacionados-titulo" eyebrow="También le puede gustar" title="Otros modelos" />
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts(product, RELATED_PRODUCTS_LIMIT).map((related) => (
              <li key={related.code}>
                <ProductCard product={related} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
