import { BadgeCheck, MapPin, MessageCircle, Truck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { brandInfo } from "@/content/marca";

const trustItems = [
  { icon: Truck, title: "Envíos", detail: brandInfo.shipping },
  { icon: MapPin, title: brandInfo.showroom.name, detail: brandInfo.showroom.schedule },
  { icon: MessageCircle, title: "Atención por WhatsApp", detail: brandInfo.whatsapp.label },
  { icon: BadgeCheck, title: "Cuero 100% natural", detail: "Cuero vacuno en todos los modelos" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Beneficios de comprar en La Mochilera"
      className="border-y bg-background py-12"
    >
      <Container>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, detail }) => (
            <li key={title} className="flex items-start gap-4">
              <Icon aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-highlight" />
              <div>
                <p className="font-medium">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
