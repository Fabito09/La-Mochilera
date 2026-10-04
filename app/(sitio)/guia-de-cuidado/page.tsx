import type { Metadata } from "next";
import { InfoPage } from "@/components/page/info-page";
import { careGuidePage } from "@/content/paginas/cuidado";
import { pageMetadata } from "@/lib/page-content";

export const metadata: Metadata = pageMetadata(careGuidePage);

export default function CareGuidePage() {
  return (
    <InfoPage
      content={careGuidePage}
      breadcrumbs={[{ label: careGuidePage.title, href: "/guia-de-cuidado" }]}
      whatsappMessage="Hola, tengo una consulta sobre el cuidado de mis botas."
    />
  );
}
