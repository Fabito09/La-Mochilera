import type { Metadata } from "next";
import { InfoPage } from "@/components/page/info-page";
import { privacyPage } from "@/content/paginas/legal";
import { pageMetadata } from "@/lib/page-content";

export const metadata: Metadata = pageMetadata(privacyPage);

export default function PrivacyPage() {
  return (
    <InfoPage
      content={privacyPage}
      breadcrumbs={[{ label: privacyPage.title, href: "/legal/privacidad" }]}
      whatsappMessage="Hola, quiero consultar sobre mis datos personales."
    />
  );
}
