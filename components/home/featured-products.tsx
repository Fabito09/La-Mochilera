import Link from "next/link";
import { CampaignPromoBanner } from "@/components/product/campaign-promo-banner";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProductCodes } from "@/content/inicio";
import { shopLink } from "@/content/navegacion";
import { findProductByCode } from "@/lib/catalog";

const PROMO_BANNER_POSITION = 2;

export function FeaturedProducts() {
  const gridItems: React.ReactNode[] = featuredProductCodes
    .map(findProductByCode)
    .map((product) => <ProductCard key={product.code} product={product} />);
  gridItems.splice(PROMO_BANNER_POSITION, 0, <CampaignPromoBanner key="promo" />);

  return (
    <section aria-labelledby="destacados-titulo" className="py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="destacados-titulo"
            eyebrow="Campaña 1 · 2026"
            title="Destacados de la temporada"
          />
          <Button asChild variant="outline" className="border-foreground bg-transparent">
            <Link href={shopLink.href}>Ver todo el catálogo</Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {gridItems.map((item, index) => (
            <li key={index}>
              <FadeIn delay={(index % 3) * 0.1}>{item}</FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
