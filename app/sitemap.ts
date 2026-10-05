import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/marca";
import { productHref } from "@/lib/catalog";
import { getProducts } from "@/backend/catalog-data";
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
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalogPaths = catalogStaticParams().map(({ segmentos }) =>
    ["/tienda", ...segmentos].join("/"),
  );
  const productPaths = (await getProducts()).map(productHref);

  return [...STATIC_PATHS, ...catalogPaths, ...productPaths].map((path) => ({
    url: absoluteUrl(path),
  }));
}
