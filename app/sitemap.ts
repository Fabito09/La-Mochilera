import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/marca";
import { products } from "@/content/productos";
import { productHref } from "@/lib/catalog";
import { catalogStaticParams } from "@/lib/catalog-routes";

// Páginas fijas que conviene indexar (carrito, cuenta y búsqueda quedan fuera).
const STATIC_PATHS = [
  "/",
  "/nuestra-historia",
  "/artesania",
  "/contacto",
  "/guia-de-tallas",
  "/guia-de-cuidado",
  "/garantia-y-reparaciones",
  "/envios-y-devoluciones",
  "/preguntas-frecuentes",
  "/legal/terminos",
  "/legal/privacidad",
];

// Se arma a partir del contenido: un producto nuevo entra solo.
export default function sitemap(): MetadataRoute.Sitemap {
  const catalogPaths = catalogStaticParams().map(({ segmentos }) =>
    ["/tienda", ...segmentos].join("/"),
  );
  const productPaths = products.map(productHref);

  return [...STATIC_PATHS, ...catalogPaths, ...productPaths].map((path) => ({
    url: absoluteUrl(path),
  }));
}
