// CATÁLOGO — transcrito de "Campaña 1 | 2026".
//
// Para agregar, quitar o cambiar un producto se edita solo este archivo; las
// páginas y tarjetas se actualizan solas.
// Lo marcado con PROVISIONAL está pendiente de confirmar con el cliente
// (ver docs/catalogo-campana-1.md).

import type { Product } from "@/lib/catalog";

/** Precio de toda la campaña. */
export const CAMPAIGN_PRICE = 49_900;

/**
 * PROVISIONAL: tallas EU de la guía general (39 a 45). Cuando el cliente
 * confirme las tallas de cada modelo, se reemplaza en el campo `sizes`.
 */
export const STANDARD_SIZES = [39, 40, 41, 42, 43, 44, 45];

const COW_LEATHER = "Cuero vacuno";
const SMOOTH_COW_LEATHER = "Cuero vacuno liso";
const CAMPAIGN_RELEASE = "2026-01-15"; // PROVISIONAL: fecha de lanzamiento de la campaña

export const products: Product[] = [
  {
    code: "CME01",
    slug: "botin-summit-cme01",
    name: "Botín Summit",
    category: "botas",
    shaftHeight: "cana-media",
    leatherType: "Nubuck encerado",
    colorName: "Marrón cálido",
    colorFamilies: ["Marrón"],
    material: COW_LEATHER,
    closure: "Cordones",
    sole: "Sintética antideslizante, tacón bajo",
    toe: "Redondeada",
    priceInColones: CAMPAIGN_PRICE,
    badges: [],
    images: [
      { src: "/brand/productos/cme01.webp", alt: "Botín Summit de nubuck encerado marrón cálido, vista lateral" },
      { src: "/brand/productos/cme01-frente.webp", alt: "Botín Summit visto de frente, con puntera de doble costura" },
      { src: "/brand/productos/cme01-espalda.webp", alt: "Par de botines Summit vistos desde el talón" },
      { src: "/brand/detalles/herrajes.webp", alt: "Ojalillos metálicos y cordones del Botín Summit" },
    ],
    sizes: STANDARD_SIZES,
    bestSellerRank: 1, // PROVISIONAL
    releasedOn: CAMPAIGN_RELEASE,
    isAvailable: true,
  },
  {
    code: "CFG01",
    slug: "cana-media-antique-cfg01",
    name: "Caña Media Antique",
    category: "botas",
    shaftHeight: "cana-media", // PROVISIONAL: el catálogo también la llama "caña baja"
    leatherType: "Antique",
    colorName: "Marrón miel",
    colorFamilies: ["Miel y camel"],
    material: `${COW_LEATHER}, acabado liso con ligero efecto aceitado`,
    closure: "Cordones",
    sole: "Sintética tipo TR, flexible y resistente, antiderrapante con tacón bajo integrado",
    toe: "Redondeada",
    priceInColones: CAMPAIGN_PRICE,
    badges: [],
    images: [
      { src: "/brand/productos/cfg01-grande.webp", alt: "Bota Caña Media Antique marrón miel junto a un bolso de cuero" },
      { src: "/brand/productos/cfg01-espalda.webp", alt: "Par de botas Antique vistas desde el talón" },
      { src: "/brand/detalles/forro.webp", alt: "Interior acolchado de la bota Antique" },
      { src: "/brand/detalles/costura.webp", alt: "Costura del talón de la bota Antique" },
      { src: "/brand/detalles/suela.webp", alt: "Suela TR antiderrapante de la bota Antique" },
    ],
    sizes: STANDARD_SIZES,
    bestSellerRank: 3, // PROVISIONAL
    releasedOn: CAMPAIGN_RELEASE,
    isAvailable: true,
  },
  {
    code: "CMH02",
    slug: "cana-media-crazy-horse-cmh02",
    name: "Caña Media Crazy Horse",
    category: "botas",
    shaftHeight: "cana-media",
    leatherType: "Crazy Horse",
    colorName: "Marrón oliva envejecido",
    colorFamilies: ["Marrón"],
    material: COW_LEATHER,
    closure: "Cordones",
    sole: "Sintética antideslizante, tacón bajo",
    toe: "Redonda lisa",
    priceInColones: CAMPAIGN_PRICE,
    badges: [],
    images: [
      { src: "/brand/productos/cmh02.webp", alt: "Bota Crazy Horse marrón oliva con acabado envejecido, vista lateral" },
      { src: "/brand/detalles/cuero-crazy-horse.webp", alt: "Puntera de cuero Crazy Horse con doble costura" },
    ],
    sizes: STANDARD_SIZES,
    bestSellerRank: 2, // PROVISIONAL
    releasedOn: CAMPAIGN_RELEASE,
    isAvailable: true,
  },
  {
    code: "CNA01",
    slug: "cana-media-duna-cna01",
    name: "Caña Media Duna",
    category: "botas",
    shaftHeight: "cana-media",
    leatherType: "Duna miel",
    colorName: "Marrón cognac",
    colorFamilies: ["Marrón"],
    material: COW_LEATHER,
    closure: "Cordones y cierre lateral", // PROVISIONAL: la ficha dice solo cordones
    sole: "Sintética antideslizante, tacón bajo",
    toe: "Redondeada",
    priceInColones: CAMPAIGN_PRICE,
    badges: [],
    images: [
      { src: "/brand/productos/cna01-cognac.webp", alt: "Bota Duna color cognac con cierre lateral, vista lateral" },
      { src: "/brand/productos/cna01-cognac-frente.webp", alt: "Bota Duna cognac vista de frente" },
      { src: "/brand/productos/cna01-cognac-suela.webp", alt: "Suela dentada de la bota Duna" },
      { src: "/brand/productos/cna01-cognac-espalda.webp", alt: "Bota Duna cognac vista desde el talón" },
    ],
    sizes: STANDARD_SIZES,
    bestSellerRank: 5, // PROVISIONAL
    releasedOn: CAMPAIGN_RELEASE,
    isAvailable: true,
  },
  {
    code: "CNA01-B", // PROVISIONAL: el catálogo repite el código CNA01
    slug: "cana-alta-nubuck-gris-topo",
    name: "Caña Alta Nubuck",
    category: "botas",
    shaftHeight: "cana-alta",
    leatherType: "Nubuck encerado",
    colorName: "Gris topo",
    colorFamilies: ["Gris"],
    material: COW_LEATHER,
    closure: "Cordones",
    sole: "Sintética antideslizante, tacón bajo",
    toe: "Redondeada",
    priceInColones: CAMPAIGN_PRICE,
    badges: [],
    images: [
      { src: "/brand/productos/cna01-gris-topo.webp", alt: "Bota de caña alta en nubuck encerado gris topo" },
    ],
    sizes: STANDARD_SIZES,
    bestSellerRank: 8, // PROVISIONAL
    releasedOn: CAMPAIGN_RELEASE,
    isAvailable: true,
  },
  {
    code: "CMN01",
    slug: "cana-media-nubuck-marron-cmn01",
    name: "Caña Media Nubuck",
    category: "botas",
    shaftHeight: "cana-media",
    leatherType: "Nubuck",
    colorName: "Marrón",
    colorFamilies: ["Marrón"],
    material: COW_LEATHER,
    closure: "Cordones",
    sole: "Sintética dentada, antiderrapante",
    toe: "Redonda lisa",
    priceInColones: CAMPAIGN_PRICE,
    badges: [],
    images: [
      { src: "/brand/productos/cmn01.webp", alt: "Bota de nubuck marrón con cuello acolchado negro" },
    ],
    sizes: STANDARD_SIZES,
    bestSellerRank: 6, // PROVISIONAL
    releasedOn: CAMPAIGN_RELEASE,
    isAvailable: true,
  },
  {
    code: "CMN02",
    slug: "cana-media-nubuck-camel-cmn02",
    name: "Caña Media Nubuck",
    category: "botas",
    shaftHeight: "cana-media",
    leatherType: "Nubuck",
    colorName: "Camel",
    colorFamilies: ["Miel y camel"],
    material: COW_LEATHER,
    closure: "Cordones",
    sole: "Sintética dentada, antiderrapante",
    toe: "Redonda lisa",
    priceInColones: CAMPAIGN_PRICE,
    badges: [],
    images: [
      { src: "/brand/productos/cmn02.webp", alt: "Bota de nubuck camel con cuello acolchado vino" },
    ],
    sizes: STANDARD_SIZES,
    bestSellerRank: 4, // PROVISIONAL
    releasedOn: CAMPAIGN_RELEASE,
    isAvailable: true,
  },
  {
    code: "CH01",
    slug: "cana-baja-crazy-honey-ch01",
    name: "Caña Baja Crazy Honey",
    category: "botas",
    shaftHeight: "cana-baja",
    leatherType: "Crazy honey",
    colorName: "Camel claro / miel",
    colorFamilies: ["Miel y camel"],
    material: COW_LEATHER,
    closure: "Cordones",
    sole: "Sintética antideslizante, tacón bajo",
    toe: "Redonda lisa",
    priceInColones: CAMPAIGN_PRICE,
    badges: [],
    images: [
      { src: "/brand/productos/ch01.webp", alt: "Botín de caña baja en cuero Crazy Honey camel claro" },
    ],
    sizes: STANDARD_SIZES,
    bestSellerRank: 7, // PROVISIONAL
    releasedOn: CAMPAIGN_RELEASE,
    isAvailable: true,
  },
  {
    code: "CNG01",
    slug: "bota-urbana-cierre-cng01",
    name: "Bota Urbana con Cierre",
    category: "botas",
    shaftHeight: "urbanas",
    leatherType: "Napa",
    colorName: "Negro lustrable",
    colorFamilies: ["Negro"],
    material: SMOOTH_COW_LEATHER,
    closure: "Cierre lateral (zipper) y cordones",
    sole: "Sintética dentada, antiderrapante",
    toe: "Redonda lisa",
    priceInColones: CAMPAIGN_PRICE,
    badges: ["Precio especial"], // PROVISIONAL: falta el precio anterior para mostrar tachado
    images: [
      { src: "/brand/productos/cng01.webp", alt: "Bota urbana de napa negra con cierre lateral" },
      { src: "/brand/productos/cng01-espalda.webp", alt: "Par de botas urbanas negras vistas desde el talón" },
    ],
    sizes: STANDARD_SIZES,
    bestSellerRank: 9, // PROVISIONAL
    releasedOn: CAMPAIGN_RELEASE,
    isAvailable: true,
  },
  {
    code: "CNG02",
    slug: "bota-urbana-cng02",
    name: "Bota Urbana",
    category: "botas",
    shaftHeight: "urbanas",
    leatherType: "Napa",
    colorName: "Negro lustrable",
    colorFamilies: ["Negro"],
    material: SMOOTH_COW_LEATHER,
    closure: "Cordones",
    sole: "Sintética dentada, antiderrapante",
    toe: "Redonda lisa",
    priceInColones: CAMPAIGN_PRICE,
    badges: ["Precio especial"], // PROVISIONAL
    images: [
      { src: "/brand/productos/cng02.webp", alt: "Bota urbana de napa negra con cordones" },
      { src: "/brand/productos/cng02-detalle.webp", alt: "Detalle de la suela dentada y la costura de la bota urbana" },
    ],
    sizes: STANDARD_SIZES,
    bestSellerRank: 10, // PROVISIONAL
    releasedOn: CAMPAIGN_RELEASE,
    isAvailable: true,
  },
  // ── Gorros y accesorios ─────────────────────────────────────────────
  // PROVISIONAL: nombre, código, material y precio a confirmar con el cliente.
  // Sin precio publicado, el sitio muestra "Consultar precio".
  {
    code: "GOR01",
    slug: "gorro-tejido-gor01",
    name: "Gorro tejido",
    category: "gorros",
    colorName: "Cinco colores",
    colorFamilies: ["Vino", "Crema y arena", "Verde", "Mostaza"],
    colorOptions: ["Vino", "Arena", "Verde oliva", "Mostaza", "Crema"],
    material: "Tejido de punto con doblez, talla única",
    badges: ["Nuevo"],
    images: [
      {
        src: "/brand/productos/gorros-mostaza-vino-verde.webp",
        alt: "Gorros tejidos en color mostaza, vino y verde oliva sobre retazos de cuero",
      },
      {
        src: "/brand/productos/gorros-vino-mostaza-crema.webp",
        alt: "Gorros tejidos en color vino, mostaza y crema junto a una bota de cuero",
      },
      {
        src: "/brand/productos/gorros-vino-arena-verde.webp",
        alt: "Gorros tejidos en color vino, arena y verde oliva junto a una bota de cuero",
      },
    ],
    sizes: [],
    bestSellerRank: 11,
    releasedOn: "2026-10-01",
    isAvailable: true,
  },
  {
    code: "MON01",
    slug: "monedero-cuero-mon01",
    name: "Monedero de cuero",
    category: "accesorios",
    colorName: "Camel",
    colorFamilies: ["Miel y camel"],
    material: COW_LEATHER,
    closure: "Boquilla de resorte: se abre con una leve presión a los lados",
    badges: ["Nuevo"],
    images: [
      {
        src: "/brand/productos/monedero-cuero.webp",
        alt: "Monedero de cuero color camel con costura a la vista y boquilla de resorte",
      },
    ],
    sizes: [],
    bestSellerRank: 12,
    releasedOn: "2026-10-01",
    isAvailable: true,
  },
];
