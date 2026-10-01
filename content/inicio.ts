// INICIO — textos, fotos y video de cada sección de la página principal.
//
// Para cambiar un texto o una foto se edita solo este archivo; el diseño no
// se toca. Lo marcado con PROVISIONAL es contenido de relleno hecho con el
// material de marca disponible, pensado para reemplazarse cuando llegue el
// definitivo (buscar "PROVISIONAL" para encontrarlo todo).

import type { ImageAsset } from "@/lib/page-content";

export interface HeroContent {
  title: string;
  description: string;
  /** Fotograma de portada: se ve en móvil y mientras carga el video. */
  posterImageUrl: string;
  /** Video propio de la marca. Vacío = se muestra solo la foto de portada. */
  video: {
    mp4: string;
    webm: string;
  };
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export const heroContent: HeroContent = {
  title: "Hecho para durar. Hecho para el camino.",
  description:
    "Botas de cuero vacuno 100% natural, diseñadas para los que llevan la montaña en cada paso.",
  posterImageUrl: "/brand/fotos/botas-duo-horizontal.webp",
  // PROVISIONAL: al recibir el video, copiarlo a public/brand/video/ y poner las rutas acá.
  video: { mp4: "", webm: "" },
  primaryCta: { text: "Ver la colección", href: "/tienda" },
  secondaryCta: { text: "Nuestra historia", href: "/nuestra-historia" },
};

export interface BrandPillar {
  title: string;
  description: string;
  image: ImageAsset;
}

export const brandPillars: BrandPillar[] = [
  {
    title: "Cuero 100% natural",
    description:
      "Cuero vacuno de verdad: Crazy Horse, Nubuck, Napa y Antique. Cada acabado envejece distinto y toma la forma de quien lo usa.",
    image: {
      src: "/brand/detalles/cuero-crazy-horse.webp",
      alt: "Puntera de una bota en cuero Crazy Horse con marcas naturales del acabado envejecido",
    },
  },
  {
    title: "Oficio en cada costura",
    description:
      "Costuras dobles, punteras reforzadas y talones firmes. Detalles que no se ven en una foto, pero se sienten en el camino.",
    image: {
      src: "/brand/detalles/costura.webp",
      alt: "Detalle de la costura del talón de una bota de cuero color miel",
    },
  },
  {
    title: "Hechas para durar",
    description:
      "Suelas antideslizantes y cuero que mejora con los años. Una bota para muchas temporadas, no para una sola.",
    image: {
      src: "/brand/detalles/suela.webp",
      alt: "Suela antideslizante con tacos de agarre vista desde abajo",
    },
  },
];

export interface ShaftCategory {
  label: string;
  href: string;
  image: ImageAsset;
}

export const shaftCategories: ShaftCategory[] = [
  {
    label: "Caña baja",
    href: "/tienda/botas/cana-baja",
    image: {
      src: "/brand/productos/ch01.webp",
      alt: "Botín de caña baja en cuero camel claro",
    },
  },
  {
    label: "Caña media",
    href: "/tienda/botas/cana-media",
    image: {
      src: "/brand/productos/cmh02.webp",
      alt: "Bota de caña media en cuero Crazy Horse marrón oliva",
    },
  },
  {
    label: "Caña alta",
    href: "/tienda/botas/cana-alta",
    image: {
      src: "/brand/productos/cna01-gris-topo.webp",
      alt: "Bota de caña alta en nubuck gris topo",
    },
  },
  {
    label: "Botas urbanas",
    href: "/tienda/botas/urbanas",
    image: {
      src: "/brand/productos/cng01.webp",
      alt: "Bota urbana de napa negra con cierre lateral",
    },
  },
];

export interface MaterialComponent {
  name: string;
  headline: string;
  description: string;
  /** Origen del componente. Si está vacío no se muestra. */
  origin: string;
  image: ImageAsset;
}

// PROVISIONAL: origen de cada componente. Vacío = la línea no se muestra.
const ORIGIN_NOT_CONFIRMED = "";

export const materialComponents: MaterialComponent[] = [
  {
    name: "Cuero",
    headline: "Vacuno, 100% natural",
    description:
      "Trabajamos cinco acabados: Crazy Horse, Nubuck, Napa, Antique y Duna. Todos respiran, se adaptan al pie y ganan carácter con el uso.",
    origin: ORIGIN_NOT_CONFIRMED,
    image: {
      src: "/brand/detalles/cuero-crazy-horse.webp",
      alt: "Superficie de cuero Crazy Horse con variaciones naturales de tono",
    },
  },
  {
    name: "Costura",
    headline: "Doble y a la vista",
    description:
      "Las uniones principales llevan doble pespunte. Es más trabajo, y es lo que mantiene la bota entera después de años de uso.",
    origin: ORIGIN_NOT_CONFIRMED,
    image: {
      src: "/brand/detalles/costura.webp",
      alt: "Doble costura en el talón de una bota de cuero",
    },
  },
  {
    name: "Suela",
    headline: "Agarre para cualquier terreno",
    description:
      "Suela sintética tipo TR, flexible y resistente, con diseño antiderrapante y tacón bajo integrado.",
    origin: ORIGIN_NOT_CONFIRMED,
    image: {
      src: "/brand/detalles/suela.webp",
      alt: "Suela con tacos antiderrapantes",
    },
  },
  {
    name: "Herrajes",
    headline: "Ojalillos metálicos",
    description:
      "Ojalillos firmes que no ceden con la tensión de los cordones, para ajustar la bota tan firme como pida el camino.",
    origin: ORIGIN_NOT_CONFIRMED,
    image: {
      src: "/brand/detalles/herrajes.webp",
      alt: "Ojalillos metálicos y cordones de una bota de nubuck",
    },
  },
  {
    name: "Forro",
    headline: "Interior acolchado",
    description:
      "Forro interior y cuello acolchado que protegen el tobillo y hacen cómodas las jornadas largas.",
    origin: ORIGIN_NOT_CONFIRMED,
    image: {
      src: "/brand/detalles/forro.webp",
      alt: "Interior acolchado de una bota de cuero visto desde arriba",
    },
  },
];

/**
 * Productos de "Destacados de la temporada" (códigos de content/productos.ts).
 * PROVISIONAL: pasa a "Más vendidos" cuando el cliente indique cuáles son.
 */
export const featuredProductCodes = ["CME01", "CMH02", "CFG01", "CMN02", "CNG01"];

export interface ProductHotspot {
  /** Posición en porcentaje sobre la foto. */
  x: number;
  y: number;
  title: string;
  description: string;
}

export const featuredProductShowcase = {
  productCode: "CFG01",
  image: {
    src: "/brand/productos/cfg01-grande.webp",
    alt: "Bota de caña media en cuero Antique marrón miel junto a un bolso y un cinturón de cuero",
  },
  hotspots: [
    {
      x: 50,
      y: 38,
      title: "Ojalillos y cordones",
      description: "Ojalillos metálicos y cordones encerados para un ajuste firme.",
    },
    {
      x: 58,
      y: 30,
      title: "100% cuero",
      description: "Cuero vacuno natural con acabado liso y ligero efecto aceitado.",
    },
    {
      x: 20,
      y: 78,
      title: "Puntera reforzada",
      description: "Puntera con doble costura que protege la zona de más desgaste.",
    },
    {
      x: 68,
      y: 80,
      title: "Suela TR",
      description: "Flexible, antiderrapante y con tacón bajo integrado.",
    },
  ] satisfies ProductHotspot[],
};

export const communityImages: ImageAsset[] = [
  { src: "/brand/productos/cmn02.webp", alt: "Bota de nubuck camel" },
  { src: "/brand/detalles/forro.webp", alt: "Interior acolchado de una bota" },
  { src: "/brand/productos/cna01-cognac.webp", alt: "Bota cognac con cierre lateral" },
  { src: "/brand/detalles/suela.webp", alt: "Suela antiderrapante" },
  { src: "/brand/productos/cng02.webp", alt: "Bota urbana negra" },
  { src: "/brand/productos/cmh02.webp", alt: "Bota Crazy Horse marrón oliva" },
];

export type GalleryMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; posterUrl: string; alt: string };

/**
 * Galería "En el camino": 4 espacios (grande, vertical, chico, chico).
 * PROVISIONAL: hoy usa fotos de estudio de la campaña. Reemplazar por fotos o
 * video del producto en uso al aire libre (bosque, sendero, fogata, ruta).
 * Para poner un video: { kind: "video", src: "/brand/video/archivo.mp4", posterUrl: "...", alt: "..." }
 */
export const lifestyleGallery: [GalleryMedia, GalleryMedia, GalleryMedia, GalleryMedia] = [
  {
    kind: "image",
    src: "/brand/productos/cme01-frente.webp",
    alt: "Botín Summit de nubuck marrón visto de frente sobre una superficie de cuero",
  },
  {
    kind: "image",
    src: "/brand/fotos/botas-duo-vertical.webp",
    alt: "Bota de nubuck camel y bota de cuero cognac sobre retazos de cuero",
  },
  {
    kind: "image",
    src: "/brand/productos/cna01-cognac-frente.webp",
    alt: "Bota cognac de frente apoyada sobre un tronco",
  },
  {
    kind: "image",
    src: "/brand/fotos/botas-detalle-vertical.webp",
    alt: "Punteras de botas de cuero en tonos camel, cognac y marrón",
  },
];

export const brandStory = {
  title: "Una casa de cuero con espíritu de montaña",
  // PROVISIONAL: texto de marca de relleno. Reemplazar por la historia real del fundador.
  paragraphs: [
    "En La Mochilera creemos que una buena bota se reconoce con el tiempo: cuando el cuero toma la forma del pie y cada marca cuenta por dónde ha caminado.",
    "Por eso elegimos cueros naturales, costuras que aguantan y suelas pensadas para el terreno. Botas para quienes prefieren una sola pieza bien hecha a muchas de temporada.",
  ],
  // PROVISIONAL: la primera foto va a ser el retrato del fundador.
  images: [
    {
      src: "/brand/productos/cna01-cognac-espalda.webp",
      alt: "Bota de cuero cognac vista desde el talón sobre una mesa de trabajo",
    },
    {
      src: "/brand/fotos/botas-detalle-vertical.webp",
      alt: "Punteras de botas de cuero en tonos camel, cognac y marrón",
    },
  ] satisfies [ImageAsset, ImageAsset],
};
