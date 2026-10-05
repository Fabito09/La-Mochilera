import type { Metadata } from "next";
import { NoticePage } from "@/components/page/notice-page";
import { whatsappUrlWithMessage } from "@/content/marca";
import { shopLink } from "@/content/navegacion";
import { accountPage } from "@/content/paginas/utilitarias";

export const metadata: Metadata = {
  title: accountPage.eyebrow,
  description: accountPage.metaDescription,
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <NoticePage
      eyebrow={accountPage.eyebrow}
      title={accountPage.title}
      intro={accountPage.intro}
      primaryAction={{ label: "Ver la colección", href: shopLink.href }}
      secondaryAction={{
        label: "Consultar por WhatsApp",
        href: whatsappUrlWithMessage("Hola, tengo una consulta sobre un pedido."),
        isExternal: true,
      }}
    />
  );
}
