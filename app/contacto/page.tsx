import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Truck } from "lucide-react";
import { WhatsAppContactForm } from "@/components/contact/whatsapp-contact-form";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/ui/container";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { brandInfo } from "@/content/marca";
import { contactPage } from "@/content/paginas/ayuda";
import { pageMetadata } from "@/lib/page-content";

export const metadata: Metadata = pageMetadata(contactPage);

const channelLinkClassName = "underline underline-offset-4 hover:text-muted-foreground";

export default function ContactPage() {
  const { showroom } = brandInfo;

  return (
    <main>
      <PageHeader
        breadcrumbs={[{ label: "Contacto", href: "/contacto" }]}
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        intro={contactPage.intro}
        image={contactPage.image}
      />
      <Container className="grid gap-16 pb-24 lg:grid-cols-2">
        <section aria-labelledby="canales-titulo">
          <h2 id="canales-titulo" className="font-display text-4xl">
            Dónde encontrarnos
          </h2>
          <ul className="mt-8 space-y-8">
            <li className="flex gap-4">
              <MessageCircle aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-highlight" />
              <div>
                <h3 className="font-medium">WhatsApp</h3>
                <a href={brandInfo.whatsapp.url} target="_blank" rel="noopener noreferrer" className={channelLinkClassName}>
                  {brandInfo.whatsapp.label}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-highlight" />
              <div>
                <h3 className="font-medium">{showroom.name}</h3>
                {showroom.address && <p className="text-muted-foreground">{showroom.address}</p>}
                {showroom.mapUrl && (
                  <a href={showroom.mapUrl} target="_blank" rel="noopener noreferrer" className={channelLinkClassName}>
                    Ver en el mapa
                  </a>
                )}
              </div>
            </li>
            <li className="flex gap-4">
              <Clock aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-highlight" />
              <div>
                <h3 className="font-medium">Horario de atención</h3>
                <p className="text-muted-foreground">{showroom.schedule}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <InstagramIcon className="mt-1 h-6 w-6 shrink-0 text-highlight" />
              <div>
                <h3 className="font-medium">Instagram</h3>
                <a href={brandInfo.instagram.url} target="_blank" rel="noopener noreferrer" className={channelLinkClassName}>
                  @{brandInfo.instagram.handle}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Truck aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-highlight" />
              <div>
                <h3 className="font-medium">Envíos</h3>
                <p className="text-muted-foreground">{brandInfo.shipping}</p>
              </div>
            </li>
          </ul>
        </section>

        <section aria-labelledby="mensaje-titulo" className="rounded-sm bg-muted p-8 md:p-10">
          <h2 id="mensaje-titulo" className="font-display text-4xl">
            Escríbanos
          </h2>
          <p className="mt-3 text-muted-foreground">Le respondemos a la brevedad.</p>
          <div className="mt-8">
            <WhatsAppContactForm />
          </div>
        </section>
      </Container>
    </main>
  );
}
