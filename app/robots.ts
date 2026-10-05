import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/marca";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Páginas sin contenido propio para buscadores.
      disallow: ["/buscar", "/carrito", "/cuenta"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
