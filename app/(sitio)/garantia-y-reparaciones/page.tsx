import type { Metadata } from "next";
import { InfoPage } from "@/components/page/info-page";
import { warrantyPage } from "@/content/paginas/politicas";
import { pageMetadata } from "@/lib/page-content";

export const metadata: Metadata = pageMetadata(warrantyPage);

export default function WarrantyPage() {
  return (
    <InfoPage
      content={warrantyPage}
      breadcrumbs={[{ label: warrantyPage.title, href: "/garantia-y-reparaciones" }]}
      whatsappMessage="Hola, tengo una consulta sobre garantía o reparación."
    />
  );
}
