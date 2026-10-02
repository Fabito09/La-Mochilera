// Estructura de navegación de la tienda. Rutas y textos se centralizan acá
// para cambiar idioma o slugs en un solo lugar.

export interface NavLink {
  label: string;
  href: string;
}

export interface ShopCategory extends NavLink {
  /** Texto bajo el título de la página de la categoría. */
  description?: string;
  subcategories: NavLink[];
}

export interface FeaturedProduct extends NavLink {
  /** Imagen del material de marca. Vacío = se muestra un placeholder rotulado. */
  imageUrl: string;
  imageAlt: string;
}

export const shopLink: NavLink = { label: "Tienda", href: "/tienda" };

export const shopCategories: ShopCategory[] = [
  {
    label: "Botas",
    href: "/tienda/botas",
    description: "Cuero vacuno 100% natural, suelas antideslizantes y costuras que duran.",
    subcategories: [
      { label: "Caña baja", href: "/tienda/botas/cana-baja" },
      { label: "Caña media", href: "/tienda/botas/cana-media" },
      { label: "Caña alta", href: "/tienda/botas/cana-alta" },
      { label: "Botas urbanas", href: "/tienda/botas/urbanas" },
    ],
  },
  {
    label: "Chaquetas",
    href: "/tienda/chaquetas",
    subcategories: [
      { label: "Chaquetas de cuero", href: "/tienda/chaquetas/cuero" },
      { label: "Chalecos", href: "/tienda/chaquetas/chalecos" },
    ],
  },
  {
    label: "Accesorios",
    href: "/tienda/accesorios",
    subcategories: [
      { label: "Mochilas", href: "/tienda/accesorios/mochilas" },
      { label: "Cinturones", href: "/tienda/accesorios/cinturones" },
      { label: "Billeteras", href: "/tienda/accesorios/billeteras" },
      { label: "Guantes", href: "/tienda/accesorios/guantes" },
    ],
  },
  {
    label: "Cuidado del cuero",
    href: "/tienda/cuidado-del-cuero",
    subcategories: [
      { label: "Ceras y cremas", href: "/tienda/cuidado-del-cuero/ceras" },
      { label: "Kits de limpieza", href: "/tienda/cuidado-del-cuero/kits" },
      { label: "Guía de cuidado", href: "/guia-de-cuidado" },
    ],
  },
];

export const featuredProduct: FeaturedProduct = {
  label: "Campaña 1 · 2026 — Botas de cuero natural",
  href: "/tienda/botas",
  imageUrl: "/brand/fotos/botas-duo-vertical.webp",
  imageAlt: "Dos botas de cuero, una camel y una cognac, sobre retazos de cuero",
};

export const mainLinks: NavLink[] = [
  { label: "Nuestra historia", href: "/nuestra-historia" },
  { label: "Artesanía", href: "/artesania" },
  { label: "Bitácora", href: "/bitacora" },
  { label: "Contacto", href: "/contacto" },
];

export const accountLinks = {
  search: { label: "Buscar", href: "/buscar" },
  account: { label: "Mi cuenta", href: "/cuenta" },
  cart: { label: "Carrito", href: "/carrito" },
} satisfies Record<string, NavLink>;

export const helpLinks: NavLink[] = [
  { label: "Guía de tallas", href: "/guia-de-tallas" },
  { label: "Guía de cuidado", href: "/guia-de-cuidado" },
  { label: "Garantía y reparaciones", href: "/garantia-y-reparaciones" },
  { label: "Envíos y devoluciones", href: "/envios-y-devoluciones" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
];

export const legalLinks: NavLink[] = [
  { label: "Términos y condiciones", href: "/legal/terminos" },
  { label: "Política de privacidad", href: "/legal/privacidad" },
];

/** Botón destacado a la derecha del header (en pantallas grandes). */
export const headerCallToAction: NavLink = { label: "Comprar ahora", href: "/tienda" };
