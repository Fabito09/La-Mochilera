import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { shaftCategories } from "@/content/inicio";

export function FeaturedCategories() {
  return (
    <section aria-labelledby="categorias-titulo" className="bg-muted py-24 md:py-32">
      <Container>
        <SectionHeading
          id="categorias-titulo"
          eyebrow="Tienda"
          title="Elija su altura de caña"
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {shaftCategories.map((category, index) => (
            <li key={category.href}>
              <FadeIn delay={index * 0.08}>
                <Link
                  href={category.href}
                  className="group relative block aspect-3/4 overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-muted"
                >
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-overlay/80 via-overlay/10 to-transparent" />
                  <span className="absolute inset-x-4 bottom-4 flex items-center justify-between font-display text-2xl text-on-media md:text-3xl">
                    {category.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
