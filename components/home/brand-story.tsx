import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandStory } from "@/content/inicio";

export function BrandStory() {
  const [primaryImage, secondaryImage] = brandStory.images;

  return (
    <section aria-labelledby="historia-titulo" className="py-24 md:py-32">
      <Container className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
        <FadeIn className="grid grid-cols-2 gap-4">
          <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-muted">
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative mt-12 aspect-3/4 overflow-hidden rounded-sm bg-muted">
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
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
