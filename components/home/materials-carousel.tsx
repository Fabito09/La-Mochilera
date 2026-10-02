import { Container } from "@/components/ui/container";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import { materialComponents } from "@/content/inicio";

const materialSlides: CoverflowSlide[] = materialComponents.map((component) => ({
  src: component.image.src,
  alt: component.image.alt,
  title: component.name,
  subtitle: component.headline,
  description: component.description,
  meta: component.origin ? [{ label: "Origen", value: component.origin }] : undefined,
}));

export function MaterialsCarousel() {
  return (
    <section
      aria-labelledby="materiales-titulo"
      className="overflow-hidden bg-forest py-24 text-forest-foreground md:py-32"
    >
      <Container>
        <SectionHeading
          id="materiales-titulo"
          eyebrow="Artesanía y materiales"
          title="Lo que hay dentro de cada bota"
          description="Cinco componentes elegidos uno por uno. Arrastre o use las flechas para recorrerlos."
          tone="dark"
          align="center"
        />
      </Container>

      <CoverflowCarousel
        slides={materialSlides}
        label="Componentes de la bota"
        itemName="material"
        cardWidth="clamp(200px, 28vw, 340px)"
        showCaption
        showPagination
        showNavigation
        className="mt-6"
      />
    </section>
  );
}
