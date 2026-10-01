import type { Metadata } from "next";
import { PageHeader } from "@/components/page/page-header";
import { WhatsAppCta } from "@/components/page/whatsapp-cta";
import { AccordionItem } from "@/components/ui/accordion-item";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { faqItems, faqPage } from "@/content/paginas/ayuda";
import { pageMetadata } from "@/lib/page-content";

export const metadata: Metadata = pageMetadata(faqPage);

export default function FaqPage() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main>
      <JsonLd data={faqStructuredData} />
      <PageHeader
        breadcrumbs={[{ label: faqPage.title, href: "/preguntas-frecuentes" }]}
        eyebrow={faqPage.eyebrow}
        title={faqPage.title}
        intro={faqPage.intro}
      />
      <Container className="pb-24">
        <div className="max-w-3xl border-t">
          {faqItems.map((item) => (
            <AccordionItem key={item.question} title={item.question} titleSize="md">
              <p className="leading-7 text-muted-foreground">{item.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </Container>
      <WhatsAppCta
        title="¿No encontró su respuesta?"
        message="Hola, tengo una pregunta que no encontré en las preguntas frecuentes."
      />
    </main>
  );
}
