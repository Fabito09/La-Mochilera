// Datos de contacto y servicio tomados del catálogo "Campaña 1 | 2026".

const WHATSAPP_DIGITS = "50672227212";

/**
 * Dirección pública del sitio (SEO, mapa del sitio, vista previa al compartir).
 * Orden de prioridad:
 * 1. NEXT_PUBLIC_SITE_URL, si se configura a mano (ver .env.example).
 * 2. En Vercel, la dirección de producción del proyecto. Vercel la informa
 *    sola y pasa a ser el dominio propio cuando el cliente lo conecte.
 * 3. En la compu de desarrollo, localhost.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

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
