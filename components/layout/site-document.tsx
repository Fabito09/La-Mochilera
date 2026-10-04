import type { ReactNode } from "react";
import { Instrument_Serif, Roboto } from "next/font/google";
import { MotionProvider } from "@/components/layout/motion-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StoreJsonLd } from "@/components/layout/store-json-ld";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

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

/**
 * Documento HTML del sitio público: fuentes, encabezado, pie y botón de
 * WhatsApp. Lo comparten el layout del sitio y la página 404 global (el panel
 * de administración tiene su propio documento).
 */
export function SiteDocument({ children }: { children: ReactNode }) {
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
