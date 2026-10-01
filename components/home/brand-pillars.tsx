import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandPillars, brandPillarsSection } from "@/content/inicio";
import type { NavLink } from "@/content/navegacion";

interface BrandPillarsProps {
  id: string;
  /** Botón opcional al pie de la sección, p. ej. hacia Artesanía. */
  callToAction?: NavLink;
}

export function BrandPillars({ id, callToAction }: BrandPillarsProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="scroll-mt-(--header-height) py-24 md:py-32"
    >
      <Container>
        <SectionHeading
          id={`${id}-titulo`}
          eyebrow={brandPillarsSection.eyebrow}
          title={brandPillarsSection.title}
          description={brandPillarsSection.description}
          align="center"
        />
        <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {brandPillars.map((pillar, index) => (
            <li key={pillar.title}>
              <FadeIn delay={index * 0.12}>
                <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-muted">
                  <Image
                    src={pillar.image.src}
                    alt={pillar.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 font-display text-3xl">{pillar.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{pillar.description}</p>
              </FadeIn>
            </li>
          ))}
        </ul>
        {callToAction && (
          <div className="mt-14 text-center">
            <Button asChild size="lg" variant="outline" className="border-foreground bg-transparent">
              <Link href={callToAction.href}>{callToAction.label}</Link>
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
