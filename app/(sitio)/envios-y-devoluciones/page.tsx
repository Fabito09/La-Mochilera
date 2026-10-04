import type { Metadata } from "next";
import { InfoPage } from "@/components/page/info-page";
import { shippingPage } from "@/content/paginas/politicas";
import { pageMetadata } from "@/lib/page-content";

export const metadata: Metadata = pageMetadata(shippingPage);

export default function ShippingPage() {
  return (
    <InfoPage
      content={shippingPage}
      breadcrumbs={[{ label: shippingPage.title, href: "/envios-y-devoluciones" }]}
      whatsappMessage="Hola, tengo una consulta sobre envíos o cambios."
    />
  );
}
