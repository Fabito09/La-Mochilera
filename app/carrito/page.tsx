import type { Metadata } from "next";
import { NoticePage } from "@/components/page/notice-page";
import { whatsappUrlWithMessage } from "@/content/marca";
import { shopLink } from "@/content/navegacion";
import { cartPage } from "@/content/paginas/utilitarias";

export const metadata: Metadata = {
  title: cartPage.title,
  description: cartPage.metaDescription,
  robots: { index: false },
};

export default function CartPage() {
  return (
    <NoticePage
      eyebrow={cartPage.eyebrow}
      title={cartPage.title}
      intro={cartPage.intro}
      primaryAction={{ label: "Ver la colección", href: shopLink.href }}
      secondaryAction={{
        label: "Comprar por WhatsApp",
        href: whatsappUrlWithMessage("Hola, quiero hacer una compra."),
        isExternal: true,
      }}
    />
  );
}
