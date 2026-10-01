# La Mochilera — Fase 1: Planificación

Estado: **en curso**. Paleta, tipografía y logo definidos a partir de la Guía
de Marca. Fases 2 (hero) y 3 (inicio) implementadas con el material recibido.
Lo que falta está en [material-requerido.md](material-requerido.md) y las dudas
del catálogo en [catalogo-campana-1.md](catalogo-campana-1.md).

---

## 1. Concepto: la fusión

> La calidez y el estilo de vida de **Bradley Mountain** + la emoción
> cinematográfica de **Turcani** + la autoridad artesanal de **Red Wing
> Heritage** = una marca que se siente premium, auténtica, aventurera y hecha
> para durar.

La idea central: **la pieza de cuero como compañera de viaje que acumula
historias**. El cuero envejece, toma pátina y guarda las marcas del camino.
Eso une las tres referencias: el oficio (cómo se hace), la aventura (dónde se
usa) y la durabilidad (cuánto dura).

### Propuestas de mensaje central / tagline

| # | Tagline | Qué transmite |
|---|---------|---------------|
| A | **Hecho para durar. Hecho para el camino.** | Durabilidad + aventura, directo y formal. |
| B | **Cuero con memoria.** | El producto guarda las historias de quien lo usa; muy evocador y breve. |
| C | **Del taller a la montaña.** | El recorrido completo: artesanía de origen y uso real en exteriores. |

### Tres razones para elegirnos

1. **Hecho a mano por artesanos.** Cada pieza pasa por manos expertas, no por
   una línea de producción. Se muestra con fotografía del taller y del proceso.
2. **Materiales nobles con origen conocido.** Cuero, costuras, suelas y herrajes
   elegidos uno por uno; el sitio explica de dónde viene cada componente y por
   qué es el mejor.
3. **Una pieza para toda la vida, no para una temporada.** Garantía,
   reparaciones y productos de cuidado: durabilidad como la forma más honesta
   de sostenibilidad.

---

## 2. Moodboard descrito

Todo se construye con **material propio de la marca**. Las referencias solo
aportan dirección.

- **Luz:** natural, cálida, de hora dorada o de interior con ventana. Nada de
  flash duro ni fondos blancos como regla (el blanco queda para fichas de
  producto).
- **Escenarios:** sendero, bosque, cabaña, fogata, carretera, taller.
- **Detalle:** macros de costura, borde del cuero, grano, herrajes, suela.
  Transmiten calidad mejor que cualquier texto.
- **Personas:** en uso real, en movimiento, sin poses de catálogo.
- **Texturas de apoyo (sutiles):** madera, cuero, papel. Como fondos de
  sección de baja opacidad, nunca protagonistas.
- **Ritmo de video (inspiración Turcani):** planos largos y pausados, encuadres
  abiertos de camino y paisaje, cortes a detalles del producto en uso.
- **Nombres de color evocadores** para variantes de producto (p. ej. "Roble",
  "Tabaco", "Bosque"), definidos con los colores reales de cada pieza.

---

## 3. Mapa del sitio

```
Inicio
├── Tienda
│   ├── Botas            (montaña · trabajo · botines)
│   ├── Chaquetas        (cuero · chalecos)
│   ├── Accesorios       (mochilas · cinturones · billeteras · guantes)
│   └── Cuidado del cuero (ceras y cremas · kits)
│       └── Ficha de producto
├── Nuestra historia
├── Artesanía y materiales
├── Bitácora (journal)
│   └── Artículo
├── Guía de tallas
├── Guía de cuidado
├── Garantía y reparaciones
├── Contacto y puntos de venta
├── Preguntas frecuentes
├── Carrito → Checkout
└── Legales (términos · privacidad · envíos y devoluciones)
```

Las rutas y textos de navegación viven en un solo archivo
(`lib/site-navigation.ts`), así cambiar idioma o slugs es un único cambio.

---

## 4. Wireframes

### 4.1 Inicio

```
┌──────────────────────────────────────────────────────────────┐
│ 1  BARRA DE ANUNCIO  "Envío gratis en compras superiores a…" │
├──────────────────────────────────────────────────────────────┤
│ 2  [LOGO]   Tienda▾ Historia Artesanía Bitácora Contacto  🔍👤🛒 [Comprar] │
│    ░░░░░░░░░░░░░ VIDEO PROPIO A PANTALLA COMPLETA ░░░░░░░░░░░ │
│    ░  Título grande en serif                                ░ │
│    ░  Descripción breve                                     ░ │
│    ░  [Ver la colección]  [Nuestra historia]                ░ │
│    ░                     Descubrir ↓                  [❚❚]  ░ │
├──────────────────────────────────────────────────────────────┤
│ 3  PILARES   [foto] Hecho a mano │ [foto] Garantía │ [foto] Dura │
├──────────────────────────────────────────────────────────────┤
│ 4  CATEGORÍAS  [Botas] [Chaquetas] [Accesorios] [Cuidado]     │
├──────────────────────────────────────────────────────────────┤
│ 5  MÁS VENDIDOS  ▢ ▢ ▢ ▢  (tarjetas con insignias)  →        │
├──────────────────────────────────────────────────────────────┤
│ 6  ARTESANÍA Y MATERIALES  ◀ [Cuero][Costura][Suela][Herraje][Forro] ▶ │
├──────────────────────────────────────────────────────────────┤
│ 7  PRODUCTO DESTACADO  [foto grande con ● hotspots] │ precio, CTA │
├──────────────────────────────────────────────────────────────┤
│ 8  ESTILO DE VIDA  galería asimétrica / video secundario      │
├──────────────────────────────────────────────────────────────┤
│ 9  HISTORIA  [foto del fundador] │ texto + "Conocer la historia" │
├──────────────────────────────────────────────────────────────┤
│ 10 CONFIANZA  🚚 Envío │ ↩ Devoluciones │ 🛡 Garantía │ 📦 Entrega │
├──────────────────────────────────────────────────────────────┤
│ 11 BITÁCORA  ▢ artículo  ▢ artículo  ▢ artículo               │
├──────────────────────────────────────────────────────────────┤
│ 12 COMUNIDAD / INSTAGRAM  ▫▫▫▫▫▫                              │
├──────────────────────────────────────────────────────────────┤
│ 13 NEWSLETTER  "Historias del camino"  [correo] [Suscribirme] │
├──────────────────────────────────────────────────────────────┤
│ 14 FOOTER  Tienda · Ayuda (tallas, cuidado, reparaciones,     │
│            garantía, FAQ) · Marca · Contacto · redes · legales │
└──────────────────────────────────────────────────────────────┘
```

**Hero en móvil:** póster fijo (sin video), título en 3–4 líneas, botones
apilados, menú hamburguesa → panel a pantalla completa con categorías, enlaces,
cuenta y carrito.

### 4.2 Ficha de producto

```
┌───────────────────────────────┬──────────────────────────────┐
│  GALERÍA GRANDE con zoom      │  Insignias: Nuevo · Hecho a mano │
│  (+ video si existe)          │  Nombre del producto (serif)  │
│                               │  Precio                       │
│  ▫ ▫ ▫ ▫ miniaturas           │  Color: ● Roble ● Tabaco      │
│                               │  Talla: [38][39][40]… Guía ↗  │
│                               │  [ Añadir al carrito ]        │
│                               │  🚚 Envío · ↩ Devol. · 🛡 Garantía │
│                               │  [WhatsApp: consulta rápida]  │
├───────────────────────────────┴──────────────────────────────┤
│  Acordeón: Materiales y construcción · Cuidado · Garantía    │
├──────────────────────────────────────────────────────────────┤
│  Reseñas ★★★★★                                               │
├──────────────────────────────────────────────────────────────┤
│  Productos relacionados ▢ ▢ ▢ ▢                              │
└──────────────────────────────────────────────────────────────┘
```

En móvil la galería pasa a carrusel deslizable y el botón "Añadir al carrito"
queda fijo abajo.

---

## 5. Paleta (definida desde la Guía de Marca)

| Rol | Color | Token CSS | Contraste |
|-----|-------|-----------|-----------|
| Fondo general | `#f6f3e4` crema | `--background` | — |
| Texto | `#3c240f` café oscuro | `--foreground` | 13:1 sobre crema |
| Texto secundario | `#614b32` café | `--muted-foreground` | 7.4:1 sobre crema |
| Superficie alterna | `#e6dec8` beige | `--muted`, `--border` | — |
| Botón principal / secciones oscuras / footer | `#2a321b` verde bosque | `--primary`, `--forest` | crema encima 12:1 |
| Botón secundario / etiquetas | `#565113` oliva oscuro | `--secondary` | 7.3:1 con crema |
| Detalle de marca (íconos, líneas, isotipo) | `#847c1f` oliva dorado | `--highlight`, `--ring` | 3.9:1: **solo texto grande o detalles** |
| Barra de anuncio | `#2a321b` con texto crema | `--announcement` | 12:1 |
| Degradado sobre fotos | `#1c1a19` (sombras de las fotos) | `--overlay` | — |

Única excepción fuera de la guía: un rojo funcional (`#9b2c1f`) solo para
errores de formularios.

---

## 6. Tipografía (definida por la Guía de Marca)

- **Titulares y acentos: VINCENTE.** Es una fuente comercial; hace falta el
  archivo con licencia web (.woff2). Mientras tanto se usa **Instrument
  Serif**, la serif condensada gratuita más parecida.
- **Cuerpos de texto: Roboto** (Google Fonts, ya aplicada).

---

## 7. Hero: propuestas de copy

**Aplicado:** título con el tagline A, **"Hecho para durar. Hecho para el
camino."**, y como descripción la frase del propio catálogo: *"Botas de cuero
vacuno 100% natural, diseñadas para los que llevan la montaña en cada paso."*

Alternativas:

| # | Título | Descripción |
|---|--------|-------------|
| 2 | **Cuero con memoria.** | Botas que mejoran con cada travesía y toman la forma de quien las usa. |
| 3 | **Del taller a la montaña.** | Cada par nace entre cueros y herramientas y se termina en el sendero. |

CTA principal: **Ver la colección** → tienda. CTA secundario: **Nuestra
historia** → historia.

---|--------|-------------|
| 1 | **Hecho a mano para el camino largo.** *(aplicada)* | Cuero trabajado por artesanos, costuras que resisten el paso del tiempo y piezas pensadas para acompañarte en cada kilómetro, cada cumbre y cada historia. |
| 2 | **El cuero que guarda tus historias.** | Botas, chaquetas y accesorios que mejoran con cada travesía. Artesanía de montaña hecha para durar toda una vida. |
| 3 | **Tradición artesanal. Espíritu de montaña.** | Cada pieza nace en el taller y se termina en el sendero. Calidad que se nota hoy y se demuestra con los años. |

CTA principal: **Ver la colección** → tienda. CTA secundario: **Nuestra
historia** → historia. (Si el sitio va en inglés: *Shop the Collection* /
*Our Story*.)

---

## 8. Decisiones técnicas ya tomadas

- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4
  + estructura shadcn/ui (`components.json` listo para `npx shadcn add …`).
- **Carpeta `components/ui`:** es la convención del CLI de shadcn; los
  componentes que agrega el CLI caen ahí y todos se importan igual
  (`@/components/ui/...`). Las piezas propias del sitio (header, menú, barra
  de anuncio) van en `components/layout`.
- **Header separado del hero:** el header tiene que ser *sticky* en toda la
  página y reutilizarse en las páginas internas (sin hero). Por eso vive en su
  propio componente (`SiteHeader`) con la animación de entrada; el hero solo se
  ocupa del fondo, el texto y los CTA. Visualmente siguen integrados: el
  header se superpone transparente al video y se vuelve sólido al hacer scroll.
- **Video solo donde conviene:** se muestra en pantallas ≥ 768 px, con conexión
  normal y sin preferencia de movimiento reducido. En los demás casos se ve el
  póster y el video ni siquiera se descarga.
- **Accesibilidad ya incorporada:** un solo `h1`, foco visible, botón de
  pausa del video con `aria-label`, menú móvil con foco encerrado y cierre con
  Escape, mega menú operable con teclado, animaciones reducidas si el usuario
  lo pide.

---

## 9. Preguntas abiertas para el cliente

Ya resueltas por el material: moneda (colones), país (Costa Rica), contacto
(WhatsApp, Instagram, showroom San Pedro) y anuncio de envíos.

1. **Idioma:** ¿solo español o también inglés? (Hoy está en español.)
2. **Plataforma de e-commerce y pasarela de pago** (p. ej. Shopify, o
   WooCommerce con una pasarela local como SINPE / tarjeta).
3. **Productos fuera de botas:** el brief menciona chaquetas, accesorios y
   productos de cuidado, pero el catálogo solo tiene botas. ¿Existen? Si no,
   se quitan del menú.
4. **Más vendidos:** ¿cuáles son? Hoy la sección muestra "Destacados de la
   temporada".
5. **Políticas:** envíos (costo y plazo), cambios/devoluciones y garantía.
6. **Afirmaciones a confirmar:** ¿las botas son hechas a mano? ¿dónde se
   fabrican y de dónde viene el cuero? (Para el carrusel de materiales y los
   pilares.)
7. **Newsletter:** ¿qué servicio usan?
8. **Analítica:** ¿GA4, Meta Pixel, otra?
9. **Dominio y hosting** (recomendado: Vercel para Next.js).
10. Las 8 dudas del catálogo en [catalogo-campana-1.md](catalogo-campana-1.md).
