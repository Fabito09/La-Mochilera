# Contenido editable

Todo lo que está en esta carpeta se puede cambiar **sin tocar el diseño**:
textos, fotos, productos, precios, tallas y datos de contacto. Las páginas
leen de acá y se actualizan solas.

Lo que hoy es relleno provisional está marcado con el comentario
`PROVISIONAL`. Para encontrarlo todo, buscar esa palabra en la carpeta.

## Productos, precios, tallas, inventario y pedidos

Ya no están en esta carpeta: los manejan los dueños desde el **panel de
administración**. Al guardar un cambio, el sitio se actualiza solo en unos
segundos.

El panel está escondido: solo se abre con el **enlace secreto**, que se
obtiene con `npm run enlace-panel` y se manda por aparte a cada dueño. Sin
ese enlace, `/gestion-mochilera` responde "página no encontrada". El
navegador que usó el enlace lo recuerda un año; si borran los datos del
navegador, hay que volver a abrir el enlace.

- **Productos:** nombre, precio (vacío = "Consultar precio"), precio anterior
  tachado, fotos (la primera es la principal), colores, materiales,
  etiquetas, orden en "Más vendidos" y "Mostrar en la tienda".
- **Tallas e inventario:** una fila por talla con sus unidades. 0 = agotada
  (se ve tachada y no se puede elegir); vacío = no se lleva el control.
- **Pedidos:** cliente, teléfono, dirección de envío, productos, estado y
  número de guía. El total se calcula solo.
- **Clientes:** las cuentas que la gente crea en el sitio (`/cuenta`), con
  sus datos de envío. Un cliente solo ve su propia cuenta y sus pedidos; nunca
  entra al panel. Para que un pedido le aparezca en "Mi cuenta", elegir su
  cuenta en el campo "Cuenta del cliente" del pedido.
- **Dueños:** solo ellos entran; un dueño agrega a los demás.

`productos.ts` quedó solo como respaldo de la carga inicial
(`BACKEND/seed.ts`); cambiarlo ya no cambia el sitio.

## Qué archivo cambiar

| Quiero cambiar… | Archivo | Qué editar |
|-----------------|---------|------------|
| El video o la foto del inicio | `inicio.ts` | `heroContent`: `video.landscape` (computadora), `video.portrait` (celular), `posterImageUrl` |
| Título y texto del inicio | `inicio.ts` | `heroContent.title` y `description` |
| Fotos o video de la galería "En el camino" | `inicio.ts` | `lifestyleGallery` |
| Historia del inicio: video y foto | `inicio.ts` | `brandStory` (`primaryMedia`, `secondaryImage`) |
| Origen de cada material | `inicio.ts` | `ORIGIN_NOT_CONFIRMED` o el campo `origin` de cada uno |
| Textos de pilares y materiales | `inicio.ts` | `brandPillars`, `materialComponents` |
| WhatsApp, Instagram, showroom, envíos | `marca.ts` | `brandInfo` |
| Menú, categorías y subcategorías | `navegacion.ts` | `shopCategories`, `mainLinks` |
| Textos de la tienda | `tienda.ts` | `catalogTexts` |
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
| Carrito, búsqueda y página 404 | `paginas/utilitarias.ts` | El bloque de cada página |
| Textos de "Mi cuenta" y del registro | `paginas/cuenta.ts` | `accountPage`, `registerPage`, `accountErrors` |

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
   Los videos originales pesan cientos de MB: hay que comprimirlos (H.264, sin
   audio, unos 5 MB) antes de usarlos. Para la portada, una versión horizontal
   y una vertical, así cada pantalla descarga solo la suya.
2. Poner la ruta en el archivo de contenido, empezando en `/brand/…`
   (sin `public`). Ejemplo: `"/brand/video/hero.mp4"`.
3. Siempre completar el texto `alt`: describe la foto para quien no la ve y
   ayuda al posicionamiento en Google.

## Dominio del sitio

La dirección pública no va acá: se configura en `.env.local` con
`NEXT_PUBLIC_SITE_URL` (ver `.env.example` en la raíz).
