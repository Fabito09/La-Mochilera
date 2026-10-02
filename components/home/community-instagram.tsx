import Image from "next/image";
import { Container } from "@/components/ui/container";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandInfo } from "@/content/marca";
import { communityImages } from "@/content/inicio";

// Muestra fija con fotos de la marca; se reemplaza por el feed real de
// Instagram cuando se conecte la integración.
export function CommunityInstagram() {
  return (
    <section aria-labelledby="comunidad-titulo" className="bg-muted py-24 md:py-32">
      <Container>
        <SectionHeading
          id="comunidad-titulo"
          eyebrow="Comunidad"
          title={`@${brandInfo.instagram.handle}`}
          description="Comparta sus botas en el camino y etiquétenos para aparecer aquí."
          align="center"
        />
        <ul className="mt-12 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-4">
          {communityImages.map((image) => (
            <li key={image.src}>
              <a
                href={brandInfo.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${image.alt} — ver en Instagram`}
                className="group relative block aspect-square overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 16vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center text-on-media opacity-0 transition group-hover:bg-overlay/40 group-hover:opacity-100">
                  <InstagramIcon className="h-6 w-6" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <a
            href={brandInfo.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2 text-sm font-medium underline underline-offset-4"
          >
            <InstagramIcon className="h-4 w-4" />
            Síganos en Instagram
          </a>
        </div>
      </Container>
    </section>
  );
}
