import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { GalleryMediaTile } from "@/components/ui/gallery-media-tile";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandStory } from "@/content/inicio";

interface BrandStoryProps {
  id: string;
}

export function BrandStory({ id }: BrandStoryProps) {
  const { primaryMedia, secondaryImage } = brandStory;

  return (
    <section
      id={id}
      aria-labelledby="historia-titulo"
      className="scroll-mt-(--header-height) py-24 md:py-32"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* El video ocupa más ancho que la foto; en celular y tablet el bloque se
            centra con un ancho cómodo y el texto pasa debajo. */}
        <FadeIn className="mx-auto grid w-full max-w-md grid-cols-[3fr_2fr] items-start gap-4 lg:max-w-none">
          {/* Formato vertical, igual que el video: se ve completo en cualquier pantalla. */}
          <div className="relative aspect-9/16 overflow-hidden rounded-sm bg-muted">
            <GalleryMediaTile media={primaryMedia} sizes="(min-width: 1024px) 30vw, 60vw" />
          </div>
          <div className="relative mt-12 aspect-3/4 overflow-hidden rounded-sm bg-muted">
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              sizes="(min-width: 1024px) 20vw, 40vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <SectionHeading
            id="historia-titulo"
            eyebrow="Nuestra historia"
            title={brandStory.title}
          />
          <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
            {brandStory.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Button asChild size="lg" className="mt-8">
            <Link href="/nuestra-historia">Conocer nuestra historia</Link>
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
