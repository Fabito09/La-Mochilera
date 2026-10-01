import Image from "next/image";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandPillars } from "@/content/inicio";

interface BrandPillarsProps {
  id: string;
}

export function BrandPillars({ id }: BrandPillarsProps) {
  return (
    <section
      id={id}
      aria-labelledby="pilares-titulo"
      className="scroll-mt-(--header-height) py-24 md:py-32"
    >
      <Container>
        <SectionHeading
          id="pilares-titulo"
          eyebrow="Casa de Cuero"
          title="Por qué elegir La Mochilera"
          description="Tres compromisos que están en cada par que sale de nuestra casa."
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
      </Container>
    </section>
  );
}
