# Fase 6: Revisión final

Fecha: 30/09/2026. Build de producción (`next build` + `next start`), 42 URLs
del mapa del sitio más búsqueda, carrito, cuenta y 404.

## Resultados

### Lighthouse (celular, conexión 4G lenta simulada)

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | CLS | TBT |
|--------|:-----------:|:-------------:|:----------------:|:---:|:---:|:---:|
| Inicio | 89–90 | 100 | 100 | 100 | 0 | 20 ms |
| Tienda | 89–91 | 100 | 100 | 100 | 0 | 20 ms |
| Ficha de producto | 91–93 | 100 | 100 | 100 | 0 | 30 ms |
| Nuestra historia | 93 | 100 | 100 | 100 | 0 | 20 ms |

**Sobre el LCP:** Lighthouse estima 3.2–3.7 s en un celular lento simulado.
Medido sin simulación, la foto del hero aparece a los **186 ms**: pesa 23 KB en
AVIF y se pide con prioridad alta. La estimación está dominada por el
JavaScript base de React/Next (~220 KB), que no se puede reducir sin quitar
funciones. **Hay que volver a medir con PageSpeed Insights sobre el dominio
real**, porque el CDN del hosting cambia estos números.

### Accesibilidad (WCAG 2.1 AA)

- **axe-core: 0 violaciones** en 46 rutas × 2 tamaños (escritorio 1440 px y
  celular 360 px).
- Teclado: "Saltar al contenido" es lo primero al tabular. El mega menú abre
  con Enter y cierra con Escape devolviendo el foco. El menú móvil mantiene el
  foco adentro y cierra con Escape.
- Contraste del texto del hero sobre la foto (medido en píxeles, peor 2 % del
  fondo): título 6.7–7.9:1; descripción ≈ 4.9:1 estimado, porque se muestra
  al 85 % de opacidad (mínimo AA: 4.5:1). Revisar con el video real.
- Animaciones: respetan "reducir movimiento" del sistema.

### SEO

- Título único y descripción de 120–155 caracteres en las 42 páginas.
- `sitemap.xml` y `robots.txt` generados a partir del contenido (un producto
  o artículo nuevo entra solo).
- Datos estructurados: tienda (ShoeStore), producto, migas de pan, artículos
  y preguntas frecuentes.
- Vista previa al compartir (Open Graph) con la foto de campaña.
- `lang="es"` y un único `h1` por página.

### Celular

- Ninguna página se desborda a 360 px de ancho.
- Menú a pantalla completa, filtros en panel lateral, botones de talla y
  compra de al menos 44 px.

## Cambios hechos en esta fase

| Cambio | Motivo |
|--------|--------|
| `sitemap.ts`, `robots.ts` | Indexación en Google |
| Datos estructurados de tienda, migas de pan y artículos | Resultados enriquecidos |
| Open Graph por defecto | Vista previa al compartir en WhatsApp e Instagram |
| Enlace "Saltar al contenido" | WCAG 2.4.1 |
| Anuncio y botón de WhatsApp como zonas (`aside`) | Navegación con lector de pantalla |
| Carrusel de materiales enfocable con teclado | WCAG 2.1.1 (era "serio" en axe) |
| Títulos intermedios en tienda, bitácora, búsqueda y guía de tallas | Orden de encabezados |
| `priority` → `fetchPriority="high"` en imágenes principales | `priority` quedó obsoleto en Next 16 |
| Primeras 2 tarjetas de la tienda sin carga diferida | Eran el LCP de la tienda |
| Imágenes en AVIF | ~20 % menos peso que WebP |
| Logos de 36 KB a 12 KB | Se mostraban a 165 px con archivos de 1200 px |
| `LazyMotion` en framer-motion | Menos JavaScript de animación |
| Descripciones de producto más cortas | La CFG01 medía 183 caracteres |

Probado y descartado: `experimental.inlineCss` no dio una mejora medible, así
que no se dejó activado.

## Antes de publicar

**Técnico**
- [ ] Definir dominio y crear `.env.local` con `NEXT_PUBLIC_SITE_URL` (hoy el
      mapa del sitio y los datos estructurados apuntan a `localhost`).
- [ ] Publicar en Vercel (recomendado) y medir con PageSpeed Insights.
- [ ] Registrar el sitio en Google Search Console y enviar `sitemap.xml`.
- [ ] Elegir e integrar analítica (GA4, Meta Pixel u otra) y newsletter.
- [ ] Definir plataforma de e-commerce y pasarela de pago (hoy la compra es
      por WhatsApp).

**Contenido del cliente** (buscar `PROVISIONAL` en `content/`)
- [ ] Video del hero y fotos del producto en uso al aire libre.
- [ ] Fotos originales por producto, sin el texto "Código:".
- [ ] Historia y nombre del fundador, dirección del showroom.
- [ ] Políticas de garantía, envíos y devoluciones; luego `isDraft: false`.
- [ ] Revisión legal de términos y privacidad; luego `isDraft: false`.
- [ ] Las 8 dudas de [catalogo-campana-1.md](catalogo-campana-1.md), sobre todo
      tallas por modelo y el número de WhatsApp.
- [ ] Archivo de la fuente VINCENTE con licencia web.
