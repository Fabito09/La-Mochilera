import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandPillars } from "@/components/home/brand-pillars";
import { LifestyleGallery } from "@/components/home/lifestyle-gallery";
import { ContentSections } from "@/components/page/content-sections";
import { PageHeader } from "@/components/page/page-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { shopLink } from "@/content/navegacion";
import { storyPage } from "@/content/paginas/marca";
import { pageMetadata } from "@/lib/page-content";

export const metadata: Metadata = pageMetadata(storyPage);

export default function StoryPage() {
  const { founder } = storyPage;

  return (
    <main>
      <PageHeader
        breadcrumbs={[{ label: storyPage.eyebrow, href: "/nuestra-historia" }]}
        eyebrow={storyPage.eyebrow}
        title={storyPage.title}
        intro={storyPage.intro}
        image={storyPage.image}
      />

      <Container className="pb-24">
        <ContentSections sections={storyPage.sections} />
      </Container>

      <section aria-label="Palabras del fundador" className="bg-forest py-24 text-forest-foreground">
        <Container className="grid items-center gap-12 md:grid-cols-[2fr_3fr] lg:gap-20">
          <FadeIn className="relative aspect-4/5 overflow-hidden rounded-sm">
            <Image
              src={founder.image.src}
              alt={founder.image.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <span aria-hidden="true" className="logo-mask logo-isotipo block h-10 text-highlight" />
            <blockquote className="mt-8">
              <p className="text-balance font-display text-4xl leading-tight md:text-5xl">
                “{founder.quote}”
              </p>
              <footer className="mt-6 text-sm text-forest-foreground/80">
                {founder.name && `${founder.name} · `}
                {founder.role}
              </footer>
            </blockquote>
          </FadeIn>
        </Container>
      </section>

      <LifestyleGallery />

      <BrandPillars id="valores" />

      <section className="bg-muted py-20 text-center">
        <Container>
          <h2 className="font-display text-4xl md:text-5xl">Encuentre el par que lo acompañe</h2>
          <Button asChild size="lg" className="mt-8">
            <Link href={shopLink.href}>Ver la colección</Link>
          </Button>
        </Container>
      </section>
    </main>
  );
}
