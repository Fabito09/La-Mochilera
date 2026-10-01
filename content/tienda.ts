// TIENDA — textos del catálogo y del banner promocional.
// Se editan acá sin tocar el diseño.

import { formatPriceInColones } from "@/lib/format-price";
import { CAMPAIGN_PRICE } from "@/content/productos";

export const catalogTexts = {
  allProductsTitle: "Toda la colección",
  allProductsDescription:
    "Botas de cuero vacuno 100% natural en caña baja, media, alta y urbana. Campaña 1 · 2026.",
  emptyCategoryTitle: "Muy pronto",
  emptyCategoryDescription:
    "Estamos preparando esta línea. Mientras tanto, conozca nuestras botas o escríbanos por WhatsApp.",
  noResultsMessage: "Ningún producto coincide con esos filtros.",
};

export const campaignPromoBanner = {
  title: `Toda la colección a ${formatPriceInColones(CAMPAIGN_PRICE)}`,
  description: "Cuero vacuno 100% natural en caña baja, media, alta y urbana.",
  ctaLabel: "Comprar ahora",
  ctaHref: "/tienda",
};
