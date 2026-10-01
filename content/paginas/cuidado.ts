// GUÍA DE CUIDADO — consejos generales para cuero liso y nubuck.
// Los pasos básicos se comparten con la ficha de producto (content/ficha-producto.ts).

import { careInstructions } from "@/content/ficha-producto";
import type { InfoPageContent } from "@/lib/page-content";

export const careGuidePage: InfoPageContent = {
  eyebrow: "Ayuda",
  title: "Guía de cuidado del cuero",
  intro:
    "Con unos minutos de atención cada tanto, un par de cuero natural dura años y se ve mejor con el tiempo.",
  metaDescription:
    "Cómo limpiar, hidratar y guardar botas de cuero liso y nubuck para que duren años. Guía de cuidado de La Mochilera.",
  image: {
    src: "/brand/fotos/botas-detalle-vertical.webp",
    alt: "Punteras de botas de cuero en tonos camel, cognac y marrón",
  },
  sections: [
    {
      heading: "Lo básico, para todas las botas",
      bullets: careInstructions,
    },
    {
      heading: "Cuero liso: Napa, Antique y Duna",
      paragraphs: [
        "Son los cueros de superficie lisa y brillo suave. Agradecen una limpieza con paño húmedo y una capa fina de crema del mismo tono, repartida con movimientos circulares y lustrada al secar.",
      ],
      bullets: [
        "Limpie con un paño apenas húmedo, sin empapar el cuero.",
        "Aplique crema o cera en capas finas; es mejor poco y seguido que mucho de una vez.",
        "Lustre con un cepillo o paño suave para recuperar el brillo.",
      ],
    },
    {
      heading: "Cueros engrasados: Crazy Horse y Crazy honey",
      paragraphs: [
        "Tienen aceites y ceras en su interior, por eso cambian de tono al doblarse y rayarse. Esas marcas son parte de su encanto: se suavizan frotando con la mano o con un paño.",
      ],
      bullets: [
        "Para marcas leves, frote con los dedos: el calor reactiva los aceites.",
        "Cada cierto tiempo, aplique una cera o aceite para cuero engrasado.",
      ],
    },
    {
      heading: "Nubuck",
      paragraphs: [
        "El nubuck tiene una superficie aterciopelada que se cuida en seco. Evite las cremas comunes, que lo manchan y lo aplastan.",
      ],
      bullets: [
        "Cepille con un cepillo de goma o de crepé para levantar el pelo.",
        "Para manchas, use una goma especial para nubuck o gamuza.",
        "Proteja con un spray impermeabilizante específico antes de salir con lluvia.",
      ],
    },
    {
      heading: "Si se mojan",
      paragraphs: [
        "Retire el exceso de agua con un paño, rellénelas con papel para que conserven la forma y déjelas secar a temperatura ambiente. Nunca las acerque a una estufa, secadora o al sol directo: el calor reseca y agrieta el cuero.",
      ],
    },
  ],
};
