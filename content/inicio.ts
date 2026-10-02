// INICIO — textos, fotos y video de cada sección de la página principal.
//
// Para cambiar un texto o una foto se edita solo este archivo; el diseño no
// se toca. Lo marcado con PROVISIONAL es contenido de relleno hecho con el
// material de marca disponible, pensado para reemplazarse cuando llegue el
// definitivo (buscar "PROVISIONAL" para encontrarlo todo).

import type { ImageAsset } from "@/lib/page-content";

/**
 * Velocidad de todos los videos del sitio: 1 = normal, 0.8 = 20 % más lento
 * (efecto de cámara lenta suave). Valores entre 0.7 y 1 se ven fluidos.
 */
export const VIDEO_PLAYBACK_RATE = 0.8;

export interface HeroContent {
  title: string;
  description: string;
  /** Fotograma de portada: se ve en móvil y mientras carga el video. */
  posterImageUrl: string;
  /**
   * Video propio de la marca, en MP4: uno horizontal (computadora) y uno
   * vertical (celular). Vacío = se muestra solo la foto de portada.
   */
  video: {
    landscape: string;
    portrait: string;
  };
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export const heroContent: HeroContent = {
  title: "Hecho para durar. Hecho para el camino.",
  description:
    "Botas de cuero vacuno, diseñadas para los que llevan la montaña en cada paso.",
  posterImageUrl: "/brand/fotos/portada-poster.webp",
  // "VIDEO WEB 1" (taller), recortado sin el logo impreso.
  video: {
    landscape: "/brand/video/portada-horizontal.mp4",
    portrait: "/brand/video/portada-vertical.mp4",
  },
  primaryCta: { text: "Ver la colección", href: "/tienda" },
  secondaryCta: { text: "Nuestra historia", href: "/nuestra-historia" },
};

export const brandPillarsSection = {
  eyebrow: "Materiales",
  title: "Lo que usamos en cada par",
  description: "Cuero vacuno, costuras reforzadas y suelas pensadas para el terreno.",
};

export interface BrandPillar {
  title: string;
  description: string;
  image: ImageAsset;
}

export const brandPillars: BrandPillar[] = [
  {
    title: "Cuero vacuno",
    description:
      "Crazy Horse, Nubuck, Napa y Antique. Cada acabado envejece distinto y toma la forma de quien lo usa.",
    image: {
      src: "/brand/detalles/cuero-crazy-horse.webp",
      alt: "Puntera de una bota en cuero Crazy Horse con las marcas propias del acabado envejecido",
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
    headline: "Vacuno, en cinco acabados",
    description:
      "Trabajamos cinco acabados: Crazy Horse, Nubuck, Napa, Antique y Duna. Todos respiran, se adaptan al pie y ganan carácter con el uso.",
    origin: ORIGIN_NOT_CONFIRMED,
    image: {
      src: "/brand/detalles/cuero-crazy-horse.webp",
      alt: "Superficie de cuero Crazy Horse con variaciones de tono propias del acabado",
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
 * El espacio vertical lleva el video "VIDEO WEB 2" (aire libre).
 * PROVISIONAL: los otros tres usan fotos de estudio de la campaña. Reemplazar
 * por fotos del producto en uso al aire libre (bosque, sendero, fogata, ruta).
 * Para poner un video: { kind: "video", src: "/brand/video/archivo.mp4", posterUrl: "...", alt: "..." }
 */
export const lifestyleGallery: [GalleryMedia, GalleryMedia, GalleryMedia, GalleryMedia] = [
  {
    kind: "image",
    src: "/brand/productos/cme01-frente.webp",
    alt: "Botín Summit de nubuck marrón visto de frente sobre una superficie de cuero",
  },
  {
    kind: "video",
    src: "/brand/video/historia-vertical.mp4",
    posterUrl: "/brand/fotos/historia-poster.webp",
    alt: "Persona atándose botas de cuero cognac sobre un cajón de madera en un jardín y saliendo a caminar",
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
    "Por eso elegimos cuero vacuno, costuras que aguantan y suelas pensadas para el terreno. Botas para quienes prefieren una sola pieza bien hecha a muchas de temporada.",
  ],
  // Video "VIDEO WEB 2" (aire libre), recortado sin el logo impreso.
  primaryMedia: {
    kind: "video",
    src: "/brand/video/historia-vertical.mp4",
    posterUrl: "/brand/fotos/historia-poster.webp",
    alt: "Persona atándose botas de cuero cognac sobre un cajón de madera en un jardín y saliendo a caminar",
  } satisfies GalleryMedia,
  secondaryImage: {
    src: "/brand/fotos/botas-detalle-vertical.webp",
    alt: "Punteras de botas de cuero en tonos camel, cognac y marrón",
  } satisfies ImageAsset,
};

/**
 * Cierre del inicio: recrea la última página del catálogo "Campaña 1 | 2026"
 * ("Contáctenos" sobre fondo de botas). Los datos salen de content/marca.ts.
 */
export const homeContact = {
  title: "Contáctenos",
  // PROVISIONAL: foto de la misma sesión. Si el cliente envía el original del
  // fondo del catálogo, reemplazar src y alt.
  backgroundImage: {
    src: "/brand/fotos/botas-duo-horizontal.webp",
    alt: "",
  },
  whatsappMessage: "Hola, quiero realizar una compra.",
};
