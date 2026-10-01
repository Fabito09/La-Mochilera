import type { Metadata } from "next";
import { MaterialsCarousel } from "@/components/home/materials-carousel";
import { ProductHotspots } from "@/components/home/product-hotspots";
import { ContentSections } from "@/components/page/content-sections";
import { PageHeader } from "@/components/page/page-header";
import { WhatsAppCta } from "@/components/page/whatsapp-cta";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { craftsmanshipPage } from "@/content/paginas/marca";
import { pageMetadata } from "@/lib/page-content";

export const metadata: Metadata = pageMetadata(craftsmanshipPage);

export default function CraftsmanshipPage() {
  return (
    <main>
      <PageHeader
        breadcrumbs={[{ label: "Artesanía", href: "/artesania" }]}
        eyebrow={craftsmanshipPage.eyebrow}
        title={craftsmanshipPage.title}
        intro={craftsmanshipPage.intro}
        image={craftsmanshipPage.image}
      />

      <section aria-labelledby="proceso-titulo" className="pb-24">
        <Container>
          <SectionHeading id="proceso-titulo" eyebrow="Nuestro proceso" title="Seis pasos, un par" />
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {craftsmanshipPage.processSteps.map((step, index) => (
              <li key={step.title}>
                <FadeIn delay={(index % 3) * 0.1} className="border-t pt-6">
                  <p aria-hidden="true" className="font-display text-5xl text-highlight">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{step.description}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <ProductHotspots />

      <MaterialsCarousel />

      <section aria-labelledby="cueros-titulo" className="py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHeading
            id="cueros-titulo"
            eyebrow="Glosario"
            title="Nuestros cueros"
            description="Cada acabado tiene su carácter y su forma de envejecer."
          />
          <ContentSections sections={craftsmanshipPage.sections} headingLevel="h3" />
        </Container>
      </section>

      <WhatsAppCta
        title="¿No sabe qué cuero elegir?"
        description="Cuéntenos para qué va a usar sus botas y le recomendamos el acabado ideal."
        message="Hola, quiero ayuda para elegir el tipo de cuero de mis botas."
      />
    </main>
  );
}
