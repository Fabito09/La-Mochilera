import { MessageCircle } from "lucide-react";
import { brandInfo, whatsappUrlWithMessage } from "@/content/marca";

const DEFAULT_MESSAGE = "Hola, quiero hacer una consulta sobre las botas de La Mochilera.";

// Soporte visible en todo el sitio, como pide el brief.
export function WhatsAppButton() {
  return (
    <aside aria-label="Contacto rápido">
      <a
        href={whatsappUrlWithMessage(DEFAULT_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Escríbanos por WhatsApp al ${brandInfo.whatsapp.label}`}
        className="fixed bottom-5 right-5 z-30 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:bottom-8 md:right-8"
      >
        <MessageCircle aria-hidden="true" className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </aside>
  );
}
