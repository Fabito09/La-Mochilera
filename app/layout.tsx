import type { Metadata } from "next";
import { Instrument_Serif, Roboto } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { MotionProvider } from "@/components/layout/motion-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StoreJsonLd } from "@/components/layout/store-json-ld";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { siteUrl } from "@/content/marca";
import { announcementMessage } from "@/content/navegacion";
import "./globals.css";

// Guía de Marca: Roboto para cuerpos de texto, VINCENTE para titulares.
// VINCENTE no es una fuente web gratuita: hasta recibir los archivos con
// licencia web se usa Instrument Serif, la serif condensada más cercana.
// Con los archivos, se reemplaza por next/font/local.
const headingFont = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "La Mochilera · Casa de Cuero — Botas de cuero natural",
    template: "%s | La Mochilera · Casa de Cuero",
  },
  description:
    "Botas de cuero vacuno 100% natural, diseñadas para los que llevan la montaña en cada paso. Showroom en San Pedro y envíos a toda Costa Rica.",
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
        alt: "Botas de cuero natural de La Mochilera sobre retazos de cuero",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Saltar al contenido
        </a>
        <StoreJsonLd />
        <MotionProvider>
          <AnnouncementBar message={announcementMessage} />
          <SiteHeader />
          <div id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </div>
          <SiteFooter />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
