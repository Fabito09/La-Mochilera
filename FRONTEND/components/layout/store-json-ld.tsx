import { JsonLd } from "@/components/ui/json-ld";
import { absoluteUrl, brandInfo } from "@/content/marca";

// Identidad de la tienda para buscadores: nombre, logo, contacto y redes.
export function StoreJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ShoeStore",
        name: `${brandInfo.name} · ${brandInfo.tagline}`,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/icon.png"),
        image: absoluteUrl("/brand/fotos/botas-duo-horizontal.webp"),
        telephone: brandInfo.whatsapp.label,
        priceRange: "₡₡",
        currenciesAccepted: "CRC",
        areaServed: { "@type": "Country", name: "Costa Rica" },
        address: { "@type": "PostalAddress", addressLocality: "San Pedro", addressCountry: "CR" },
        sameAs: [brandInfo.instagram.url],
      }}
    />
  );
}
