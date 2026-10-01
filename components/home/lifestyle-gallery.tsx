import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { GalleryMediaTile } from "@/components/ui/gallery-media-tile";
import { SectionHeading } from "@/components/ui/section-heading";
import { lifestyleGallery } from "@/content/inicio";
import { cn } from "@/lib/utils";

// Forma de cada espacio de la galería, en el mismo orden que el contenido.
const tileLayouts = [
  { className: "col-span-2 row-span-2", sizes: "(min-width: 768px) 50vw, 100vw" },
  { className: "row-span-2", sizes: "(min-width: 768px) 25vw, 50vw" },
  { className: "", sizes: "(min-width: 768px) 25vw, 50vw" },
  { className: "", sizes: "(min-width: 768px) 25vw, 50vw" },
];

export function LifestyleGallery() {
  return (
    <section aria-labelledby="estilo-de-vida-titulo" className="bg-muted py-24 md:py-32">
      <Container>
        <SectionHeading
          id="estilo-de-vida-titulo"
          eyebrow="En el camino"
          title="Para los que llevan la montaña en cada paso"
          align="center"
        />
        <div className="mt-12 grid auto-rows-[16rem] grid-cols-2 gap-4 md:auto-rows-[20rem] md:grid-cols-4 md:gap-6">
          {lifestyleGallery.map((media, index) => (
            <FadeIn
              key={index}
              delay={index * 0.1}
              className={cn("relative overflow-hidden rounded-sm", tileLayouts[index].className)}
            >
              <GalleryMediaTile media={media} sizes={tileLayouts[index].sizes} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
