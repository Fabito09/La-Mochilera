import type { Metadata } from "next";
import { InfoPage } from "@/components/page/info-page";
import { termsPage } from "@/content/paginas/legal";
import { pageMetadata } from "@/lib/page-content";

export const metadata: Metadata = pageMetadata(termsPage);

export default function TermsPage() {
  return (
    <InfoPage
      content={termsPage}
      breadcrumbs={[{ label: termsPage.title, href: "/legal/terminos" }]}
      whatsappMessage="Hola, tengo una consulta sobre los términos y condiciones."
    />
  );
}
