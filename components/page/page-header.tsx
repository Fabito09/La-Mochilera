import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import type { NavLink } from "@/content/navegacion";
import type { ImageAsset } from "@/lib/page-content";

interface PageHeaderProps {
  breadcrumbs: NavLink[];
  eyebrow: string;
  title: string;
  intro?: string;
  image?: ImageAsset;
}

// Encabezado común de las páginas internas: con foto va en dos columnas.
export function PageHeader({ breadcrumbs, eyebrow, title, intro, image }: PageHeaderProps) {
  return (
    <header className="pb-16 pt-10 md:pb-20">
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <div className={image ? "mt-10 grid items-center gap-10 md:grid-cols-2 lg:gap-20" : "mt-10"}>
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">{eyebrow}</p>
            <h1 className="mt-3 text-balance font-display text-5xl leading-none md:text-7xl">{title}</h1>
            {intro && <p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground">{intro}</p>}
          </div>
          {image && (
            <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-muted md:aspect-square">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
