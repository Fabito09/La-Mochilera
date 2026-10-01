# La Mochilera — sitio web

Tienda y sitio de marca de artículos de cuero para montaña y aventura.

## Cómo correrlo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run lint
```

Para SEO en producción, copiar `.env.example` a `.env.local` y poner el dominio.

## Estructura

| Carpeta | Contenido |
|---------|-----------|
| `app/` | Páginas (App Router), `layout.tsx` y `globals.css` con los tokens de tema |
| `components/ui/` | Componentes base estilo shadcn (Button, hero, placeholders) |
| `components/layout/` | Piezas del sitio: header, mega menú, menú móvil, barra de anuncio, footer |
| `components/home/`, `components/catalog/`, `components/product/` | Secciones del inicio, del catálogo y de la ficha de producto |
| `content/` | **Contenido editable sin tocar el diseño**: productos, textos, fotos, contacto. Ver [content/LEEME.md](content/LEEME.md) |
| `hooks/` | Hooks de cliente (scroll, video de fondo) |
| `lib/` | Lógica: catálogo, filtros, rutas de la tienda, formato de precios |
| `docs/` | Planificación y lista de material requerido |
| `material-marca/` | Originales de la marca (no se suben a git) |

## Estado

- **Fase 1 — Planificación:** [docs/fase-1-planificacion.md](docs/fase-1-planificacion.md). Paleta, tipografía y logo aplicados desde la Guía de Marca.
- **Fase 2 — Hero:** listo con la foto de campaña como póster; falta el video.
- **Fase 3 — Inicio:** inicio corto tipo "lobby": portada, historia, materiales y contacto. Galería, producto interactivo, Instagram, newsletter y barra de envíos viven en sus páginas (historia, artesanía, contacto, bitácora y tienda). Donde falta material hay contenido provisional editable en `content/` (marcado `PROVISIONAL`).
- **Fase 4 — Catálogo y ficha de producto:** lista. Tienda con filtros, orden y "Cargar más" (`/tienda`), ficha con galería y zoom, tallas, guía de tallas y compra por WhatsApp (`/producto/…`).
- **Fase 5 — Páginas internas:** listas con textos provisionales: historia, artesanía, bitácora (3 artículos), guías de tallas y cuidado, garantía, envíos, FAQ, contacto, legales, búsqueda, carrito, cuenta y 404.
- **Fase 6 — Revisión final:** hecha. Accesibilidad y SEO 100 en Lighthouse, 0 violaciones de axe. Resultados y lista para publicar en [docs/fase-6-revision.md](docs/fase-6-revision.md).
- Material pendiente: [docs/material-requerido.md](docs/material-requerido.md).
