// Datos de contacto y servicio tomados del catálogo "Campaña 1 | 2026".

const WHATSAPP_DIGITS = "50672227212";

/**
 * Dirección pública del sitio. PROVISIONAL: se define con la variable de
 * entorno NEXT_PUBLIC_SITE_URL cuando exista el dominio (ver .env.example).
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export const brandInfo = {
  name: "La Mochilera",
  tagline: "Casa de Cuero",
  whatsapp: {
    // El catálogo muestra dos números (7222-7212 y 7122-7212); se usa el del
    // ícono de WhatsApp hasta que el cliente confirme.
    label: "+506 7222-7212",
    url: `https://wa.me/${WHATSAPP_DIGITS}`,
  },
  instagram: {
    handle: "lamochilera_cr",
    url: "https://www.instagram.com/lamochilera_cr/",
  },
  showroom: {
    name: "Showroom San Pedro",
    schedule: "Lunes, miércoles y sábados, con cita previa",
    // PROVISIONAL: dirección exacta y enlace de Google Maps. Vacío = no se muestra.
    address: "",
    mapUrl: "",
  },
  shipping: "Envíos a toda Costa Rica",
} as const;

export function whatsappUrlWithMessage(message: string): string {
  return `${brandInfo.whatsapp.url}?text=${encodeURIComponent(message)}`;
}
