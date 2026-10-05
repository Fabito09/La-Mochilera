import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { brandInfo, whatsappUrlWithMessage } from "@/content/marca";

interface WhatsAppCtaProps {
  title?: string;
  description?: string;
  /** Mensaje que aparece ya escrito al abrir WhatsApp. */
  message?: string;
}

// Cierre común de las páginas de ayuda: invita a escribir por WhatsApp.
export function WhatsAppCta({
  title = "¿Tiene alguna duda?",
  description = `Escríbanos al ${brandInfo.whatsapp.label} y le respondemos personalmente.`,
  message = "Hola, tengo una consulta.",
}: WhatsAppCtaProps) {
  return (
    <section className="bg-forest py-20 text-forest-foreground">
      <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-4xl">{title}</h2>
          <p className="mt-3 max-w-xl leading-7 text-forest-foreground/85">{description}</p>
        </div>
        <Button asChild size="lg" variant="secondary">
          <a href={whatsappUrlWithMessage(message)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
            Escribir por WhatsApp
          </a>
        </Button>
      </Container>
    </section>
  );
}
