import Image from "next/image";
import { Clock, MapPin, MessageCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { homeContact } from "@/content/inicio";
import { brandInfo, whatsappUrlWithMessage } from "@/content/marca";

const iconClassName = "h-5 w-5 shrink-0 text-highlight";
const linkClassName =
  "underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-media";

// Cierre del inicio: versión web de la última página del catálogo
// ("Contáctenos" sobre fondo de botas), con texto real y editable.
export function ContactShowcase() {
  const { showroom } = brandInfo;

  return (
    <section
      aria-labelledby="contacto-titulo"
      className="relative isolate overflow-hidden py-24 text-on-media md:py-32"
    >
      <Image
        src={homeContact.backgroundImage.src}
        alt={homeContact.backgroundImage.alt}
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-overlay/80" />

      <Container className="flex justify-center">
        <div className="relative w-full max-w-md text-center">
          <p
            aria-hidden="true"
            className="absolute -right-1 -top-6 flex h-20 w-20 rotate-12 items-center justify-center rounded-full bg-secondary p-2 text-[0.625rem] font-bold uppercase leading-tight tracking-wide text-secondary-foreground shadow-lg sm:-right-16 sm:h-24 sm:w-24 sm:text-xs"
          >
            {homeContact.badge}
          </p>

          <span aria-hidden="true" className="logo-mask logo-isotipo mx-auto block h-12 md:h-14" />
          <h2 id="contacto-titulo" className="mt-6 font-display text-6xl leading-none md:text-7xl">
            {homeContact.title}
          </h2>

          <ul className="mt-10 divide-y divide-on-media/20 border-y border-on-media/20 text-left">
            <li className="flex items-center gap-4 py-4">
              <MessageCircle aria-hidden="true" className={iconClassName} />
              <a
                href={whatsappUrlWithMessage(homeContact.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-lg ${linkClassName}`}
              >
                WhatsApp {brandInfo.whatsapp.label}
              </a>
            </li>
            <li className="flex items-center gap-4 py-4">
              <MapPin aria-hidden="true" className={iconClassName} />
              <span className="text-lg">{showroom.name}</span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <Clock aria-hidden="true" className={iconClassName} />
              <span>{showroom.schedule}</span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <InstagramIcon className={iconClassName} />
              <a
                href={brandInfo.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                @{brandInfo.instagram.handle}
              </a>
            </li>
            <li className="flex items-center gap-4 py-4">
              <Truck aria-hidden="true" className={iconClassName} />
              <span>{brandInfo.shipping}</span>
            </li>
          </ul>

          <Button asChild size="lg" variant="secondary" className="mt-10">
            <a
              href={whatsappUrlWithMessage(homeContact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
