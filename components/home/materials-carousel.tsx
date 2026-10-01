"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { materialComponents } from "@/content/inicio";

type ScrollDirection = -1 | 1;

export function MaterialsCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollTrack = (direction: ScrollDirection) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? track.clientWidth;
    track.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="materiales-titulo"
      className="overflow-hidden bg-forest py-24 text-forest-foreground md:py-32"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="materiales-titulo"
            eyebrow="Artesanía y materiales"
            title="Lo que hay dentro de cada bota"
            description="Cinco componentes elegidos uno por uno. Así se construye una bota que dura."
            tone="dark"
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="glass"
              size="icon"
              aria-label="Material anterior"
              aria-controls="materiales-lista"
              onClick={() => scrollTrack(-1)}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="glass"
              size="icon"
              aria-label="Material siguiente"
              aria-controls="materiales-lista"
              onClick={() => scrollTrack(1)}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>

      <ul
        id="materiales-lista"
        ref={trackRef}
        tabIndex={0}
        aria-label="Componentes de la bota (desplazable)"
        className="carousel-track mt-12 flex snap-x focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-highlight snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
      >
        {materialComponents.map((component, index) => (
          <li
            key={component.name}
            className="w-[80vw] shrink-0 snap-start sm:w-[45vw] lg:w-[26rem]"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-sm">
              <Image
                src={component.image.src}
                alt={component.image.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 80vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-sm bg-forest/80 px-2 py-1 text-xs tracking-widest">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-forest-foreground/75">
              {component.name}
            </p>
            <h3 className="mt-2 font-display text-3xl">{component.headline}</h3>
            <p className="mt-3 leading-7 text-forest-foreground/85">{component.description}</p>
            {component.origin && (
              <p className="mt-3 text-sm text-forest-foreground/70">Origen: {component.origin}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
