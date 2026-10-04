import type { Metadata } from "next";
import { SiteDocument } from "@/components/layout/site-document";
import { siteUrl } from "@/content/marca";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "La Mochilera · Casa de Cuero — Botas de cuero vacuno",
    template: "%s | La Mochilera · Casa de Cuero",
  },
  description:
    "Botas de cuero vacuno, diseñadas para los que llevan la montaña en cada paso. Showroom en San Pedro y envíos a toda Costa Rica.",
  // Vista previa al compartir el enlace en WhatsApp, Instagram o Facebook.
  openGraph: {
    type: "website",
    locale: "es_CR",
    siteName: "La Mochilera · Casa de Cuero",
    images: [
      {
        url: "/brand/fotos/botas-duo-horizontal.webp",
        width: 2400,
        height: 1920,
        alt: "Botas de cuero de La Mochilera sobre retazos de cuero",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteDocument>{children}</SiteDocument>;
}
