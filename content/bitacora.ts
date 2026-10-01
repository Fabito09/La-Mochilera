// BITÁCORA — artículos del blog. Cada artículo tiene su página en
// /bitacora/<slug> y aparece en el inicio y en /bitacora.
// Para publicar uno nuevo, copiar un bloque y cambiar sus datos.

import type { ContentSection, ImageAsset } from "@/lib/page-content";

export interface JournalArticle {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  /** AAAA-MM-DD */
  publishedOn: string;
  image: ImageAsset;
  sections: ContentSection[];
}

export const journalPage = {
  eyebrow: "Bitácora",
  title: "Historias, cuidados y guías",
  intro: "Todo lo que aprendimos sobre el cuero, las botas y el camino, contado sin vueltas.",
  metaDescription:
    "Bitácora de La Mochilera: guías de cuidado del cuero, tipos de cuero y consejos para elegir sus botas.",
};

// PROVISIONAL: fechas de publicación de referencia.
export const journalArticles: JournalArticle[] = [
  {
    slug: "como-cuidar-botas-de-cuero",
    category: "Cuidado",
    title: "Cómo cuidar sus botas de cuero",
    excerpt: "Limpieza, hidratación y guardado: tres hábitos que duplican la vida de una bota.",
    publishedOn: "2026-02-10",
    image: {
      src: "/brand/fotos/botas-detalle-vertical.webp",
      alt: "Punteras de tres botas de cuero en tonos camel, cognac y marrón",
    },
    sections: [
      {
        heading: "1. Limpieza: poco y seguido",
        paragraphs: [
          "El polvo y el barro seco resecan el cuero. Un cepillado rápido después de cada uso evita que la suciedad se meta en los poros y lo agriete con el tiempo.",
          "Para el barro, espere a que seque y retírelo con el cepillo. Si queda alguna marca, pase un paño apenas húmedo.",
        ],
      },
      {
        heading: "2. Hidratación: el cuero también tiene sed",
        paragraphs: [
          "El cuero natural pierde sus aceites con el uso. Cada uno o dos meses, aplique una capa fina de crema o cera del mismo tono y lustre al secar.",
          "El nubuck es la excepción: se cuida en seco, con cepillo de goma y un spray protector específico.",
        ],
      },
      {
        heading: "3. Guardado: forma y aire",
        paragraphs: [
          "Guárdelas en un lugar ventilado, nunca en bolsas plásticas cerradas. Unas hormas de madera o papel dentro ayudan a conservar la forma y absorben la humedad.",
        ],
      },
      {
        heading: "Lo que nunca hay que hacer",
        bullets: [
          "Secarlas junto a una estufa, con secadora o al sol directo.",
          "Usar detergentes o productos con alcohol.",
          "Aplicar crema común sobre nubuck.",
        ],
      },
    ],
  },
  {
    slug: "tipos-de-cuero",
    category: "Materiales",
    title: "Crazy Horse, Nubuck y Napa: conozca los cueros",
    excerpt: "Qué distingue a cada acabado y cuál conviene según el uso que le dará.",
    publishedOn: "2026-02-24",
    image: {
      src: "/brand/fotos/botas-duo-horizontal.webp",
      alt: "Cuatro botas de cuero en distintos acabados sobre retazos de cuero",
    },
    sections: [
      {
        heading: "Crazy Horse: el que cuenta historias",
        paragraphs: [
          "Es un cuero engrasado que cambia de tono cuando se dobla o se raya. Cada marca queda como un registro del camino, y con los años desarrolla una pátina única. Ideal para quien busca un par con carácter y uso intenso.",
        ],
      },
      {
        heading: "Nubuck: suave y resistente",
        paragraphs: [
          "Se obtiene lijando la cara exterior de la piel, lo que le da un tacto aterciopelado. La versión encerada suma protección frente al agua. Queda muy bien en tonos camel y marrón, y pide cuidado en seco.",
        ],
      },
      {
        heading: "Napa: el más urbano",
        paragraphs: [
          "Liso, suave y de brillo discreto. Se limpia y se lustra con facilidad, por eso es el preferido para un estilo más formal o de ciudad.",
        ],
      },
      {
        heading: "¿Cuál elegir?",
        bullets: [
          "Para montaña y uso rudo: Crazy Horse.",
          "Para un look casual y cálido: Nubuck o Antique.",
          "Para ciudad y oficina: Napa.",
        ],
      },
    ],
  },
  {
    slug: "como-medir-su-pie",
    category: "Guía",
    title: "Cómo medir su pie antes de comprar",
    excerpt: "Las botas de cuero suelen calzar una talla más grande. Le explicamos cómo acertar.",
    publishedOn: "2026-03-05",
    image: {
      src: "/brand/detalles/herrajes.webp",
      alt: "Bota de nubuck con cordones sueltos",
    },
    sections: [
      {
        heading: "Por qué conviene medir",
        paragraphs: [
          "Por su horma, las botas de cuero calzan más grandes que un zapato común: un botín talla 40 puede equivaler a un 41 de otro estilo. Medir el pie evita cambios y le asegura comodidad desde el primer día.",
        ],
      },
      {
        heading: "Paso a paso",
        bullets: [
          "Hágalo al final del día, cuando el pie está un poco más hinchado.",
          "Colóquese de pie junto a una pared, con el talón apoyado en ella.",
          "Marque en el suelo el punto donde llega su dedo más largo.",
          "Mida en línea recta del talón a esa marca, en centímetros.",
          "Repita con el otro pie y quédese con la medida mayor.",
        ],
      },
      {
        heading: "Y después",
        paragraphs: [
          "Compare su medida con nuestra guía de tallas. Si queda entre dos tallas, o usa medias gruesas para la montaña, escríbanos y le recomendamos la mejor opción.",
        ],
      },
    ],
  },
];

export function findArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((article) => article.slug === slug);
}

export function articleHref(article: JournalArticle): string {
  return `/bitacora/${article.slug}`;
}
