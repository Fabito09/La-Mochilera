// Forma común de las páginas de contenido (historia, políticas, guías).
// Los textos viven en content/paginas/.

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface ContentSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface InfoPageContent {
  eyebrow: string;
  title: string;
  intro: string;
  /** Descripción para Google (hasta ~155 caracteres). */
  metaDescription: string;
  /** true = muestra el aviso de borrador pendiente de confirmación. */
  isDraft?: boolean;
  image?: ImageAsset;
  sections: ContentSection[];
}

/** Título y descripción para Google a partir del contenido de la página. */
export function pageMetadata(content: { title: string; metaDescription: string }) {
  return { title: content.title, description: content.metaDescription };
}
