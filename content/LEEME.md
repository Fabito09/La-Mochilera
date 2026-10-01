# Contenido editable

Todo lo que está en esta carpeta se puede cambiar **sin tocar el diseño**:
textos, fotos, productos, precios, tallas y datos de contacto. Las páginas
leen de acá y se actualizan solas.

Lo que hoy es relleno provisional está marcado con el comentario
`PROVISIONAL`. Para encontrarlo todo, buscar esa palabra en la carpeta.

## Qué archivo cambiar

| Quiero cambiar… | Archivo | Qué editar |
|-----------------|---------|------------|
| Un producto: nombre, precio, fotos, tallas, insignias | `productos.ts` | El bloque del producto (se busca por su código, p. ej. `CME01`) |
| Agregar un producto nuevo | `productos.ts` | Copiar un bloque completo, cambiar código, `slug` y datos |
| El precio de toda la campaña | `productos.ts` | `CAMPAIGN_PRICE` |
| Mostrar un precio anterior tachado | `productos.ts` | Agregar `compareAtPriceInColones: 59_900` al producto |
| El orden de "Más vendidos" | `productos.ts` | `bestSellerRank` (1 = el primero) |
| El video o la foto del inicio | `inicio.ts` | `heroContent` (`video.mp4`, `posterImageUrl`) |
| Título y texto del inicio | `inicio.ts` | `heroContent.title` y `description` |
| Fotos o video de la galería "En el camino" | `inicio.ts` | `lifestyleGallery` |
| Historia de la marca y foto del fundador | `inicio.ts` | `brandStory` |
| Origen de cada material | `inicio.ts` | `ORIGIN_NOT_CONFIRMED` o el campo `origin` de cada uno |
| Textos de pilares y materiales | `inicio.ts` | `brandPillars`, `materialComponents` |
| WhatsApp, Instagram, showroom, envíos | `marca.ts` | `brandInfo` |
| Barra de anuncio superior | `navegacion.ts` | `announcementMessage` |
| Menú, categorías y subcategorías | `navegacion.ts` | `shopCategories`, `mainLinks` |
| Textos de la tienda y banner promocional | `tienda.ts` | `catalogTexts`, `campaignPromoBanner` |
| Tabla de tallas y cómo medir el pie | `tallas.ts` | `sizeGuideTable`, `footMeasuringSteps` |
| Cuidados, garantía, envíos (ficha) | `ficha-producto.ts` | `careInstructions`, `warrantyText` |
| Reseñas de un producto | `ficha-producto.ts` | `productReviews` |
| Nuestra historia, cita y foto del fundador | `paginas/marca.ts` | `storyPage` |
| Artesanía: pasos del proceso y glosario de cueros | `paginas/marca.ts` | `craftsmanshipPage` |
| Garantía, envíos y devoluciones | `paginas/politicas.ts` | `warrantyPage`, `shippingPage` |
| Términos y condiciones, privacidad | `paginas/legal.ts` | `termsPage`, `privacyPage` |
| Guía de cuidado del cuero | `paginas/cuidado.ts` | `careGuidePage` |
| Preguntas frecuentes | `paginas/ayuda.ts` | `faqItems` |
| Textos de contacto y guía de tallas | `paginas/ayuda.ts` | `contactPage`, `sizeGuidePage` |
| Dirección y mapa del showroom | `marca.ts` | `brandInfo.showroom.address` y `mapUrl` |
| Artículos de la bitácora (agregar o editar) | `bitacora.ts` | `journalArticles` |
| Carrito, cuenta, búsqueda y página 404 | `paginas/utilitarias.ts` | El bloque de cada página |

## Tono de los textos

Todo el sitio le habla al cliente de **usted**, igual que el catálogo de la
marca. Nunca mezclar con "tú" ni con "vos".

| Sí (usted) | No (tú) | No (vos) |
|------------|---------|----------|
| Escríbanos | Escríbenos | Escribinos |
| Elija su talla | Elige tu talla | Elegí tu talla |
| Le ayudamos | Te ayudamos | Te ayudamos |

- Botones con verbo en infinitivo ("Ver la colección", "Comprar ahora") son
  neutros y se pueden usar.
- Evitar frases que asuman el género del lector: en vez de "mantenerle
  informado", escribir "enviarle novedades".

## Aviso de borrador

Las políticas y los textos legales muestran un aviso visible de "Borrador".
Cuando el cliente apruebe el texto definitivo, cambiar `isDraft: true` por
`isDraft: false` en esa página y el aviso desaparece. Los textos legales
deben revisarlos un abogado antes de publicar.

## Fotos y videos

1. Copiar el archivo a `public/brand/` (fotos en `fotos/` o `productos/`,
   videos en `video/`). Preferir WebP para fotos y MP4 comprimido para video.
2. Poner la ruta en el archivo de contenido, empezando en `/brand/…`
   (sin `public`). Ejemplo: `"/brand/video/hero.mp4"`.
3. Siempre completar el texto `alt`: describe la foto para quien no la ve y
   ayuda al posicionamiento en Google.

## Dominio del sitio

La dirección pública no va acá: se configura en `.env.local` con
`NEXT_PUBLIC_SITE_URL` (ver `.env.example` en la raíz).
