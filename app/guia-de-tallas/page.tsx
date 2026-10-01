import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page/page-header";
import { WhatsAppCta } from "@/components/page/whatsapp-cta";
import { SizeGuideContent } from "@/components/product/size-guide-content";
import { Container } from "@/components/ui/container";
import { sizeGuidePage } from "@/content/paginas/ayuda";
import { sizeGuideNotice } from "@/content/tallas";
import { pageMetadata } from "@/lib/page-content";

export const metadata: Metadata = pageMetadata(sizeGuidePage);

export default function SizeGuidePage() {
  return (
    <main>
      <PageHeader
        breadcrumbs={[{ label: sizeGuidePage.title, href: "/guia-de-tallas" }]}
        eyebrow={sizeGuidePage.eyebrow}
        title={sizeGuidePage.title}
        intro={sizeGuidePage.intro}
      />
      <Container className="grid gap-12 pb-24 lg:grid-cols-[2fr_1fr]">
        <div className="max-w-2xl">
          <h2 className="mb-6 font-display text-3xl">Tabla de equivalencias</h2>
          <SizeGuideContent />
        </div>
        <aside className="h-fit rounded-sm bg-muted p-8">
          <h2 className="font-display text-2xl">Antes de elegir</h2>
          <p className="mt-3 leading-7 text-muted-foreground">{sizeGuideNotice}</p>
          <p className="mt-4 leading-7 text-muted-foreground">
            ¿Más detalles?{" "}
            <Link href="/bitacora/como-medir-su-pie" className="text-foreground underline underline-offset-4">
              Lea nuestra guía paso a paso
            </Link>
            .
          </p>
        </aside>
      </Container>
      <WhatsAppCta
        title="¿Duda entre dos tallas?"
        description="Díganos la medida de su pie y el modelo que le gusta, y le recomendamos la talla ideal."
        message="Hola, quiero ayuda para elegir mi talla."
      />
    </main>
  );
}
