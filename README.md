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

Es una sola aplicación Next.js (un solo proyecto en Vercel): el sitio y el
panel de administración viven juntos. El código está ordenado en dos carpetas;
`app/`, `public/` y los archivos de configuración se quedan en la raíz porque
Next.js lo exige.

| Carpeta | Contenido |
|---------|-----------|
| `FRONTEND/` | Lo que ve el cliente en el sitio |
| `FRONTEND/components/` | Piezas visuales: `ui/` (base estilo shadcn), `layout/` (header, menús, footer), `home/`, `catalog/`, `product/`, `page/` |
| `FRONTEND/content/` | **Textos y fotos editables sin tocar el diseño**. Ver [FRONTEND/content/LEEME.md](FRONTEND/content/LEEME.md) |
| `FRONTEND/hooks/` | Hooks de cliente (scroll, video de fondo) |
| `FRONTEND/lib/` | Lógica del sitio: catálogo, filtros, rutas de la tienda, formato de precios |
| `BACKEND/` | Panel de administración (Payload) y base de datos |
| `BACKEND/payload.config.ts` | Configuración del panel: base de datos Neon, fotos en Vercel Blob, ruta `/gestion-mochilera` |
| `BACKEND/collections/` | Qué guarda el panel: productos (con inventario por talla), pedidos, clientes (cuentas del sitio), fotos y dueños |
| `BACKEND/access.ts` | Permisos: dueños (panel) y clientes (solo su cuenta y sus pedidos) |
| `BACKEND/components/` | Piezas del panel: barra de secciones, pestañas por categoría, logo |
| `BACKEND/migrations/` | Cambios de estructura de la base de datos (`npm run migrate`) |
| `BACKEND/catalog-data.ts` | Cómo el sitio lee los productos de la base de datos |
| `BACKEND/seed.ts` | Carga inicial de productos (`npx payload run BACKEND/seed.ts`) |
| `app/` | Rutas: `(sitio)/` las páginas públicas, `(payload)/` el panel; `globals.css` con los tokens de tema |
| `public/` | Fotos, videos y logos de la marca |
| `docs/` | Planificación y lista de material requerido |
| `material-marca/` | Originales de la marca (no se suben a git) |

## Estado

- **Fase 1 — Planificación:** [docs/fase-1-planificacion.md](docs/fase-1-planificacion.md). Paleta, tipografía y logo aplicados desde la Guía de Marca.
- **Fase 2 — Hero:** listo con la foto de campaña como póster; falta el video.
- **Fase 3 — Inicio:** inicio corto tipo "lobby": portada, historia, materiales y contacto. Galería, producto interactivo, Instagram y barra de envíos viven en sus páginas (historia, artesanía, contacto y tienda). Donde falta material hay contenido provisional editable en `content/` (marcado `PROVISIONAL`).
- **Fase 4 — Catálogo y ficha de producto:** lista. Tienda con filtros, orden y "Cargar más" (`/tienda`), ficha con galería y zoom, tallas, guía de tallas y compra por WhatsApp (`/producto/…`).
- **Fase 5 — Páginas internas:** listas con textos provisionales: historia, artesanía, guías de tallas y cuidado, garantía, envíos, FAQ, contacto, legales, búsqueda, carrito, cuenta y 404.
- **Fase 6 — Revisión final:** hecha. Accesibilidad y SEO 100 en Lighthouse, 0 violaciones de axe. Resultados y lista para publicar en [docs/fase-6-revision.md](docs/fase-6-revision.md).
- Material pendiente: [docs/material-requerido.md](docs/material-requerido.md).
