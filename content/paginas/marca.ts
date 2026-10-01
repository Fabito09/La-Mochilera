// PÁGINAS DE MARCA — Nuestra historia y Artesanía.
//
// PROVISIONAL: textos de relleno con el tono de la marca, sin datos reales
// del fundador, fechas ni lugares. Reemplazar cuando el cliente envíe su
// historia y confirme cómo y dónde se fabrican las botas.

import type { ImageAsset, InfoPageContent } from "@/lib/page-content";

export const storyPage: InfoPageContent & {
  founder: { name: string; role: string; quote: string; image: ImageAsset };
} = {
  eyebrow: "Nuestra historia",
  title: "Una casa de cuero con espíritu de montaña",
  intro:
    "La Mochilera nació de una idea simple: hacer botas que acompañen de verdad, en la ciudad y en el sendero, y que duren muchos años.",
  metaDescription:
    "La historia de La Mochilera · Casa de Cuero: botas de cuero natural pensadas para quienes llevan la montaña en cada paso.",
  image: {
    src: "/brand/productos/cme01-frente.webp",
    alt: "Botín Summit de nubuck marrón visto de frente",
  },
  sections: [
    {
      heading: "Cómo empezó",
      paragraphs: [
        "Todo empezó con la búsqueda de un buen par de botas: uno que aguantara el barro de la montaña, se sintiera cómodo en el día a día y no hubiera que reemplazar cada temporada.",
        "De esa búsqueda nació La Mochilera, una casa de cuero dedicada a un solo oficio: hacer botas honestas, con materiales nobles y detalles bien resueltos.",
      ],
    },
    {
      heading: "Lo que nos mueve",
      paragraphs: [
        "Creemos que una buena bota se reconoce con el tiempo. Por eso elegimos cuero vacuno 100% natural, costuras que aguantan y suelas pensadas para el terreno.",
        "Preferimos una sola pieza bien hecha a muchas de temporada. Es nuestra forma de cuidar el bolsillo de quien nos elige y también el entorno que tanto disfrutamos recorrer.",
      ],
    },
  ],
  founder: {
    name: "", // PROVISIONAL: nombre del fundador. Vacío = se muestra solo el cargo.
    role: "Fundador de La Mochilera",
    quote:
      "Quería botas que me acompañaran a todas partes y que con los años se vieran mejor, no peor. Eso es lo que hacemos.",
    image: {
      src: "/brand/productos/cna01-cognac-espalda.webp",
      alt: "Bota de cuero cognac sobre una mesa de trabajo",
    },
  },
};

export interface ProcessStep {
  title: string;
  description: string;
}

export const craftsmanshipPage: InfoPageContent & { processSteps: ProcessStep[] } = {
  eyebrow: "Artesanía y materiales",
  title: "Así se construye una bota que dura",
  intro:
    "Cada par reúne cuero natural, costuras reforzadas y una suela pensada para el terreno. Esto es lo que hay detrás.",
  metaDescription:
    "Proceso, materiales y tipos de cuero de las botas La Mochilera: Crazy Horse, Nubuck, Napa, Antique y más.",
  image: {
    src: "/brand/detalles/cuero-crazy-horse.webp",
    alt: "Puntera de cuero Crazy Horse con doble costura y marcas naturales",
  },
  // PROVISIONAL: proceso típico de una bota de cuero; confirmar con el cliente.
  processSteps: [
    {
      title: "Selección del cuero",
      description: "Se elige cada piel por su grosor, su flexibilidad y la uniformidad del acabado.",
    },
    {
      title: "Corte",
      description: "Las piezas se cortan siguiendo la dirección de la fibra, para que el cuero trabaje bien al caminar.",
    },
    {
      title: "Aparado",
      description: "Se unen las piezas con doble costura en las zonas de más esfuerzo: talón, puntera y laterales.",
    },
    {
      title: "Montado",
      description: "El corte se ajusta sobre la horma y toma la forma definitiva de la bota.",
    },
    {
      title: "Suela",
      description: "Se fija la suela antideslizante y el tacón, y se revisa que todo quede firme.",
    },
    {
      title: "Acabado",
      description: "Se limpia, se nutre el cuero y se revisa cada detalle antes de que el par salga de casa.",
    },
  ],
  sections: [
    {
      heading: "Crazy Horse",
      paragraphs: [
        "Cuero engrasado de aspecto envejecido. Cambia de tono al doblarse y rayarse, y con el uso toma una pátina única en cada par.",
      ],
    },
    {
      heading: "Nubuck",
      paragraphs: [
        "Cuero lijado en su cara exterior, de tacto aterciopelado. En su versión encerada suma resistencia al agua y a las manchas.",
      ],
    },
    {
      heading: "Napa",
      paragraphs: [
        "Cuero liso, suave y de brillo discreto. Se lustra con facilidad y es ideal para un estilo más urbano.",
      ],
    },
    {
      heading: "Antique, Duna y Crazy honey",
      paragraphs: [
        "Acabados de tonos cálidos, entre la miel y el cognac, con un ligero efecto aceitado que resalta con el uso.",
      ],
    },
  ],
};
