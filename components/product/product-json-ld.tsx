import { JsonLd } from "@/components/ui/json-ld";
import { absoluteUrl, brandInfo } from "@/content/marca";
import { productHref, type Product } from "@/lib/catalog";

interface ProductJsonLdProps {
  product: Product;
}

// Datos estructurados schema.org/Product: ayudan a Google a mostrar precio y
// disponibilidad en los resultados de búsqueda.
export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — ${product.colorName}`,
    sku: product.code,
    image: product.images.map((image) => absoluteUrl(image.src)),
    description: [product.material, product.leatherType && `cuero ${product.leatherType}`, product.sole && `suela ${product.sole.toLowerCase()}`]
      .filter(Boolean)
      .join(". "),
    brand: { "@type": "Brand", name: brandInfo.name },
    color: product.colorName,
    material: product.leatherType ?? product.material,
    // Sin precio publicado no se declara la oferta (Google la exige con precio).
    ...(product.priceInColones !== undefined && {
      offers: {
        "@type": "Offer",
        url: absoluteUrl(productHref(product)),
        price: product.priceInColones,
        priceCurrency: "CRC",
        availability: product.isAvailable
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    }),
  };

  return <JsonLd data={structuredData} />;
}
