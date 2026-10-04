import type { Metadata } from "next";
import { SiteDocument } from "@/components/layout/site-document";
import { NotFoundNotice } from "@/components/page/not-found-notice";
import "./globals.css";

// 404 para direcciones que no existen. Es "global" porque el sitio y el panel
// de administración tienen layouts raíz distintos y no hay uno común.
export const metadata: Metadata = {
  title: "Página no encontrada | La Mochilera · Casa de Cuero",
};

export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <NotFoundNotice />
    </SiteDocument>
  );
}
